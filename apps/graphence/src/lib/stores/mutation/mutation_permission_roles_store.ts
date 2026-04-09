import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { fragment_PermissionFields } from '~/lib/stores/fragment/fragment_PermissionFields';
import { createGraphQLMutationStore } from '~/utils';
import type { RoleInput, Permission } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_permission_roles($permission_id: String, $permission_roles: [RoleInput]) {
  permission(where: { id: { val: $permission_id } }, roles: $permission_roles) ${directives}{
    ...PermissionFields
    syncPermissionPolicy
    roles {
      ...RoleFields
    }
  }
}
${fragment_RoleFields}
${fragment_PermissionFields}`;

export function createMutation_permission_roles_Store(event: Event): Mutation_permission_roles_Store {
  return createGraphQLMutationStore<{ permission: Permission }, { permission_id: string, permission_roles: RoleInput[] | null }>(query, event);
}

export type Mutation_permission_roles_Store = GraphQLStore<{ permission: Permission }, { permission_id: string, permission_roles: RoleInput[] | null }>;