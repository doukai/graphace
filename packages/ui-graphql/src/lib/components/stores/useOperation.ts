import { redirect, type LoadEvent } from '@sveltejs/kit';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { type GraphQLError, Operation, Field, Directive } from '@graphace/graphql';

const responseInterceptor = (event: LoadEvent, response: Response): boolean => {
    const [, lang] = event.url.pathname.split('/');
    if (response.status === 401) {
        let loginPathName = `/${lang}/login`;
        const search = event.url.search;
        const urlSearchParams = new URLSearchParams(search);
        if (urlSearchParams.has('from')) {
            loginPathName += '?from=' + urlSearchParams.get('from');
        } else if (event.url.pathname !== loginPathName) {
            loginPathName += '?from=' + event.url.pathname;
        }
        if (browser) {
            goto(loginPathName);
        } else {
            throw redirect(307, loginPathName);
        }
    } else if (!response.ok) {
        let errorPathName = `/${lang}/error/${response.status}`;
        if (browser) {
            goto(errorPathName);
        } else {
            throw redirect(307, errorPathName);
        }
    } else {
        return true;
    }
}

export async function createQueryStore<T>(event: LoadEvent, params: { fields: Field[], name?: string | undefined, directives?: Directive[] }): Promise<OperationStore<T>> {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (params: { fields: Field[], name?: string | undefined, directives?: Directive[] }) => {
        if (params.fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = new Operation({ operationType: 'query', ...params });

            const response = await event.fetch('/graphql', {
                method: 'POST',
                body: JSON.stringify({
                    query: query.toString()
                })
            });

            if (responseInterceptor(event, response)) {
                const json = await response.json();
                set({
                    isFetching: false,
                    response: json
                });
                return json;
            }
        }
    }

    await fetch(params);

    return {
        subscribe,
        fetch
    };
}

export async function createMutationStore<T>(event: LoadEvent): Promise<OperationStore<T>> {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (params: { fields: Field[], name?: string | undefined, directives?: Directive[] }) => {
        if (params.fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = new Operation({ operationType: 'mutation', ...params });

            const response = await event.fetch('/graphql', {
                method: 'POST',
                body: JSON.stringify({
                    query: query.toString()
                })
            });

            if (responseInterceptor(event, response)) {
                const json = await response.json();
                set({
                    isFetching: false,
                    response: json
                });
                return json;
            }
        }
    }

    return {
        subscribe,
        fetch
    };
}

export type OperationStore<T> = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (params: { fields: Field[], name?: string | undefined, directives?: Directive[] }) => Promise<{ data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined }>;
}