import { writable, derived } from 'svelte/store';
import type { Writable, Readable, Subscriber, Unsubscriber, Updater } from 'svelte/store';
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
    update: (this: void, updater: Updater<Record<string, string[]>>) => void;
    updatePermissions: (...permissions: string[]) => void;
    fetchPermissions: (...authTypes: string[]) => Promise<void>;
    auth: (...authPermissions: string[]) => boolean;
}

export function createPermissions(options: {
    getTypePermissionList: (types: string[]) => Promise<(string | null)[]>;
    queryTypeName?: string | undefined;
    mutationTypeName?: string | undefined;
    subscriptionTypeName?: string | undefined;
}): PermissionsStore {
    let $jwt: JsonWebToken | undefined = undefined;
    jwt.subscribe((value) => $jwt = value);
    const permissions: Writable<Record<string, string[]>> = writable({});
    let $permissions: Record<string, string[]> = {};
    permissions.subscribe(value => $permissions = value)
    const { subscribe, set, update } = permissions;

    return {
        subscribe,
        set,
        update,
        updatePermissions: (...permissions: string[]) =>
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
            if ($jwt && !$jwt?.is_root) {
                const types = [
                    options.queryTypeName || 'Query',
                    options.mutationTypeName || 'Mutation',
                    options.subscriptionTypeName || 'Subscription',
                    ...authTypes
                ].filter(type => !Object.keys($permissions).includes(type));
                if (types.length > 0) {
                    const typePermissionList = await options.getTypePermissionList(types);
                    permissions.update(($permissions) =>
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
        auth: (...authPermissions: string[]) =>
            $jwt?.is_root || authPermissions.map(authPermission => authPermission.split("::"))
                .map(authParts => {
                    const authType = authParts[0];
                    const authField = authParts[1];
                    const authPermissionType = authParts[2];
                    if (authField === '*' && authPermissionType === '*') {
                        return $jwt?.permission_types?.includes('ANY') ||
                            $jwt?.permission_types?.includes(authType);
                    } else if (authPermissionType === '*') {
                        return $jwt?.permission_types?.includes('ANY') ||
                            ($permissions[authType] || []).map(permissions => permissions.split("::"))
                                .some(parts => parts[1] === 'ANY' || authField === parts[1])
                    } else {
                        return ($permissions['ANY'] || []).map(permissions => permissions.split("::"))
                            .some(parts => parts[2] === 'ANY' || authPermissionType === parts[2]) ||
                            ($permissions[authType] || []).map(permissions => permissions.split("::"))
                                .some(parts =>
                                    (parts[1] === 'ANY' || authField === parts[1]) &&
                                    (parts[2] === 'ANY' || authPermissionType === parts[2])
                                )
                    }
                })
                .reduce((pre, cur) => pre && cur, true) || false
    };
}