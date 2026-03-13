import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleArgs, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_role($id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $rolePermissionRelation: RolePermissionRelationExpression, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RoleExpression]) {
  role(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation rolePermissionRelation: $rolePermissionRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
    ...RoleFields
  }
}
${fragment_RoleFields}`;

export function createQuery_role_Store(event: Event): Query_role_Store {
  return createGraphQLQueryStore<{ role: Role }, QueryRoleArgs>(query, event);
}

export async function fetchQuery_role_Store(event: Event, variables: QueryRoleArgs): Promise<Query_role_Store> {
  return fetchGraphQLQueryStore<{ role: Role }, QueryRoleArgs>(query, event, variables);
}

export type Query_role_Store = GraphQLStore<{ role: Role }, QueryRoleArgs>;