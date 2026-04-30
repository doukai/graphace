import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_PermissionFields } from '~/lib/stores/fragment/fragment_PermissionFields';
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryPermissionConnectionArgs, Role } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_role_permissionsConnection($role_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $field: StringExpression, $type: StringExpression, $permissionType: PermissionTypeExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $first: Int, $last: Int, $offset: Int, $orderBy: PermissionOrderBy, $groupBy: PermissionGroupBy) {
  role(id: { val: $role_id }) ${directives}{
    ...RoleFields
    permissionsConnection(id: $id name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId first: $first last: $last offset: $offset orderBy: $orderBy groupBy: $groupBy) {
      totalCount
      edges {
        node {
          ...PermissionFields
          ${fields}
        }
      }
    }
  }
}
${fragment_PermissionFields}
${fragment_RoleFields}`;

export function createQuery_role_permissionsConnection_Store(event: Event): Query_role_permissionsConnection_Store {
  return createGraphQLQueryStore<{ role: Role }, { role_id: string } & QueryPermissionConnectionArgs>(query, event);
}

export async function fetchQuery_role_permissionsConnection_Store(event: Event, variables: { role_id: string } & QueryPermissionConnectionArgs, params?: FetchParams | undefined): Promise<Query_role_permissionsConnection_Store> {
  return fetchGraphQLQueryStore<{ role: Role }, { role_id: string } & QueryPermissionConnectionArgs>(query, event, variables, params);
}

export type Query_role_permissionsConnection_Store = GraphQLStore<{ role: Role }, { role_id: string } & QueryPermissionConnectionArgs>;