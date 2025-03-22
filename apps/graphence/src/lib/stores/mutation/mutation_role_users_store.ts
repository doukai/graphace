import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { UserInput, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role_users($role_id: String, $role_users: UserInput[]) {
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

export function createMutation_role_users_Store(event: LoadEvent | RequestEvent): Mutation_role_users_Store {
  return createGraphQLMutationStore<Role, { role_id: string, role_users: UserInput[] | null }>(query, event);
}

export type Mutation_role_users_Store = GraphQLStore<Role, { role_id: string, role_users: UserInput[] | null }>;