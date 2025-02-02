import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryUserConnectionArgs } from '~/lib/types/schema';
import type { UserConnection } from '~/lib/types/schema';

const query = /* GraphQL */ `query query_userConnection($id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $orderBy: UserOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [UserExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  userConnection(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
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