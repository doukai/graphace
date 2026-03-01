import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_PermissionFields } from '~/lib/stores/fragment/fragment_PermissionFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryPermissionListArgs } from '~/lib/types/schema';
import type { Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_permissionList($id: StringExpression, $name: StringExpression, $description: StringExpression, $field: StringExpression, $type: StringExpression, $permissionType: PermissionTypeExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $rolePermissionRelation: RolePermissionRelationExpression, $orderBy: PermissionOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [PermissionExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  permissionList(id: $id name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId rolePermissionRelation: $rolePermissionRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
    ...PermissionFields
  }
}
${fragment_PermissionFields}`;

export function createQuery_permissionList_Store(event: Event): Query_permissionList_Store {
  return createGraphQLQueryStore<Permission[], QueryPermissionListArgs>(query, event);
}

export async function fetchQuery_permissionList_Store(event: Event, variables: QueryPermissionListArgs): Promise<Query_permissionList_Store> {
  return fetchGraphQLQueryStore<Permission[], QueryPermissionListArgs>(query, event, variables);
}

export type Query_permissionList_Store = GraphQLStore<Permission[], QueryPermissionListArgs>;