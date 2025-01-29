import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';
import type { QueryJsonSchemaArgs } from '~/lib/types/schema';

const query = /* GraphQL */ `query query_jsonSchema($name: String) {
  jsonSchema(name: $name)
}`;

export async function createQueryJsonSchemaStore(event: LoadEvent, variables: QueryJsonSchemaArgs): Promise<GraphQLStore<string, QueryJsonSchemaArgs>> {
  return createGraphQLQueryStore<string, QueryJsonSchemaArgs>(query, event, variables);
}