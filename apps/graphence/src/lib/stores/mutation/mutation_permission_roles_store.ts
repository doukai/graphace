import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { QueryRoleListArgs, RoleInput, Permission } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_permission_roles($permission_name: String, $permission_roles: [RoleInput], $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $after: ID, $before: ID) {
  permission(where: { name: { val: $permission_name } }, roles: $permission_roles) @merge {
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
      name
      description
      field
      type
      permissionType
      roles {
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
  }
}`;

export function createMutation_permission_roles_Store(event: LoadEvent | RequestEvent): Mutation_permission_roles_Store {
  return createGraphQLMutationStore<Permission, { permission_name: string, permission_roles: [RoleInput] } & QueryRoleListArgs>(query, event);
}

export type Mutation_permission_roles_Store = GraphQLStore<Permission, { permission_name: string, permission_roles: [RoleInput] } & QueryRoleListArgs>;