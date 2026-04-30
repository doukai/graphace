import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationUserListArgs } from '~/lib/types/schema';
import type { User } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_userList($id: ID, $name: String, $description: String, $lastName: String, $login: String, $salt: String, $hash: String, $email: String, $phones: [String], $disable: Boolean, $groups: [GroupInput], $roles: [RoleInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $userPhonesRelation: [UserPhonesRelationInput], $groupUserRelation: [GroupUserRelationInput], $roleUserRelation: [RoleUserRelationInput], $list: [UserInput], $where: UserExpression) {
  userList(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation list: $list where: $where) ${directives}{
    ...UserFields
    syncUserPolicy
    ${fields}
  }
}
${fragment_UserFields}`;

export function createMutation_userList_Store(event: Event): Mutation_userList_Store {
  return createGraphQLMutationStore<{ userList: User[] }, MutationUserListArgs>(query, event);
}

export type Mutation_userList_Store = GraphQLStore<{ userList: User[] }, MutationUserListArgs>;