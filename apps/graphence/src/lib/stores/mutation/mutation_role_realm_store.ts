import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { QueryRealmArgs, RealmInput, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_role_realm($role_id: String, $role_realm: RealmInput, $id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!]) {
  role(where: { id: { val: $role_id } }, realm: $role_realm) @merge {
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
    realm {
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

export function createMutation_role_realm_Store(event: LoadEvent | RequestEvent): Mutation_role_realm_Store {
  return createGraphQLMutationStore<Role, { role_id: string, role_realm: RealmInput } & QueryRealmArgs>(query, event);
}

export type Mutation_role_realm_Store = GraphQLStore<Role, { role_id: string, role_realm: RealmInput } & QueryRealmArgs>;