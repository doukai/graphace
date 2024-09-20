import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import type { RoleConnection, RoleConnectionQueryArguments } from '~/lib/types/schema';

export async function createRoleAggStore(params: { event: LoadEvent, fields: Field[], queryArguments: RoleConnectionQueryArguments }): Promise<RoleAggStore> {
    const data: Writable<{ isFetching: boolean, connection: RoleConnection }> = writable({
        isFetching: false,
        connection: {}
    });

    const { event, fields, queryArguments } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], queryArguments: RoleConnectionQueryArguments) => {
        if (fields && fields.length > 0 && queryArguments.groupBy && queryArguments.groupBy.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `query Query_roleConnection($id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $orderBy: RoleOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RoleExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    roleConnection(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation permissionRoleRelation: $permissionRoleRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
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
                        connection: json.data.roleConnection
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

export type RoleAggStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        connection: RoleConnection;
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        connection: RoleConnection;
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], queryArguments: RoleConnectionQueryArguments) => Promise<void>;
}