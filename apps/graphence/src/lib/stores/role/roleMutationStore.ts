import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import type { Role, RoleListMutationArguments } from '~/lib/types/schema';

export async function createRoleMutationStore(params: { event: LoadEvent, fields: Field[], mutationArguments: RoleListMutationArguments }): Promise<RoleMutationStore> {
    const data: Writable<{ isFetching: boolean, list: Role[] }> = writable({
        isFetching: false,
        list: []
    });

    const { event, fields, mutationArguments } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], mutationArguments: RoleListMutationArguments) => {
        if (fields && fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `mutation Mutation_roleList($id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $orderBy: RoleOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RoleExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    roleList(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation permissionRoleRelation: $permissionRoleRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
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
                    list: json.data.roleList
                });
            }
        }
    }

    return {
        subscribe,
        fetch
    };
}

export type RoleMutationStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        list: Role[];
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        list: Role[];
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], mutationArguments: RoleListMutationArguments) => Promise<void>;
}