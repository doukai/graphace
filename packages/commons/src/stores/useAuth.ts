import { type Writable, writable, derived, type Readable } from 'svelte/store';
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

let $permissions: string[] = [];
permissions.subscribe(permissions => $permissions = permissions || []);

export function auth(...authPermissions: string[]): boolean {
    return authPermissions.map(authPermission => authPermission.split("::"))
        .map(authParts =>
            $permissions?.map(permissions => permissions.split("::"))
                .some(parts =>
                    (authParts[0] === '*' || authParts[0] === parts[0]) &&
                    (authParts[1] === '*' || authParts[1] === parts[1]) &&
                    (authParts[2] === '*' || authParts[2] === parts[2])
                )
        )
        .reduce((pre, cur) => pre && cur, true);
}