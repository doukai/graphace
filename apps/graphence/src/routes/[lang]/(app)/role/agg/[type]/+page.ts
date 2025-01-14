import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { createRoleConnectionQueryStore } from '~/lib/stores/role/roleQueryStore';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Role', 'User', 'Group', 'Permission', 'Realm');
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
        RoleConnectionQuery: (await createRoleConnectionQueryStore({ event, fields, queryArguments }))
    };
}