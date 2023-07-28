import { goto } from '$app/navigation';
import { Writable, writable, derived } from 'svelte/store';

export const history: Writable<URL[]> = writable([]);

export const urlNameRecord: Writable<Record<string, { url: URL, name: string }>> = writable({});

export function urlName(url: URL, name: string) {
    urlNameRecord.update((item) => {
        const urls = Object.keys(item);
        if (urls[urls.length - 1] === url.pathname) {
            debugger
            item[url.pathname].name = name;
            return item;
        } else {
            return { ...item, [url.pathname]: { url, name } };
        }
    });
};

export const urlNames = derived(
    urlNameRecord,
    ($name) => Object.values($name)
);

export function url(url: URL) {
    const parts = url.pathname.split('/');
    const lang = parts.pop();
    parts.reduce((pre: string[], cur: string) => {
        return [...pre, [lang, ...pre, cur].join("/")];
    }, [])
}

export function ot(params?: Record<string, string | undefined>) {
    history.update(value => {
        let current = value.pop();
        urlNameRecord.update((item) => {
            if (current) {
                delete item[current.pathname];
            }
            return item;
        });
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