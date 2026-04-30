import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupConnectionArgs, Group } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_group_subGroupsConnection($group_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupUserRelation: GroupUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $first: Int, $last: Int, $offset: Int, $orderBy: GroupOrderBy, $groupBy: GroupGroupBy) {
  group(id: { val: $group_id }) ${directives}{
    ...GroupFields
    subGroupsConnection(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation first: $first last: $last offset: $offset orderBy: $orderBy groupBy: $groupBy) {
      totalCount
      edges {
        node {
          ...GroupFields
          ${fields}
        }
      }
    }
  }
}
${fragment_GroupFields}`;

export function createQuery_group_subGroupsConnection_Store(event: Event): Query_group_subGroupsConnection_Store {
  return createGraphQLQueryStore<{ group: Group }, { group_id: string } & QueryGroupConnectionArgs>(query, event);
}

export async function fetchQuery_group_subGroupsConnection_Store(event: Event, variables: { group_id: string } & QueryGroupConnectionArgs, params?: FetchParams | undefined): Promise<Query_group_subGroupsConnection_Store> {
  return fetchGraphQLQueryStore<{ group: Group }, { group_id: string } & QueryGroupConnectionArgs>(query, event, variables, params);
}

export type Query_group_subGroupsConnection_Store = GraphQLStore<{ group: Group }, { group_id: string } & QueryGroupConnectionArgs>;