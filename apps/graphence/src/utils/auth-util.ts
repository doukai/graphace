import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type PermissionsStore, createPermissions as _createPermissions } from '@graphace/commons';
import { createQuery_currentPermissionNameListByTypes_Store } from '~/lib/stores/query/query_currentPermissionNameListByTypes_store';
import { env } from '$env/dynamic/public';

export function createPermissions(event: LoadEvent | RequestEvent): PermissionsStore {
    const query_currentPermissionNameListByTypes_Store = createQuery_currentPermissionNameListByTypes_Store(event);
    return _createPermissions(
        async (types: string[]) => {
            const response = await query_currentPermissionNameListByTypes_Store.fetch({ types });
            return response.data?.currentPermissionNameListByTypes || [];
        },
        env.PUBLIC_QUERY_TYPE_NAME,
        env.PUBLIC_MUTATION_TYPE_NAME,
        env.PUBLIC_SUBSCRIPTION_TYPE_NAME
    );
}

let _permissionsStore: PermissionsStore;

export function setPermissionsStore(permissionsStore: PermissionsStore) {
    _permissionsStore = permissionsStore;
}

export function getPermissionsStore(event: LoadEvent | RequestEvent): PermissionsStore {
    if (!_permissionsStore) {
        _permissionsStore = createPermissions(event);
    }
    return _permissionsStore;
}
