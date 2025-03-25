import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryUserArgs } from '~/lib/types/schema';
import type { User } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_user($id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [UserExpression]) {
  user(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
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

export function createQuery_user_Store(event: LoadEvent | RequestEvent): Query_user_Store {
  return createGraphQLQueryStore<User, QueryUserArgs>(query, event);
}

export async function fetchQuery_user_Store(event: LoadEvent | RequestEvent, variables: QueryUserArgs): Promise<Query_user_Store> {
  return fetchGraphQLQueryStore<User, QueryUserArgs>(query, event, variables);
}

export type Query_user_Store = GraphQLStore<User, QueryUserArgs>;