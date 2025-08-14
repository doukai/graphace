import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryUserListArgs, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_role_users($role_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: UserOrderBy, $after: ID, $before: ID) {
  role(id: { val: $role_id }) {
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
    users(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation rolePermissionRelation: $rolePermissionRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      id
      name
      description
      lastName
      login
      email
      phones
      disable
      groups {
        id
        name
        description
      }
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
}`;

export function createQuery_role_users_Store(event: LoadEvent | RequestEvent): Query_role_users_Store {
  return createGraphQLQueryStore<Role, { role_id: string } & QueryUserListArgs>(query, event);
}

export async function fetchQuery_role_users_Store(event: LoadEvent | RequestEvent, variables: { role_id: string } & QueryUserListArgs): Promise<Query_role_users_Store> {
  return fetchGraphQLQueryStore<Role, { role_id: string } & QueryUserListArgs>(query, event, variables);
}

export type Query_role_users_Store = GraphQLStore<Role, { role_id: string } & QueryUserListArgs>;