import type { __TypeListQueryArguments, __TypeQueryArguments, GraphQLError } from '@graphace/graphql';
import { __Type } from '@graphace/graphql';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Event } from '.';

export function create__TypeListQueryStore(event: Event, url: string | URL): __TypeListQueryStore {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<'__typeList', __Type[] | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (variables?: __TypeListQueryArguments & { first?: number | undefined } | undefined) => {
        const graphql = /* GraphQL */ `query __TypeListQuery($name: StringExpression, $kind: __TypeKindExpression, $first: Int) {
    __typeList(name: $name, kind: $kind, first: $first) {
        name
        description
        kind
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
        const __response = { ...json, data: { '__typeList': json.data?.__typeList?.map((__type: any) => new __Type(__type)) } };
        set({
            isFetching: false,
            response: __response
        });
        return __response;
    }

    return {
        subscribe,
        fetch
    };
}

export type __TypeListQueryStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: Record<'__typeList', __Type[] | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: Record<'__typeList', __Type[] | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (variables?: __TypeListQueryArguments & { first?: number | undefined } | undefined) => Promise<{ data?: Record<'__typeList', __Type[] | null> | undefined, errors?: GraphQLError[] | null | undefined }>;
}

export function create__TypeQueryStore(event: Event, url: string | URL): __TypeQueryStore {
    const data: Writable<{ isFetching: boolean, response: { data?: Record<'__type', __Type | null> | undefined, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { subscribe, set, update } = data;

    const fetch = async (variables?: __TypeQueryArguments | undefined) => {
        const graphql = /* GraphQL */ `query __TypeQuery($name: StringExpression, $kind: __TypeKindExpression) {
    __type(name: $name, kind: $kind) {
        fields {
            name
            description
            type
        }
        enumValues {
            name
            description
        }
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
        const __response = { ...json, data: { '__type': new __Type(json.data?.__type) } };
        set({
            isFetching: false,
            response: __response
        });
        return __response;
    }

    return {
        subscribe,
        fetch
    };
}

export type __TypeQueryStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: Record<'__type', __Type | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: Record<'__type', __Type | null> | undefined, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (variables?: __TypeQueryArguments | undefined) => Promise<{ data?: Record<'__type', __Type | null> | undefined, errors?: GraphQLError[] | null | undefined }>;
}