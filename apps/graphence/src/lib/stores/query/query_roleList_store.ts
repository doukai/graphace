import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields, fragment_RoleNamedFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleListArgs, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_roleList($id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $rolePermissionRelation: RolePermissionRelationExpression, $orderBy: RoleOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RoleExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  roleList(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation rolePermissionRelation: $rolePermissionRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
    ...RoleFields
  }
}
${fragment_RoleFields}`;

export function createQuery_roleList_Store(event: Event): Query_roleList_Store {
  return createGraphQLQueryStore<{ roleList: Role[] }, QueryRoleListArgs>(query, event);
}

export async function fetchQuery_roleList_Store(event: Event, variables: QueryRoleListArgs): Promise<Query_roleList_Store> {
  return fetchGraphQLQueryStore<{ roleList: Role[] }, QueryRoleListArgs>(query, event, variables);
}

export type Query_roleList_Store = GraphQLStore<{ roleList: Role[] }, QueryRoleListArgs>;

const queryNamed = /* GraphQL */ `query QueryNamed_roleList($id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $rolePermissionRelation: RolePermissionRelationExpression, $orderBy: RoleOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RoleExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  roleList(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation rolePermissionRelation: $rolePermissionRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
    ...RoleNamedFields
  }
}
${fragment_RoleNamedFields}`;

export function createQueryNamed_roleList_Store(event: Event): QueryNamed_roleList_Store {
  return createGraphQLQueryStore<{ roleList: Role[] }, QueryRoleListArgs>(queryNamed, event);
}

export async function fetchQueryNamed_roleList_Store(event: Event, variables: QueryRoleListArgs): Promise<QueryNamed_roleList_Store> {
  return fetchGraphQLQueryStore<{ roleList: Role[] }, QueryRoleListArgs>(queryNamed, event, variables);
}

export type QueryNamed_roleList_Store = GraphQLStore<{ roleList: Role[] }, QueryRoleListArgs>;