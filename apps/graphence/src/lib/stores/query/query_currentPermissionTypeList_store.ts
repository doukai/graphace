import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';

const query = /* GraphQL */ `query Query_currentPermissionTypeList {
  currentPermissionTypeList
}`;

export function createQuery_currentPermissionTypeList_Store(event: LoadEvent | RequestEvent): Query_currentPermissionTypeList_Store {
  return createGraphQLQueryStore<string[], undefined>(query, event);
}

export async function fetchQuery_currentPermissionTypeList_Store(event: LoadEvent | RequestEvent, variables?: undefined): Promise<Query_currentPermissionTypeList_Store> {
  return fetchGraphQLQueryStore<string[], undefined>(query, event, variables);
}

export type Query_currentPermissionTypeList_Store = GraphQLStore<string[], undefined>;