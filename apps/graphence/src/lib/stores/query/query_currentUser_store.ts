import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';
import type { User } from '~/lib/types/schema';

const query = /* GraphQL */ `query query_currentUser {
  currentUser {
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

export async function createQueryCurrentUserStore(event: LoadEvent, variables: undefined): Promise<GraphQLStore<User, undefined>> {
  return createGraphQLQueryStore<User, undefined>(query, event, variables);
}