import { redirect, type LoadEvent } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { Directive, Field, GraphQLError } from '@graphace/graphql';
import type { OperationStore } from '@graphace/ui-graphql';
import { createQueryStore as createQuery, createMutationStore as createMutation } from '@graphace/ui-graphql';
import { env } from '$env/dynamic/public';

const authInterceptor = <T>(event: LoadEvent, response: { data?: Record<string, T | null> | undefined, errors?: GraphQLError[] | null | undefined }): void => {
    if (response.errors) {
        if (response.errors?.map(error => error.extensions).some(extensions => extensions?.code == -40100)) {
            const [, lang] = event.url.pathname.split('/');
            let loginPathName = `/${lang}/login`;
            const search = window.location.search;
            const urlSearchParams = new URLSearchParams(search);
            if (urlSearchParams.has('from')) {
                loginPathName += '?from=' + urlSearchParams.get('from');
            } else if (window.location.pathname !== loginPathName) {
                loginPathName += '?from=' + window.location.pathname;
            }
            if (browser) {
                goto(loginPathName);
            } else {
                throw redirect(307, loginPathName);
            }
        }
    }
}

export async function createQueryStore<T>(event: LoadEvent, params: { fields: Field[], name?: string | undefined, directives?: Directive[] }): Promise<OperationStore<T>> {
    const queryStore = await createQuery<T>(event, browser ? '/graphql' : env.PUBLIC_GRAPHQL_URL, params);
    const { subscribe, fetch } = queryStore;

    queryStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return {
        subscribe,
        fetch
    };
}

export async function createMutationStore<T>(event: LoadEvent): Promise<OperationStore<T>> {
    const mutationStore = await createMutation<T>(event, browser ? '/graphql' : env.PUBLIC_GRAPHQL_URL);
    const { subscribe, fetch } = mutationStore;

    mutationStore.subscribe(data => {
        authInterceptor(event, data.response);
    })

    return {
        subscribe,
        fetch
    };
}