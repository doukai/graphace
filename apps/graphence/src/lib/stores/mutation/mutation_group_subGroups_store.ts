import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLMutationStore } from '~/utils';
import type { GroupInput, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_subGroups($group_id: String, $group_subGroups: [GroupInput]) {
  group(where: { id: { val: $group_id } }, subGroups: $group_subGroups) @merge {
    ...GroupFields
    syncGroupPolicy
    subGroups {
      ...GroupFields
      syncGroupPolicy
    }
  }
}
${fragment_GroupFields}`;

export function createMutation_group_subGroups_Store(event: Event): Mutation_group_subGroups_Store {
  return createGraphQLMutationStore<Group, { group_id: string, group_subGroups: GroupInput[] | null }>(query, event);
}

export type Mutation_group_subGroups_Store = GraphQLStore<Group, { group_id: string, group_subGroups: GroupInput[] | null }>;