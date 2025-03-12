import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRealmConnectionArgs } from '~/lib/types/schema';
import type { RealmConnection } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_realmConnection($id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $orderBy: RealmOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RealmExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  realmConnection(id: $id name: $name description: $description includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
    totalCount
    edges {
      node {
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
    }
  }
}`;

export function createQuery_realmConnection_Store(event: LoadEvent | RequestEvent): Query_realmConnection_Store {
  return createGraphQLQueryStore<RealmConnection, QueryRealmConnectionArgs>(query, event);
}

export async function fetchQuery_realmConnection_Store(event: LoadEvent | RequestEvent, variables: QueryRealmConnectionArgs): Promise<Query_realmConnection_Store> {
  return fetchGraphQLQueryStore<RealmConnection, QueryRealmConnectionArgs>(query, event, variables);
}

export type Query_realmConnection_Store = GraphQLStore<RealmConnection, QueryRealmConnectionArgs>;