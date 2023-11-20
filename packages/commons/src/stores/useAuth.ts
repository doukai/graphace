import { type Writable, type Readable, writable, derived, get } from 'svelte/store';
import type { JsonWebToken } from '~/types';

export const typePermissionRecord: Writable<Record<string, string[]>> = writable({});

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

export function createAuth(getTypePermissionList: (types: string[]) => Promise<string[]>) {
    const typePermissionRecord: Writable<Record<string, string[]>> = writable({})
    const { subscribe, update } = typePermissionRecord;

    return {
        subscribe,
        auth: (...authPermissions: string[]) => {
            const types = authPermissions.map(authPermission => authPermission.split("::"))
                .filter(authParts => authParts[1] === '*' || authParts[2] === '*')
                .map(authParts => authParts[0]);
            if (types.length > 0) {
                getTypePermissionList(types)
                    .then(permissionNames =>
                        update(($typePermissionRecord) => ({
                            ...permissionNames.reduce((pre, cur) => {
                                const type = cur.split("::")[0];
                                if (pre[type]) {
                                    pre[type] = [...pre[type], cur]
                                } else {
                                    pre[type] = [cur]
                                }
                                return pre;
                            }, $typePermissionRecord)
                        }))
                    );
            }
        }
    };
}

// export function auth(getTypePermissionList: (type: string) => string[], ...authPermissions: string[]): boolean {
//     const $jwt = get(jwt);
//     return $jwt?.is_root || authPermissions.map(authPermission => authPermission.split("::"))
//         .map(authParts => {
//             const authType = authParts[0];
//             if (authParts[1] === '*' && authParts[2] === '*') {
//                 return $jwt?.permission_types?.includes(authType);
//             } else {
//                 if (!typePermissionRecord[authType]) {
//                     typePermissionRecord[authType] = getTypePermissionList(authType) || [];
//                 }
//                 return typePermissionRecord[authType].map(permissions => permissions.split("::"))
//                     .some(parts =>
//                         (authParts[0] === '*' || authParts[0] === parts[0]) &&
//                         (authParts[1] === '*' || authParts[1] === parts[1]) &&
//                         (authParts[2] === '*' || authParts[2] === parts[2])
//                     )
//             }
//         })
//         .reduce((pre, cur) => pre && cur, true) || false;
// }