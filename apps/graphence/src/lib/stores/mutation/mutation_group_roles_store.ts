import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLMutationStore } from '~/utils';
import type { RoleInput, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_roles($group_id: String, $group_roles: [RoleInput]) {
  group(where: { id: { val: $group_id } }, roles: $group_roles) @merge {
    ...GroupFields
    syncGroupPolicy
    roles {
      ...RoleFields
      syncRolePolicy
    }
  }
}
${fragment_RoleFields}
${fragment_GroupFields}`;

export function createMutation_group_roles_Store(event: LoadEvent | RequestEvent): Mutation_group_roles_Store {
  return createGraphQLMutationStore<Group, { group_id: string, group_roles: RoleInput[] | null }>(query, event);
}

export type Mutation_group_roles_Store = GraphQLStore<Group, { group_id: string, group_roles: RoleInput[] | null }>;