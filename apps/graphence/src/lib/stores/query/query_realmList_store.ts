import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRealmListArgs } from '~/lib/types/schema';
import type { Realm } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_realmList($id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $orderBy: RealmOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RealmExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  realmList(id: $id name: $name description: $description includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
    id
    name
    description
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

export function createQuery_realmList_Store(event: LoadEvent | RequestEvent): Query_realmList_Store {
  return createGraphQLQueryStore<Realm[], QueryRealmListArgs>(query, event);
}

export async function fetchQuery_realmList_Store(event: LoadEvent | RequestEvent, variables: QueryRealmListArgs): Promise<Query_realmList_Store> {
  return fetchGraphQLQueryStore<Realm[], QueryRealmListArgs>(query, event, variables);
}

export type Query_realmList_Store = GraphQLStore<Realm[], QueryRealmListArgs>;