import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryUserListArgs, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_group_users($group_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: UserOrderBy, $after: ID, $before: ID) {
  group(id: { val: $group_id }) {
    ...GroupFields
    users(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      ...UserFields
    }
  }
}
${fragment_UserFields}
${fragment_GroupFields}`;

export function createQuery_group_users_Store(event: Event): Query_group_users_Store {
  return createGraphQLQueryStore<{ group: Group }, { group_id: string } & QueryUserListArgs>(query, event);
}

export async function fetchQuery_group_users_Store(event: Event, variables: { group_id: string } & QueryUserListArgs): Promise<Query_group_users_Store> {
  return fetchGraphQLQueryStore<{ group: Group }, { group_id: string } & QueryUserListArgs>(query, event, variables);
}

export type Query_group_users_Store = GraphQLStore<{ group: Group }, { group_id: string } & QueryUserListArgs>;