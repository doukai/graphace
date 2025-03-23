import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { PermissionInput, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role_permissions($role_id: String, $role_permissions: [PermissionInput]) {
  role(where: { id: { val: $role_id } }, permissions: $role_permissions) @merge {
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
    permissions {
      name
      description
      field
      type
      permissionType
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
      syncPermissionPolicy
    }
  }
}`;

export function createMutation_role_permissions_Store(event: LoadEvent | RequestEvent): Mutation_role_permissions_Store {
  return createGraphQLMutationStore<Role, { role_id: string, role_permissions: PermissionInput[] | null }>(query, event);
}

export type Mutation_role_permissions_Store = GraphQLStore<Role, { role_id: string, role_permissions: PermissionInput[] | null }>;