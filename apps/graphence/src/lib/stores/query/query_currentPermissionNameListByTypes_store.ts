import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';
import type { QueryCurrentPermissionNameListByTypesArgs } from '~/lib/types/schema';

const query = /* GraphQL */ `query query_currentPermissionNameListByTypes($types: [String]) {
  currentPermissionNameListByTypes(types: $types)
}`;

export async function createQuery_currentPermissionNameListByTypes_Store(event: LoadEvent, variables: QueryCurrentPermissionNameListByTypesArgs): Promise<Query_currentPermissionNameListByTypes_Store> {
  return createGraphQLQueryStore<string[], QueryCurrentPermissionNameListByTypesArgs>(query, event, variables);
}

export type Query_currentPermissionNameListByTypes_Store = GraphQLStore<string[], QueryCurrentPermissionNameListByTypesArgs>;