import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { QueryUserListArgs, UserInput, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_users($group_id: String, $group_users: [UserInput], $id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: UserOrderBy, $after: ID, $before: ID) {
  group(where: { id: { val: $group_id } }, users: $group_users) @merge {
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
    syncGroupPolicy
    users {
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
      syncUserPolicy
    }
  }
}`;

export function createMutation_group_users_Store(event: LoadEvent | RequestEvent): Mutation_group_users_Store {
  return createGraphQLMutationStore<Group, { group_id: string, group_users: [UserInput] | null } & QueryUserListArgs>(query, event);
}

export type Mutation_group_users_Store = GraphQLStore<Group, { group_id: string, group_users: [UserInput] | null } & QueryUserListArgs>;