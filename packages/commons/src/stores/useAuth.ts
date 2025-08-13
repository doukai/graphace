import { writable, derived, get } from 'svelte/store';
import type { Writable, Readable, Subscriber, Unsubscriber } from 'svelte/store';
import type { JsonWebToken } from '~/types';

export const jwt: Writable<JsonWebToken | undefined> = writable(undefined);

export const permissionTypes: Readable<string[] | undefined> = derived(
    jwt,
    ($jwt) => $jwt?.permission_types
);

export const roles: Readable<string[] | undefined> = derived(
    jwt,
    ($jwt) => $jwt?.roles
);

export const isRoot: Readable<boolean | undefined> = derived(
    jwt,
    ($jwt) => $jwt?.is_root
);

export type PermissionsStore = {
    subscribe: (this: void, run: Subscriber<Record<string, string[]>>, invalidate?: ((value?: Record<string, string[]> | undefined) => void) | undefined) => Unsubscriber;
    set: (this: void, value: Record<string, string[]>) => void;
    update: (...permissions: string[]) => void;
    fetchPermissions: (...authTypes: string[]) => Promise<void>;
    auth: (...authPermissions: string[]) => boolean;
}

export function createPermissions(options: {
    getTypePermissionList: (types: string[]) => Promise<(string | null)[]>;
    queryTypeName?: string | undefined;
    mutationTypeName?: string | undefined;
    subscriptionTypeName?: string | undefined;
}): PermissionsStore {
    const permissions: Writable<Record<string, string[]>> = writable({});
    const { subscribe, set, update } = permissions;

    return {
        subscribe,
        set,
        update: (...permissions: string[]) =>
            update(($permissions) => permissions.reduce((permissions, permission) => {
                if (permission) {
                    const type = permission.split("::")[0];
                    if (permissions[type]) {
                        permissions[type] = [...permissions[type], permission]
                    } else {
                        permissions[type] = [permission]
                    }
                }
                return permissions;
            }, $permissions)),
        fetchPermissions: async (...authTypes: string[]) => {
            const $jwt = get(jwt);
            if ($jwt && !$jwt?.is_root) {
                const $permissions = get(permissions);
                const types = [
                    options.queryTypeName || 'Query',
                    options.mutationTypeName || 'Mutation',
                    options.subscriptionTypeName || 'Subscription',
                    ...authTypes
                ].filter(type => !Object.keys($permissions).includes(type));
                if (types.length > 0) {
                    const typePermissionList = await options.getTypePermissionList(types);
                    set(
                        typePermissionList.reduce((permissions, permission) => {
                            if (permission) {
                                const type = permission.split("::")[0];
                                if (permissions[type]) {
                                    permissions[type] = [...permissions[type], permission]
                                } else {
                                    permissions[type] = [permission]
                                }
                            }
                            return permissions;
                        }, { ...$permissions, ...Object.fromEntries(types.map(type => [type, []])) })
                    )
                }
            }
        },
        auth: (...authPermissions: string[]) => {
            const $jwt = get(jwt);
            return $jwt?.is_root || authPermissions.map(authPermission => authPermission.split("::"))
                .map(authParts => {
                    const authType = authParts[0];
                    const authField = authParts[1];
                    const authPermissionType = authParts[2];
                    if (authField === '*' && authPermissionType === '*') {
                        return $jwt?.permission_types?.includes('ANY') ||
                            $jwt?.permission_types?.includes(authType);
                    } else if (authPermissionType === '*') {
                        const $permissions = get(permissions);
                        return $jwt?.permission_types?.includes('ANY') ||
                            ($permissions[authType] || []).map(permissions => permissions.split("::"))
                                .some(parts => parts[1] === 'ANY' || authField === parts[1])
                    } else {
                        const $permissions = get(permissions);
                        return ($permissions['ANY'] || []).map(permissions => permissions.split("::"))
                            .some(parts => parts[2] === 'ANY' || authPermissionType === parts[2]) ||
                            ($permissions[authType] || []).map(permissions => permissions.split("::"))
                                .some(parts =>
                                    (parts[1] === 'ANY' || authField === parts[1]) &&
                                    (parts[2] === 'ANY' || authPermissionType === parts[2])
                                )
                    }
                })
                .reduce((pre, cur) => pre && cur, true) || false;
        }
    };
}