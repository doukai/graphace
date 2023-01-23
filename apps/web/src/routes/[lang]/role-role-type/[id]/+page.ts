import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '.svelte-kit/types/src/routes/$types';
import { load_QueryRoleRoleType } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        ...(await load_QueryRoleRoleType({ event, variables: { id: { val: event.params.id } } }))
    };
}