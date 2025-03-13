import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { QueryRealmArgs, RealmInput, User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user_realm($user_id: String, $user_realm: RealmInput, $id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!]) {
  user(where: { id: { val: $user_id } }, realm: $user_realm) @merge {
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
    realm {
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

export function createMutation_user_realm_Store(event: LoadEvent | RequestEvent): Mutation_user_realm_Store {
  return createGraphQLMutationStore<User, { user_id: string, user_realm: RealmInput } & QueryRealmArgs>(query, event);
}

export type Mutation_user_realm_Store = GraphQLStore<User, { user_id: string, user_realm: RealmInput } & QueryRealmArgs>;