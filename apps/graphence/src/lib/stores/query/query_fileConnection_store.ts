import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_FileFields } from '~/lib/stores/fragment/fragment_FileFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryFileConnectionArgs } from '~/lib/types/schema';
import type { FileConnection } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_fileConnection($id: StringExpression, $name: StringExpression, $contentType: StringExpression, $contentLength: IntExpression, $content: StringExpression, $url: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $createTimeYear: IntExpression, $createTimeMonth: IntExpression, $createTimeDay: IntExpression, $createTimeWeek: IntExpression, $createTimeQuarter: IntExpression, $updateTimeYear: IntExpression, $updateTimeMonth: IntExpression, $updateTimeDay: IntExpression, $updateTimeWeek: IntExpression, $updateTimeQuarter: IntExpression, $orderBy: FileOrderBy, $groupBy: FileGroupBy, $not: Boolean, $cond: Conditional, $exs: [FileExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  fileConnection(id: $id name: $name contentType: $contentType contentLength: $contentLength content: $content url: $url includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId createTimeYear: $createTimeYear createTimeMonth: $createTimeMonth createTimeDay: $createTimeDay createTimeWeek: $createTimeWeek createTimeQuarter: $createTimeQuarter updateTimeYear: $updateTimeYear updateTimeMonth: $updateTimeMonth updateTimeDay: $updateTimeDay updateTimeWeek: $updateTimeWeek updateTimeQuarter: $updateTimeQuarter orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) ${directives}{
    totalCount
    edges {
      node { 
        ...FileFields
        ${fields}
      }
    }
  }
}
${fragment_FileFields}`;

export function createQuery_fileConnection_Store(event: Event): Query_fileConnection_Store {
  return createGraphQLQueryStore<{ fileConnection: FileConnection }, QueryFileConnectionArgs>(query, event);
}

export async function fetchQuery_fileConnection_Store(event: Event, variables: QueryFileConnectionArgs): Promise<Query_fileConnection_Store> {
  return fetchGraphQLQueryStore<{ fileConnection: FileConnection }, QueryFileConnectionArgs>(query, event, variables);
}

export type Query_fileConnection_Store = GraphQLStore<{ fileConnection: FileConnection }, QueryFileConnectionArgs>;