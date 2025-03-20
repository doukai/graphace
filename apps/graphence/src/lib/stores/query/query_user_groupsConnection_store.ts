import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupConnectionArgs, User } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_user_groupsConnection($user_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $first: Int, $last: Int, $offset: Int, $orderBy: GroupOrderBy, $groupBy: [String!]) {
  user(where: { id: { val: $user_id } }) {
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
    groupsConnection(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      totalCount
      edges {
        node {
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
          subGroups {
            id
            name
            description
          }
          users {
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
    }
  }
}`;

export function createQuery_user_groupsConnection_Store(event: LoadEvent | RequestEvent): Query_user_groupsConnection_Store {
  return createGraphQLQueryStore<User, { user_id: string } & QueryGroupConnectionArgs>(query, event);
}

export async function fetchQuery_user_groupsConnection_Store(event: LoadEvent | RequestEvent, variables: { user_id: string } & QueryGroupConnectionArgs): Promise<Query_user_groupsConnection_Store> {
  return fetchGraphQLQueryStore<User, { user_id: string } & QueryGroupConnectionArgs>(query, event, variables);
}

export type Query_user_groupsConnection_Store = GraphQLStore<User, { user_id: string } & QueryGroupConnectionArgs>;