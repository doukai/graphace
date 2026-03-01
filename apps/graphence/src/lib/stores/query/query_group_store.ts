import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupArgs } from '~/lib/types/schema';
import type { Group } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_group($id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupUserRelation: GroupUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [GroupExpression]) {
  group(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
    ...GroupFields
  }
}
${fragment_GroupFields}`;

export function createQuery_group_Store(event: Event): Query_group_Store {
  return createGraphQLQueryStore<Group, QueryGroupArgs>(query, event);
}

export async function fetchQuery_group_Store(event: Event, variables: QueryGroupArgs): Promise<Query_group_Store> {
  return fetchGraphQLQueryStore<Group, QueryGroupArgs>(query, event, variables);
}

export type Query_group_Store = GraphQLStore<Group, QueryGroupArgs>;