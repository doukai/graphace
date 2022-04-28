import { writable } from "svelte/store";

type MessageBox = {
    isOpen?: boolean;
    id?: string;
    title?: string;
    content?: string;
    buttonName?: string;
    buttonType?: string;
    cancel?: () => boolean;
    confirm?: () => boolean;
}

function createMessageBoxStore() {
    const messageBoxStore = writable<MessageBox>();
    send({ isOpen: false });

    function send({ isOpen, title = null, content = null, buttonName = null, buttonType = null, cancel = () => true, confirm = () => true }: MessageBox) {
        messageBoxStore.update(() => { return { isOpen, id: id(), title, content, buttonName, buttonType, cancel, confirm } })
    };

    const { subscribe } = messageBoxStore;

    return {
        subscribe,
        send,
        open: ({ title, content, buttonName, buttonType, cancel, confirm }: MessageBox) => send({ isOpen: true, title, content, buttonName, buttonType, cancel, confirm }),
        close: () => send({ isOpen: false }),
    };
}

function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const messageBox = createMessageBoxStore();