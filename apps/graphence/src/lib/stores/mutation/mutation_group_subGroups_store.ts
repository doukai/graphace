import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { GroupInput, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_subGroups($group_id: String, $group_subGroups: GroupInput[]) {
  group(where: { id: { val: $group_id } }, subGroups: $group_subGroups) @merge {
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
    subGroups {
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

export function createMutation_group_subGroups_Store(event: LoadEvent | RequestEvent): Mutation_group_subGroups_Store {
  return createGraphQLMutationStore<Group, { group_id: string, group_subGroups: GroupInput[] | null }>(query, event);
}

export type Mutation_group_subGroups_Store = GraphQLStore<Group, { group_id: string, group_subGroups: GroupInput[] | null }>;