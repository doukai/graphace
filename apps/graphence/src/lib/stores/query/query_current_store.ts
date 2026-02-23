import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { fragment_CurrentFields } from '~/lib/stores/fragment/fragment_CurrentFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { Current } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_current {
  current {
    ...CurrentFields
  }
}
${fragment_CurrentFields}`;

export function createQuery_current_Store(event: LoadEvent | RequestEvent): Query_current_Store {
  return createGraphQLQueryStore<Current, undefined>(query, event);
}

export async function fetchQuery_current_Store(event: LoadEvent | RequestEvent, variables?: undefined): Promise<Query_current_Store> {
  return fetchGraphQLQueryStore<Current, undefined>(query, event, variables);
}

export type Query_current_Store = GraphQLStore<Current, undefined>;