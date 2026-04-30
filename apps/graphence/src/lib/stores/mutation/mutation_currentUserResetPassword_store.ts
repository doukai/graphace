import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationCurrentUserResetPasswordArgs } from '~/lib/types/schema';
import type { User } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_currentUserResetPassword($password: String!, $newPassword: String!) {
  currentUserResetPassword(password: $password newPassword: $newPassword) ${directives}{
    ...UserFields
    syncUserPolicy
    ${fields}
  }
}
${fragment_UserFields}`;

export function createMutation_currentUserResetPassword_Store(event: Event): Mutation_currentUserResetPassword_Store {
  return createGraphQLMutationStore<{ currentUserResetPassword: User }, MutationCurrentUserResetPasswordArgs>(query, event);
}

export type Mutation_currentUserResetPassword_Store = GraphQLStore<{ currentUserResetPassword: User }, MutationCurrentUserResetPasswordArgs>;