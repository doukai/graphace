import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import type { Group, GroupListMutationArguments } from '~/lib/types/schema';

export async function createGroupMutationStore(params: { event: LoadEvent, fields: Field[], mutationArguments: GroupListMutationArguments }): Promise<GroupMutationStore> {
    const data: Writable<{ isFetching: boolean, list: Group[] }> = writable({
        isFetching: false,
        list: []
    });

    const { event, fields, mutationArguments } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], mutationArguments: GroupListMutationArguments) => {
        if (fields && fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `mutation Mutation_groupList($id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupUserRelation: GroupUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $orderBy: GroupOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [GroupExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    groupList(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
        ${fields.map((field) => fieldToString(field)).join('\r\n')}
    }
}`;

            const response = await event.fetch('/graphql', {
                method: 'POST',
                body: JSON.stringify({
                    query: query,
                    variables: mutationArguments
                })
            });

            if (response.ok) {
                const json = await response.json();
                set({
                    isFetching: false,
                    list: json.data.groupList
                });
            }
        }
    }

    await fetch(fields, mutationArguments);

    return {
        subscribe,
        fetch
    };
}

export type GroupMutationStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        list: Group[];
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        list: Group[];
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], mutationArguments: GroupListMutationArguments) => Promise<void>;
}