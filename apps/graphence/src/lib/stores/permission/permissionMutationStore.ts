import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, type Directive, type GraphQLError, fieldToString, directiveToString } from '@graphace/graphql';
import type { Permission, PermissionListMutationArguments } from '~/';

export async function createPermissionListMutationStore(params: { event: LoadEvent }): Promise<PermissionListMutationStore> {
    const data: Writable<{ isFetching: boolean, response: { data?: { permissionList: Permission[] | null | undefined }, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { event } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], mutationArguments: PermissionListMutationArguments, directives?: Directive[]) => {
        if (fields && fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `mutation Mutation_permissionList($name: ID, $description: String, $field: String, $type: String, $permissionType: PermissionType, $roles: [RoleInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $permissionRoleRelation: [PermissionRoleRelationInput], $list: [PermissionInput], $where: PermissionExpression) {
    permissionList(name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId permissionRoleRelation: $permissionRoleRelation list: $list where: $where)${directives ? ' ' + directives.map(directive => directiveToString(directive)).join(' ') : ''} {
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

            const json = await response.json();
            set({
                isFetching: false,
                response: json
            });
            return json;
        }
    }

    return {
        subscribe,
        fetch
    };
}

export type PermissionListMutationStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: { permissionList: Permission[] | null | undefined }, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: { permissionList: Permission[] | null | undefined }, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], mutationArguments: PermissionListMutationArguments, directives?: Directive[]) => Promise<{ data?: { permissionList: Permission[] | null | undefined }, errors?: GraphQLError[] | null | undefined } | null | undefined>;
}