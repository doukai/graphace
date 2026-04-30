import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLMutationStore } from '~/utils';
import type { RoleInput, Role } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_role_composites($role_id: String, $role_composites: [RoleInput]) {
  role(where: { id: { val: $role_id } }, composites: $role_composites) ${directives}{
    ...RoleFields
    syncRolePolicy
    composites {
      ...RoleFields
      syncRolePolicy
      ${fields}
    }
  }
}
${fragment_RoleFields}`;

export function createMutation_role_composites_Store(event: Event): Mutation_role_composites_Store {
  return createGraphQLMutationStore<{ role: Role }, { role_id: string, role_composites: RoleInput[] | null }>(query, event);
}

export type Mutation_role_composites_Store = GraphQLStore<{ role: Role }, { role_id: string, role_composites: RoleInput[] | null }>;