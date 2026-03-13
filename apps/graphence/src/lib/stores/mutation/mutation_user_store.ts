import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationUserArgs, User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user($id: ID, $name: String, $description: String, $lastName: String, $login: String, $salt: String, $hash: String, $email: String, $phones: [String], $disable: Boolean, $groups: [GroupInput], $roles: [RoleInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $userPhonesRelation: [UserPhonesRelationInput], $groupUserRelation: [GroupUserRelationInput], $roleUserRelation: [RoleUserRelationInput], $input: UserInput, $where: UserExpression) {
  user(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation input: $input where: $where) {
    ...UserFields
    syncUserPolicy
  }
}
${fragment_UserFields}`;

export function createMutation_user_Store(event: Event): Mutation_user_Store {
  return createGraphQLMutationStore<{ user: User }, MutationUserArgs>(query, event);
}

export type Mutation_user_Store = GraphQLStore<{ user: User }, MutationUserArgs>;