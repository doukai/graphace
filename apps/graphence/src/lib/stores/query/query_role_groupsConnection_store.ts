import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupConnectionArgs, Role } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_role_groupsConnection($role_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $first: Int, $last: Int, $offset: Int, $orderBy: GroupOrderBy, $groupBy: GroupGroupBy) {
  role(id: { val: $role_id }) ${directives}{
    ...RoleFields
    groupsConnection(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId first: $first last: $last offset: $offset orderBy: $orderBy groupBy: $groupBy) {
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
${fragment_GroupFields}
${fragment_RoleFields}`;

export function createQuery_role_groupsConnection_Store(event: Event): Query_role_groupsConnection_Store {
  return createGraphQLQueryStore<{ role: Role }, { role_id: string } & QueryGroupConnectionArgs>(query, event);
}

export async function fetchQuery_role_groupsConnection_Store(event: Event, variables: { role_id: string } & QueryGroupConnectionArgs, params?: FetchParams | undefined): Promise<Query_role_groupsConnection_Store> {
  return fetchGraphQLQueryStore<{ role: Role }, { role_id: string } & QueryGroupConnectionArgs>(query, event, variables, params);
}

export type Query_role_groupsConnection_Store = GraphQLStore<{ role: Role }, { role_id: string } & QueryGroupConnectionArgs>;