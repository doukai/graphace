import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationRoleListArgs, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_roleList($id: ID, $name: String, $description: String, $users: [UserInput], $groups: [GroupInput], $composites: [RoleInput], $permissions: [PermissionInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $roleUserRelation: [RoleUserRelationInput], $groupRoleRelation: [GroupRoleRelationInput], $roleCompositeRelation: [RoleCompositeRelationInput], $rolePermissionRelation: [RolePermissionRelationInput], $list: [RoleInput], $where: RoleExpression) {
  roleList(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation rolePermissionRelation: $rolePermissionRelation list: $list where: $where) {
    ...RoleFields
    syncRolePolicy
  }
}
${fragment_RoleFields}`;

export function createMutation_roleList_Store(event: Event): Mutation_roleList_Store {
  return createGraphQLMutationStore<{ roleList: Role[] }, MutationRoleListArgs>(query, event);
}

export type Mutation_roleList_Store = GraphQLStore<{ roleList: Role[] }, MutationRoleListArgs>;