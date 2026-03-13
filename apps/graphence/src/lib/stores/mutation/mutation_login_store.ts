import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationLoginArgs } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_login($login: String!, $password: String!) {
  login(login: $login password: $password)
}`;

export function createMutation_login_Store(event: Event): Mutation_login_Store {
  return createGraphQLMutationStore<{ login: string }, MutationLoginArgs>(query, event);
}

export type Mutation_login_Store = GraphQLStore<{ login: string }, MutationLoginArgs>;