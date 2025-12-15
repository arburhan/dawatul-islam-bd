"use client";

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useState, useRef } from 'react';
import {
    SELECTION_CHANGE_COMMAND,
    FORMAT_TEXT_COMMAND,
    $getSelection,
    $isRangeSelection,
    $createParagraphNode,
    $createTextNode,
    $getRoot,
    FORMAT_ELEMENT_COMMAND,
} from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isHeadingNode, HeadingNode, $createHeadingNode } from '@lexical/rich-text';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { INSERT_TABLE_COMMAND } from '@lexical/table';

import {
    Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, Heading3,
    Link as LinkIcon, Image, Video, Music, Table, Type, Palette,
    AlignLeft, AlignCenter, AlignRight, AlignJustify
} from 'lucide-react';
import MediaModal from '../modals/MediaModal';
import TableModal from '../modals/TableModal';

const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '32px'];

const COLORS = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'];

export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef<HTMLDivElement>(null);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isLink, setIsLink] = useState(false);

    // Dropdown state: only one can be active at a time
    const [activeDropdown, setActiveDropdown] = useState<'fontSize' | 'textColor' | 'bgColor' | null>(null);

    const [showVideoModal, setShowVideoModal] = useState(false);
    const [showAudioModal, setShowAudioModal] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showTableModal, setShowTableModal] = useState(false);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = (name: 'fontSize' | 'textColor' | 'bgColor') => {
        setActiveDropdown(prev => prev === name ? null : name);
    };


    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));

            const node = selection.anchor.getNode();
            const parent = node.getParent();
            setIsLink($isLinkNode(parent) || $isLinkNode(node));
        }
    }, []);

    useEffect(() => {
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            () => {
                updateToolbar();
                return false;
            },
            1
        );
    }, [editor, updateToolbar]);

    const formatHeading = (tag: 'h1' | 'h2' | 'h3' | 'p') => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const anchorNode = selection.anchor.getNode();
                const element = anchorNode.getTopLevelElementOrThrow();
                const elementKey = element.getKey();
                const elementDOM = editor.getElementByKey(elementKey);

                if (elementDOM !== null) {
                    if (tag === 'p') {
                        const newNode = $createParagraphNode();
                        element.replace(newNode);
                    } else {
                        const newNode = $createHeadingNode(tag);
                        element.replace(newNode);
                    }
                }
            }
        });
    };

    const insertLink = useCallback(() => {
        setShowLinkModal(true);
    }, []);

    const handleLinkSubmit = (url: string) => {
        if (!url) return;

        editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                if (selection.isCollapsed()) {
                    // If no text is selected, insert the URL as text
                    const textNode = $createTextNode(url);
                    selection.insertNodes([textNode]);
                    textNode.select();
                }
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
            } else {
                // If no selection at all (e.g. image selected or something else), 
                // we might want to insert at end or handle gracefully.
                // For now, let's try to handle the case where it's not a range selection but focus is inside editor
                const root = $getRoot();
                const paragraph = $createParagraphNode();
                const textNode = $createTextNode(url);
                paragraph.append(textNode);
                root.append(paragraph);
                textNode.select();
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
            }
        });

        setShowLinkModal(false);
    };
    const insertImage = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: Event) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('শুধুমাত্র ছবি ফাইল নির্বাচন করুন');
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                alert('ছবির সাইজ সর্বোচ্চ 2MB হতে হবে');
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                const { INSERT_IMAGE_COMMAND } = require('../plugins/ImagesPlugin');
                editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                    src: base64,
                    altText: file.name,
                    caption: '',
                    alignment: 'center'
                });
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }, [editor]);

    const handleVideoSubmit = (url: string) => {
        const { INSERT_VIDEO_COMMAND } = require('../plugins/VideoPlugin');
        editor.dispatchCommand(INSERT_VIDEO_COMMAND, { src: url });
    };

    const handleAudioSubmit = (url: string) => {
        const { INSERT_AUDIO_COMMAND } = require('../plugins/AudioPlugin');
        editor.dispatchCommand(INSERT_AUDIO_COMMAND, { src: url });
    };

    const handleTableSubmit = (rows: number, columns: number) => {
        editor.dispatchCommand(INSERT_TABLE_COMMAND, { rows: String(rows), columns: String(columns), includeHeaders: false });
    };

    const applyFontSize = (size: string) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                selection.getNodes().forEach(node => {
                    const element = editor.getElementByKey(node.getKey());
                    if (element) {
                        element.style.fontSize = size;
                    }
                });
            }
        });
        setActiveDropdown(null);
    };

    const applyTextColor = (color: string) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                selection.getNodes().forEach(node => {
                    const element = editor.getElementByKey(node.getKey());
                    if (element) {
                        element.style.color = color;
                    }
                });
            }
        });
        setActiveDropdown(null);
    };

    const applyBgColor = (color: string) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                selection.getNodes().forEach(node => {
                    const element = editor.getElementByKey(node.getKey());
                    if (element) {
                        element.style.backgroundColor = color;
                    }
                });
            }
        });
        setActiveDropdown(null);
    };

    return (
        <div ref={toolbarRef} className="toolbar bg-gray-100 border border-gray-300 rounded-t-lg p-2 flex flex-wrap gap-1 items-center">
            <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')} className={`toolbar-btn ${isBold ? 'active' : ''}`} title="Bold">
                <Bold size={18} />
            </button>
            <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')} className={`toolbar-btn ${isItalic ? 'active' : ''}`} title="Italic">
                <Italic size={18} />
            </button>
            <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')} className={`toolbar-btn ${isUnderline ? 'active' : ''}`} title="Underline">
                <Underline size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')} className="toolbar-btn" title="Align Left">
                <AlignLeft size={18} />
            </button>
            <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')} className="toolbar-btn" title="Align Center">
                <AlignCenter size={18} />
            </button>
            <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')} className="toolbar-btn" title="Align Right">
                <AlignRight size={18} />
            </button>
            <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')} className="toolbar-btn" title="Justify">
                <AlignJustify size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            <button onClick={() => formatHeading('h1')} className="toolbar-btn" title="Heading 1">
                <Heading1 size={18} />
            </button>
            <button onClick={() => formatHeading('h2')} className="toolbar-btn" title="Heading 2">
                <Heading2 size={18} />
            </button>
            <button onClick={() => formatHeading('h3')} className="toolbar-btn" title="Heading 3">
                <Heading3 size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            <button onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)} className="toolbar-btn" title="Bullet List">
                <List size={18} />
            </button>
            <button onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)} className="toolbar-btn" title="Numbered List">
                <ListOrdered size={18} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            <div className="relative">
                <button onClick={() => toggleDropdown('fontSize')} className="toolbar-btn flex items-center gap-1" title="Font Size">
                    <Type size={18} />
                </button>
                {activeDropdown === 'fontSize' && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
                        {FONT_SIZES.map(size => (
                            <button key={size} onClick={() => applyFontSize(size)} className="block w-full px-4 py-2 text-left hover:bg-gray-100" style={{ fontSize: size }}>
                                {size}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative">
                <button onClick={() => toggleDropdown('textColor')} className="toolbar-btn" title="Text Color">
                    <Palette size={18} />
                </button>
                {activeDropdown === 'textColor' && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg p-2 z-50 w-32">
                        <div className="grid grid-cols-4 gap-1">
                            {COLORS.map(color => (
                                <button key={color} onClick={() => applyTextColor(color)} className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: color }} title={color} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="relative">
                <button onClick={() => toggleDropdown('bgColor')} className="toolbar-btn" title="Background Color">
                    <div className="w-4 h-4 border border-gray-400 rounded" style={{ backgroundColor: '#ffff00' }} />
                </button>
                {activeDropdown === 'bgColor' && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg p-2 z-50 w-32">
                        <div className="grid grid-cols-4 gap-1">
                            <button onClick={() => applyBgColor('transparent')} className="w-6 h-6 rounded border border-gray-300 bg-white" title="No BG">×</button>
                            {COLORS.map(color => (
                                <button key={color} onClick={() => applyBgColor(color)} className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: color }} title={color} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            <button onClick={insertLink} className={`toolbar-btn ${isLink ? 'active' : ''}`} title="Insert Link">
                <LinkIcon size={18} />
            </button>
            <button onClick={() => setShowTableModal(true)} className="toolbar-btn" title="টেবিল যুক্ত করুন">
                <Table size={18} />
            </button>
            <button onClick={insertImage} className="toolbar-btn" title="ছবি আপলোড করুন">
                <Image size={18} />
            </button>
            <button onClick={() => setShowVideoModal(true)} className="toolbar-btn" title="ভিডিও যুক্ত করুন">
                <Video size={18} />
            </button>
            <button onClick={() => setShowAudioModal(true)} className="toolbar-btn" title="অডিও যুক্ত করুন">
                <Music size={18} />
            </button>

            {/* Modals */}
            <MediaModal
                isOpen={showLinkModal}
                onClose={() => setShowLinkModal(false)}
                onSubmit={handleLinkSubmit}
                title="লিঙ্ক যুক্ত করুন"
                placeholder="URL লিখুন"
            />
            <MediaModal
                isOpen={showVideoModal}
                onClose={() => setShowVideoModal(false)}
                onSubmit={handleVideoSubmit}
                title="ভিডিও যুক্ত করুন"
                placeholder="YouTube বা ভিডিও URL লিখুন"
            />
            <MediaModal
                isOpen={showAudioModal}
                onClose={() => setShowAudioModal(false)}
                onSubmit={handleAudioSubmit}
                title="অডিও যুক্ত করুন"
                placeholder="অডিও URL লিখুন"
            />
            <TableModal
                isOpen={showTableModal}
                onClose={() => setShowTableModal(false)}
                onSubmit={handleTableSubmit}
            />

            <style jsx>{`
                .toolbar-btn {
                    padding: 0.5rem;
                    border-radius: 0.375rem;
                    transition: background-color 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .toolbar-btn:hover {
                    background-color: rgba(0, 0, 0, 0.1);
                }
                .toolbar-btn.active {
                    background-color: rgba(59, 130, 246, 0.2);
                    color: #2563eb;
                }
            `}</style>
        </div>
    );
}
