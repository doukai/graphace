import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_FileFields } from '~/lib/stores/fragment/fragment_FileFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationSingleUploadArgs } from '~/lib/types/schema';
import type { File } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_singleUpload($file: Upload) {
  singleUpload(file: $file) ${directives}{
    ...FileFields
    ${fields}
  }
}
${fragment_FileFields}`;

export function createMutation_singleUpload_Store(event: Event): Mutation_singleUpload_Store {
  return createGraphQLMutationStore<{ singleUpload: File }, MutationSingleUploadArgs>(query, event);
}

export type Mutation_singleUpload_Store = GraphQLStore<{ singleUpload: File }, MutationSingleUploadArgs>;