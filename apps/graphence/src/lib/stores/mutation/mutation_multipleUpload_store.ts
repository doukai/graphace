import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationMultipleUploadArgs } from '~/lib/types/schema';
import type { File } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_multipleUpload($files: [Upload]) {
  multipleUpload(files: $files) {
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

export function createMutation_multipleUpload_Store(event: LoadEvent | RequestEvent): Mutation_multipleUpload_Store {
  return createGraphQLMutationStore<File[], MutationMultipleUploadArgs>(query, event);
}

export type Mutation_multipleUpload_Store = GraphQLStore<File[], MutationMultipleUploadArgs>;