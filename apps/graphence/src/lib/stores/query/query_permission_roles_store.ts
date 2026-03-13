import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { fragment_PermissionFields } from '~/lib/stores/fragment/fragment_PermissionFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleListArgs, Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_permission_roles($permission_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $rolePermissionRelation: RolePermissionRelationExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $after: ID, $before: ID) {
  permission(id: { val: $permission_id }) {
    ...PermissionFields
    roles(id: $id name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId rolePermissionRelation: $rolePermissionRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      ...RoleFields
    }
  }
}
${fragment_RoleFields}
${fragment_PermissionFields}`;

export function createQuery_permission_roles_Store(event: Event): Query_permission_roles_Store {
  return createGraphQLQueryStore<{ permission: Permission }, { permission_id: string } & QueryRoleListArgs>(query, event);
}

export async function fetchQuery_permission_roles_Store(event: Event, variables: { permission_id: string } & QueryRoleListArgs): Promise<Query_permission_roles_Store> {
  return fetchGraphQLQueryStore<{ permission: Permission }, { permission_id: string } & QueryRoleListArgs>(query, event, variables);
}

export type Query_permission_roles_Store = GraphQLStore<{ permission: Permission }, { permission_id: string } & QueryRoleListArgs>;