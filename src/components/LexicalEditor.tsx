"use client";

import { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { CodeNode } from '@lexical/code';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import VideoPlugin from './plugins/VideoPlugin';
import AudioPlugin from './plugins/AudioPlugin';
import { ImageNode } from './nodes/ImageNode';
import { VideoNode } from './nodes/VideoNode';
import { AudioNode } from './nodes/AudioNode';
import { EditorState } from 'lexical';
import ToolbarPlugin from './plugins/ToolbarPlugin';


interface LexicalEditorProps {
    initialContent?: string;
    onChange: (content: string) => void;
}

const theme = {
    ltr: 'ltr',
    rtl: 'rtl',
    paragraph: 'editor-paragraph',
    quote: 'editor-quote',
    heading: {
        h1: 'editor-heading-h1',
        h2: 'editor-heading-h2',
        h3: 'editor-heading-h3',
        h4: 'editor-heading-h4',
        h5: 'editor-heading-h5'
    },
    list: {
        nested: {
            listitem: 'editor-nested-listitem'
        },
        ol: 'editor-list-ol',
        ul: 'editor-list-ul',
        listitem: 'editor-listitem'
    },
    image: 'editor-image',
    link: 'editor-link',
    text: {
        bold: 'editor-text-bold',
        italic: 'editor-text-italic',
        underline: 'editor-text-underline',
        strikethrough: 'editor-text-strikethrough',
        code: 'editor-text-code',
    },
    code: 'editor-code',
    table: 'editor-table',
    tableCell: 'editor-table-cell',
    tableCellHeader: 'editor-table-cell-header',
    tableRow: 'editor-table-row'
};

function onError(error: Error) {
    console.error('Lexical Error:', error);
}

export default function LexicalEditor({ initialContent, onChange }: LexicalEditorProps) {
    const initialConfig = {
        namespace: 'EventEditor',
        theme,
        onError,
        nodes: [
            HeadingNode,
            QuoteNode,
            ListNode,
            ListItemNode,
            LinkNode,
            CodeNode,
            HorizontalRuleNode,
            ImageNode,
            VideoNode,
            AudioNode,
            TableNode,
            TableCellNode,
            TableRowNode
        ]
    };

    const handleChange = (editorState: EditorState) => {
        const json = JSON.stringify(editorState.toJSON());
        onChange(json);
    };

    return (
        <div className="lexical-editor-wrapper border border-gray-300 rounded-lg overflow-hidden bg-white">
            <LexicalComposer initialConfig={initialConfig}>
                <ToolbarPlugin />
                <div className="editor-container relative">
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable className="editor-input min-h-[400px] p-4 outline-none" />
                        }
                        placeholder={
                            <div className="editor-placeholder absolute top-4 left-4 text-gray-400 pointer-events-none">
                                ইভেন্টের বিস্তারিত লিখুন...
                            </div>
                        }
                        ErrorBoundary={LexicalErrorBoundary as any}
                    />
                    <OnChangePlugin onChange={handleChange} />
                    <HistoryPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <MarkdownShortcutPlugin />
                    <TablePlugin />
                    <ImagesPlugin />
                    <VideoPlugin />
                    <AudioPlugin />
                </div>
            </LexicalComposer>

            <style jsx global>{`
                .editor-input {
                    font-size: 16px;
                    line-height: 1.6;
                }

                .editor-paragraph {
                    margin: 0 0 12px 0;
                }

                .editor-heading-h1 {
                    font-size: 32px;
                    font-weight: 700;
                    margin: 16px 0;
                    color: #1a202c;
                }

                .editor-heading-h2 {
                    font-size: 28px;
                    font-weight: 600;
                    margin: 14px 0;
                    color: #2d3748;
                }

                .editor-heading-h3 {
                    font-size: 24px;
                    font-weight: 600;
                    margin: 12px 0;
                    color: #4a5568;
                }

                .editor-list-ol {
                    list-style-type: decimal;
                    padding-left: 24px;
                    margin: 12px 0;
                }

                .editor-list-ul {
                    list-style-type: disc;
                    padding-left: 24px;
                    margin: 12px 0;
                }

                .editor-listitem {
                    margin: 4px 0;
                }

                .editor-nested-listitem {
                    list-style-type: none;
                }

                .editor-link {
                    color: #3182ce;
                    text-decoration: underline;
                }

                .editor-text-bold {
                    font-weight: 700;
                }

                .editor-text-italic {
                    font-style: italic;
                }

                .editor-text-underline {
                    text-decoration: underline;
                }

                .editor-text-strikethrough {
                    text-decoration: line-through;
                }

                .editor-quote {
                    border-left: 4px solid #e2e8f0;
                    padding-left: 16px;
                    margin: 16px 0;
                    font-style: italic;
                    color: #4a5568;
                }

                .editor-code {
                    background-color: #f7fafc;
                    padding: 2px 4px;
                    border-radius: 4px;
                    font-family: 'Courier New', monospace;
                }

                .editor-image {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin: 16px 0;
                }

                .editor-table {
                    border-collapse: collapse;
                    border-spacing: 0;
                    max-width: 100%;
                    overflow-y: scroll;
                    margin: 0;
                    table-layout: fixed;
                    width: 100%;
                }

                .editor-table-cell {
                    border: 1px solid #ddd;
                    min-width: 75px;
                    padding: 8px;
                    vertical-align: top;
                    text-align: left;
                    position: relative;
                    outline: none;
                }

                .editor-table-cell-header {
                    background-color: #f2f2f2;
                    text-align: left;
                }

                .editor-table-row {
                }
            `}</style>
        </div>
    );
}
