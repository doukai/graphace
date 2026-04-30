import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLMutationStore } from '~/utils';
import type { RoleInput, Group } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_group_roles($group_id: String, $group_roles: [RoleInput]) {
  group(where: { id: { val: $group_id } }, roles: $group_roles) ${directives}{
    ...GroupFields
    syncGroupPolicy
    roles {
      ...RoleFields
      syncRolePolicy
      ${fields}
    }
  }
}
${fragment_RoleFields}
${fragment_GroupFields}`;

export function createMutation_group_roles_Store(event: Event): Mutation_group_roles_Store {
  return createGraphQLMutationStore<{ group: Group }, { group_id: string, group_roles: RoleInput[] | null }>(query, event);
}

export type Mutation_group_roles_Store = GraphQLStore<{ group: Group }, { group_id: string, group_roles: RoleInput[] | null }>;