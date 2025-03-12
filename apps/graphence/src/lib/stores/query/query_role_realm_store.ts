import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRealmArgs, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_role_realm($role_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!]) {
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
    realm(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation permissionRoleRelation: $permissionRoleRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
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

export function createQuery_role_realm_Store(event: LoadEvent | RequestEvent): Query_role_realm_Store {
  return createGraphQLQueryStore<Role, { role_id: string } & QueryRealmArgs>(query, event);
}

export async function fetchQuery_role_realm_Store(event: LoadEvent | RequestEvent, variables: { role_id: string } & QueryRealmArgs): Promise<Query_role_realm_Store> {
  return fetchGraphQLQueryStore<Role, { role_id: string } & QueryRealmArgs>(query, event, variables);
}

export type Query_role_realm_Store = GraphQLStore<Role, { role_id: string } & QueryRealmArgs>;