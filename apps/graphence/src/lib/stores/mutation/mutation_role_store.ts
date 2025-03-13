import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationRoleArgs } from '~/lib/types/schema';
import type { Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role($id: ID, $name: String, $description: String, $users: [UserInput], $groups: [GroupInput], $composites: [RoleInput], $permissions: [PermissionInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $roleUserRelation: [RoleUserRelationInput], $groupRoleRelation: [GroupRoleRelationInput], $roleCompositeRelation: [RoleCompositeRelationInput], $permissionRoleRelation: [PermissionRoleRelationInput], $input: RoleInput, $where: RoleExpression) {
  role(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation permissionRoleRelation: $permissionRoleRelation input: $input where: $where) {
    id
    name
    description
    users {
      id
      name
      description
    }
    groups {
      id
      name
      description
    }
    composites {
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
    syncRolePolicy
  }
}`;

export function createMutation_role_Store(event: LoadEvent | RequestEvent): Mutation_role_Store {
  return createGraphQLMutationStore<Role, MutationRoleArgs>(query, event);
}

export type Mutation_role_Store = GraphQLStore<Role, MutationRoleArgs>;