import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLMutationStore } from '~/utils';
import type { GroupInput, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role_groups($role_id: String, $role_groups: [GroupInput]) {
  role(where: { id: { val: $role_id } }, groups: $role_groups) @merge {
    ...RoleFields
    syncRolePolicy
    groups {
      ...GroupFields
      syncGroupPolicy
    }
  }
}
${fragment_GroupFields}
${fragment_RoleFields}`;

export function createMutation_role_groups_Store(event: Event): Mutation_role_groups_Store {
  return createGraphQLMutationStore<{ role: Role }, { role_id: string, role_groups: GroupInput[] | null }>(query, event);
}

export type Mutation_role_groups_Store = GraphQLStore<{ role: Role }, { role_id: string, role_groups: GroupInput[] | null }>;