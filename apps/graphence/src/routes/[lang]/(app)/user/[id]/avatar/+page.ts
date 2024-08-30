import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { type Errors, getNode, getErrors } from '@graphace/commons';
import { load_Query_user_avatar } from '$houdini';
import type { MutationFileArgs } from '~/lib/types/schema';
import { permissions } from '~/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('File');
    const node: MutationFileArgs = getNode(event.url) || {};
	const errors: Record<string, Errors> = getErrors(event.url) || {};
    return {
        node,
        errors,
        ...(await load_Query_user_avatar({ event, variables: { user_id: { val: event.params.id } } }))
    };
}