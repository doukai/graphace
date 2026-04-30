import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationCurrentUserUpdateArgs } from '~/lib/types/schema';
import type { User } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_currentUserUpdate($userInput: UserInput!) {
  currentUserUpdate(userInput: $userInput) ${directives}{
    ...UserFields
    syncUserPolicy
    ${fields}
  }
}
${fragment_UserFields}`;

export function createMutation_currentUserUpdate_Store(event: Event): Mutation_currentUserUpdate_Store {
  return createGraphQLMutationStore<{ currentUserUpdate: User }, MutationCurrentUserUpdateArgs>(query, event);
}

export type Mutation_currentUserUpdate_Store = GraphQLStore<{ currentUserUpdate: User }, MutationCurrentUserUpdateArgs>;