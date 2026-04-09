import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_RealmFields } from '~/lib/stores/fragment/fragment_RealmFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRealmConnectionArgs } from '~/lib/types/schema';
import type { RealmConnection } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `query Query_realmConnection($id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $createTimeYear: IntExpression, $createTimeMonth: IntExpression, $createTimeDay: IntExpression, $createTimeWeek: IntExpression, $createTimeQuarter: IntExpression, $updateTimeYear: IntExpression, $updateTimeMonth: IntExpression, $updateTimeDay: IntExpression, $updateTimeWeek: IntExpression, $updateTimeQuarter: IntExpression, $orderBy: RealmOrderBy, $groupBy: RealmGroupBy, $not: Boolean, $cond: Conditional, $exs: [RealmExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  realmConnection(id: $id name: $name description: $description includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId createTimeYear: $createTimeYear createTimeMonth: $createTimeMonth createTimeDay: $createTimeDay createTimeWeek: $createTimeWeek createTimeQuarter: $createTimeQuarter updateTimeYear: $updateTimeYear updateTimeMonth: $updateTimeMonth updateTimeDay: $updateTimeDay updateTimeWeek: $updateTimeWeek updateTimeQuarter: $updateTimeQuarter orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) ${directives}{
    totalCount
    edges {
      node { 
        ...RealmFields
      }
    }
  }
}
${fragment_RealmFields}`;

export function createQuery_realmConnection_Store(event: Event): Query_realmConnection_Store {
  return createGraphQLQueryStore<{ realmConnection: RealmConnection }, QueryRealmConnectionArgs>(query, event);
}

export async function fetchQuery_realmConnection_Store(event: Event, variables: QueryRealmConnectionArgs): Promise<Query_realmConnection_Store> {
  return fetchGraphQLQueryStore<{ realmConnection: RealmConnection }, QueryRealmConnectionArgs>(query, event, variables);
}

export type Query_realmConnection_Store = GraphQLStore<{ realmConnection: RealmConnection }, QueryRealmConnectionArgs>;