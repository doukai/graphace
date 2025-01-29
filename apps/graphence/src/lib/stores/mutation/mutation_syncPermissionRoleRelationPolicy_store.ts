import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationSyncPermissionRoleRelationPolicyArgs } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_syncPermissionRoleRelationPolicy($roleId: String, $permissionNameList: [String], $removedPermissionNameList: [String]) {
  syncPermissionRoleRelationPolicy(roleId: $roleId permissionNameList: $permissionNameList removedPermissionNameList: $removedPermissionNameList)
}`;

export async function createMutationSyncPermissionRoleRelationPolicyStore(event: LoadEvent): Promise<GraphQLStore<boolean, MutationSyncPermissionRoleRelationPolicyArgs>> {
  return createGraphQLMutationStore<boolean, MutationSyncPermissionRoleRelationPolicyArgs>(query, event);
}