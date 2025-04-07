import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryUserConnectionArgs } from '~/lib/types/schema';
import type { UserConnection } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_userConnection($id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $file: FileExpression, $files: FileExpression, $booleanList: BooleanExpression, $intList: IntExpression, $typeList: PermissionTypeExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $fileUserRelation: FileUserRelationExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $userBooleanListRelation: UserBooleanListRelationExpression, $userIntListRelation: UserIntListRelationExpression, $userTypeListRelation: UserTypeListRelationExpression, $orderBy: UserOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [UserExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  userConnection(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm file: $file files: $files booleanList: $booleanList intList: $intList typeList: $typeList includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId fileUserRelation: $fileUserRelation userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation userBooleanListRelation: $userBooleanListRelation userIntListRelation: $userIntListRelation userTypeListRelation: $userTypeListRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
    totalCount
    edges {
      node {
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
    }
  }
}`;

export function createQuery_userConnection_Store(event: LoadEvent | RequestEvent): Query_userConnection_Store {
  return createGraphQLQueryStore<UserConnection, QueryUserConnectionArgs>(query, event);
}

export async function fetchQuery_userConnection_Store(event: LoadEvent | RequestEvent, variables: QueryUserConnectionArgs): Promise<Query_userConnection_Store> {
  return fetchGraphQLQueryStore<UserConnection, QueryUserConnectionArgs>(query, event, variables);
}

export type Query_userConnection_Store = GraphQLStore<UserConnection, QueryUserConnectionArgs>;