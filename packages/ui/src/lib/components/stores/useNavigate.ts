import { goto } from '$app/navigation';
import { type Writable, writable, derived, get } from 'svelte/store';

export const history: Writable<{ url: URL, name?: string | undefined }[]> = writable([]);

export const canBack = derived(
    history,
    ($history) => $history.length > 1
);

export function to(url: string | URL, name?: string, params?: Record<string, string | undefined>) {
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
    history.update(($history) => {
        if (!$history.some(page => page.url.pathname.split("/").splice(2).join("/") === toUrl.pathname.split("/").splice(2).join("/"))) {
            $history.push({ url: toUrl, name });
        }
        return $history;
    });
    goto(toUrl);
}

export function init(url: string | URL, name?: string, params?: Record<string, string | undefined>) {
    history.set([]);
    to(url, name, params);
}

export function ot(params?: Record<string, string | undefined>) {
    const $history = get(history);
    const backPage = $history[$history.length - 1];
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