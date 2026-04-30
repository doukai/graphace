import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleConnectionArgs, User } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_user_rolesConnection($user_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $groupBy: RoleGroupBy) {
  user(id: { val: $user_id }) ${directives}{
    ...UserFields
    rolesConnection(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId first: $first last: $last offset: $offset orderBy: $orderBy groupBy: $groupBy) {
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
${fragment_RoleFields}
${fragment_UserFields}`;

export function createQuery_user_rolesConnection_Store(event: Event): Query_user_rolesConnection_Store {
  return createGraphQLQueryStore<{ user: User }, { user_id: string } & QueryRoleConnectionArgs>(query, event);
}

export async function fetchQuery_user_rolesConnection_Store(event: Event, variables: { user_id: string } & QueryRoleConnectionArgs, params?: FetchParams | undefined): Promise<Query_user_rolesConnection_Store> {
  return fetchGraphQLQueryStore<{ user: User }, { user_id: string } & QueryRoleConnectionArgs>(query, event, variables, params);
}

export type Query_user_rolesConnection_Store = GraphQLStore<{ user: User }, { user_id: string } & QueryRoleConnectionArgs>;