import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';

const query = /* GraphQL */ `mutation Mutation_syncModelPolicy {
  syncModelPolicy
}`;

export function createMutation_syncModelPolicy_Store(event: LoadEvent | RequestEvent): Mutation_syncModelPolicy_Store {
  return createGraphQLMutationStore<boolean, undefined>(query, event);
}

export type Mutation_syncModelPolicy_Store = GraphQLStore<boolean, undefined>;