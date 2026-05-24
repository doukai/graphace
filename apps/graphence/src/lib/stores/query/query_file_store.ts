import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_FileFields } from '~/lib/stores/fragment/fragment_FileFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryFileArgs } from '~/lib/types/schema';
import type { File } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_file($id: StringExpression, $name: StringExpression, $contentType: StringExpression, $contentLength: IntExpression, $content: StringExpression, $url: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $createTimeYear: IntExpression, $createTimeMonth: IntExpression, $createTimeDay: IntExpression, $createTimeWeek: IntExpression, $createTimeQuarter: IntExpression, $updateTimeYear: IntExpression, $updateTimeMonth: IntExpression, $updateTimeDay: IntExpression, $updateTimeWeek: IntExpression, $updateTimeQuarter: IntExpression, $not: Boolean, $cond: Conditional, $exs: [FileExpression]) {
  file(id: $id name: $name contentType: $contentType contentLength: $contentLength content: $content url: $url includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId createTimeYear: $createTimeYear createTimeMonth: $createTimeMonth createTimeDay: $createTimeDay createTimeWeek: $createTimeWeek createTimeQuarter: $createTimeQuarter updateTimeYear: $updateTimeYear updateTimeMonth: $updateTimeMonth updateTimeDay: $updateTimeDay updateTimeWeek: $updateTimeWeek updateTimeQuarter: $updateTimeQuarter not: $not cond: $cond exs: $exs) ${directives}{
    ...FileFields
    ${fields}
  }
}
${fragment_FileFields}`;

export function createQuery_file_Store(event: Event): Query_file_Store {
  return createGraphQLQueryStore<{ file: File }, QueryFileArgs>(query, event);
}

export async function fetchQuery_file_Store(event: Event, variables: QueryFileArgs): Promise<Query_file_Store> {
  return fetchGraphQLQueryStore<{ file: File }, QueryFileArgs>(query, event, variables);
}

export type Query_file_Store = GraphQLStore<{ file: File }, QueryFileArgs>;