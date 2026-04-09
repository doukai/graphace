import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_PermissionFields } from '~/lib/stores/fragment/fragment_PermissionFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationPermissionArgs } from '~/lib/types/schema';
import type { Permission } from '~/lib/types/schema';

const query = ({ directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_permission($id: ID, $name: String, $description: String, $field: String, $type: String, $permissionType: PermissionType, $roles: [RoleInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $rolePermissionRelation: [RolePermissionRelationInput], $input: PermissionInput, $where: PermissionExpression) {
  permission(id: $id name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId rolePermissionRelation: $rolePermissionRelation input: $input where: $where) ${directives}{
    ...PermissionFields
  }
}
${fragment_PermissionFields}`;

export function createMutation_permission_Store(event: Event): Mutation_permission_Store {
  return createGraphQLMutationStore<{ permission: Permission }, MutationPermissionArgs>(query, event);
}

export type Mutation_permission_Store = GraphQLStore<{ permission: Permission }, MutationPermissionArgs>;