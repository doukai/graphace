import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { permissions } from '~/utils/auth-util';
import { createUserAggStore } from '~/lib/stores/userAggStore';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('User');
    const selectColumns = JSON.parse(event.url.searchParams.get('selectColumns') || '[]');
    const queryArguments = JSON.parse(event.url.searchParams.get('queryArguments') || '{}');
    return {
        selectColumns,
        queryArguments,
        UserAgg: (await createUserAggStore({ event, selectColumns, queryArguments }))
    };
}