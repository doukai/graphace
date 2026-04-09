import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_RealmFields } from '~/lib/stores/fragment/fragment_RealmFields';
import { fragment_PermissionFields } from '~/lib/stores/fragment/fragment_PermissionFields';
import { createGraphQLMutationStore } from '~/utils';
import type { RealmInput, Permission } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_permission_realm($permission_id: String, $permission_realm: RealmInput) {
  permission(where: { id: { val: $permission_id } }, realm: $permission_realm) ${directives}{
    ...PermissionFields
    syncPermissionPolicy
    realm {
      ...RealmFields
    }
  }
}
${fragment_RealmFields}
${fragment_PermissionFields}`;

export function createMutation_permission_realm_Store(event: Event): Mutation_permission_realm_Store {
  return createGraphQLMutationStore<{ permission: Permission }, { permission_id: string, permission_realm: RealmInput | null }>(query, event);
}

export type Mutation_permission_realm_Store = GraphQLStore<{ permission: Permission }, { permission_id: string, permission_realm: RealmInput | null }>;