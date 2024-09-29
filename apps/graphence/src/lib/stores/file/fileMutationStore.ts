import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, fieldToString } from '@graphace/graphql';
import type { File, FileListMutationArguments } from '~/lib/types/schema';

export async function createFileMutationStore(params: { event: LoadEvent, fields: Field[], mutationArguments: FileListMutationArguments }): Promise<FileMutationStore> {
    const data: Writable<{ isFetching: boolean, list: File[] }> = writable({
        isFetching: false,
        list: []
    });

    const { event, fields, mutationArguments } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], mutationArguments: FileListMutationArguments) => {
        if (fields && fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `mutation Mutation_fileList($id: StringExpression, $name: StringExpression, $contentType: StringExpression, $content: StringExpression, $url: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $orderBy: FileOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [FileExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
    fileList(id: $id name: $name contentType: $contentType content: $content url: $url includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before)  {
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
                    list: json.data.fileList
                });
            }
        }
    }

    await fetch(fields, mutationArguments);

    return {
        subscribe,
        fetch
    };
}

export type FileMutationStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        list: File[];
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        list: File[];
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], mutationArguments: FileListMutationArguments) => Promise<void>;
}