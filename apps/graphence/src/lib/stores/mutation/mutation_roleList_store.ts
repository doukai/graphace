import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationRoleListArgs } from '~/lib/types/schema';
import type { Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_roleList($id: ID, $name: String, $description: String, $users: [UserInput], $groups: [GroupInput], $composites: [RoleInput], $permissions: [PermissionInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $roleUserRelation: [RoleUserRelationInput], $groupRoleRelation: [GroupRoleRelationInput], $roleCompositeRelation: [RoleCompositeRelationInput], $permissionRoleRelation: [PermissionRoleRelationInput], $list: [RoleInput], $where: RoleExpression) {
  roleList(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId roleUserRelation: $roleUserRelation groupRoleRelation: $groupRoleRelation roleCompositeRelation: $roleCompositeRelation permissionRoleRelation: $permissionRoleRelation list: $list where: $where) {
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

export function createMutation_roleList_Store(event: LoadEvent | RequestEvent): Mutation_roleList_Store {
  return createGraphQLMutationStore<Role[], MutationRoleListArgs>(query, event);
}

export type Mutation_roleList_Store = GraphQLStore<Role[], MutationRoleListArgs>;