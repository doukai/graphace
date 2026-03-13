import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_RealmFields } from '~/lib/stores/fragment/fragment_RealmFields';
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRealmArgs, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_group_realm($group_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!]) {
  group(id: { val: $group_id }) {
    ...GroupFields
    realm(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      ...RealmFields
    }
  }
}
${fragment_RealmFields}
${fragment_GroupFields}`;

export function createQuery_group_realm_Store(event: Event): Query_group_realm_Store {
  return createGraphQLQueryStore<{ group: Group }, { group_id: string } & QueryRealmArgs>(query, event);
}

export async function fetchQuery_group_realm_Store(event: Event, variables: { group_id: string } & QueryRealmArgs): Promise<Query_group_realm_Store> {
  return fetchGraphQLQueryStore<{ group: Group }, { group_id: string } & QueryRealmArgs>(query, event, variables);
}

export type Query_group_realm_Store = GraphQLStore<{ group: Group }, { group_id: string } & QueryRealmArgs>;