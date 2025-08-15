import { type Writable, writable, derived } from 'svelte/store';
import { goto } from '$app/navigation';

export const history: Writable<{ url: URL, name?: string | null | undefined }[]> = writable([]);

export const canBack = derived(
    history,
    ($history) => $history.length > 1
);

export function add(url: string | URL, name?: string | null | undefined, params?: Record<string, string | undefined>): URL {
    let toUrl: URL;
    if (typeof url === "string") {
        let baseURI = document.baseURI;
        if (!baseURI) {
            const baseTags = document.getElementsByTagName('base');
            baseURI = baseTags.length ? baseTags[0].href : document.URL;
        }
        toUrl = new URL(url, baseURI);
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
    history.update(($history) => {
        if (!$history.some(page => page.url.pathname.split("/").splice(2).join("/") === toUrl.pathname.split("/").splice(2).join("/"))) {
            $history.push({ url: toUrl, name });
        }
        return $history;
    });
    return toUrl;
}

export function to(url: string | URL, name?: string | null | undefined, params?: Record<string, string | undefined>) {
    const toUrl = add(url, name, params);
    history.update(($history) => {
        const pathname = toUrl.pathname.split("/").splice(2).join("/");
        if ($history.map(page => page.url.pathname.split("/").splice(2).join("/")).includes(pathname)) {
            return $history.splice(0, $history.map(page => page.url.pathname.split("/").splice(2).join("/")).indexOf(pathname) + 1);
        }
        return $history;
    });
    goto(toUrl);
}

export function init(url: string | URL, name?: string | null | undefined, params?: Record<string, string | undefined>) {
    history.set([]);
    to(url, name, params);
}

let $history: { url: URL, name?: string | null | undefined }[] = [];
history.subscribe((value) => $history = value);

export function ot(params?: Record<string, string | undefined>) {
    const backPage = $history[$history.length - 2];
    if (backPage) {
        if (params) {
            Object.entries(params).forEach(param => {
                if (param[1] === undefined) {
                    backPage.url.searchParams.delete(param[0]);
                } else {
                    backPage.url.searchParams.set(param[0], param[1]);
                }
            });
        }
        history.update($history => {
            $history.pop();
            return $history;
        });
        goto(backPage.url);
    }
}