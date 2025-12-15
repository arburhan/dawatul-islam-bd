"use client";

import { useEffect, useState } from 'react';

interface LexicalRendererProps {
    content: string;
}

export default function LexicalRenderer({ content }: LexicalRendererProps) {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        if (!content) return;

        try {
            const editorState = JSON.parse(content);
            const rendered = renderLexicalContent(editorState);
            setHtmlContent(rendered);
        } catch (error) {
            console.error('Error parsing Lexical content:', error);
            setHtmlContent(content); // Fallback to raw content
        }
    }, [content]);

    return (
        <div
            className="lexical-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{
                lineHeight: '1.8',
                fontSize: '16px'
            }}
        />
    );
}

function renderLexicalContent(editorState: any): string {
    if (!editorState || !editorState.root) {
        return '';
    }

    const { children } = editorState.root;
    if (!children || children.length === 0) {
        return '';
    }

    return children.map((node: any) => renderNode(node)).join('');
}

function renderNode(node: any): string {
    if (!node) return '';

    const { type, children, text, format, tag } = node;

    // Text node
    if (type === 'text') {
        let content = text || '';

        // Apply formatting
        if (format) {
            if (format & 1) content = `<strong>${content}</strong>`; // Bold
            if (format & 2) content = `<em>${content}</em>`; // Italic
            if (format & 8) content = `<u>${content}</u>`; // Underline
            if (format & 4) content = `<s>${content}</s>`; // Strikethrough
            if (format & 16) content = `<code>${content}</code>`; // Code
        }

        return content;
    }

    // Paragraph
    if (type === 'paragraph') {
        const content = children?.map((child: any) => renderNode(child)).join('') || '';

        // Check if content contains HTML tags (like images, videos, audio)
        if (content.includes('<img') || content.includes('<video') || content.includes('<audio') || content.includes('<iframe')) {
            return content; // Don't wrap media in paragraph tags
        }

        return `<p style="margin: 12px 0;">${content}</p>`;
    }

    // Headings
    if (type === 'heading') {
        const level = tag || 'h2';
        const content = children?.map((child: any) => renderNode(child)).join('') || '';
        const styles = {
            h1: 'font-size: 32px; font-weight: 700; margin: 24px 0 16px; color: #1a202c;',
            h2: 'font-size: 28px; font-weight: 600; margin: 20px 0 14px; color: #2d3748;',
            h3: 'font-size: 24px; font-weight: 600; margin: 18px 0 12px; color: #4a5568;',
            h4: 'font-size: 20px; font-weight: 600; margin: 16px 0 10px; color: #4a5568;',
            h5: 'font-size: 18px; font-weight: 600; margin: 14px 0 8px; color: #4a5568;',
        };
        return `<${level} style="${styles[level as keyof typeof styles] || styles.h2}">${content}</${level}>`;
    }

    // Lists
    if (type === 'list') {
        const content = children?.map((child: any) => renderNode(child)).join('') || '';
        const listType = node.listType === 'number' ? 'ol' : 'ul';
        const listStyle = listType === 'ol'
            ? 'list-style-type: decimal; padding-left: 24px; margin: 16px 0;'
            : 'list-style-type: disc; padding-left: 24px; margin: 16px 0;';
        return `<${listType} style="${listStyle}">${content}</${listType}>`;
    }

    if (type === 'listitem') {
        const content = children?.map((child: any) => renderNode(child)).join('') || '';
        return `<li style="margin: 6px 0;">${content}</li>`;
    }

    // Links
    if (type === 'link') {
        const content = children?.map((child: any) => renderNode(child)).join('') || '';
        const url = node.url || '#';
        return `<a href="${url}" style="color: #3182ce; text-decoration: underline;" target="_blank" rel="noopener noreferrer">${content}</a>`;
    }

    // Quote
    if (type === 'quote') {
        const content = children?.map((child: any) => renderNode(child)).join('') || '';
        return `<blockquote style="border-left: 4px solid #e2e8f0; padding-left: 16px; margin: 20px 0; font-style: italic; color: #4a5568;">${content}</blockquote>`;
    }

    // Code block
    if (type === 'code') {
        const content = children?.map((child: any) => renderNode(child)).join('') || '';
        return `<pre style="background-color: #f7fafc; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0;"><code>${content}</code></pre>`;
    }

    // Line break
    if (type === 'linebreak') {
        return '<br />';
    }

    // Default: render children if available
    if (children && children.length > 0) {
        return children.map((child: any) => renderNode(child)).join('');
    }

    return '';
}
