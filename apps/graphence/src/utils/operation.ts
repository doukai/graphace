import { type LoadEvent, type RequestEvent } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { Directive, Field, GraphQLError } from '@graphace/graphql';
import type { GraphQLStore, OperationStore, NamedQueryStore, TreeQueryStore } from '@graphace/ui-graphql';
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
            }
        }
    }
}

export function createQueryStore<T>(event: LoadEvent | RequestEvent): OperationStore<T> {
    const queryStore = _createQueryStore<T>(event, getUrl(event));

    queryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return queryStore;
}

export async function fetchQueryStore<T>(event: LoadEvent | RequestEvent, params: { fields: Field[], name?: string | undefined, directives?: Directive[] | undefined }): Promise<OperationStore<T>> {
    const queryStore = await _fetchQueryStore<T>(event, getUrl(event), params);

    queryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return queryStore;
}

export function createMutationStore<T>(event: LoadEvent | RequestEvent): OperationStore<T> {
    const mutationStore = _createMutationStore<T>(event, getUrl(event));

    mutationStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return mutationStore;
}

export function createGraphQLQueryStore<T, V>(query: string, event: LoadEvent | RequestEvent): GraphQLStore<T, V> {
    const graphQLQueryStore = _createGraphQLQueryStore<T, V>(event, getUrl(event), query);

    graphQLQueryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return graphQLQueryStore;
}

export async function fetchGraphQLQueryStore<T, V>(query: string, event: LoadEvent | RequestEvent, variables?: V | undefined): Promise<GraphQLStore<T, V>> {
    const graphQLQueryStore = await _fetchGraphQLQueryStore<T, V>(event, getUrl(event), query, variables);

    graphQLQueryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return graphQLQueryStore;
}

export function createGraphQLMutationStore<T, V>(query: string, event: LoadEvent | RequestEvent): GraphQLStore<T, V> {
    const graphQLQueryStore = _createGraphQLMutationStore<T, V>(event, getUrl(event), query);

    graphQLQueryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return graphQLQueryStore;
}

export let namedQueryStore: NamedQueryStore;
export let treeQueryStore: TreeQueryStore;

export const createStructQueryStores = (event: LoadEvent | RequestEvent) => {
    if (!namedQueryStore || !treeQueryStore) {
        const structQueryStores = _createStructQueryStores(event, getUrl(event))
        namedQueryStore = structQueryStores.namedQueryStore;
        namedQueryStore.subscribe(data => {
            authInterceptor(event, data.response);
        });
        treeQueryStore = structQueryStores.treeQueryStore;
        treeQueryStore.subscribe(data => {
            authInterceptor(event, data.response);
        });
    }
}