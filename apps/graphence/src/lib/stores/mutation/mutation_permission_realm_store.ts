import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { RealmInput, Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_permission_realm($permission_id: String, $permission_realm: RealmInput) {
  permission(where: { id: { val: $permission_id } }, realm: $permission_realm) @merge {
    id
    name
    description
    field
    type
    permissionType
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncPermissionPolicy
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

export function createMutation_permission_realm_Store(event: LoadEvent | RequestEvent): Mutation_permission_realm_Store {
  return createGraphQLMutationStore<Permission, { permission_id: string, permission_realm: RealmInput | null }>(query, event);
}

export type Mutation_permission_realm_Store = GraphQLStore<Permission, { permission_id: string, permission_realm: RealmInput | null }>;