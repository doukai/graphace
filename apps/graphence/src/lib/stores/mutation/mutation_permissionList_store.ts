import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationPermissionListArgs } from '~/lib/types/schema';
import type { Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_permissionList($name: ID, $description: String, $field: String, $type: String, $permissionType: PermissionType, $roles: [RoleInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $permissionRoleRelation: [PermissionRoleRelationInput], $list: [PermissionInput], $where: PermissionExpression) {
  permissionList(name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId permissionRoleRelation: $permissionRoleRelation list: $list where: $where) {
    name
    description
    field
    type
    permissionType
    roles(first: 3) {
      id
      name
      description
    }
    realm {
      id
      name
      description
    }
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncPermissionPolicy
  }
}`;

export function createMutation_permissionList_Store(event: LoadEvent | RequestEvent): Mutation_permissionList_Store {
  return createGraphQLMutationStore<Permission[], MutationPermissionListArgs>(query, event);
}

export type Mutation_permissionList_Store = GraphQLStore<Permission[], MutationPermissionListArgs>;