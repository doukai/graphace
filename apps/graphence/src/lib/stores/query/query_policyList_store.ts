import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';
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

export async function createQueryPolicyListStore(event: LoadEvent, variables: undefined): Promise<GraphQLStore<Policy[], undefined>> {
  return createGraphQLQueryStore<Policy[], undefined>(query, event, variables);
}