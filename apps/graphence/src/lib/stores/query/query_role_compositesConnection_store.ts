import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleConnectionArgs, Role } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_role_compositesConnection($role_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $rolePermissionRelation: RolePermissionRelationExpression, $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $groupBy: RoleGroupBy) {
  role(id: { val: $role_id }) ${directives}{
    ...RoleFields
    compositesConnection(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation rolePermissionRelation: $rolePermissionRelation first: $first last: $last offset: $offset orderBy: $orderBy groupBy: $groupBy) {
      totalCount
      edges {
        node {
          ...RoleFields
          ${fields}
        }
      }
    }
  }
}
${fragment_RoleFields}`;

export function createQuery_role_compositesConnection_Store(event: Event): Query_role_compositesConnection_Store {
  return createGraphQLQueryStore<{ role: Role }, { role_id: string } & QueryRoleConnectionArgs>(query, event);
}

export async function fetchQuery_role_compositesConnection_Store(event: Event, variables: { role_id: string } & QueryRoleConnectionArgs, params?: FetchParams | undefined): Promise<Query_role_compositesConnection_Store> {
  return fetchGraphQLQueryStore<{ role: Role }, { role_id: string } & QueryRoleConnectionArgs>(query, event, variables, params);
}

export type Query_role_compositesConnection_Store = GraphQLStore<{ role: Role }, { role_id: string } & QueryRoleConnectionArgs>;