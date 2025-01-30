import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationPermissionConnectionArgs, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role_permissions($role_id: String, $name: StringExpression, $description: StringExpression, $field: StringExpression, $type: StringExpression, $permissionType: PermissionTypeExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $first: Int, $last: Int, $offset: Int, $orderBy: PermissionOrderBy, $groupBy: [String!]) {
  role(where: { id: { val: $role_id } }) @merge {
    id
    name
    description
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncRolePolicy
    permissionsConnection(name: $name description: $description field: $field type: $type permissionType: $permissionType roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId first: $first last: $last offset: $offset orderBy: $orderBy groupBy: $groupBy) {
      totalCount
      edges {
        node {
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
      }
    }
  }
}`;

export async function createMutation_role_permissions_Store(event: LoadEvent): Promise<Mutation_role_permissions_Store> {
  return createGraphQLMutationStore<Role, { role_id: string } & MutationPermissionConnectionArgs>(query, event);
}

export type Mutation_role_permissions_Store = GraphQLStore<Role, { role_id: string } & MutationPermissionConnectionArgs>;