import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { GraphQLError } from '@graphace/graphql';
import type { GraphQLStore, Event, QueryParams, FetchParams } from '@graphace/ui-graphql';
import {
    createGraphQLQueryStore as _createGraphQLQueryStore,
    fetchGraphQLQueryStore as _fetchGraphQLQueryStore,
    createGraphQLMutationStore as _createGraphQLMutationStore
} from '@graphace/ui-graphql';

const getUrl = (event: Event) => {
    return browser ? '/graphql' : `${event.url.origin}/graphql`;
}

const authInterceptor = <T>(event: Event, response: { data?: T | undefined, errors?: GraphQLError[] | null | undefined }): void => {
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

export function createGraphQLQueryStore<T, V>(query: (params: QueryParams) => string, event: Event): GraphQLStore<T, V> {
    const graphQLQueryStore = _createGraphQLQueryStore<T, V>(event, getUrl(event), query);

    graphQLQueryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return graphQLQueryStore;
}

export async function fetchGraphQLQueryStore<T, V>(query: (params: QueryParams) => string, event: Event, variables?: V | undefined, params?: FetchParams | undefined): Promise<GraphQLStore<T, V>> {
    const graphQLQueryStore = await _fetchGraphQLQueryStore<T, V>(event, getUrl(event), query, variables, params);

    graphQLQueryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return graphQLQueryStore;
}

export function createGraphQLMutationStore<T, V>(query: (params: QueryParams) => string, event: Event): GraphQLStore<T, V> {
    const graphQLQueryStore = _createGraphQLMutationStore<T, V>(event, getUrl(event), query);

    graphQLQueryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return graphQLQueryStore;
}