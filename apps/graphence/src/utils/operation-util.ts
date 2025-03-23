import { redirect, type LoadEvent, type RequestEvent } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { Directive, Field, GraphQLError } from '@graphace/graphql';
import type { GraphQLStore, OperationStore, StructQueryStores } from '@graphace/ui-graphql';
import {
    createQueryStore as _createQueryStore,
    fetchQueryStore as _fetchQueryStore,
    createMutationStore as _createMutationStore,
    createGraphQLQueryStore as _createGraphQLQueryStore,
    fetchGraphQLQueryStore as _fetchGraphQLQueryStore,
    createGraphQLMutationStore as _createGraphQLMutationStore,
    createStructQueryStores as _createStructQueryStores
} from '@graphace/ui-graphql';

const getUrl = (event: LoadEvent | RequestEvent) => {
    return browser ? '/graphql' : `${event.url.origin}/graphql`;
}

const authInterceptor = <T>(event: LoadEvent | RequestEvent, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined }): void => {
    if (response.errors) {
        if (response.errors?.map(error => error.extensions).some(extensions => extensions?.code == -40100)) {
            const [, lang] = event.url.pathname.split('/');
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
        }
    }
}

export function createQueryStore<T>(event: LoadEvent | RequestEvent): OperationStore<T> {
    const queryStore = _createQueryStore<T>(event, getUrl(event));
    const { subscribe, fetch } = queryStore;

    queryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return {
        subscribe,
        fetch
    };
}

export async function fetchQueryStore<T>(event: LoadEvent | RequestEvent, params: { fields: Field[], name?: string | undefined, directives?: Directive[] | undefined }): Promise<OperationStore<T>> {
    const queryStore = await _fetchQueryStore<T>(event, getUrl(event), params);
    const { subscribe, fetch } = queryStore;

    queryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return {
        subscribe,
        fetch
    };
}

export function createMutationStore<T>(event: LoadEvent | RequestEvent): OperationStore<T> {
    const mutationStore = _createMutationStore<T>(event, getUrl(event));
    const { subscribe, fetch } = mutationStore;

    mutationStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return {
        subscribe,
        fetch
    };
}

export function createGraphQLQueryStore<T, V>(query: string, event: LoadEvent | RequestEvent): GraphQLStore<T, V> {
    const graphQLQueryStore = _createGraphQLQueryStore<T, V>(event, getUrl(event), query);
    const { subscribe, fetch } = graphQLQueryStore;

    graphQLQueryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return {
        subscribe,
        fetch
    };
}

export async function fetchGraphQLQueryStore<T, V>(query: string, event: LoadEvent | RequestEvent, variables?: V | undefined): Promise<GraphQLStore<T, V>> {
    const graphQLQueryStore = await _fetchGraphQLQueryStore<T, V>(event, browser ? '/graphql' : `${event.url.origin}/graphql`, query, variables);
    const { subscribe, fetch } = graphQLQueryStore;

    graphQLQueryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return {
        subscribe,
        fetch
    };
}

export function createGraphQLMutationStore<T, V>(query: string, event: LoadEvent | RequestEvent): GraphQLStore<T, V> {
    const graphQLQueryStore = _createGraphQLMutationStore<T, V>(event, getUrl(event), query);
    const { subscribe, fetch } = graphQLQueryStore;

    graphQLQueryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return {
        subscribe,
        fetch
    };
}

export function createStructQueryStores(event: LoadEvent | RequestEvent): StructQueryStores {
    const structQueryStore = _createStructQueryStores(event, getUrl(event));
    const { namedQueryStore, treeQueryStore } = structQueryStore;

    namedQueryStore.subscribe(data => {
        authInterceptor(event, data.response);
    });

    treeQueryStore.subscribe(data => {
        authInterceptor(event, data.response);
    });

    return structQueryStore;
}