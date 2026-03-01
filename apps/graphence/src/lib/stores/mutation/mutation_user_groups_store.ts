import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLMutationStore } from '~/utils';
import type { GroupInput, User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user_groups($user_id: String, $user_groups: [GroupInput]) {
  user(where: { id: { val: $user_id } }, groups: $user_groups) @merge {
    ...UserFields
    syncUserPolicy
    groups {
      ...GroupFields
      syncGroupPolicy
    }
  }
}
${fragment_GroupFields}
${fragment_UserFields}`;

export function createMutation_user_groups_Store(event: Event): Mutation_user_groups_Store {
  return createGraphQLMutationStore<User, { user_id: string, user_groups: GroupInput[] | null }>(query, event);
}

export type Mutation_user_groups_Store = GraphQLStore<User, { user_id: string, user_groups: GroupInput[] | null }>;