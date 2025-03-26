import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryPermissionConnectionArgs } from '~/lib/types/schema';
import type { PermissionConnection } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_permissionConnection($name: StringExpression, $description: StringExpression, $field: StringExpression, $type: StringExpression, $permissionType: PermissionTypeExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $orderBy: PermissionOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [PermissionExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  permissionConnection(name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId permissionRoleRelation: $permissionRoleRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
    totalCount
    edges {
      node {
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
  }
}`;

export function createQuery_permissionConnection_Store(event: LoadEvent | RequestEvent): Query_permissionConnection_Store {
  return createGraphQLQueryStore<PermissionConnection, QueryPermissionConnectionArgs>(query, event);
}

export async function fetchQuery_permissionConnection_Store(event: LoadEvent | RequestEvent, variables: QueryPermissionConnectionArgs): Promise<Query_permissionConnection_Store> {
  return fetchGraphQLQueryStore<PermissionConnection, QueryPermissionConnectionArgs>(query, event, variables);
}

export type Query_permissionConnection_Store = GraphQLStore<PermissionConnection, QueryPermissionConnectionArgs>;