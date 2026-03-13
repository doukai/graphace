import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLMutationStore } from '~/utils';
import type { RoleInput, User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user_roles($user_id: String, $user_roles: [RoleInput]) {
  user(where: { id: { val: $user_id } }, roles: $user_roles) @merge {
    ...UserFields
    syncUserPolicy
    roles {
      ...RoleFields
      syncRolePolicy
    }
  }
}
${fragment_RoleFields}
${fragment_UserFields}`;

export function createMutation_user_roles_Store(event: Event): Mutation_user_roles_Store {
  return createGraphQLMutationStore<{ user: User }, { user_id: string, user_roles: RoleInput[] | null }>(query, event);
}

export type Mutation_user_roles_Store = GraphQLStore<{ user: User }, { user_id: string, user_roles: RoleInput[] | null }>;