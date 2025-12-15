"use client";

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand } from 'lexical';
import { useEffect } from 'react';
import { $createImageNode, ImagePayload } from '../nodes/ImageNode';

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImagePayload> = createCommand();

export default function ImagesPlugin(): React.ReactElement | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand<ImagePayload>(
            INSERT_IMAGE_COMMAND,
            (payload) => {
                const imageNode = $createImageNode({
                    src: payload.src,
                    altText: payload.altText || 'Image',
                    caption: payload.caption || '',
                    alignment: payload.alignment || 'center'
                });
                $insertNodeToNearestRoot(imageNode);
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    return null;
}
