import { writable, derived, type Writable } from "svelte/store";

type Notification = {
    id: string;
    type: string;
    message: string;
    timeout: number;
}

function createNotificationStore() {
    const notificationsStore = writable<Notification[]>([]);

    function send(message: string, type: string, timeout = 3000) {
        notificationsStore.update(notification => {
            return [...notification, { id: id(), type, message, timeout }];
        })
    };

    const notifications = derived<Writable<Notification[]>, Notification[]>(notificationsStore, ($notificationsStore, set) => {
        set($notificationsStore);
        if ($notificationsStore.length > 0) {
            const timer = setTimeout(() => {
                notificationsStore.update(state => {
                    state.shift();
                    return state;
                })
            }, $notificationsStore[0].timeout)
            return () => {
                clearTimeout(timer);
            }
        }
    });

    const { subscribe } = notifications;

    return {
        subscribe,
        send,
        default: (msg: string, timeout = 3000) => send(msg, "default", timeout),
        info: (msg: string, timeout = 3000) => send(msg, "info", timeout),
        success: (msg: string, timeout = 3000) => send(msg, "success", timeout),
        warning: (msg: string, timeout = 3000) => send(msg, "warning", timeout),
        error: (msg: string, timeout = 3000) => send(msg, "error", timeout),
    };
}

function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const notifications = createNotificationStore();