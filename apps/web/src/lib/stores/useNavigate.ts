import { goto } from '$app/navigation';
import { Writable, writable } from 'svelte/store';

export const history: Writable<URL[]> = writable([]);

export function ot(params?: Record<string, string | undefined>) {
    history.update(value => {
        value.pop();
        const backUrl = value[value.length - 1];
        if (backUrl) {
            if (params) {
                Object.entries(params).forEach(param => {
                    if (param[1] === undefined) {
                        backUrl?.searchParams.delete(param[0]);
                    } else {
                        backUrl?.searchParams.set(param[0], param[1]);
                    }
                });
            }
            goto(backUrl);
        }
        return [...value];
    });
}

export function to(url: string | URL, params?: Record<string, string | undefined>) {
    history.update(value => {
        let toUrl: URL;
        if (typeof url === "string") {
            toUrl = new URL(url, window.location.href);
        } else {
            toUrl = url;
        }
        if (params) {
            Object.entries(params).forEach(param => {
                if (param[1] === undefined) {
                    toUrl?.searchParams.delete(param[0]);
                } else {
                    toUrl?.searchParams.set(param[0], param[1]);
                }
            });
        }
        value.push(toUrl);
        goto(toUrl);
        return [...value];
    });
}