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

export async function createQueryCurrentStore(event: LoadEvent, variables: undefined): Promise<GraphQLStore<Current, undefined>> {
  return createGraphQLQueryStore<Current, undefined>(query, event, variables);
}