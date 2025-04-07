import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationFileArgs } from '~/lib/types/schema';
import type { File } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_file($id: ID, $name: String, $contentType: String, $content: String, $url: String, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $input: FileInput, $where: FileExpression) {
  file(id: $id name: $name contentType: $contentType content: $content url: $url isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId input: $input where: $where) {
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

export function createMutation_file_Store(event: LoadEvent | RequestEvent): Mutation_file_Store {
  return createGraphQLMutationStore<File, MutationFileArgs>(query, event);
}

export type Mutation_file_Store = GraphQLStore<File, MutationFileArgs>;