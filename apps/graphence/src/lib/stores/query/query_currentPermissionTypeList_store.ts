import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';

const query = /* GraphQL */ `query query_currentPermissionTypeList {
  currentPermissionTypeList
}`;

export async function createQuery_currentPermissionTypeList_Store(event: LoadEvent, variables: undefined): Promise<Query_currentPermissionTypeList_Store> {
  return createGraphQLQueryStore<string[], undefined>(query, event, variables);
}

export type Query_currentPermissionTypeList_Store = GraphQLStore<string[], undefined>;