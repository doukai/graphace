import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_PermissionFields } from '~/lib/stores/fragment/fragment_PermissionFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationPermissionListArgs, Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_permissionList($id: ID, $name: String, $description: String, $field: String, $type: String, $permissionType: PermissionType, $roles: [RoleInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $rolePermissionRelation: [RolePermissionRelationInput], $list: [PermissionInput], $where: PermissionExpression) {
  permissionList(id: $id name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId rolePermissionRelation: $rolePermissionRelation list: $list where: $where) {
    ...PermissionFields
    syncPermissionPolicy
  }
}
${fragment_PermissionFields}`;

export function createMutation_permissionList_Store(event: Event): Mutation_permissionList_Store {
  return createGraphQLMutationStore<{ permissionList: Permission[] }, MutationPermissionListArgs>(query, event);
}

export type Mutation_permissionList_Store = GraphQLStore<{ permissionList: Permission[] }, MutationPermissionListArgs>;