import {
    DecoratorNode,
    LexicalNode,
    NodeKey,
    SerializedLexicalNode,
    Spread,
} from 'lexical';
import React from 'react';
import ImageComponent from './ImageComponent';

export type ImageAlignment = 'left' | 'center' | 'right' | 'full';

export interface ImagePayload {
    src: string;
    altText: string;
    caption?: string;
    alignment?: ImageAlignment;
    width?: number;
    key?: NodeKey;
}

export type SerializedImageNode = Spread<
    {
        src: string;
        altText: string;
        caption?: string;
        alignment: ImageAlignment;
        width?: number;
    },
    SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<React.ReactElement> {
    __src: string;
    __altText: string;
    __caption: string;
    __alignment: ImageAlignment;
    __width?: number;

    static getType(): string {
        return 'image';
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(
            node.__src,
            node.__altText,
            node.__caption,
            node.__alignment,
            node.__width,
            node.getKey()
        );
    }

    constructor(
        src: string,
        altText: string,
        caption: string = '',
        alignment: ImageAlignment = 'center',
        width?: number,
        key?: NodeKey
    ) {
        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__caption = caption;
        this.__alignment = alignment;
        this.__width = width;
    }

    createDOM(): HTMLElement {
        const div = document.createElement('div');
        div.className = 'image-node-wrapper';
        return div;
    }

    updateDOM(): false {
        return false;
    }

    getSrc(): string {
        return this.__src;
    }

    getAltText(): string {
        return this.__altText;
    }

    getCaption(): string {
        return this.__caption;
    }

    setCaption(caption: string): void {
        const writable = this.getWritable();
        writable.__caption = caption;
    }

    getAlignment(): ImageAlignment {
        return this.__alignment;
    }

    setAlignment(alignment: ImageAlignment): void {
        const writable = this.getWritable();
        writable.__alignment = alignment;
    }

    getWidth(): number | undefined {
        return this.__width;
    }

    setWidth(width: number | undefined): void {
        const writable = this.getWritable();
        writable.__width = width;
    }

    exportJSON(): SerializedImageNode {
        return {
            src: this.getSrc(),
            altText: this.getAltText(),
            caption: this.__caption,
            alignment: this.__alignment,
            width: this.__width,
            type: 'image',
            version: 1,
        };
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        const { src, altText, caption, alignment, width } = serializedNode;
        return $createImageNode({ src, altText, caption, alignment, width });
    }

    decorate(): React.ReactElement {
        return (
            <ImageComponent
                src={this.__src}
                altText={this.__altText}
                caption={this.__caption}
                alignment={this.__alignment}
                width={this.__width}
                nodeKey={this.getKey()}
            />
        );
    }
}

export function $createImageNode(payload: ImagePayload): ImageNode {
    return new ImageNode(
        payload.src,
        payload.altText,
        payload.caption,
        payload.alignment,
        payload.width,
        payload.key
    );
}

export function $isImageNode(
    node: LexicalNode | null | undefined,
): node is ImageNode {
    return node instanceof ImageNode;
}
