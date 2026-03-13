import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_RealmFields } from '~/lib/stores/fragment/fragment_RealmFields';
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLMutationStore } from '~/utils';
import type { RealmInput, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role_realm($role_id: String, $role_realm: RealmInput) {
  role(where: { id: { val: $role_id } }, realm: $role_realm) @merge {
    ...RoleFields
    syncRolePolicy
    realm {
      ...RealmFields
    }
  }
}
${fragment_RealmFields}
${fragment_RoleFields}`;

export function createMutation_role_realm_Store(event: Event): Mutation_role_realm_Store {
  return createGraphQLMutationStore<{ role: Role }, { role_id: string, role_realm: RealmInput | null }>(query, event);
}

export type Mutation_role_realm_Store = GraphQLStore<{ role: Role }, { role_id: string, role_realm: RealmInput | null }>;