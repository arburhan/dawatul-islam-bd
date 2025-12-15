"use client";

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { COMMAND_PRIORITY_EDITOR, createCommand, LexicalCommand } from 'lexical';
import { useEffect } from 'react';
import { $createAudioNode, AudioPayload } from '../nodes/AudioNode';

export const INSERT_AUDIO_COMMAND: LexicalCommand<AudioPayload> = createCommand();

export default function AudioPlugin(): React.ReactElement | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand<AudioPayload>(
            INSERT_AUDIO_COMMAND,
            (payload) => {
                const audioNode = $createAudioNode(payload);
                $insertNodeToNearestRoot(audioNode);
                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    return null;
}
