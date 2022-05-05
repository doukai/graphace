import { writable } from "svelte/store";

type MessageBox = {
    id?: string;
    title?: string;
    content?: string;
    buttonName?: string;
    buttonType?: string;
    cancel?: () => boolean;
    confirm?: () => boolean;
}

function createMessageBoxStore() {
    const messageBoxStore = writable<MessageBox[]>([]);

    function send({ title = null, content = null, buttonName = null, buttonType = null, cancel = () => true, confirm = () => true }: MessageBox) {
        messageBoxStore.update(messageBox => {
            return [...messageBox, { id: id(), title, content, buttonName, buttonType, cancel, confirm }];
        })
    };

    const { subscribe } = messageBoxStore;

    return {
        subscribe,
        send,
        open: ({ title, content, buttonName, buttonType, cancel, confirm }: MessageBox) => send({ title, content, buttonName, buttonType, cancel, confirm }),
        close: () => {
            messageBoxStore.update(messageBox => {
                messageBox.pop();
                return messageBox;
            })
        },
    };
}

function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const messageBox = createMessageBoxStore();