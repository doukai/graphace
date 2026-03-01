import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleListArgs, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_group_roles($group_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $rolePermissionRelation: RolePermissionRelationExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $after: ID, $before: ID) {
  group(id: { val: $group_id }) {
    ...GroupFields
    roles(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      ...RoleFields
    }
  }
}
${fragment_RoleFields}
${fragment_GroupFields}`;

export function createQuery_group_roles_Store(event: Event): Query_group_roles_Store {
  return createGraphQLQueryStore<Group, { group_id: string } & QueryRoleListArgs>(query, event);
}

export async function fetchQuery_group_roles_Store(event: Event, variables: { group_id: string } & QueryRoleListArgs): Promise<Query_group_roles_Store> {
  return fetchGraphQLQueryStore<Group, { group_id: string } & QueryRoleListArgs>(query, event, variables);
}

export type Query_group_roles_Store = GraphQLStore<Group, { group_id: string } & QueryRoleListArgs>;