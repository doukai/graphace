import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import type { RealmConnection, RealmConnectionQueryArguments } from '~/lib/types/schema';

export async function createRealmAggStore(params: { event: LoadEvent, fields: Field[], queryArguments: RealmConnectionQueryArguments }): Promise<RealmAggStore> {
    const data: Writable<{ isFetching: boolean, connection: RealmConnection }> = writable({
        isFetching: false,
        connection: {}
    });

    const { event, fields, queryArguments } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], queryArguments: RealmConnectionQueryArguments) => {
        if (fields && fields.length > 0 && queryArguments.groupBy && queryArguments.groupBy.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `query Query_realmConnection($id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $orderBy: RealmOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RealmExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    realmConnection(id: $id name: $name description: $description includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
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
                        connection: json.data.realmConnection
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

export type RealmAggStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        connection: RealmConnection;
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        connection: RealmConnection;
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], queryArguments: RealmConnectionQueryArguments) => Promise<void>;
}