import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryPermissionListArgs, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_role_permissions($role_id: String, $name: StringExpression, $description: StringExpression, $field: StringExpression, $type: StringExpression, $permissionType: PermissionTypeExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: PermissionOrderBy, $after: ID, $before: ID) {
  role(id: $role_id) {
    id
    name
    description
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    permissions(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation permissionRoleRelation: $permissionRoleRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      name
      description
      field
      type
      permissionType
      roles {
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

export function createQuery_role_permissions_Store(event: LoadEvent | RequestEvent): Query_role_permissions_Store {
  return createGraphQLQueryStore<Role, { role_id: string } & QueryPermissionListArgs>(query, event);
}

export async function fetchQuery_role_permissions_Store(event: LoadEvent | RequestEvent, variables: { role_id: string } & QueryPermissionListArgs): Promise<Query_role_permissions_Store> {
  return fetchGraphQLQueryStore<Role, { role_id: string } & QueryPermissionListArgs>(query, event, variables);
}

export type Query_role_permissions_Store = GraphQLStore<Role, { role_id: string } & QueryPermissionListArgs>;