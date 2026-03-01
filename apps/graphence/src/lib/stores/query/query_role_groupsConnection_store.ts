import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupConnectionArgs, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_role_groupsConnection($role_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $first: Int, $last: Int, $offset: Int, $orderBy: GroupOrderBy, $groupBy: [String!]) {
  role(id: { val: $role_id }) {
    ...RoleFields
    groupsConnection(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation rolePermissionRelation: $rolePermissionRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      totalCount
      edges {
        node {
          ...GroupFields
        }
      }
    }
  }
}
${fragment_GroupFields}
${fragment_RoleFields}`;

export function createQuery_role_groupsConnection_Store(event: Event): Query_role_groupsConnection_Store {
  return createGraphQLQueryStore<Role, { role_id: string } & QueryGroupConnectionArgs>(query, event);
}

export async function fetchQuery_role_groupsConnection_Store(event: Event, variables: { role_id: string } & QueryGroupConnectionArgs): Promise<Query_role_groupsConnection_Store> {
  return fetchGraphQLQueryStore<Role, { role_id: string } & QueryGroupConnectionArgs>(query, event, variables);
}

export type Query_role_groupsConnection_Store = GraphQLStore<Role, { role_id: string } & QueryGroupConnectionArgs>;