import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationCurrentUserUpdateArgs } from '~/lib/types/schema';
import type { User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_currentUserUpdate($userInput: UserInput!) {
  currentUserUpdate(userInput: $userInput) {
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

export async function createMutationCurrentUserUpdateStore(event: LoadEvent): Promise<GraphQLStore<User, MutationCurrentUserUpdateArgs>> {
  return createGraphQLMutationStore<User, MutationCurrentUserUpdateArgs>(query, event);
}