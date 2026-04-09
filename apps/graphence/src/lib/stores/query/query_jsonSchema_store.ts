import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryJsonSchemaArgs } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `query Query_jsonSchema($name: String) {
  jsonSchema(name: $name)
}`;

export function createQuery_jsonSchema_Store(event: Event): Query_jsonSchema_Store {
  return createGraphQLQueryStore<{ jsonSchema: string }, QueryJsonSchemaArgs>(query, event);
}

export async function fetchQuery_jsonSchema_Store(event: Event, variables: QueryJsonSchemaArgs): Promise<Query_jsonSchema_Store> {
  return fetchGraphQLQueryStore<{ jsonSchema: string }, QueryJsonSchemaArgs>(query, event, variables);
}

export type Query_jsonSchema_Store = GraphQLStore<{ jsonSchema: string }, QueryJsonSchemaArgs>;