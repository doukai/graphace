import type { LoadEvent } from '@sveltejs/kit';
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
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncUserPolicy
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
      name
      description
    }
  }
}`;

export async function createMutationCurrentUserResetPasswordStore(event: LoadEvent): Promise<GraphQLStore<User, MutationCurrentUserResetPasswordArgs>> {
  return createGraphQLMutationStore<User, MutationCurrentUserResetPasswordArgs>(query, event);
}