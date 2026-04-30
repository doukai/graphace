import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupListArgs, Group } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_group_subGroups($group_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: GroupGroupBy, $first: Int, $last: Int, $offset: Int, $orderBy: GroupOrderBy, $after: ID, $before: ID) {
  group(id: { val: $group_id }) ${directives}{
    ...GroupFields
    subGroups(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupBy: $groupBy first: $first last: $last offset: $offset orderBy: $orderBy after: $after before: $before) {
      ...GroupFields
      ${fields}
    }
  }
}
${fragment_GroupFields}`;

export function createQuery_group_subGroups_Store(event: Event): Query_group_subGroups_Store {
  return createGraphQLQueryStore<{ group: Group }, { group_id: string } & QueryGroupListArgs>(query, event);
}

export async function fetchQuery_group_subGroups_Store(event: Event, variables: { group_id: string } & QueryGroupListArgs, params?: FetchParams | undefined): Promise<Query_group_subGroups_Store> {
  return fetchGraphQLQueryStore<{ group: Group }, { group_id: string } & QueryGroupListArgs>(query, event, variables, params);
}

export type Query_group_subGroups_Store = GraphQLStore<{ group: Group }, { group_id: string } & QueryGroupListArgs>;