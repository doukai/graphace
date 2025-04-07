import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryFileArgs } from '~/lib/types/schema';
import type { File } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_file($id: StringExpression, $name: StringExpression, $contentType: StringExpression, $content: StringExpression, $url: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [FileExpression]) {
  file(id: $id name: $name contentType: $contentType content: $content url: $url includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupBy: $groupBy not: $not cond: $cond exs: $exs) {
    id
    name
    contentType
    content
    url
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
  }
}`;

export function createQuery_file_Store(event: LoadEvent | RequestEvent): Query_file_Store {
  return createGraphQLQueryStore<File, QueryFileArgs>(query, event);
}

export async function fetchQuery_file_Store(event: LoadEvent | RequestEvent, variables: QueryFileArgs): Promise<Query_file_Store> {
  return fetchGraphQLQueryStore<File, QueryFileArgs>(query, event, variables);
}

export type Query_file_Store = GraphQLStore<File, QueryFileArgs>;