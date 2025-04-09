import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
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

export function createMutation_currentUserUpdate_Store(event: LoadEvent | RequestEvent): Mutation_currentUserUpdate_Store {
  return createGraphQLMutationStore<User, MutationCurrentUserUpdateArgs>(query, event);
}

export type Mutation_currentUserUpdate_Store = GraphQLStore<User, MutationCurrentUserUpdateArgs>;