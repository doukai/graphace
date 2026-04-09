import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupListArgs, User } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `query Query_user_groups($user_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: GroupGroupBy, $first: Int, $last: Int, $offset: Int, $orderBy: GroupOrderBy, $after: ID, $before: ID) {
  user(id: { val: $user_id }) ${directives}{
    ...UserFields
    groups(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation createTimeYear: $createTimeYear createTimeMonth: $createTimeMonth createTimeDay: $createTimeDay createTimeWeek: $createTimeWeek createTimeQuarter: $createTimeQuarter updateTimeYear: $updateTimeYear updateTimeMonth: $updateTimeMonth updateTimeDay: $updateTimeDay updateTimeWeek: $updateTimeWeek updateTimeQuarter: $updateTimeQuarter not: $not cond: $cond exs: $exs) {
      ...GroupFields
    }
  }
}
${fragment_GroupFields}
${fragment_UserFields}`;

export function createQuery_user_groups_Store(event: Event): Query_user_groups_Store {
  return createGraphQLQueryStore<{ user: User }, { user_id: string } & QueryGroupListArgs>(query, event);
}

export async function fetchQuery_user_groups_Store(event: Event, variables: { user_id: string } & QueryGroupListArgs, params?: FetchParams | undefined): Promise<Query_user_groups_Store> {
  return fetchGraphQLQueryStore<{ user: User }, { user_id: string } & QueryGroupListArgs>(query, event, variables, params);
}

export type Query_user_groups_Store = GraphQLStore<{ user: User }, { user_id: string } & QueryGroupListArgs>;