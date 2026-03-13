import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';

const query = /* GraphQL */ `mutation Mutation_syncModelPolicy {
  syncModelPolicy
}`;

export function createMutation_syncModelPolicy_Store(event: Event): Mutation_syncModelPolicy_Store {
  return createGraphQLMutationStore<{ syncModelPolicy: boolean }, undefined>(query, event);
}

export type Mutation_syncModelPolicy_Store = GraphQLStore<{ syncModelPolicy: boolean }, undefined>;