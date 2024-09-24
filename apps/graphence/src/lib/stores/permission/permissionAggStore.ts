import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import type { PermissionConnection, PermissionConnectionQueryArguments } from '~/lib/types/schema';

export async function createPermissionAggStore(params: { event: LoadEvent, fields: Field[], queryArguments: PermissionConnectionQueryArguments }): Promise<PermissionAggStore> {
    const data: Writable<{ isFetching: boolean, connection: PermissionConnection }> = writable({
        isFetching: false,
        connection: {}
    });

    const { event, fields, queryArguments } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], queryArguments: PermissionConnectionQueryArguments) => {
        if (fields && fields.length > 0 && queryArguments.groupBy && queryArguments.groupBy.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `query Query_permissionConnection($name: StringExpression, $description: StringExpression, $field: StringExpression, $type: StringExpression, $permissionType: PermissionTypeExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $orderBy: PermissionOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [PermissionExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    permissionConnection(name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId permissionRoleRelation: $permissionRoleRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
        totalCount
        edges {
            node {
                ${(queryArguments.groupBy || []).join('\r\n')}
                ${fields.map((field) => fieldToString(field)).join('\r\n')}
            }
        }
    }
}`;

            const response = await event.fetch('/graphql', {
                method: 'POST',
                body: JSON.stringify({
                    query: query,
                    variables: queryArguments
                })
            });

            if (response.ok) {
                const json = await response.json();
                if (queryArguments.groupBy) {
                    set({
                        isFetching: false,
                        connection: json.data.permissionConnection
                    });
                }
            }
        }
    }

    await fetch(fields, queryArguments);

    return {
        subscribe,
        fetch
    };
}

export type PermissionAggStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        connection: PermissionConnection;
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        connection: PermissionConnection;
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], queryArguments: PermissionConnectionQueryArguments) => Promise<void>;
}