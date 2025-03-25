import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryPermissionConnectionArgs, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_role_permissionsConnection($role_id: String, $name: StringExpression, $description: StringExpression, $field: StringExpression, $type: StringExpression, $permissionType: PermissionTypeExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $first: Int, $last: Int, $offset: Int, $orderBy: PermissionOrderBy, $groupBy: [String!]) {
  role(id: { val: $role_id }) {
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
    permissionsConnection(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation permissionRoleRelation: $permissionRoleRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      totalCount
      edges {
        node {
          name
          description
          field
          type
          permissionType
          roles(first: 3) {
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

export function createQuery_role_permissionsConnection_Store(event: LoadEvent | RequestEvent): Query_role_permissionsConnection_Store {
  return createGraphQLQueryStore<Role, { role_id: string } & QueryPermissionConnectionArgs>(query, event);
}

export async function fetchQuery_role_permissionsConnection_Store(event: LoadEvent | RequestEvent, variables: { role_id: string } & QueryPermissionConnectionArgs): Promise<Query_role_permissionsConnection_Store> {
  return fetchGraphQLQueryStore<Role, { role_id: string } & QueryPermissionConnectionArgs>(query, event, variables);
}

export type Query_role_permissionsConnection_Store = GraphQLStore<Role, { role_id: string } & QueryPermissionConnectionArgs>;