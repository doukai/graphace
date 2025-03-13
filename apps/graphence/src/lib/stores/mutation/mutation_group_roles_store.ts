import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { QueryRoleListArgs, RoleInput, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_roles($group_id: String, $group_roles: [RoleInput], $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $roleUserRelation: RoleUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $roleCompositeRelation: RoleCompositeRelationExpression, $permissionRoleRelation: PermissionRoleRelationExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $after: ID, $before: ID) {
  group(where: { id: { val: $group_id } }, roles: $group_roles) @merge {
    id
    name
    description
    path
    deep
    parentId
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncGroupPolicy
    roles {
      id
      name
      description
      path
      deep
      parentId
      parent {
        id
        name
        description
      }
      subGroups {
        id
        name
        description
      }
      users {
        id
        name
        description
      }
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
      syncGroupPolicy
    }
  }
}`;

export function createMutation_group_roles_Store(event: LoadEvent | RequestEvent): Mutation_group_roles_Store {
  return createGraphQLMutationStore<Group, { group_id: string, group_roles: [RoleInput] } & QueryRoleListArgs>(query, event);
}

export type Mutation_group_roles_Store = GraphQLStore<Group, { group_id: string, group_roles: [RoleInput] } & QueryRoleListArgs>;