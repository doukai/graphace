import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLMutationStore } from '~/utils';
import type { GroupInput, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_parent($group_id: String, $group_parent: GroupInput) {
  group(where: { id: { val: $group_id } }, parent: $group_parent) @merge {
    ...GroupFields
    syncGroupPolicy
    parent {
      ...GroupFields
      syncGroupPolicy
    }
  }
}
${fragment_GroupFields}`;

export function createMutation_group_parent_Store(event: LoadEvent | RequestEvent): Mutation_group_parent_Store {
  return createGraphQLMutationStore<Group, { group_id: string, group_parent: GroupInput | null }>(query, event);
}

export type Mutation_group_parent_Store = GraphQLStore<Group, { group_id: string, group_parent: GroupInput | null }>;