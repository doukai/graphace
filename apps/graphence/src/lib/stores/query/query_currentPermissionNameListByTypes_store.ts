import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryCurrentPermissionNameListByTypesArgs } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_currentPermissionNameListByTypes($types: [String]) {
  currentPermissionNameListByTypes(types: $types)
}`;

export function createQuery_currentPermissionNameListByTypes_Store(event: Event): Query_currentPermissionNameListByTypes_Store {
  return createGraphQLQueryStore<string[], QueryCurrentPermissionNameListByTypesArgs>(query, event);
}

export async function fetchQuery_currentPermissionNameListByTypes_Store(event: Event, variables: QueryCurrentPermissionNameListByTypesArgs): Promise<Query_currentPermissionNameListByTypes_Store> {
  return fetchGraphQLQueryStore<string[], QueryCurrentPermissionNameListByTypesArgs>(query, event, variables);
}

export type Query_currentPermissionNameListByTypes_Store = GraphQLStore<string[], QueryCurrentPermissionNameListByTypesArgs>;