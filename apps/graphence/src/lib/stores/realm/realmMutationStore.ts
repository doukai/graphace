import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import type { Realm, RealmListMutationArguments } from '~/lib/types/schema';

export async function createRealmMutationStore(params: { event: LoadEvent, fields: Field[], mutationArguments: RealmListMutationArguments }): Promise<RealmMutationStore> {
    const data: Writable<{ isFetching: boolean, list: Realm[] }> = writable({
        isFetching: false,
        list: []
    });

    const { event, fields, mutationArguments } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], mutationArguments: RealmListMutationArguments) => {
        if (fields && fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `mutation Mutation_realmList($id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $orderBy: RealmOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RealmExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    realmList(id: $id name: $name description: $description includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
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
                    list: json.data.realmList
                });
            }
        }
    }

    return {
        subscribe,
        fetch
    };
}

export type RealmMutationStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        list: Realm[];
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        list: Realm[];
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], mutationArguments: RealmListMutationArguments) => Promise<void>;
}