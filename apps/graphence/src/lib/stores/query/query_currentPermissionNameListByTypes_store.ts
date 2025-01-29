import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';
import type { QueryCurrentPermissionNameListByTypesArgs } from '~/lib/types/schema';

const query = /* GraphQL */ `query query_currentPermissionNameListByTypes($types: [String]) {
  currentPermissionNameListByTypes(types: $types)
}`;

export async function createQueryCurrentPermissionNameListByTypesStore(event: LoadEvent, variables: QueryCurrentPermissionNameListByTypesArgs): Promise<GraphQLStore<string[], QueryCurrentPermissionNameListByTypesArgs>> {
  return createGraphQLQueryStore<string[], QueryCurrentPermissionNameListByTypesArgs>(query, event, variables);
}