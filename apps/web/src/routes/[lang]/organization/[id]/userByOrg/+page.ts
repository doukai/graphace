import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { load_Query_organization_userByOrg } from '$houdini';

export const load: LayoutLoad = async (event: LoadEvent) => {
    return {
        ...(await load_Query_organization_userByOrg({ event, variables: { organization_id: { val: event.params.id } } }))
    };
}