import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { type GraphQLError, Operation, Field, Directive, type NamedStruct, type TreeStruct, type QueryTreeStructArgs, type QueryNamedStructArgs } from '@graphace/graphql';

export function createQueryStore<T>(event: LoadEvent | RequestEvent, url: string | URL): OperationStore<T> {
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

    return {
        subscribe,
        fetch
    };
}

export async function fetchQueryStore<T>(event: LoadEvent | RequestEvent, url: string | URL, params: { fields: Field[], name?: string | undefined, directives?: Directive[] | undefined }): Promise<OperationStore<T>> {
    const queryStore = createQueryStore<T>(event, url);
    await queryStore.fetch(params);
    return queryStore;
}

export function createGraphQLQueryStore<T, V>(event: LoadEvent | RequestEvent, url: string | URL, query: string): GraphQLStore<T, V> {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (variables: V) => {
        update((data) => ({ ...data, isFetching: true }));

        const response = await event.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        });

        const json = await response.json();
        set({
            isFetching: false,
            response: json
        });
        return json;
    }

    return {
        subscribe,
        fetch
    };
}

export async function fetchGraphQLQueryStore<T, V>(event: LoadEvent | RequestEvent, url: string | URL, query: string, variables?: V | undefined): Promise<GraphQLStore<T, V>> {
    const graphQLQueryStore = createGraphQLQueryStore<T, V>(event, url, query);
    await graphQLQueryStore.fetch(variables);
    return graphQLQueryStore;
}

export function createMutationStore<T>(event: LoadEvent | RequestEvent, url: string | URL): OperationStore<T> {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (params: { fields: Field[], name?: string | undefined, directives?: Directive[] | undefined }) => {
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

export function createGraphQLMutationStore<T, V>(event: LoadEvent | RequestEvent, url: string | URL, query: string): GraphQLStore<T, V> {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (variables: V) => {
        update((data) => ({ ...data, isFetching: true }));

        const response = await event.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        });

        const json = await response.json();
        set({
            isFetching: false,
            response: json
        });
        return json;
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
    fetch: (params: { fields: Field[], name?: string | undefined, directives?: Directive[] | undefined }) => Promise<{ data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined }>;
}

export type GraphQLStore<T, V> = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (variables?: V | undefined) => Promise<{ data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined }>;
}

export function createNamedQueryStore(event: LoadEvent | RequestEvent, url: string | URL): NamedQueryStore {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, NamedStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (query: { fieldName: string, idName: string }, variables?: QueryNamedStructArgs | undefined) => {
        const graphql = /* GraphQL */ `query ${query.fieldName}NamedQuery($name: StringExpression, $first: Int) {
	${query.fieldName}(name: $name, first: $first) {
		${query.idName}
		name
		description
	}
}`;
        update((data) => ({ ...data, isFetching: true }));

        const response = await event.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: graphql,
                variables: variables
            })
        });

        const json = await response.json();
        set({
            isFetching: false,
            response: json
        });
        return json;
    }

    return {
        subscribe,
        fetch
    };
}

export type NamedQueryStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: Record<string, NamedStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: Record<string, NamedStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (query: { fieldName: string, idName: string }, variables?: QueryNamedStructArgs | undefined) => Promise<{ data?: Record<string, NamedStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined }>;
}

export function createTreeQueryStore(event: LoadEvent | RequestEvent, url: string | URL): TreeQueryStore {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<string, TreeStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (query: { fieldName: string, idName: string }, variables?: QueryTreeStructArgs | undefined) => {
        const graphql = /* GraphQL */ `query ${query.fieldName}TreeQuery($deep: IntExpression) {
	${query.fieldName}(deep: $deep) {
		${query.idName}
		name
		path
		deep
		parentId
	}
}`;
        update((data) => ({ ...data, isFetching: true }));

        const response = await event.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: graphql,
                variables: variables
            })
        });

        const json = await response.json();
        set({
            isFetching: false,
            response: json
        });
        return json;
    }

    return {
        subscribe,
        fetch
    };
}

export type TreeQueryStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: Record<string, TreeStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: Record<string, TreeStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (query: { fieldName: string, idName: string }, variables?: QueryTreeStructArgs | undefined) => Promise<{ data?: Record<string, TreeStruct[] | null> | undefined, errors?: GraphQLError[] | null | undefined }>;
}

export function createStructQueryStores(event: LoadEvent | RequestEvent, url: string | URL): StructQueryStores {
    return {
        namedQueryStore: createNamedQueryStore(event, url),
        treeQueryStore: createTreeQueryStore(event, url)
    }
};

export type StructQueryStores = {
    namedQueryStore: NamedQueryStore,
    treeQueryStore: TreeQueryStore
}