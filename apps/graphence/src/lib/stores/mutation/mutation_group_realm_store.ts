import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { RealmInput, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_realm($group_id: String, $group_realm: RealmInput) {
  group(where: { id: { val: $group_id } }, realm: $group_realm) @merge {
    id
    name
    description
    path
    deep
    parentId
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncGroupPolicy
    realm {
      id
      name
      description
      isDeprecated
      version
      realmId
      createUserId
      createTime
      updateUserId
      updateTime
      createGroupId
    }
  }
}`;

export function createMutation_group_realm_Store(event: LoadEvent | RequestEvent): Mutation_group_realm_Store {
  return createGraphQLMutationStore<Group, { group_id: string, group_realm: RealmInput | null }>(query, event);
}

export type Mutation_group_realm_Store = GraphQLStore<Group, { group_id: string, group_realm: RealmInput | null }>;