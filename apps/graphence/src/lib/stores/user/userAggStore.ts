import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import type { UserConnection, UserConnectionQueryArguments } from '~/lib/types/schema';

export async function createUserAggStore(params: { event: LoadEvent, fields: Field[], queryArguments: UserConnectionQueryArguments }): Promise<UserAggStore> {
    const data: Writable<{ isFetching: boolean, connection: UserConnection }> = writable({
        isFetching: false,
        connection: {}
    });

    const { event, fields, queryArguments } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], queryArguments: UserConnectionQueryArguments) => {
        if (fields && fields.length > 0 && queryArguments.groupBy && queryArguments.groupBy.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `query Query_userConnection($id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $files: FileExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $fileUserRelation: FileUserRelationExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $orderBy: UserOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [UserExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    userConnection(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email files: $files phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId fileUserRelation: $fileUserRelation userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
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
                        connection: json.data.userConnection
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

export type UserAggStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        connection: UserConnection;
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        connection: UserConnection;
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], queryArguments: UserConnectionQueryArguments) => Promise<void>;
}