import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { GroupInput, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role_groups($role_id: String, $role_groups: [GroupInput]) {
  role(where: { id: { val: $role_id } }, groups: $role_groups) @merge {
    id
    name
    description
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncRolePolicy
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
      subGroups(first: 3) {
        id
        name
        description
      }
      users(first: 3) {
        id
        name
        description
      }
      roles(first: 3) {
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

export function createMutation_role_groups_Store(event: LoadEvent | RequestEvent): Mutation_role_groups_Store {
  return createGraphQLMutationStore<Role, { role_id: string, role_groups: GroupInput[] | null }>(query, event);
}

export type Mutation_role_groups_Store = GraphQLStore<Role, { role_id: string, role_groups: GroupInput[] | null }>;