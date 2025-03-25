import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { RoleInput, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_roles($group_id: String, $group_roles: [RoleInput]) {
  group(where: { id: { val: $group_id } }, roles: $group_roles) @merge {
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
    roles {
      id
      name
      description
      users(first: 3) {
        id
        name
        description
      }
      groups(first: 3) {
        id
        name
        description
      }
      composites(first: 3) {
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
      syncRolePolicy
    }
  }
}`;

export function createMutation_group_roles_Store(event: LoadEvent | RequestEvent): Mutation_group_roles_Store {
  return createGraphQLMutationStore<Group, { group_id: string, group_roles: RoleInput[] | null }>(query, event);
}

export type Mutation_group_roles_Store = GraphQLStore<Group, { group_id: string, group_roles: RoleInput[] | null }>;