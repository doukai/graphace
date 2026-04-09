import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_RealmFields, fragment_RealmNamedFields } from '~/lib/stores/fragment/fragment_RealmFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRealmListArgs } from '~/lib/types/schema';
import type { Realm } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `query Query_realmList($id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $createTimeYear: IntExpression, $createTimeMonth: IntExpression, $createTimeDay: IntExpression, $createTimeWeek: IntExpression, $createTimeQuarter: IntExpression, $updateTimeYear: IntExpression, $updateTimeMonth: IntExpression, $updateTimeDay: IntExpression, $updateTimeWeek: IntExpression, $updateTimeQuarter: IntExpression, $orderBy: RealmOrderBy, $groupBy: RealmGroupBy, $not: Boolean, $cond: Conditional, $exs: [RealmExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  realmList(id: $id name: $name description: $description includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId createTimeYear: $createTimeYear createTimeMonth: $createTimeMonth createTimeDay: $createTimeDay createTimeWeek: $createTimeWeek createTimeQuarter: $createTimeQuarter updateTimeYear: $updateTimeYear updateTimeMonth: $updateTimeMonth updateTimeDay: $updateTimeDay updateTimeWeek: $updateTimeWeek updateTimeQuarter: $updateTimeQuarter orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) ${directives}{
    ...RealmFields
  }
}
${fragment_RealmFields}`;

export function createQuery_realmList_Store(event: Event): Query_realmList_Store {
  return createGraphQLQueryStore<{ realmList: Realm[] }, QueryRealmListArgs>(query, event);
}

export async function fetchQuery_realmList_Store(event: Event, variables: QueryRealmListArgs): Promise<Query_realmList_Store> {
  return fetchGraphQLQueryStore<{ realmList: Realm[] }, QueryRealmListArgs>(query, event, variables);
}

export type Query_realmList_Store = GraphQLStore<{ realmList: Realm[] }, QueryRealmListArgs>;

const queryNamed = ({ directives }: QueryParams) =>/* GraphQL */ `query QueryNamed_realmList($id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $createTimeYear: IntExpression, $createTimeMonth: IntExpression, $createTimeDay: IntExpression, $createTimeWeek: IntExpression, $createTimeQuarter: IntExpression, $updateTimeYear: IntExpression, $updateTimeMonth: IntExpression, $updateTimeDay: IntExpression, $updateTimeWeek: IntExpression, $updateTimeQuarter: IntExpression, $orderBy: RealmOrderBy, $groupBy: RealmGroupBy, $not: Boolean, $cond: Conditional, $exs: [RealmExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  realmList(id: $id name: $name description: $description includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId createTimeYear: $createTimeYear createTimeMonth: $createTimeMonth createTimeDay: $createTimeDay createTimeWeek: $createTimeWeek createTimeQuarter: $createTimeQuarter updateTimeYear: $updateTimeYear updateTimeMonth: $updateTimeMonth updateTimeDay: $updateTimeDay updateTimeWeek: $updateTimeWeek updateTimeQuarter: $updateTimeQuarter orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) ${directives}{
    ...RealmNamedFields
  }
}
${fragment_RealmNamedFields}`;

export function createQueryNamed_realmList_Store(event: Event): QueryNamed_realmList_Store {
  return createGraphQLQueryStore<{ realmList: Realm[] }, QueryRealmListArgs>(queryNamed, event);
}

export async function fetchQueryNamed_realmList_Store(event: Event, variables: QueryRealmListArgs, params?: FetchParams | undefined): Promise<QueryNamed_realmList_Store> {
  return fetchGraphQLQueryStore<{ realmList: Realm[] }, QueryRealmListArgs>(queryNamed, event, variables, params);
}

export type QueryNamed_realmList_Store = GraphQLStore<{ realmList: Realm[] }, QueryRealmListArgs>;