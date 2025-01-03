import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { createPermissionConnectionQueryStore } from '~/lib/stores/permission/permissionQueryStore';
import { createPermissionListMutationStore } from '~/lib/stores/permission/permissionMutationStore';
import { permissions } from '~/utils';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Permission', 'Role', 'Realm');
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
        PermissionConnectionQuery: (await createPermissionConnectionQueryStore({ event, fields, queryArguments })),
        PermissionListMutation: (await createPermissionListMutationStore({ event }))
    };
}
export const prerender = false;
export const ssr = false;