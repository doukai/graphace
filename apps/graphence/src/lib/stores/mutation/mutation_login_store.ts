import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationLoginArgs } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_login($login: String!, $password: String!) {
  login(login: $login password: $password)
}`;

export async function createMutationLoginStore(event: LoadEvent): Promise<GraphQLStore<string, MutationLoginArgs>> {
  return createGraphQLMutationStore<string, MutationLoginArgs>(query, event);
}