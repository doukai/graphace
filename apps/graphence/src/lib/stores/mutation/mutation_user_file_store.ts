import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { FileInput, User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user_file($user_id: String, $user_file: FileInput) {
  user(where: { id: { val: $user_id } }, file: $user_file) @merge {
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
    file {
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

export function createMutation_user_file_Store(event: LoadEvent | RequestEvent): Mutation_user_file_Store {
  return createGraphQLMutationStore<User, { user_id: string, user_file: FileInput | null }>(query, event);
}

export type Mutation_user_file_Store = GraphQLStore<User, { user_id: string, user_file: FileInput | null }>;