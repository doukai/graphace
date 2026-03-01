import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_RealmFields } from '~/lib/stores/fragment/fragment_RealmFields';
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLMutationStore } from '~/utils';
import type { RealmInput, User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user_realm($user_id: String, $user_realm: RealmInput) {
  user(where: { id: { val: $user_id } }, realm: $user_realm) @merge {
    ...UserFields
    syncUserPolicy
    realm {
      ...RealmFields
    }
  }
}
${fragment_RealmFields}
${fragment_UserFields}`;

export function createMutation_user_realm_Store(event: Event): Mutation_user_realm_Store {
  return createGraphQLMutationStore<User, { user_id: string, user_realm: RealmInput | null }>(query, event);
}

export type Mutation_user_realm_Store = GraphQLStore<User, { user_id: string, user_realm: RealmInput | null }>;