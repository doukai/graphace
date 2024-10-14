import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, type GraphQLError, fieldToString } from '@graphace/graphql';
import type { Role, RoleListMutationArguments } from '~/lib/types/schema';

export async function createRoleListMutationStore(params: { event: LoadEvent }): Promise<RoleListMutationStore> {
    const data: Writable<{ isFetching: boolean, response: { data?: { roleList: Role[] | null | undefined }, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { event } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], mutationArguments: RoleListMutationArguments) => {
        if (fields && fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `mutation Mutation_roleList($id: ID, $name: String, $description: String, $users: [UserInput], $groups: [GroupInput], $composites: [RoleInput], $permissions: [PermissionInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $roleUserRelation: [RoleUserRelationInput], $groupRoleRelation: [GroupRoleRelationInput], $roleCompositeRelation: [RoleCompositeRelationInput], $permissionRoleRelation: [PermissionRoleRelationInput], $list: [RoleInput], $where: RoleExpression) {
    roleList(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation permissionRoleRelation: $permissionRoleRelation list: $list where: $where)  {
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
                    response: json
                });
                return json;
            }
        }
    }

    return {
        subscribe,
        fetch
    };
}

export type RoleListMutationStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: { roleList: Role[] | null | undefined }, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: { roleList: Role[] | null | undefined }, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], mutationArguments: RoleListMutationArguments) => Promise<{ data?: { roleList: Role[] | null | undefined }, errors?: GraphQLError[] | null | undefined } | null | undefined>;
}