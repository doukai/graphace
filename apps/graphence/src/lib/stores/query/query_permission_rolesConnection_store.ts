import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleConnectionArgs, Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_permission_rolesConnection($permission_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $rolePermissionRelation: RolePermissionRelationExpression, $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $groupBy: [String!]) {
  permission(id: { val: $permission_id }) {
    id
    name
    description
    field
    type
    permissionType
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    rolesConnection(id: $id name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId rolePermissionRelation: $rolePermissionRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      totalCount
      edges {
        node {
          id
          name
          description
          users(first: 3) {
            id
            name
            description
          }
          groups {
            id
            name
            description
          }
          composites {
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
    }
  }
}`;

export function createQuery_permission_rolesConnection_Store(event: LoadEvent | RequestEvent): Query_permission_rolesConnection_Store {
  return createGraphQLQueryStore<Permission, { permission_id: string } & QueryRoleConnectionArgs>(query, event);
}

export async function fetchQuery_permission_rolesConnection_Store(event: LoadEvent | RequestEvent, variables: { permission_id: string } & QueryRoleConnectionArgs): Promise<Query_permission_rolesConnection_Store> {
  return fetchGraphQLQueryStore<Permission, { permission_id: string } & QueryRoleConnectionArgs>(query, event, variables);
}

export type Query_permission_rolesConnection_Store = GraphQLStore<Permission, { permission_id: string } & QueryRoleConnectionArgs>;