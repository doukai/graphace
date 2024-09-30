import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import type { Permission, PermissionListMutationArguments } from '~/lib/types/schema';

export async function createPermissionMutationStore(params: { event: LoadEvent, fields: Field[], mutationArguments: PermissionListMutationArguments }): Promise<PermissionMutationStore> {
    const data: Writable<{ isFetching: boolean, list: Permission[] }> = writable({
        isFetching: false,
        list: []
    });

    const { event, fields, mutationArguments } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], mutationArguments: PermissionListMutationArguments) => {
        if (fields && fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `mutation Mutation_permissionList($name: StringExpression, $description: StringExpression, $field: StringExpression, $type: StringExpression, $permissionType: PermissionTypeExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $orderBy: PermissionOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [PermissionExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    permissionList(name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId permissionRoleRelation: $permissionRoleRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
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
                    list: json.data.permissionList
                });
            }
        }
    }

    return {
        subscribe,
        fetch
    };
}

export type PermissionMutationStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        list: Permission[];
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        list: Permission[];
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], mutationArguments: PermissionListMutationArguments) => Promise<void>;
}