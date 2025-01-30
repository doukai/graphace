import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';
import type { QueryJsonSchemaArgs } from '~/lib/types/schema';

const query = /* GraphQL */ `query query_jsonSchema($name: String) {
  jsonSchema(name: $name)
}`;

export async function createQuery_jsonSchema_Store(event: LoadEvent, variables: QueryJsonSchemaArgs): Promise<Query_jsonSchema_Store> {
  return createGraphQLQueryStore<string, QueryJsonSchemaArgs>(query, event, variables);
}

export type Query_jsonSchema_Store = GraphQLStore<string, QueryJsonSchemaArgs>;