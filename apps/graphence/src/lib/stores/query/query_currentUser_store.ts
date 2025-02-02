import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
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

export function createQuery_currentUser_Store(event: LoadEvent | RequestEvent): Query_currentUser_Store {
  return createGraphQLQueryStore<User, undefined>(query, event);
}

export async function fetchQuery_currentUser_Store(event: LoadEvent | RequestEvent, variables: undefined): Promise<Query_currentUser_Store> {
  return fetchGraphQLQueryStore<User, undefined>(query, event, variables);
}

export type Query_currentUser_Store = GraphQLStore<User, undefined>;