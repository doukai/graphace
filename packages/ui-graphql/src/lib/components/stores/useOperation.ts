import { type LoadEvent } from '@sveltejs/kit';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { type GraphQLError, Operation, Field, Directive } from '@graphace/graphql';

export async function createQueryStore<T>(event: LoadEvent, url: string | URL, params: { fields: Field[], name?: string | undefined, directives?: Directive[] }): Promise<OperationStore<T>> {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (params: { fields: Field[], name?: string | undefined, directives?: Directive[] }) => {
        if (params.fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = new Operation({ operationType: 'query', ...params });

            const response = await event.fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query.toString()
                })
            });

            const json = await response.json();
            set({
                isFetching: false,
                response: json
            });
            return json;
        }
    }

    await fetch(params);

    return {
        subscribe,
        fetch
    };
}

export async function createMutationStore<T>(event: LoadEvent, url: string | URL): Promise<OperationStore<T>> {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (params: { fields: Field[], name?: string | undefined, directives?: Directive[] }) => {
        if (params.fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = new Operation({ operationType: 'mutation', ...params });

            const response = await event.fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: query.toString()
                })
            });

            const json = await response.json();
            set({
                isFetching: false,
                response: json
            });
            return json;
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