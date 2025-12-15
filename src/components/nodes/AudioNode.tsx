import {
    DecoratorNode,
    LexicalNode,
    NodeKey,
    SerializedLexicalNode,
    Spread,
} from 'lexical';
import React from 'react';
import AudioComponent from './AudioComponent';

export interface AudioPayload {
    src: string;
    key?: NodeKey;
}

export type SerializedAudioNode = Spread<
    {
        src: string;
    },
    SerializedLexicalNode
>;

export class AudioNode extends DecoratorNode<React.ReactElement> {
    __src: string;

    static getType(): string {
        return 'audio';
    }

    static clone(node: AudioNode): AudioNode {
        return new AudioNode(node.__src, node.getKey());
    }

    constructor(src: string, key?: NodeKey) {
        super(key);
        this.__src = src;
    }

    createDOM(): HTMLElement {
        const div = document.createElement('div');
        div.className = 'editor-audio-container';
        return div;
    }

    updateDOM(): false {
        return false;
    }

    getSrc(): string {
        return this.__src;
    }

    exportJSON(): SerializedAudioNode {
        return {
            src: this.getSrc(),
            type: 'audio',
            version: 1,
        };
    }

    static importJSON(serializedNode: SerializedAudioNode): AudioNode {
        const { src } = serializedNode;
        return $createAudioNode({ src });
    }

    decorate(): React.ReactElement {
        return <AudioComponent src={this.__src} nodeKey={this.getKey()} />;
    }
}

export function $createAudioNode({ src, key }: AudioPayload): AudioNode {
    return new AudioNode(src, key);
}

export function $isAudioNode(
    node: LexicalNode | null | undefined,
): node is AudioNode {
    return node instanceof AudioNode;
}
