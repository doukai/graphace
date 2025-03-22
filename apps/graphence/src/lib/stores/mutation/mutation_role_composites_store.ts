import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { RoleInput, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role_composites($role_id: String, $role_composites: RoleInput[]) {
  role(where: { id: { val: $role_id } }, composites: $role_composites) @merge {
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
    composites {
      id
      name
      description
      users {
        id
        name
        description
      }
      groups {
        id
        name
        description
      }
      composites {
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

export function createMutation_role_composites_Store(event: LoadEvent | RequestEvent): Mutation_role_composites_Store {
  return createGraphQLMutationStore<Role, { role_id: string, role_composites: RoleInput[] | null }>(query, event);
}

export type Mutation_role_composites_Store = GraphQLStore<Role, { role_id: string, role_composites: RoleInput[] | null }>;