import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryPermissionArgs } from '~/lib/types/schema';
import type { Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `query query_permission($name: StringExpression, $description: StringExpression, $field: StringExpression, $type: StringExpression, $permissionType: PermissionTypeExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [PermissionExpression]) {
  permission(name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId permissionRoleRelation: $permissionRoleRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
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
    roles {
      id
      name
      description
    }
    realm {
      name
      description
    }
  }
}`;

export function createQuery_permission_Store(event: LoadEvent | RequestEvent): Query_permission_Store {
  return createGraphQLQueryStore<Permission, QueryPermissionArgs>(query, event);
}

export async function fetchQuery_permission_Store(event: LoadEvent | RequestEvent, variables: QueryPermissionArgs): Promise<Query_permission_Store> {
  return fetchGraphQLQueryStore<Permission, QueryPermissionArgs>(query, event, variables);
}

export type Query_permission_Store = GraphQLStore<Permission, QueryPermissionArgs>;