import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupListArgs, User } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_user_groups($user_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: GroupOrderBy, $after: ID, $before: ID) {
  user(id: { val: $user_id }) {
    id
    name
    description
    lastName
    login
    email
    phones
    disable
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    groups(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      id
      name
      description
      path
      deep
      parentId
      parent {
        id
        name
        description
      }
      subGroups(first: 3) {
        id
        name
        description
      }
      users(first: 3) {
        id
        name
        description
      }
      roles(first: 3) {
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

export function createQuery_user_groups_Store(event: LoadEvent | RequestEvent): Query_user_groups_Store {
  return createGraphQLQueryStore<User, { user_id: string } & QueryGroupListArgs>(query, event);
}

export async function fetchQuery_user_groups_Store(event: LoadEvent | RequestEvent, variables: { user_id: string } & QueryGroupListArgs): Promise<Query_user_groups_Store> {
  return fetchGraphQLQueryStore<User, { user_id: string } & QueryGroupListArgs>(query, event, variables);
}

export type Query_user_groups_Store = GraphQLStore<User, { user_id: string } & QueryGroupListArgs>;