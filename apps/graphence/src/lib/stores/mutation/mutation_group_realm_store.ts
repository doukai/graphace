import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_RealmFields } from '~/lib/stores/fragment/fragment_RealmFields';
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLMutationStore } from '~/utils';
import type { RealmInput, Group } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_group_realm($group_id: String, $group_realm: RealmInput) {
  group(where: { id: { val: $group_id } }, realm: $group_realm) ${directives}{
    ...GroupFields
    syncGroupPolicy
    realm {
      ...RealmFields
    }
  }
}
${fragment_RealmFields}
${fragment_GroupFields}`;

export function createMutation_group_realm_Store(event: Event): Mutation_group_realm_Store {
  return createGraphQLMutationStore<{ group: Group }, { group_id: string, group_realm: RealmInput | null }>(query, event);
}

export type Mutation_group_realm_Store = GraphQLStore<{ group: Group }, { group_id: string, group_realm: RealmInput | null }>;