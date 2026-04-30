import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLMutationStore } from '~/utils';
import type { UserInput, Group } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_group_users($group_id: String, $group_users: [UserInput]) {
  group(where: { id: { val: $group_id } }, users: $group_users) ${directives}{
    ...GroupFields
    syncGroupPolicy
    users {
      ...UserFields
      syncUserPolicy
      ${fields}
    }
  }
}
${fragment_UserFields}
${fragment_GroupFields}`;

export function createMutation_group_users_Store(event: Event): Mutation_group_users_Store {
  return createGraphQLMutationStore<{ group: Group }, { group_id: string, group_users: UserInput[] | null }>(query, event);
}

export type Mutation_group_users_Store = GraphQLStore<{ group: Group }, { group_id: string, group_users: UserInput[] | null }>;