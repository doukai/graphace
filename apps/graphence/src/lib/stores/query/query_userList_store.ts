import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryUserListArgs } from '~/lib/types/schema';
import type { User } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_userList($id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $orderBy: UserOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [UserExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  userList(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
    id
    name
    description
    lastName
    login
    email
    phones
    disable
    groups(first: 3) {
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
}`;

export function createQuery_userList_Store(event: LoadEvent | RequestEvent): Query_userList_Store {
  return createGraphQLQueryStore<User[], QueryUserListArgs>(query, event);
}

export async function fetchQuery_userList_Store(event: LoadEvent | RequestEvent, variables: QueryUserListArgs): Promise<Query_userList_Store> {
  return fetchGraphQLQueryStore<User[], QueryUserListArgs>(query, event, variables);
}

export type Query_userList_Store = GraphQLStore<User[], QueryUserListArgs>;