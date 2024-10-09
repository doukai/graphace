import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { createUserQueryStore } from '~/lib/stores/user/userQueryStore';
import { createUserMutationStore } from '~/lib/stores/user/userMutationStore';
import { permissions } from '~/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('User', 'File', 'Group', 'Role', 'Realm');
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
        UserQuery: (await createUserQueryStore({ event, fields, queryArguments })),
        UserMutation: (await createUserMutationStore({ event }))
    };
}
export const prerender = false;
export const ssr = false;