import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { User } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_currentUser {
  currentUser {
    ...UserFields
  }
}
${fragment_UserFields}`;

export function createQuery_currentUser_Store(event: Event): Query_currentUser_Store {
  return createGraphQLQueryStore<User, undefined>(query, event);
}

export async function fetchQuery_currentUser_Store(event: Event, variables?: undefined): Promise<Query_currentUser_Store> {
  return fetchGraphQLQueryStore<User, undefined>(query, event, variables);
}

export type Query_currentUser_Store = GraphQLStore<User, undefined>;