import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_PermissionFields } from '~/lib/stores/fragment/fragment_PermissionFields';
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryPermissionListArgs, Role } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `query Query_role_permissions($role_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $field: StringExpression, $type: StringExpression, $permissionType: PermissionTypeExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: PermissionGroupBy, $first: Int, $last: Int, $offset: Int, $orderBy: PermissionOrderBy, $after: ID, $before: ID) {
  role(id: { val: $role_id }) ${directives}{
    ...RoleFields
    permissions(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation rolePermissionRelation: $rolePermissionRelation createTimeYear: $createTimeYear createTimeMonth: $createTimeMonth createTimeDay: $createTimeDay createTimeWeek: $createTimeWeek createTimeQuarter: $createTimeQuarter updateTimeYear: $updateTimeYear updateTimeMonth: $updateTimeMonth updateTimeDay: $updateTimeDay updateTimeWeek: $updateTimeWeek updateTimeQuarter: $updateTimeQuarter not: $not cond: $cond exs: $exs) {
      ...PermissionFields
    }
  }
}
${fragment_PermissionFields}
${fragment_RoleFields}`;

export function createQuery_role_permissions_Store(event: Event): Query_role_permissions_Store {
  return createGraphQLQueryStore<{ role: Role }, { role_id: string } & QueryPermissionListArgs>(query, event);
}

export async function fetchQuery_role_permissions_Store(event: Event, variables: { role_id: string } & QueryPermissionListArgs, params?: FetchParams | undefined): Promise<Query_role_permissions_Store> {
  return fetchGraphQLQueryStore<{ role: Role }, { role_id: string } & QueryPermissionListArgs>(query, event, variables, params);
}

export type Query_role_permissions_Store = GraphQLStore<{ role: Role }, { role_id: string } & QueryPermissionListArgs>;