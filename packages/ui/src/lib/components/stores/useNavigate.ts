import { type Writable, writable, derived, get } from 'svelte/store';
import { goto } from '$app/navigation';

export const history: Writable<{ url: URL }[]> = writable([]);

export const canBack = derived(
    history,
    ($history) => $history.length > 0
);

export function to(url: string | URL, params?: Record<string, string | undefined>) {
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
    Object.entries(params || {}).forEach(([k, v]) => {
        toUrl.searchParams.set(k, v);
    });
    history.update(($history) => {
        $history.push({ url: toUrl });
        return $history;
    });
    goto(toUrl);
}

export function init(url: string | URL, params?: Record<string, string | undefined>) {
    history.set([]);
    to(url, params);
}

export function ot() {
    const $history = get(history);
    const backPage = $history[$history.length - 2];
    history.update($history => {
        $history.pop();
        return $history;
    });
    if (backPage) {
        goto(backPage.url);
    } else {
        goto("/");
    }
}