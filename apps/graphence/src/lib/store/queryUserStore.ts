import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';
import type { QueryUserArgs, User } from '../types/schema';

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
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
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
      name
      description
    }
  }
}`;

export async function createQueryUserStore(event: LoadEvent, variables: QueryUserArgs): Promise<GraphQLStore<User, QueryUserArgs>> {
  return createGraphQLQueryStore<User, QueryUserArgs>(query, event, variables);
}