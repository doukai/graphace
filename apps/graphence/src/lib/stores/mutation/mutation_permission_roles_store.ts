import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { RoleInput, Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_permission_roles($permission_id: String, $permission_roles: [RoleInput]) {
  permission(where: { id: { val: $permission_id } }, roles: $permission_roles) @merge {
    id
    name
    description
    field
    type
    permissionType
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncPermissionPolicy
    roles {
      id
      name
      description
      users(first: 3) {
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

export function createMutation_permission_roles_Store(event: LoadEvent | RequestEvent): Mutation_permission_roles_Store {
  return createGraphQLMutationStore<Permission, { permission_id: string, permission_roles: RoleInput[] | null }>(query, event);
}

export type Mutation_permission_roles_Store = GraphQLStore<Permission, { permission_id: string, permission_roles: RoleInput[] | null }>;