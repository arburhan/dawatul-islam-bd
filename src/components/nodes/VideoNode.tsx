import {
    DecoratorNode,
    LexicalNode,
    NodeKey,
    SerializedLexicalNode,
    Spread,
} from 'lexical';
import React from 'react';
import VideoComponent from './VideoComponent';

export interface VideoPayload {
    src: string;
    key?: NodeKey;
}

export type SerializedVideoNode = Spread<
    {
        src: string;
    },
    SerializedLexicalNode
>;

export class VideoNode extends DecoratorNode<React.ReactElement> {
    __src: string;

    static getType(): string {
        return 'video';
    }

    static clone(node: VideoNode): VideoNode {
        return new VideoNode(node.__src, node.getKey());
    }

    constructor(src: string, key?: NodeKey) {
        super(key);
        this.__src = src;
    }

    createDOM(): HTMLElement {
        const div = document.createElement('div');
        div.className = 'editor-video-container';
        return div;
    }

    updateDOM(): false {
        return false;
    }

    getSrc(): string {
        return this.__src;
    }

    exportJSON(): SerializedVideoNode {
        return {
            src: this.getSrc(),
            type: 'video',
            version: 1,
        };
    }

    static importJSON(serializedNode: SerializedVideoNode): VideoNode {
        const { src } = serializedNode;
        return $createVideoNode({ src });
    }

    decorate(): React.ReactElement {
        return <VideoComponent src={this.__src} nodeKey={this.getKey()} />;
    }
}

export function $createVideoNode({ src, key }: VideoPayload): VideoNode {
    return new VideoNode(src, key);
}

export function $isVideoNode(
    node: LexicalNode | null | undefined,
): node is VideoNode {
    return node instanceof VideoNode;
}
