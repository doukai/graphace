import { writable, derived, get } from 'svelte/store';
import type { Writable, Readable, Subscriber, Unsubscriber, Updater } from 'svelte/store';
import type { JsonWebToken } from '~/types';

export const jwt: Writable<JsonWebToken | undefined> = writable(undefined);

export const permission_types: Readable<string[] | undefined> = derived(
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
    update: (this: void, updater: Updater<Record<string, string[]>>) => void;
    set: (typePermissionList: (string | null)[]) => void;
    getTypes: (...authTypes: string[]) => Promise<void>;
    auth: (...authPermissions: string[]) => boolean;
}

export function createPermissions(
    getTypePermissionList: (types: string[]) => Promise<(string | null)[]>,
    queryTypeName: string | undefined,
    mutationTypeName: string | undefined,
    subscriptionTypeName: string | undefined
): PermissionsStore {
    const typePermissionRecord: Writable<Record<string, string[]>> = writable({});
    const { subscribe, set, update } = typePermissionRecord;

    return {
        subscribe,
        update,
        set: (typePermissionList: (string | null)[]) => {
            const $typePermissionRecord = get(typePermissionRecord);
            set(
                typePermissionList.reduce((pre, cur) => {
                    if (cur) {
                        const type = cur.split("::")[0];
                        if (pre[type]) {
                            pre[type] = [...pre[type], cur]
                        } else {
                            pre[type] = [cur]
                        }
                    }
                    return pre;
                }, $typePermissionRecord)
            )
        },
        getTypes: async (...authTypes: string[]) => {
            const $jwt = get(jwt);
            if ($jwt && !$jwt?.is_root) {
                const $typePermissionRecord = get(typePermissionRecord);
                const types = [
                    queryTypeName || 'Query',
                    mutationTypeName || 'Mutation',
                    subscriptionTypeName || 'Subscription',
                    ...authTypes
                ].filter(type => !Object.keys($typePermissionRecord).includes(type));
                if (types.length > 0) {
                    const typePermissionList = await getTypePermissionList(types);
                    set(
                        typePermissionList.reduce((pre, cur) => {
                            if (cur) {
                                const type = cur.split("::")[0];
                                if (pre[type]) {
                                    pre[type] = [...pre[type], cur]
                                } else {
                                    pre[type] = [cur]
                                }
                            }
                            return pre;
                        }, { ...$typePermissionRecord, ...Object.fromEntries(types.map(type => [type, []])) })
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
                        const $typePermissionRecord = get(typePermissionRecord);
                        return $jwt?.permission_types?.includes('ANY') ||
                            ($typePermissionRecord[authType] || []).map(permissions => permissions.split("::"))
                                .some(parts => parts[1] === 'ANY' || authField === parts[1])
                    } else {
                        const $typePermissionRecord = get(typePermissionRecord);
                        return ($typePermissionRecord['ANY'] || []).map(permissions => permissions.split("::"))
                            .some(parts => parts[2] === 'ANY' || authPermissionType === parts[2]) ||
                            ($typePermissionRecord[authType] || []).map(permissions => permissions.split("::"))
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