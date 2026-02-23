import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLMutationStore } from '~/utils';
import type { UserInput, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_users($group_id: String, $group_users: [UserInput]) {
  group(where: { id: { val: $group_id } }, users: $group_users) @merge {
    ...GroupFields
    syncGroupPolicy
    users {
      ...UserFields
      syncUserPolicy
    }
  }
}
${fragment_UserFields}
${fragment_GroupFields}`;

export function createMutation_group_users_Store(event: LoadEvent | RequestEvent): Mutation_group_users_Store {
  return createGraphQLMutationStore<Group, { group_id: string, group_users: UserInput[] | null }>(query, event);
}

export type Mutation_group_users_Store = GraphQLStore<Group, { group_id: string, group_users: UserInput[] | null }>;