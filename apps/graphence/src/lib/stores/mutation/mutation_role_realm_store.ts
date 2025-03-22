import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { RealmInput, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role_realm($role_id: String, $role_realm: RealmInput) {
  role(where: { id: { val: $role_id } }, realm: $role_realm) @merge {
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
    syncRolePolicy
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

export function createMutation_role_realm_Store(event: LoadEvent | RequestEvent): Mutation_role_realm_Store {
  return createGraphQLMutationStore<Role, { role_id: string, role_realm: RealmInput | null }>(query, event);
}

export type Mutation_role_realm_Store = GraphQLStore<Role, { role_id: string, role_realm: RealmInput | null }>;