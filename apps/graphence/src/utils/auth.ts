import { type PermissionsStore, createPermissions as _createPermissions } from '@graphace/commons';
import type { Event } from '@graphace/ui-graphql';
import { createQuery_currentPermissionNameListByTypes_Store } from '~/lib/stores/query/query_currentPermissionNameListByTypes_store';
import { env } from '$env/dynamic/public';

export let permissions: PermissionsStore;

export const createPermissions = (event: Event) => {
    if (!permissions) {
        const query_currentPermissionNameListByTypes_Store = createQuery_currentPermissionNameListByTypes_Store(event);
        permissions = _createPermissions({
            getTypePermissionList: async (types: string[]) => {
                const response = await query_currentPermissionNameListByTypes_Store.fetch({ types });
                return response.data?.currentPermissionNameListByTypes || [];
            },
            queryTypeName: env.PUBLIC_QUERY_TYPE_NAME,
            mutationTypeName: env.PUBLIC_MUTATION_TYPE_NAME,
            subscriptionTypeName: env.PUBLIC_SUBSCRIPTION_TYPE_NAME
        });
    }
}
