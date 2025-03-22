import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { RealmInput, User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user_realm($user_id: String, $user_realm: RealmInput) {
  user(where: { id: { val: $user_id } }, realm: $user_realm) @merge {
    id
    name
    description
    lastName
    login
    email
    phones
    disable
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncUserPolicy
    realm {
      id
      name
      description
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

export function createMutation_user_realm_Store(event: LoadEvent | RequestEvent): Mutation_user_realm_Store {
  return createGraphQLMutationStore<User, { user_id: string, user_realm: RealmInput | null }>(query, event);
}

export type Mutation_user_realm_Store = GraphQLStore<User, { user_id: string, user_realm: RealmInput | null }>;