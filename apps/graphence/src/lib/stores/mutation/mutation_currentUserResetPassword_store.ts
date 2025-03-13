import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationCurrentUserResetPasswordArgs } from '~/lib/types/schema';
import type { User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_currentUserResetPassword($password: String!, $newPassword: String!) {
  currentUserResetPassword(password: $password newPassword: $newPassword) {
    id
    name
    description
    lastName
    login
    email
    phones
    disable
    groups {
      id
      name
      description
    }
    roles {
      id
      name
      description
    }
    realm {
      id
      name
      description
    }
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncUserPolicy
  }
}`;

export function createMutation_currentUserResetPassword_Store(event: LoadEvent | RequestEvent): Mutation_currentUserResetPassword_Store {
  return createGraphQLMutationStore<User, MutationCurrentUserResetPasswordArgs>(query, event);
}

export type Mutation_currentUserResetPassword_Store = GraphQLStore<User, MutationCurrentUserResetPasswordArgs>;