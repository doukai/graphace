import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_PolicyFields } from '~/lib/stores/fragment/fragment_PolicyFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { Policy } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `query Query_policyList {
  policyList ${directives}{
    ...PolicyFields
  }
}
${fragment_PolicyFields}`;

export function createQuery_policyList_Store(event: Event): Query_policyList_Store {
  return createGraphQLQueryStore<{ policyList: Policy[] }, undefined>(query, event);
}

export async function fetchQuery_policyList_Store(event: Event, variables?: undefined): Promise<Query_policyList_Store> {
  return fetchGraphQLQueryStore<{ policyList: Policy[] }, undefined>(query, event, variables);
}

export type Query_policyList_Store = GraphQLStore<{ policyList: Policy[] }, undefined>;