import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryUserArgs } from '~/lib/types/schema';
import type { User } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_user($id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $file: FileExpression, $files: FileExpression, $booleanList: BooleanExpression, $intList: IntExpression, $typeList: PermissionTypeExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $fileUserRelation: FileUserRelationExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $userBooleanListRelation: UserBooleanListRelationExpression, $userIntListRelation: UserIntListRelationExpression, $userTypeListRelation: UserTypeListRelationExpression, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [UserExpression]) {
  user(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm file: $file files: $files booleanList: $booleanList intList: $intList typeList: $typeList includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId fileUserRelation: $fileUserRelation userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation userBooleanListRelation: $userBooleanListRelation userIntListRelation: $userIntListRelation userTypeListRelation: $userTypeListRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
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
    file {
      id
      name
    }
    files {
      id
      name
    }
    booleanList
    intList
    typeList
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