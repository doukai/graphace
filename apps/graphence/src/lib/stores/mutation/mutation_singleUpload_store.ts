import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationSingleUploadArgs } from '~/lib/types/schema';
import type { File } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_singleUpload($file: Upload) {
  singleUpload(file: $file) {
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

export function createMutation_singleUpload_Store(event: LoadEvent | RequestEvent): Mutation_singleUpload_Store {
  return createGraphQLMutationStore<File, MutationSingleUploadArgs>(query, event);
}

export type Mutation_singleUpload_Store = GraphQLStore<File, MutationSingleUploadArgs>;