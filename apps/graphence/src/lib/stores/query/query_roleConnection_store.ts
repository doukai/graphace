import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleConnectionArgs } from '~/lib/types/schema';
import type { RoleConnection } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_roleConnection($id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $orderBy: RoleOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [RoleExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  roleConnection(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation permissionRoleRelation: $permissionRoleRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
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
}`;

export function createQuery_roleConnection_Store(event: LoadEvent | RequestEvent): Query_roleConnection_Store {
  return createGraphQLQueryStore<RoleConnection, QueryRoleConnectionArgs>(query, event);
}

export async function fetchQuery_roleConnection_Store(event: LoadEvent | RequestEvent, variables: QueryRoleConnectionArgs): Promise<Query_roleConnection_Store> {
  return fetchGraphQLQueryStore<RoleConnection, QueryRoleConnectionArgs>(query, event, variables);
}

export type Query_roleConnection_Store = GraphQLStore<RoleConnection, QueryRoleConnectionArgs>;