import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupArgs, User } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_user_group($user_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: GroupGroupBy) {
  user(id: { val: $user_id }) ${directives}{
    ...UserFields
    group(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupBy: $groupBy) {
      ...GroupFields
      ${fields}
    }
  }
}
${fragment_GroupFields}
${fragment_UserFields}`;

export function createQuery_user_group_Store(event: Event): Query_user_group_Store {
  return createGraphQLQueryStore<{ user: User }, { user_id: string } & QueryGroupArgs>(query, event);
}

export async function fetchQuery_user_group_Store(event: Event, variables: { user_id: string } & QueryGroupArgs, params?: FetchParams | undefined): Promise<Query_user_group_Store> {
  return fetchGraphQLQueryStore<{ user: User }, { user_id: string } & QueryGroupArgs>(query, event, variables, params);
}

export type Query_user_group_Store = GraphQLStore<{ user: User }, { user_id: string } & QueryGroupArgs>;