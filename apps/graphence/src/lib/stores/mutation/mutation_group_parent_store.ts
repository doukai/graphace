import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLMutationStore } from '~/utils';
import type { GroupInput, Group } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_group_parent($group_id: String, $group_parent: GroupInput) {
  group(where: { id: { val: $group_id } }, parent: $group_parent) ${directives}{
    ...GroupFields
    syncGroupPolicy
    parent {
      ...GroupFields
      syncGroupPolicy
      ${fields}
    }
  }
}
${fragment_GroupFields}`;

export function createMutation_group_parent_Store(event: Event): Mutation_group_parent_Store {
  return createGraphQLMutationStore<{ group: Group }, { group_id: string, group_parent: GroupInput | null }>(query, event);
}

export type Mutation_group_parent_Store = GraphQLStore<{ group: Group }, { group_id: string, group_parent: GroupInput | null }>;