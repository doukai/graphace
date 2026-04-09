import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `query Query_currentPermissionTypeList {
  currentPermissionTypeList
}`;

export function createQuery_currentPermissionTypeList_Store(event: Event): Query_currentPermissionTypeList_Store {
  return createGraphQLQueryStore<{ currentPermissionTypeList: string[] }, undefined>(query, event);
}

export async function fetchQuery_currentPermissionTypeList_Store(event: Event, variables?: undefined): Promise<Query_currentPermissionTypeList_Store> {
  return fetchGraphQLQueryStore<{ currentPermissionTypeList: string[] }, undefined>(query, event, variables);
}

export type Query_currentPermissionTypeList_Store = GraphQLStore<{ currentPermissionTypeList: string[] }, undefined>;