import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLMutationStore } from '~/utils';
import type { UserInput, Role } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_role_users($role_id: String, $role_users: [UserInput]) {
  role(where: { id: { val: $role_id } }, users: $role_users) ${directives}{
    ...RoleFields
    syncRolePolicy
    users {
      ...UserFields
      syncUserPolicy
      ${fields}
    }
  }
}
${fragment_UserFields}
${fragment_RoleFields}`;

export function createMutation_role_users_Store(event: Event): Mutation_role_users_Store {
  return createGraphQLMutationStore<{ role: Role }, { role_id: string, role_users: UserInput[] | null }>(query, event);
}

export type Mutation_role_users_Store = GraphQLStore<{ role: Role }, { role_id: string, role_users: UserInput[] | null }>;