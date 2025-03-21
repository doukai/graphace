import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { QueryGroupListArgs, GroupInput, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role_groups($role_id: String, $role_groups: [GroupInput], $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: GroupOrderBy, $after: ID, $before: ID) {
  role(where: { id: { val: $role_id } }, groups: $role_groups) @merge {
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
    groups {
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

export function createMutation_role_groups_Store(event: LoadEvent | RequestEvent): Mutation_role_groups_Store {
  return createGraphQLMutationStore<Role, { role_id: string, role_groups: [GroupInput] | null } & QueryGroupListArgs>(query, event);
}

export type Mutation_role_groups_Store = GraphQLStore<Role, { role_id: string, role_groups: [GroupInput] | null } & QueryGroupListArgs>;