import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { RoleInput, Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_permission_roles($permission_name: String, $permission_roles: [RoleInput]) {
  permission(where: { name: { val: $permission_name } }, roles: $permission_roles) @merge {
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

export function createMutation_permission_roles_Store(event: LoadEvent | RequestEvent): Mutation_permission_roles_Store {
  return createGraphQLMutationStore<Permission, { permission_name: string, permission_roles: RoleInput[] | null }>(query, event);
}

export type Mutation_permission_roles_Store = GraphQLStore<Permission, { permission_name: string, permission_roles: RoleInput[] | null }>;