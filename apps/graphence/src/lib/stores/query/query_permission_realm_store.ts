import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRealmArgs, Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_permission_realm($permission_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!]) {
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
    realm(id: $id name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId rolePermissionRelation: $rolePermissionRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
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
    }
  }
}`;

export function createQuery_permission_realm_Store(event: LoadEvent | RequestEvent): Query_permission_realm_Store {
  return createGraphQLQueryStore<Permission, { permission_id: string } & QueryRealmArgs>(query, event);
}

export async function fetchQuery_permission_realm_Store(event: LoadEvent | RequestEvent, variables: { permission_id: string } & QueryRealmArgs): Promise<Query_permission_realm_Store> {
  return fetchGraphQLQueryStore<Permission, { permission_id: string } & QueryRealmArgs>(query, event, variables);
}

export type Query_permission_realm_Store = GraphQLStore<Permission, { permission_id: string } & QueryRealmArgs>;