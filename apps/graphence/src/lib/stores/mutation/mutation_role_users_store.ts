import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { QueryUserListArgs, UserInput, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role_users($role_id: String, $role_users: [UserInput], $id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: UserOrderBy, $after: ID, $before: ID) {
  role(where: { id: { val: $role_id } }, users: $role_users) @merge {
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
    users {
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
  }
}`;

export function createMutation_role_users_Store(event: LoadEvent | RequestEvent): Mutation_role_users_Store {
  return createGraphQLMutationStore<Role, { role_id: string, role_users: [UserInput] } & QueryUserListArgs>(query, event);
}

export type Mutation_role_users_Store = GraphQLStore<Role, { role_id: string, role_users: [UserInput] } & QueryUserListArgs>;