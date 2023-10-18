import { type Writable, type Readable, writable, derived, get } from 'svelte/store';
import type { JsonWebToken } from '~/types';

export const jwt: Writable<JsonWebToken | undefined> = writable(undefined);

export const permissions: Readable<string[] | undefined> = derived(
    jwt,
    ($jwt) => $jwt?.permissions
);

export const roles: Readable<string[] | undefined> = derived(
    jwt,
    ($jwt) => $jwt?.roles
);

export const isRoot: Readable<boolean | undefined> = derived(
    jwt,
    ($jwt) => $jwt?.is_root
);

export function auth(...authPermissions: string[]): boolean {
    const $jwt = get(jwt);
    return $jwt?.is_root || authPermissions.map(authPermission => authPermission.split("::"))
        .map(authParts =>
            $jwt?.permissions?.map(permissions => permissions.split("::"))
                .some(parts =>
                    (authParts[0] === '*' || authParts[0] === parts[0]) &&
                    (authParts[1] === '*' || authParts[1] === parts[1]) &&
                    (authParts[2] === '*' || authParts[2] === parts[2])
                )
        )
        .reduce((pre, cur) => pre && cur, true) || false;
}