import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { FileInput, User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user_files($user_id: String, $user_files: [FileInput]) {
  user(where: { id: { val: $user_id } }, files: $user_files) @merge {
    id
    name
    description
    lastName
    login
    email
    phones
    disable
    booleanList
    intList
    typeList
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncUserPolicy
    files {
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
  }
}`;

export function createMutation_user_files_Store(event: LoadEvent | RequestEvent): Mutation_user_files_Store {
  return createGraphQLMutationStore<User, { user_id: string, user_files: FileInput[] | null }>(query, event);
}

export type Mutation_user_files_Store = GraphQLStore<User, { user_id: string, user_files: FileInput[] | null }>;