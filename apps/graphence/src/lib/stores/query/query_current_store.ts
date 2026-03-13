import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_CurrentFields } from '~/lib/stores/fragment/fragment_CurrentFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';

const query = /* GraphQL */ `query Query_current {
  current {
    ...CurrentFields
  }
}
${fragment_CurrentFields}`;

export function createQuery_current_Store(event: Event): Query_current_Store {
  return createGraphQLQueryStore<{ current: Current }, undefined>(query, event);
}

export async function fetchQuery_current_Store(event: Event, variables?: undefined): Promise<Query_current_Store> {
  return fetchGraphQLQueryStore<{ current: Current }, undefined>(query, event, variables);
}

export type Query_current_Store = GraphQLStore<{ current: Current }, undefined>;