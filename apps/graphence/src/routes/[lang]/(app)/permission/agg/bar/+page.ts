import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { createPermissionAggStore } from '~/lib/stores/permission/permissionAggStore';
import { permissions } from '~/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Permission');
    const selectColumns = JSON.parse(event.url.searchParams.get('selectColumns') || '[]');
    const queryArguments = JSON.parse(event.url.searchParams.get('queryArguments') || '{}');
    const showHeader = !event.url.searchParams.has('hideHeader');
    const showFooter = !event.url.searchParams.has('hideFooter');
    const showOptionButton = !event.url.searchParams.has('hideOptionButton');
    const showFilterButton = !event.url.searchParams.has('hideFilterButton');
    const showBookmarkButton = event.url.searchParams.has('showBookmarkButton');
    return {
        selectColumns,
        queryArguments,
        showHeader,
        showFooter,
        showOptionButton,
        showFilterButton,
        showBookmarkButton,
        PermissionAgg: (await createPermissionAggStore({ event, selectColumns, queryArguments }))
    };
}