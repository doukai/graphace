import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleArgs } from '~/lib/types/schema';
import type { Role } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_role($id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RoleExpression]) {
  role(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation permissionRoleRelation: $permissionRoleRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
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
}`;

export function createQuery_role_Store(event: LoadEvent | RequestEvent): Query_role_Store {
  return createGraphQLQueryStore<Role, QueryRoleArgs>(query, event);
}

export async function fetchQuery_role_Store(event: LoadEvent | RequestEvent, variables: QueryRoleArgs): Promise<Query_role_Store> {
  return fetchGraphQLQueryStore<Role, QueryRoleArgs>(query, event, variables);
}

export type Query_role_Store = GraphQLStore<Role, QueryRoleArgs>;