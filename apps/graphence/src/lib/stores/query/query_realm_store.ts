import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';
import type { QueryRealmArgs } from '~/lib/types/schema';
import type { Realm } from '~/lib/types/schema';

const query = /* GraphQL */ `query query_realm($id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RealmExpression]) {
  realm(id: $id name: $name description: $description includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupBy: $groupBy not: $not cond: $cond exs: $exs) {
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

export async function createQuery_realm_Store(event: LoadEvent, variables: QueryRealmArgs): Promise<Query_realm_Store> {
  return createGraphQLQueryStore<Realm, QueryRealmArgs>(query, event, variables);
}

export type Query_realm_Store = GraphQLStore<Realm, QueryRealmArgs>;