import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { Policy } from '~/lib/types/schema';

const query = /* GraphQL */ `query query_policyList {
  policyList {
    id
    policy
    v0
    v1
    v2
    v3
    v4
    v5
  }
}`;

export function createQuery_policyList_Store(event: LoadEvent | RequestEvent): Query_policyList_Store {
  return createGraphQLQueryStore<Policy[], undefined>(query, event);
}

export async function fetchQuery_policyList_Store(event: LoadEvent | RequestEvent, variables: undefined): Promise<Query_policyList_Store> {
  return fetchGraphQLQueryStore<Policy[], undefined>(query, event, variables);
}

export type Query_policyList_Store = GraphQLStore<Policy[], undefined>;