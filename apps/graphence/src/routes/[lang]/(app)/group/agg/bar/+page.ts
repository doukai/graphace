import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { createGroupAggStore } from '~/lib/stores/group/groupAggStore';
import { permissions } from '~/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Group', 'User', 'Role', 'Realm');
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
        GroupAgg: (await createGroupAggStore({ event, selectColumns, queryArguments }))
    };
}