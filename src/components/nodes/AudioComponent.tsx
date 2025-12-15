"use client";

import React, { useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Trash2 } from 'lucide-react';
import { $getNodeByKey, NodeKey } from 'lexical';

interface AudioComponentProps {
    src: string;
    nodeKey: NodeKey;
}

export default function AudioComponent({
    src,
    nodeKey
}: AudioComponentProps) {
    const [editor] = useLexicalComposerContext();
    const [isSelected, setIsSelected] = useState(false);

    const handleDelete = () => {
        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if (node) {
                node.remove();
            }
        });
    };

    return (
        <div
            className="relative my-4 group inline-block max-w-full"
            onClick={() => setIsSelected(true)}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsSelected(false);
                }
            }}
            tabIndex={0}
        >
            <div className={`p-2 rounded-lg ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-gray-50'}`}>
                <audio
                    src={src}
                    controls
                    className="w-full min-w-[300px]"
                    preload="metadata"
                />
            </div>

            {/* Delete Button */}
            {isSelected && (
                <div className="absolute -top-3 -right-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        className="p-1.5 bg-white rounded-full shadow-md text-red-600 hover:bg-red-50 border border-gray-200"
                        title="Delete Audio"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}
