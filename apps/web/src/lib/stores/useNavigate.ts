import { goto } from '$app/navigation';
import { Writable, writable, derived } from 'svelte/store';

export enum PageType {
    CREATE = 'CREATE',
    SELECT = 'SELECT'
}

export const history: Writable<{ url: URL, name: string, type: PageType | undefined }[]> = writable([]);

export function urlName(url: URL, name: string, type?: PageType | undefined) {
    const pathname = url.pathname.split("/").splice(2).join("/");
    history.update(($history) => {
        if ($history.length === 0) {
            return [{ url, name, type }];
        } else if ($history.map(page => page.url.pathname.split("/").splice(2).join("/")).includes(pathname)) {
            $history[$history.map(page => page.url.pathname.split("/").splice(2).join("/")).indexOf(pathname)] = { url, name, type };
            return $history;
        } else {
            $history.push({ url, name, type });
            return $history;
        }
    });
};

export const canBack = derived(
    history,
    ($history) => $history.length > 1
);

export function ot(params?: Record<string, string | undefined>) {
    history.update($history => {
        $history.pop();
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
            goto(backPage.url);
        }
        return [...$history];
    });
}

export function to(url: string | URL, params?: Record<string, string | undefined>) {
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
        const pathname = toUrl.pathname.split("/").splice(2).join("/");
        if ($history.map(page => page.url.pathname.split("/").splice(2).join("/")).includes(pathname)) {
            return $history.splice(0, $history.map(page => page.url.pathname.split("/").splice(2).join("/")).indexOf(pathname) + 1);
        }
        return $history;
    });
    goto(toUrl);
}

export function init(url: string | URL, params?: Record<string, string | undefined>) {
    history.set([]);
    to(url, params);
}