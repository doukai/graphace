import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupListArgs, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_role_groups($role_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: GroupOrderBy, $after: ID, $before: ID) {
  role(id: { val: $role_id }) {
    ...RoleFields
    groups(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation rolePermissionRelation: $rolePermissionRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      ...GroupFields
    }
  }
}
${fragment_GroupFields}
${fragment_RoleFields}`;

export function createQuery_role_groups_Store(event: Event): Query_role_groups_Store {
  return createGraphQLQueryStore<{ role: Role }, { role_id: string } & QueryGroupListArgs>(query, event);
}

export async function fetchQuery_role_groups_Store(event: Event, variables: { role_id: string } & QueryGroupListArgs): Promise<Query_role_groups_Store> {
  return fetchGraphQLQueryStore<{ role: Role }, { role_id: string } & QueryGroupListArgs>(query, event, variables);
}

export type Query_role_groups_Store = GraphQLStore<{ role: Role }, { role_id: string } & QueryGroupListArgs>;