import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString, type GraphQLError } from '@graphace/graphql';
import type { RoleConnection, RoleConnectionQueryArguments } from '~/lib/types/schema';

export async function createRoleConnectionQueryStore(params: { event: LoadEvent, fields: Field[], queryArguments: RoleConnectionQueryArguments }): Promise<RoleConnectionQueryStore> {
    const data: Writable<{ isFetching: boolean, response: { data?: { roleConnection: RoleConnection | null | undefined }, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { event, fields, queryArguments } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], queryArguments: RoleConnectionQueryArguments) => {
        if (fields && fields.length > 0 || queryArguments.groupBy && queryArguments.groupBy.length > 0) {
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
                set({
                    isFetching: false,
                    response: json
                });
                return json;
            }
        }
    }

    await fetch(fields, queryArguments);

    return {
        subscribe,
        fetch
    };
}

export type RoleConnectionQueryStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: { roleConnection: RoleConnection | null | undefined }, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: { roleConnection: RoleConnection | null | undefined }, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], queryArguments: RoleConnectionQueryArguments) => Promise<void>;
}