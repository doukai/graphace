import type { LoadEvent } from '@sveltejs/kit';
import { createConnectionField, createFields } from '@graphace/graphql';
import { fetchQueryStore } from '~/utils';
import type { LayoutLoad } from './$types';
import type { RoleConnection } from '~/lib/types/schema';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.fetchPermissions('Role', 'User', 'Group', 'Permission', 'Realm');
    const fields = event.url.searchParams.has('fields') ? createFields(JSON.parse(event.url.searchParams.get('fields')!)) : undefined;
    const args = event.url.searchParams.has('args') ? JSON.parse(event.url.searchParams.get('args')!) : undefined;
    const showHeader = !event.url.searchParams.has('hideHeader');
    const showFooter = !event.url.searchParams.has('hideFooter');
    const showOptionButton = !event.url.searchParams.has('hideOptionButton');
    const showFilterButton = !event.url.searchParams.has('hideFilterButton');
    return {
        type: event.params.type,
        fields,
        args,
        showHeader,
        showFooter,
        showOptionButton,
        showFilterButton,
        query_roleConnection_Store: (await fetchQueryStore<RoleConnection>(event, { fields: [createConnectionField({ name: 'roleConnection', fields })] }))
    };
}