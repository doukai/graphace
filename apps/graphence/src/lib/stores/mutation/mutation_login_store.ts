import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationLoginArgs } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_login($login: String!, $password: String!) {
  login(login: $login password: $password)
}`;

export async function createMutation_login_Store(event: LoadEvent): Promise<Mutation_login_Store> {
  return createGraphQLMutationStore<string, MutationLoginArgs>(query, event);
}

export type Mutation_login_Store = GraphQLStore<string, MutationLoginArgs>;