import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupConnectionArgs, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_group_subGroupsConnection($group_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupUserRelation: GroupUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $first: Int, $last: Int, $offset: Int, $orderBy: GroupOrderBy, $groupBy: [String!]) {
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
    subGroupsConnection(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
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
    }
  }
}`;

export function createQuery_group_subGroupsConnection_Store(event: LoadEvent | RequestEvent): Query_group_subGroupsConnection_Store {
  return createGraphQLQueryStore<Group, { group_id: string } & QueryGroupConnectionArgs>(query, event);
}

export async function fetchQuery_group_subGroupsConnection_Store(event: LoadEvent | RequestEvent, variables: { group_id: string } & QueryGroupConnectionArgs): Promise<Query_group_subGroupsConnection_Store> {
  return fetchGraphQLQueryStore<Group, { group_id: string } & QueryGroupConnectionArgs>(query, event, variables);
}

export type Query_group_subGroupsConnection_Store = GraphQLStore<Group, { group_id: string } & QueryGroupConnectionArgs>;