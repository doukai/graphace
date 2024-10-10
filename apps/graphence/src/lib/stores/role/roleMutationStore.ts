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

    const fetch = async (fields: Field[], mutationArguments: RoleListMutationArguments): Promise<{ data?: { roleList: Role[] | null | undefined }, errors?: GraphQLError[] | null | undefined } | null | undefined> => {
        if (fields && fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `mutation Mutation_roleList($list: [RoleInput]) {
    roleList(list: $list)  {
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