import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleListArgs, Group } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `query Query_group_roles($group_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $rolePermissionRelation: RolePermissionRelationExpression, $createTimeYear: IntExpression, $createTimeMonth: IntExpression, $createTimeDay: IntExpression, $createTimeWeek: IntExpression, $createTimeQuarter: IntExpression, $updateTimeYear: IntExpression, $updateTimeMonth: IntExpression, $updateTimeDay: IntExpression, $updateTimeWeek: IntExpression, $updateTimeQuarter: IntExpression, $groupBy: RoleGroupBy, $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $after: ID, $before: ID) {
  group(id: { val: $group_id }) ${directives}{
    ...GroupFields
    roles(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation createTimeYear: $createTimeYear createTimeMonth: $createTimeMonth createTimeDay: $createTimeDay createTimeWeek: $createTimeWeek createTimeQuarter: $createTimeQuarter updateTimeYear: $updateTimeYear updateTimeMonth: $updateTimeMonth updateTimeDay: $updateTimeDay updateTimeWeek: $updateTimeWeek updateTimeQuarter: $updateTimeQuarter not: $not cond: $cond exs: $exs) {
      ...RoleFields
    }
  }
}
${fragment_RoleFields}
${fragment_GroupFields}`;

export function createQuery_group_roles_Store(event: Event): Query_group_roles_Store {
  return createGraphQLQueryStore<{ group: Group }, { group_id: string } & QueryRoleListArgs>(query, event);
}

export async function fetchQuery_group_roles_Store(event: Event, variables: { group_id: string } & QueryRoleListArgs, params?: FetchParams | undefined): Promise<Query_group_roles_Store> {
  return fetchGraphQLQueryStore<{ group: Group }, { group_id: string } & QueryRoleListArgs>(query, event, variables, params);
}

export type Query_group_roles_Store = GraphQLStore<{ group: Group }, { group_id: string } & QueryRoleListArgs>;