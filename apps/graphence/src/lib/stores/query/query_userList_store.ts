import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_UserFields, fragment_UserNamedFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryUserListArgs, User } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_userList($id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $orderBy: UserOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [UserExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  userList(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
    ...UserFields
  }
}
${fragment_UserFields}`;

export function createQuery_userList_Store(event: Event): Query_userList_Store {
  return createGraphQLQueryStore<{ userList: User[] }, QueryUserListArgs>(query, event);
}

export async function fetchQuery_userList_Store(event: Event, variables: QueryUserListArgs): Promise<Query_userList_Store> {
  return fetchGraphQLQueryStore<{ userList: User[] }, QueryUserListArgs>(query, event, variables);
}

export type Query_userList_Store = GraphQLStore<{ userList: User[] }, QueryUserListArgs>;

const queryNamed = /* GraphQL */ `query QueryNamed_userList($id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $orderBy: UserOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [UserExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  userList(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
    ...UserNamedFields
  }
}
${fragment_UserNamedFields}`;

export function createQueryNamed_userList_Store(event: Event): QueryNamed_userList_Store {
  return createGraphQLQueryStore<{ userList: User[] }, QueryUserListArgs>(queryNamed, event);
}

export async function fetchQueryNamed_userList_Store(event: Event, variables: QueryUserListArgs): Promise<QueryNamed_userList_Store> {
  return fetchGraphQLQueryStore<{ userList: User[] }, QueryUserListArgs>(queryNamed, event, variables);
}

export type QueryNamed_userList_Store = GraphQLStore<{ userList: User[] }, QueryUserListArgs>;