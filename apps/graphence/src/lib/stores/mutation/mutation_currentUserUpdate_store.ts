import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationCurrentUserUpdateArgs } from '~/lib/types/schema';
import type { User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_currentUserUpdate($userInput: UserInput!) {
  currentUserUpdate(userInput: $userInput) {
    ...UserFields
    syncUserPolicy
  }
}
${fragment_UserFields}`;

export function createMutation_currentUserUpdate_Store(event: Event): Mutation_currentUserUpdate_Store {
  return createGraphQLMutationStore<User, MutationCurrentUserUpdateArgs>(query, event);
}

export type Mutation_currentUserUpdate_Store = GraphQLStore<User, MutationCurrentUserUpdateArgs>;