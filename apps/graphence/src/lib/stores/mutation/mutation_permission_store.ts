import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationPermissionArgs } from '~/lib/types/schema';
import type { Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_permission($name: ID, $description: String, $field: String, $type: String, $permissionType: PermissionType, $roles: [RoleInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $permissionRoleRelation: [PermissionRoleRelationInput], $input: PermissionInput, $where: PermissionExpression) {
  permission(name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId permissionRoleRelation: $permissionRoleRelation input: $input where: $where) {
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
    roles {
      id
      name
      description
    }
    realm {
      name
      description
    }
  }
}`;

export async function createMutation_permission_Store(event: LoadEvent): Promise<Mutation_permission_Store> {
  return createGraphQLMutationStore<Permission, MutationPermissionArgs>(query, event);
}

export type Mutation_permission_Store = GraphQLStore<Permission, MutationPermissionArgs>;