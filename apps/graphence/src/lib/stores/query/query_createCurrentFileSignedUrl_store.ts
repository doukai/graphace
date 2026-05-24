import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryCreateCurrentFileSignedUrlArgs } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_createCurrentFileSignedUrl($fileId: String!, $ttlSeconds: Int) {
  createCurrentFileSignedUrl(fileId: $fileId ttlSeconds: $ttlSeconds)
}`;

export function createQuery_createCurrentFileSignedUrl_Store(event: Event): Query_createCurrentFileSignedUrl_Store {
  return createGraphQLQueryStore<{ createCurrentFileSignedUrl: string }, QueryCreateCurrentFileSignedUrlArgs>(query, event);
}

export async function fetchQuery_createCurrentFileSignedUrl_Store(event: Event, variables: QueryCreateCurrentFileSignedUrlArgs): Promise<Query_createCurrentFileSignedUrl_Store> {
  return fetchGraphQLQueryStore<{ createCurrentFileSignedUrl: string }, QueryCreateCurrentFileSignedUrlArgs>(query, event, variables);
}

export type Query_createCurrentFileSignedUrl_Store = GraphQLStore<{ createCurrentFileSignedUrl: string }, QueryCreateCurrentFileSignedUrlArgs>;