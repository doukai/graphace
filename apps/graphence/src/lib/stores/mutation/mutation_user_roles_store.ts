import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { RoleInput, User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user_roles($user_id: String, $user_roles: [RoleInput]) {
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
      users(first: 3) {
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

export function createMutation_user_roles_Store(event: LoadEvent | RequestEvent): Mutation_user_roles_Store {
  return createGraphQLMutationStore<User, { user_id: string, user_roles: RoleInput[] | null }>(query, event);
}

export type Mutation_user_roles_Store = GraphQLStore<User, { user_id: string, user_roles: RoleInput[] | null }>;