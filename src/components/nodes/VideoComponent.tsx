"use client";

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { AlignLeft, AlignCenter, AlignRight, Trash2, Maximize } from 'lucide-react';
import { $getNodeByKey, NodeKey } from 'lexical';
import { VideoNode } from './VideoNode';

interface VideoComponentProps {
    src: string;
    nodeKey: NodeKey;
}

export default function VideoComponent({
    src,
    nodeKey
}: VideoComponentProps) {
    const [editor] = useLexicalComposerContext();
    const videoRef = useRef<HTMLDivElement>(null);
    const [isSelected, setIsSelected] = useState(false);
    const [width, setWidth] = useState<number | undefined>(undefined);
    const [alignment, setAlignment] = useState<'left' | 'center' | 'right' | 'full'>('center');

    const updateNode = useCallback((updates: Partial<{ width: number }>) => {
        // We can implement persistent width storage in VideoNode if needed later
        // For now, we just manage local state or could update node if we add width property
    }, []);

    const handleDelete = () => {
        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if (node) {
                node.remove();
            }
        });
    };

    const handleResize = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const startX = e.clientX;
        const startWidth = videoRef.current?.offsetWidth || 0;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const newWidth = Math.max(300, Math.min(800, startWidth + deltaX)); // Min 300px for video
            setWidth(newWidth);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, []);

    const isYouTube = (url: string) => {
        const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        const match = url.match(pattern);
        return match ? match[1] : null;
    };

    const videoId = isYouTube(src);

    const alignmentClasses = {
        left: 'mr-auto',
        center: 'mx-auto',
        right: 'ml-auto',
        full: 'w-full'
    };

    const widthStyle = alignment === 'full'
        ? { width: '100%' }
        : width
            ? { width: `${width}px`, maxWidth: '100%' }
            : { maxWidth: '100%', width: '560px' }; // Default width

    return (
        <div
            className={`relative my-4 group ${alignmentClasses[alignment]}`}
            style={widthStyle}
            onClick={() => setIsSelected(true)}
            onBlur={(e) => {
                // Blur handling
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsSelected(false);
                }
            }}
            tabIndex={0}
            ref={videoRef}
        >
            <div className={`relative rounded-lg overflow-hidden ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
                {videoId ? (
                    <div className="relative pb-[56.25%] h-0">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            className="absolute top-0 left-0 w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video"
                        />
                        {/* Overlay to catch clicks for selection when not playing */}
                        <div className="absolute inset-0 bg-transparent" />
                    </div>
                ) : (
                    <video
                        src={src}
                        controls
                        className="w-full h-auto"
                        preload="metadata"
                    />
                )}
            </div>

            {/* Toolbar */}
            {isSelected && (
                <div className="absolute -top-10 right-0 flex gap-1 bg-white rounded shadow-lg p-1 z-10 border border-gray-200">
                    <button
                        onClick={(e) => { e.stopPropagation(); setAlignment('left'); }}
                        className={`p-1.5 rounded hover:bg-gray-100 ${alignment === 'left' ? 'bg-blue-100' : ''}`}
                    >
                        <AlignLeft size={16} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setAlignment('center'); }}
                        className={`p-1.5 rounded hover:bg-gray-100 ${alignment === 'center' ? 'bg-blue-100' : ''}`}
                    >
                        <AlignCenter size={16} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setAlignment('right'); }}
                        className={`p-1.5 rounded hover:bg-gray-100 ${alignment === 'right' ? 'bg-blue-100' : ''}`}
                    >
                        <AlignRight size={16} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setAlignment('full'); }}
                        className={`p-1.5 rounded hover:bg-gray-100 ${alignment === 'full' ? 'bg-blue-100' : ''}`}
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
                        title="Delete Video"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}

            {/* Resize handle */}
            {isSelected && alignment !== 'full' && (
                <div
                    onMouseDown={handleResize}
                    className="absolute bottom-2 right-2 w-4 h-4 bg-blue-500 cursor-se-resize rounded-sm shadow border border-white z-20"
                />
            )}
        </div>
    );
}
