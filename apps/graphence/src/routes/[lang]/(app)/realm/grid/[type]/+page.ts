import type { LoadEvent } from '@sveltejs/kit';
import { createConnectionField } from '@graphace/graphql';
import { createQueryStore, createMutationStore } from '~/utils';
import type { LayoutLoad } from '$types';
import type { Realm, RealmConnection } from '~/lib/types/schema';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Realm');
    const fields = JSON.parse(event.url.searchParams.get('fields') || '[]');
    const queryArguments = JSON.parse(event.url.searchParams.get('queryArguments') || '{}');
    const showHeader = !event.url.searchParams.has('hideHeader');
    const showFooter = !event.url.searchParams.has('hideFooter');
    const showOptionButton = !event.url.searchParams.has('hideOptionButton');
    const showFilterButton = !event.url.searchParams.has('hideFilterButton');
    const showBookmarkButton = event.url.searchParams.has('showBookmarkButton');
    return {
        type: event.params.type,
        fields,
        queryArguments,
        showHeader,
        showFooter,
        showOptionButton,
        showFilterButton,
        showBookmarkButton,
        RealmConnectionQuery: (await createQueryStore<RealmConnection>(event, { fields: [createConnectionField({ name: 'realmConnection', fields })] })),
        RealmListMutation: (await createMutationStore<Realm[]>(event))
    };
}
export const prerender = false;
export const ssr = false;