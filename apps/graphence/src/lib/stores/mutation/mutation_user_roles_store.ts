import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationRoleListArgs, User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user_roles($user_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $groupBy: [String!]) {
  user(where: { id: { val: $user_id } }) @merge {
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
    rolesConnection(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId first: $first last: $last offset: $offset orderBy: $orderBy groupBy: $groupBy) {
      totalCount
      edges {
        node {
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
            name
            description
          }
        }
      }
    }
  }
}`;

export async function createMutation_user_roles_Store(event: LoadEvent): Promise<Mutation_user_roles_Store> {
  return createGraphQLMutationStore<User, { user_id: string } & MutationRoleListArgs>(query, event);
}

export type Mutation_user_roles_Store = GraphQLStore<User, { user_id: string } & MutationRoleListArgs>;