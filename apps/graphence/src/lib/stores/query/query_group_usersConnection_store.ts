import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryUserConnectionArgs, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_group_usersConnection($group_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $first: Int, $last: Int, $offset: Int, $orderBy: UserOrderBy, $groupBy: [String!]) {
  group(id: { val: $group_id }) {
    id
    name
    description
    path
    deep
    parentId
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    usersConnection(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
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

export function createQuery_group_usersConnection_Store(event: LoadEvent | RequestEvent): Query_group_usersConnection_Store {
  return createGraphQLQueryStore<Group, { group_id: string } & QueryUserConnectionArgs>(query, event);
}

export async function fetchQuery_group_usersConnection_Store(event: LoadEvent | RequestEvent, variables: { group_id: string } & QueryUserConnectionArgs): Promise<Query_group_usersConnection_Store> {
  return fetchGraphQLQueryStore<Group, { group_id: string } & QueryUserConnectionArgs>(query, event, variables);
}

export type Query_group_usersConnection_Store = GraphQLStore<Group, { group_id: string } & QueryUserConnectionArgs>;