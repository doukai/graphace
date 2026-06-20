import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLMutationStore } from '~/utils';
import type { GroupInput, User } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_user_group($user_id: String, $user_group: GroupInput) {
  user(where: { id: { val: $user_id } }, group: $user_group) ${directives}{
    ...UserFields
    syncUserPolicy
    group {
      ...GroupFields
      syncGroupPolicy
      ${fields}
    }
  }
}
${fragment_GroupFields}
${fragment_UserFields}`;

export function createMutation_user_group_Store(event: Event): Mutation_user_group_Store {
  return createGraphQLMutationStore<{ user: User }, { user_id: string, user_group: GroupInput | null }>(query, event);
}

export type Mutation_user_group_Store = GraphQLStore<{ user: User }, { user_id: string, user_group: GroupInput | null }>;