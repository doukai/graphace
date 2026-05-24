import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_FileFields } from '~/lib/stores/fragment/fragment_FileFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryFileListArgs } from '~/lib/types/schema';
import type { File } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_fileList($id: StringExpression, $name: StringExpression, $contentType: StringExpression, $contentLength: IntExpression, $content: StringExpression, $url: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $createTimeYear: IntExpression, $createTimeMonth: IntExpression, $createTimeDay: IntExpression, $createTimeWeek: IntExpression, $createTimeQuarter: IntExpression, $updateTimeYear: IntExpression, $updateTimeMonth: IntExpression, $updateTimeDay: IntExpression, $updateTimeWeek: IntExpression, $updateTimeQuarter: IntExpression, $orderBy: FileOrderBy, $groupBy: FileGroupBy, $not: Boolean, $cond: Conditional, $exs: [FileExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  fileList(id: $id name: $name contentType: $contentType contentLength: $contentLength content: $content url: $url includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId createTimeYear: $createTimeYear createTimeMonth: $createTimeMonth createTimeDay: $createTimeDay createTimeWeek: $createTimeWeek createTimeQuarter: $createTimeQuarter updateTimeYear: $updateTimeYear updateTimeMonth: $updateTimeMonth updateTimeDay: $updateTimeDay updateTimeWeek: $updateTimeWeek updateTimeQuarter: $updateTimeQuarter orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) ${directives}{
    ...FileFields
    ${fields}
  }
}
${fragment_FileFields}`;

export function createQuery_fileList_Store(event: Event): Query_fileList_Store {
  return createGraphQLQueryStore<{ fileList: File[] }, QueryFileListArgs>(query, event);
}

export async function fetchQuery_fileList_Store(event: Event, variables: QueryFileListArgs): Promise<Query_fileList_Store> {
  return fetchGraphQLQueryStore<{ fileList: File[] }, QueryFileListArgs>(query, event, variables);
}

export type Query_fileList_Store = GraphQLStore<{ fileList: File[] }, QueryFileListArgs>;