import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { GroupInput, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_parent($group_id: String, $group_parent: GroupInput) {
  group(where: { id: { val: $group_id } }, parent: $group_parent) @merge {
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

export function createMutation_group_parent_Store(event: LoadEvent | RequestEvent): Mutation_group_parent_Store {
  return createGraphQLMutationStore<Group, { group_id: string, group_parent: GroupInput | null }>(query, event);
}

export type Mutation_group_parent_Store = GraphQLStore<Group, { group_id: string, group_parent: GroupInput | null }>;