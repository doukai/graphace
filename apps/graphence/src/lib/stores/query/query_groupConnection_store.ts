import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupConnectionArgs, GroupConnection } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_groupConnection($id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupUserRelation: GroupUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $orderBy: GroupOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [GroupExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  groupConnection(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
    totalCount
    edges {
      node { 
        ...GroupFields
      }
    }
  }
}
${fragment_GroupFields}`;

export function createQuery_groupConnection_Store(event: Event): Query_groupConnection_Store {
  return createGraphQLQueryStore<{ groupConnection: GroupConnection }, QueryGroupConnectionArgs>(query, event);
}

export async function fetchQuery_groupConnection_Store(event: Event, variables: QueryGroupConnectionArgs): Promise<Query_groupConnection_Store> {
  return fetchGraphQLQueryStore<{ groupConnection: GroupConnection }, QueryGroupConnectionArgs>(query, event, variables);
}

export type Query_groupConnection_Store = GraphQLStore<{ groupConnection: GroupConnection }, QueryGroupConnectionArgs>;