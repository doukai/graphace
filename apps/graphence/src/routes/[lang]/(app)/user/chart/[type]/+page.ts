import type { LoadEvent } from '@sveltejs/kit';
import { createConnectionField } from '@graphace/graphql';
import { fetchQueryStore } from '~/utils';
import type { LayoutLoad } from './$types';
import type { UserConnection } from '~/lib/types/schema';
import { getPermissionsStore } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await getPermissionsStore(event).getTypes('User', 'Group', 'Role', 'Realm');
    const fields = JSON.parse(event.url.searchParams.get('fields') || '[]');
    const queryArguments = JSON.parse(event.url.searchParams.get('queryArguments') || '{}');
    const showHeader = !event.url.searchParams.has('hideHeader');
    const showFooter = !event.url.searchParams.has('hideFooter');
    const showOptionButton = !event.url.searchParams.has('hideOptionButton');
    const showFilterButton = !event.url.searchParams.has('hideFilterButton');
    return {
        type: event.params.type,
        fields,
        queryArguments,
        showHeader,
        showFooter,
        showOptionButton,
        showFilterButton,
        query_userConnection_Store: (await fetchQueryStore<UserConnection>(event, { fields: [createConnectionField({ name: 'userConnection', fields })] }))
    };
}