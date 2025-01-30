import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';
import type { Current } from '~/lib/types/schema';

const query = /* GraphQL */ `query query_current {
  current {
    id
    name
    lastName
    login
    realmId
    groups
    roles
  }
}`;

export async function createQuery_current_Store(event: LoadEvent, variables: undefined): Promise<Query_current_Store> {
  return createGraphQLQueryStore<Current, undefined>(query, event, variables);
}

export type Query_current_Store = GraphQLStore<Current, undefined>;