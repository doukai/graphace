import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_FileFields } from '~/lib/stores/fragment/fragment_FileFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationFileListArgs } from '~/lib/types/schema';
import type { File } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_fileList($id: ID, $name: String, $contentType: String, $contentLength: Int, $content: String, $url: String, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $list: [FileInput], $where: FileExpression) {
  fileList(id: $id name: $name contentType: $contentType contentLength: $contentLength content: $content url: $url isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId list: $list where: $where) ${directives}{
    ...FileFields
    ${fields}
  }
}
${fragment_FileFields}`;

export function createMutation_fileList_Store(event: Event): Mutation_fileList_Store {
  return createGraphQLMutationStore<{ fileList: File[] }, MutationFileListArgs>(query, event);
}

export type Mutation_fileList_Store = GraphQLStore<{ fileList: File[] }, MutationFileListArgs>;