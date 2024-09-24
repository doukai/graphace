import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import type { GroupConnection, GroupConnectionQueryArguments } from '~/lib/types/schema';

export async function createGroupAggStore(params: { event: LoadEvent, fields: Field[], queryArguments: GroupConnectionQueryArguments }): Promise<GroupAggStore> {
    const data: Writable<{ isFetching: boolean, connection: GroupConnection }> = writable({
        isFetching: false,
        connection: {}
    });

    const { event, fields, queryArguments } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], queryArguments: GroupConnectionQueryArguments) => {
        if (fields && fields.length > 0 && queryArguments.groupBy && queryArguments.groupBy.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `query Query_groupConnection($id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupUserRelation: GroupUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $orderBy: GroupOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [GroupExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    groupConnection(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
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
                        connection: json.data.groupConnection
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

export type GroupAggStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        connection: GroupConnection;
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        connection: GroupConnection;
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], queryArguments: GroupConnectionQueryArguments) => Promise<void>;
}