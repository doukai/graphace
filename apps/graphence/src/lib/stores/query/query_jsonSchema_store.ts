import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryJsonSchemaArgs } from '~/lib/types/schema';

const query = /* GraphQL */ `query query_jsonSchema($name: String) {
  jsonSchema(name: $name)
}`;

export function createQuery_jsonSchema_Store(event: LoadEvent | RequestEvent): Query_jsonSchema_Store {
  return createGraphQLQueryStore<string, QueryJsonSchemaArgs>(query, event);
}

export async function fetchQuery_jsonSchema_Store(event: LoadEvent | RequestEvent, variables: QueryJsonSchemaArgs): Promise<Query_jsonSchema_Store> {
  return fetchGraphQLQueryStore<string, QueryJsonSchemaArgs>(query, event, variables);
}

export type Query_jsonSchema_Store = GraphQLStore<string, QueryJsonSchemaArgs>;