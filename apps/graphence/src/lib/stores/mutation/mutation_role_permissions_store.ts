import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_PermissionFields } from '~/lib/stores/fragment/fragment_PermissionFields';
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLMutationStore } from '~/utils';
import type { PermissionInput, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role_permissions($role_id: String, $role_permissions: [PermissionInput]) {
  role(where: { id: { val: $role_id } }, permissions: $role_permissions) @merge {
    ...RoleFields
    syncRolePolicy
    permissions {
      ...PermissionFields
      syncPermissionPolicy
    }
  }
}
${fragment_PermissionFields}
${fragment_RoleFields}`;

export function createMutation_role_permissions_Store(event: Event): Mutation_role_permissions_Store {
  return createGraphQLMutationStore<{ role: Role }, { role_id: string, role_permissions: PermissionInput[] | null }>(query, event);
}

export type Mutation_role_permissions_Store = GraphQLStore<{ role: Role }, { role_id: string, role_permissions: PermissionInput[] | null }>;