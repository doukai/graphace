import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, type Directive, type GraphQLError, fieldToString, directiveToString } from '@graphace/graphql';
import type { Group, GroupListMutationArguments } from '~/';

export async function createGroupListMutationStore(params: { event: LoadEvent }): Promise<GroupListMutationStore> {
    const data: Writable<{ isFetching: boolean, response: { data?: { groupList: Group[] | null | undefined }, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { event } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], mutationArguments: GroupListMutationArguments, directives?: Directive[]) => {
        if (fields && fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `mutation Mutation_groupList($id: ID, $name: String, $description: String, $path: String, $deep: Int, $parentId: String, $parent: GroupInput, $subGroups: [GroupInput], $users: [UserInput], $roles: [RoleInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $groupUserRelation: [GroupUserRelationInput], $groupRoleRelation: [GroupRoleRelationInput], $list: [GroupInput], $where: GroupExpression) {
    groupList(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation list: $list where: $where)${directives ? ' ' + directives.map(directive => directiveToString(directive)).join(' ') : ''} {
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

export type GroupListMutationStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: { groupList: Group[] | null | undefined }, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: { groupList: Group[] | null | undefined }, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], mutationArguments: GroupListMutationArguments, directives?: Directive[]) => Promise<{ data?: { groupList: Group[] | null | undefined }, errors?: GraphQLError[] | null | undefined } | null | undefined>;
}