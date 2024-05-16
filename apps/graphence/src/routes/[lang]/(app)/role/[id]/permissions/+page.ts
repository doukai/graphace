import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { permissions } from '~/utils/auth-util';

export const load: LayoutLoad = async (event: LoadEvent) => {
    await permissions.getTypes('Permission');
    return {
        id: event.params.id
    };
}