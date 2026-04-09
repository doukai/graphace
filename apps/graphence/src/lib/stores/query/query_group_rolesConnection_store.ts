import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleConnectionArgs, Group } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `query Query_group_rolesConnection($group_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $rolePermissionRelation: RolePermissionRelationExpression, $createTimeYear: IntExpression, $createTimeMonth: IntExpression, $createTimeDay: IntExpression, $createTimeWeek: IntExpression, $createTimeQuarter: IntExpression, $updateTimeYear: IntExpression, $updateTimeMonth: IntExpression, $updateTimeDay: IntExpression, $updateTimeWeek: IntExpression, $updateTimeQuarter: IntExpression, $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $groupBy: RoleGroupBy) {
  group(id: { val: $group_id }) ${directives}{
    ...GroupFields
    rolesConnection(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation createTimeYear: $createTimeYear createTimeMonth: $createTimeMonth createTimeDay: $createTimeDay createTimeWeek: $createTimeWeek createTimeQuarter: $createTimeQuarter updateTimeYear: $updateTimeYear updateTimeMonth: $updateTimeMonth updateTimeDay: $updateTimeDay updateTimeWeek: $updateTimeWeek updateTimeQuarter: $updateTimeQuarter not: $not cond: $cond exs: $exs) {
      totalCount
      edges {
        node {
          ...RoleFields
        }
      }
    }
  }
}
${fragment_RoleFields}
${fragment_GroupFields}`;

export function createQuery_group_rolesConnection_Store(event: Event): Query_group_rolesConnection_Store {
  return createGraphQLQueryStore<{ group: Group }, { group_id: string } & QueryRoleConnectionArgs>(query, event);
}

export async function fetchQuery_group_rolesConnection_Store(event: Event, variables: { group_id: string } & QueryRoleConnectionArgs, params?: FetchParams | undefined): Promise<Query_group_rolesConnection_Store> {
  return fetchGraphQLQueryStore<{ group: Group }, { group_id: string } & QueryRoleConnectionArgs>(query, event, variables, params);
}

export type Query_group_rolesConnection_Store = GraphQLStore<{ group: Group }, { group_id: string } & QueryRoleConnectionArgs>;