import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, type GraphQLError, fieldToString } from '@graphace/graphql';
import type { User, UserListMutationArguments } from '~/lib/types/schema';

export async function createUserListMutationStore(params: { event: LoadEvent }): Promise<UserListMutationStore> {
    const data: Writable<{ isFetching: boolean, response: { data?: { userList: User[] | null | undefined }, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { event } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], mutationArguments: UserListMutationArguments) => {
        if (fields && fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `mutation Mutation_userList($id: ID, $name: String, $description: String, $lastName: String, $login: String, $salt: String, $hash: String, $email: String, $files: [FileInput], $phones: [String], $disable: Boolean, $groups: [GroupInput], $roles: [RoleInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $fileUserRelation: [FileUserRelationInput], $userPhonesRelation: [UserPhonesRelationInput], $groupUserRelation: [GroupUserRelationInput], $roleUserRelation: [RoleUserRelationInput], $list: [UserInput], $where: UserExpression) {
    userList(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email files: $files phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId fileUserRelation: $fileUserRelation userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation list: $list where: $where) @uniqueMerge  {
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

export type UserListMutationStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: { userList: User[] | null | undefined }, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: { userList: User[] | null | undefined }, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], mutationArguments: UserListMutationArguments) => Promise<{ data?: { userList: User[] | null | undefined }, errors?: GraphQLError[] | null | undefined } | null | undefined>;
}