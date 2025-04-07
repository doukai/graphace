import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationFileListArgs } from '~/lib/types/schema';
import type { File } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_fileList($id: ID, $name: String, $contentType: String, $content: String, $url: String, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $list: [FileInput], $where: FileExpression) {
  fileList(id: $id name: $name contentType: $contentType content: $content url: $url isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId list: $list where: $where) {
    id
    name
    contentType
    content
    url
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
  }
}`;

export function createMutation_fileList_Store(event: LoadEvent | RequestEvent): Mutation_fileList_Store {
  return createGraphQLMutationStore<File[], MutationFileListArgs>(query, event);
}

export type Mutation_fileList_Store = GraphQLStore<File[], MutationFileListArgs>;