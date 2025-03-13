import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { QueryRoleListArgs, RoleInput, User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user_roles($user_id: String, $user_roles: [RoleInput], $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $after: ID, $before: ID) {
  user(where: { id: { val: $user_id } }, roles: $user_roles) @merge {
    id
    name
    description
    lastName
    login
    email
    phones
    disable
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncUserPolicy
    roles {
      id
      name
      description
      lastName
      login
      email
      phones
      disable
      groups {
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
      syncUserPolicy
    }
  }
}`;

export function createMutation_user_roles_Store(event: LoadEvent | RequestEvent): Mutation_user_roles_Store {
  return createGraphQLMutationStore<User, { user_id: string, user_roles: [RoleInput] } & QueryRoleListArgs>(query, event);
}

export type Mutation_user_roles_Store = GraphQLStore<User, { user_id: string, user_roles: [RoleInput] } & QueryRoleListArgs>;