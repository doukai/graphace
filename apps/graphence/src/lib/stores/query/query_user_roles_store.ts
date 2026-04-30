import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleListArgs, User } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_user_roles($user_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: RoleGroupBy, $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $after: ID, $before: ID) {
  user(id: { val: $user_id }) ${directives}{
    ...UserFields
    roles(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupBy: $groupBy first: $first last: $last offset: $offset orderBy: $orderBy after: $after before: $before) {
      ...RoleFields
      ${fields}
    }
  }
}
${fragment_RoleFields}
${fragment_UserFields}`;

export function createQuery_user_roles_Store(event: Event): Query_user_roles_Store {
  return createGraphQLQueryStore<{ user: User }, { user_id: string } & QueryRoleListArgs>(query, event);
}

export async function fetchQuery_user_roles_Store(event: Event, variables: { user_id: string } & QueryRoleListArgs, params?: FetchParams | undefined): Promise<Query_user_roles_Store> {
  return fetchGraphQLQueryStore<{ user: User }, { user_id: string } & QueryRoleListArgs>(query, event, variables, params);
}

export type Query_user_roles_Store = GraphQLStore<{ user: User }, { user_id: string } & QueryRoleListArgs>;