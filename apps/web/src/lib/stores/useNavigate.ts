import { goto } from '$app/navigation';
import { Writable, writable, derived } from 'svelte/store';

export enum PageType {
    CREATE = 'CREATE',
    SELECT = 'SELECT'
}

export const history: Writable<URL[]> = writable([]);

export const urlNameRecord: Writable<Record<string, { url: URL, name: string | PageType }>> = writable({});

export function urlName(url: URL, name: string | PageType) {
    const pathname = url.pathname.split("/").splice(2).join("/");
    urlNameRecord.update((item) => {
        const urls = Object.keys(item);
        if (urls[urls.length - 1] === pathname) {
            item[pathname].name = name;
            return item;
        } else {
            return { ...item, [pathname]: { url, name } };
        }
    });
    history.update(value => {
        if (value.length === 0) {
            return [url];
        }
        return [...value];
    });
};

export const urlNames = derived(
    urlNameRecord,
    ($name) => Object.values($name)
);

export const canBack = derived(
    history,
    ($history) => $history.length > 1
);

export function ot(params?: Record<string, string | undefined>) {
    history.update(value => {
        const current = value.pop();
        urlNameRecord.update((item) => {
            if (current) {
                delete item[current.pathname.split("/").splice(2).join("/")];
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

export function init(url: string | URL, params?: Record<string, string | undefined>) {
    history.set([]);
    urlNameRecord.set({});
    to(url, params);
}