import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryFileListArgs } from '~/lib/types/schema';
import type { File } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_fileList($id: StringExpression, $name: StringExpression, $contentType: StringExpression, $content: StringExpression, $url: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $orderBy: FileOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [FileExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  fileList(id: $id name: $name contentType: $contentType content: $content url: $url includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
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

export function createQuery_fileList_Store(event: LoadEvent | RequestEvent): Query_fileList_Store {
  return createGraphQLQueryStore<File[], QueryFileListArgs>(query, event);
}

export async function fetchQuery_fileList_Store(event: LoadEvent | RequestEvent, variables: QueryFileListArgs): Promise<Query_fileList_Store> {
  return fetchGraphQLQueryStore<File[], QueryFileListArgs>(query, event, variables);
}

export type Query_fileList_Store = GraphQLStore<File[], QueryFileListArgs>;