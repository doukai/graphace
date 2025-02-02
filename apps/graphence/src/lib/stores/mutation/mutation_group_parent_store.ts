import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { QueryGroupArgs, GroupInput, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_parent($group_id: String, $group_parent: GroupInput, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!]) {
  group(where: { id: { val: $group_id } }, group_parent: $group_parent) @merge {
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
    parent(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupBy: $groupBy) {
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
        name
        description
      }
    }
  }
}`;

export function createMutation_group_parent_Store(event: LoadEvent | RequestEvent): Mutation_group_parent_Store {
  return createGraphQLMutationStore<Group, { group_id: string, group_parent: GroupInput } & QueryGroupArgs>(query, event);
}

export type Mutation_group_parent_Store = GraphQLStore<Group, { group_id: string, group_parent: GroupInput } & QueryGroupArgs>;