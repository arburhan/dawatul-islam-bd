"use client";

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand } from 'lexical';
import { useEffect } from 'react';
import { $createVideoNode, VideoPayload } from '../nodes/VideoNode';

export const INSERT_VIDEO_COMMAND: LexicalCommand<VideoPayload> = createCommand();

export default function VideoPlugin(): React.ReactElement | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand<VideoPayload>(
            INSERT_VIDEO_COMMAND,
            (payload) => {
                const videoNode = $createVideoNode(payload);
                $insertNodeToNearestRoot(videoNode);
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    return null;
}
