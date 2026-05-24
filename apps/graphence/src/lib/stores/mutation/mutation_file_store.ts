import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_FileFields } from '~/lib/stores/fragment/fragment_FileFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationFileArgs } from '~/lib/types/schema';
import type { File } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_file($id: ID, $name: String, $contentType: String, $contentLength: Int, $content: String, $url: String, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $input: FileInput, $where: FileExpression) {
  file(id: $id name: $name contentType: $contentType contentLength: $contentLength content: $content url: $url isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId input: $input where: $where) ${directives}{
    ...FileFields
    ${fields}
  }
}
${fragment_FileFields}`;

export function createMutation_file_Store(event: Event): Mutation_file_Store {
  return createGraphQLMutationStore<{ file: File }, MutationFileArgs>(query, event);
}

export type Mutation_file_Store = GraphQLStore<{ file: File }, MutationFileArgs>;