import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationSyncPermissionRoleRelationPolicyArgs } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_syncPermissionRoleRelationPolicy($roleId: String, $permissionNameList: [String], $removedPermissionNameList: [String]) {
  syncPermissionRoleRelationPolicy(roleId: $roleId permissionNameList: $permissionNameList removedPermissionNameList: $removedPermissionNameList)
}`;

export function createMutation_syncPermissionRoleRelationPolicy_Store(event: LoadEvent | RequestEvent): Mutation_syncPermissionRoleRelationPolicy_Store {
  return createGraphQLMutationStore<boolean, MutationSyncPermissionRoleRelationPolicyArgs>(query, event);
}

export type Mutation_syncPermissionRoleRelationPolicy_Store = GraphQLStore<boolean, MutationSyncPermissionRoleRelationPolicyArgs>;