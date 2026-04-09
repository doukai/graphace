import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLMutationStore } from '~/utils';
import type { GroupInput, Group } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_group_subGroups($group_id: String, $group_subGroups: [GroupInput]) {
  group(where: { id: { val: $group_id } }, subGroups: $group_subGroups) ${directives}{
    ...GroupFields
    syncGroupPolicy
    subGroups {
      ...GroupFields
    }
  }
}
${fragment_GroupFields}`;

export function createMutation_group_subGroups_Store(event: Event): Mutation_group_subGroups_Store {
  return createGraphQLMutationStore<{ group: Group }, { group_id: string, group_subGroups: GroupInput[] | null }>(query, event);
}

export type Mutation_group_subGroups_Store = GraphQLStore<{ group: Group }, { group_id: string, group_subGroups: GroupInput[] | null }>;