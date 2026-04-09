import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationSyncPermissionRoleRelationPolicyArgs } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_syncPermissionRoleRelationPolicy($roleId: String, $permissionNameList: [String], $removedPermissionNameList: [String]) {
  syncPermissionRoleRelationPolicy(roleId: $roleId permissionNameList: $permissionNameList removedPermissionNameList: $removedPermissionNameList)
}`;

export function createMutation_syncPermissionRoleRelationPolicy_Store(event: Event): Mutation_syncPermissionRoleRelationPolicy_Store {
  return createGraphQLMutationStore<{ syncPermissionRoleRelationPolicy: boolean }, MutationSyncPermissionRoleRelationPolicyArgs>(query, event);
}

export type Mutation_syncPermissionRoleRelationPolicy_Store = GraphQLStore<{ syncPermissionRoleRelationPolicy: boolean }, MutationSyncPermissionRoleRelationPolicyArgs>;