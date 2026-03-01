import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleListArgs, User } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_user_roles($user_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $after: ID, $before: ID) {
  user(id: { val: $user_id }) {
    ...UserFields
    roles(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      ...RoleFields
    }
  }
}
${fragment_RoleFields}
${fragment_UserFields}`;

export function createQuery_user_roles_Store(event: Event): Query_user_roles_Store {
  return createGraphQLQueryStore<User, { user_id: string } & QueryRoleListArgs>(query, event);
}

export async function fetchQuery_user_roles_Store(event: Event, variables: { user_id: string } & QueryRoleListArgs): Promise<Query_user_roles_Store> {
  return fetchGraphQLQueryStore<User, { user_id: string } & QueryRoleListArgs>(query, event, variables);
}

export type Query_user_roles_Store = GraphQLStore<User, { user_id: string } & QueryRoleListArgs>;