import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { QueryGroupListArgs, GroupInput, User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user_groups($user_id: String, $user_groups: [GroupInput], $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: GroupOrderBy, $after: ID, $before: ID) {
  user(where: { id: { val: $user_id } }, groups: $user_groups) @merge {
    id
    name
    description
    lastName
    login
    email
    phones
    disable
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncUserPolicy
    groups {
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
      subGroups {
        id
        name
        description
      }
      users {
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
      syncGroupPolicy
    }
  }
}`;

export function createMutation_user_groups_Store(event: LoadEvent | RequestEvent): Mutation_user_groups_Store {
  return createGraphQLMutationStore<User, { user_id: string, user_groups: [GroupInput] | null } & QueryGroupListArgs>(query, event);
}

export type Mutation_user_groups_Store = GraphQLStore<User, { user_id: string, user_groups: [GroupInput] | null } & QueryGroupListArgs>;