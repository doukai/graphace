import type { LoadEvent } from '@sveltejs/kit';
import type { LayoutLoad } from '$types';
import { permissions } from '~/utils/auth-util';

export const load: LayoutLoad = async ({ url }: LoadEvent) => {
    await permissions.getTypes('User');
    return {
        selectColumns: JSON.parse(url.searchParams.get('selectColumns') || '[]'),
        queryArguments: JSON.parse(url.searchParams.get('queryArguments') || '{}'),
    };
}