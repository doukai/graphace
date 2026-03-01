import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_PermissionFields } from '~/lib/stores/fragment/fragment_PermissionFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryPermissionArgs } from '~/lib/types/schema';
import type { Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_permission($id: StringExpression, $name: StringExpression, $description: StringExpression, $field: StringExpression, $type: StringExpression, $permissionType: PermissionTypeExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $rolePermissionRelation: RolePermissionRelationExpression, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [PermissionExpression]) {
  permission(id: $id name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId rolePermissionRelation: $rolePermissionRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
    ...PermissionFields
  }
}
${fragment_PermissionFields}`;

export function createQuery_permission_Store(event: Event): Query_permission_Store {
  return createGraphQLQueryStore<Permission, QueryPermissionArgs>(query, event);
}

export async function fetchQuery_permission_Store(event: Event, variables: QueryPermissionArgs): Promise<Query_permission_Store> {
  return fetchGraphQLQueryStore<Permission, QueryPermissionArgs>(query, event, variables);
}

export type Query_permission_Store = GraphQLStore<Permission, QueryPermissionArgs>;