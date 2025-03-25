import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleListArgs, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_group_roles($group_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $after: ID, $before: ID) {
  group(id: { val: $group_id }) {
    id
    name
    description
    path
    deep
    parentId
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    roles(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      id
      name
      description
      users(first: 3) {
        id
        name
        description
      }
      groups(first: 3) {
        id
        name
        description
      }
      composites(first: 3) {
        id
        name
        description
      }
      realm {
        id
        name
        description
      }
      isDeprecated
      version
      realmId
      createUserId
      createTime
      updateUserId
      updateTime
      createGroupId
    }
  }
}`;

export function createQuery_group_roles_Store(event: LoadEvent | RequestEvent): Query_group_roles_Store {
  return createGraphQLQueryStore<Group, { group_id: string } & QueryRoleListArgs>(query, event);
}

export async function fetchQuery_group_roles_Store(event: LoadEvent | RequestEvent, variables: { group_id: string } & QueryRoleListArgs): Promise<Query_group_roles_Store> {
  return fetchGraphQLQueryStore<Group, { group_id: string } & QueryRoleListArgs>(query, event, variables);
}

export type Query_group_roles_Store = GraphQLStore<Group, { group_id: string } & QueryRoleListArgs>;