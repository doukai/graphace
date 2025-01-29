import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';

const query = /* GraphQL */ `query query_currentPermissionTypeList {
  currentPermissionTypeList
}`;

export async function createQueryCurrentPermissionTypeListStore(event: LoadEvent, variables: undefined): Promise<GraphQLStore<string[], undefined>> {
  return createGraphQLQueryStore<string[], undefined>(query, event, variables);
}