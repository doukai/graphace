import { get, type Writable, writable } from 'svelte/store';

function createZIndex() {
    const zIndex: Writable<number> = writable(0);
    const { subscribe, set, update } = zIndex;
    return {
        subscribe,
        next: (n?: number | undefined) => {
            update(($zIndex) => $zIndex + (n || 100));
            return get(zIndex);
        },
        top: (n?: number | undefined) => get(zIndex) + (n || 0),
        reset: () => set(0)
    };
}

export const zIndex = createZIndex();