"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { AlignLeft, AlignCenter, AlignRight, Maximize, Trash2 } from 'lucide-react';
import { $getNodeByKey, NodeKey } from 'lexical';
import { ImageNode } from './ImageNode';

type ImageAlignment = 'left' | 'center' | 'right' | 'full';

interface ImageComponentProps {
    src: string;
    altText: string;
    caption: string;
    alignment: ImageAlignment;
    width?: number;
    nodeKey: NodeKey;
}

export default function ImageComponent({
    src,
    altText,
    caption: initialCaption,
    alignment: initialAlignment,
    width: initialWidth,
    nodeKey
}: ImageComponentProps) {
    const [editor] = useLexicalComposerContext();
    const imageRef = useRef<HTMLImageElement>(null);
    const [isSelected, setIsSelected] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [caption, setCaption] = useState(initialCaption);
    const [alignment, setAlignment] = useState<ImageAlignment>(initialAlignment);
    const [width, setWidth] = useState<number | undefined>(initialWidth);
    const [showCaptionInput, setShowCaptionInput] = useState(false);

    const alignmentClasses = {
        left: 'mr-auto',
        center: 'mx-auto',
        right: 'ml-auto',
        full: 'w-full'
    };

    const updateNode = useCallback((updates: Partial<{ caption: string; alignment: ImageAlignment; width: number }>) => {
        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if (node instanceof ImageNode) {
                if (updates.caption !== undefined) {
                    node.setCaption(updates.caption);
                }
                if (updates.alignment !== undefined) {
                    node.setAlignment(updates.alignment);
                }
                if (updates.width !== undefined) {
                    node.setWidth(updates.width);
                }
            }
        });
    }, [editor, nodeKey]);

    const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCaption = e.target.value;
        setCaption(newCaption);
        updateNode({ caption: newCaption });
    };

    const handleAlignmentChange = (newAlignment: ImageAlignment) => {
        setAlignment(newAlignment);
        updateNode({ alignment: newAlignment });
    };

    const handleResize = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);

        const startX = e.clientX;
        const startWidth = imageRef.current?.offsetWidth || 0;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const newWidth = Math.max(100, Math.min(800, startWidth + deltaX));
            setWidth(newWidth);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            if (width) {
                updateNode({ width });
            }
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [width, updateNode]);

    const handleDelete = () => {
        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if (node) {
                node.remove();
            }
        });
    };

    const widthStyle = alignment === 'full'
        ? { width: '100%' }
        : width
            ? { width: `${width}px`, maxWidth: '100%' }
            : { maxWidth: '100%' };

    return (
        <div
            className={`relative my-4 group ${alignmentClasses[alignment]}`}
            style={widthStyle}
            onClick={() => setIsSelected(true)}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsSelected(false);
                }
            }}
            tabIndex={0}
        >
            {/* Image with selection border */}
            <div className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
                <img
                    ref={imageRef}
                    src={src}
                    alt={altText}
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                    draggable={false}
                />

                {/* Alignment toolbar - shown on hover */}
                {isSelected && (
                    <div className="absolute top-2 right-2 flex gap-1 bg-white rounded shadow-lg p-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAlignmentChange('left');
                            }}
                            className={`p-1.5 rounded hover:bg-gray-100 ${alignment === 'left' ? 'bg-blue-100' : ''}`}
                            title="বাম পাশে"
                        >
                            <AlignLeft size={16} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAlignmentChange('center');
                            }}
                            className={`p-1.5 rounded hover:bg-gray-100 ${alignment === 'center' ? 'bg-blue-100' : ''}`}
                            title="মাঝখানে"
                        >
                            <AlignCenter size={16} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAlignmentChange('right');
                            }}
                            className={`p-1.5 rounded hover:bg-gray-100 ${alignment === 'right' ? 'bg-blue-100' : ''}`}
                            title="ডান পাশে"
                        >
                            <AlignRight size={16} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAlignmentChange('full');
                            }}
                            className={`p-1.5 rounded hover:bg-gray-100 ${alignment === 'full' ? 'bg-blue-100' : ''}`}
                            title="সম্পূর্ণ প্রস্থ"
                        >
                            <Maximize size={16} />
                        </button>
                        <div className="w-px bg-gray-300" />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete();
                            }}
                            className="p-1.5 rounded hover:bg-red-100 text-red-600"
                            title="মুছে ফেলুন"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )}

                {/* Resize handle - bottom right corner */}
                {isSelected && alignment !== 'full' && (
                    <div
                        onMouseDown={handleResize}
                        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
                        style={{ borderRadius: '0 0 8px 0' }}
                    />
                )}
            </div>

            {/* Caption - shown when selected or has content */}
            {(isSelected || caption) && (
                <div className="mt-2">
                    <input
                        type="text"
                        value={caption}
                        onChange={handleCaptionChange}
                        placeholder="ক্যাপশন লিখুন..."
                        className="w-full text-sm text-gray-600 text-center italic border-b border-transparent focus:border-blue-500 outline-none px-2 py-1"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
