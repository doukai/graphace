import { writable } from 'svelte/store';
import type { Invalidator, Subscriber, Unsubscriber, Writable } from 'svelte/store';
import type { LoadEvent } from '@sveltejs/kit';
import { type Field, type Directive, type GraphQLError, fieldToString, directiveToString } from '@graphace/graphql';
import type { File, FileListMutationArguments } from '~/lib/types/schema';

export async function createFileListMutationStore(params: { event: LoadEvent }): Promise<FileListMutationStore> {
    const data: Writable<{ isFetching: boolean, response: { data?: { fileList: File[] | null | undefined }, errors?: GraphQLError[] | null | undefined } }> = writable({
        isFetching: false,
        response: {}
    });

    const { event } = params;

    const { subscribe, set, update } = data;

    const fetch = async (fields: Field[], mutationArguments: FileListMutationArguments, directives?: Directive[]) => {
        if (fields && fields.length > 0) {
            update((data) => ({ ...data, isFetching: true }));
            let query = `mutation Mutation_fileList($id: ID, $name: String, $contentType: String, $content: String, $url: String, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $list: [FileInput], $where: FileExpression) {
    fileList(id: $id name: $name contentType: $contentType content: $content url: $url isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId list: $list where: $where)${directives ? ' ' + directives.map(directive => directiveToString(directive)).join(' ') : ''} {
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

export type FileListMutationStore = {
    subscribe: (this: void, run: Subscriber<{
        isFetching: boolean;
        response: { data?: { fileList: File[] | null | undefined }, errors?: GraphQLError[] | null | undefined };
    }>, invalidate?: Invalidator<{
        isFetching: boolean;
        response: { data?: { fileList: File[] | null | undefined }, errors?: GraphQLError[] | null | undefined };
    }> | undefined) => Unsubscriber;
    fetch: (fields: Field[], mutationArguments: FileListMutationArguments, directives?: Directive[]) => Promise<{ data?: { fileList: File[] | null | undefined }, errors?: GraphQLError[] | null | undefined } | null | undefined>;
}