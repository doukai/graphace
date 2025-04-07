import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationUserArgs } from '~/lib/types/schema';
import type { User } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_user($id: ID, $name: String, $description: String, $lastName: String, $login: String, $salt: String, $hash: String, $email: String, $phones: [String], $disable: Boolean, $groups: [GroupInput], $roles: [RoleInput], $realm: RealmInput, $file: FileInput, $files: [FileInput], $booleanList: [Boolean], $intList: [Int], $typeList: [PermissionType], $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $fileUserRelation: [FileUserRelationInput], $userPhonesRelation: [UserPhonesRelationInput], $groupUserRelation: [GroupUserRelationInput], $roleUserRelation: [RoleUserRelationInput], $userBooleanListRelation: [UserBooleanListRelationInput], $userIntListRelation: [UserIntListRelationInput], $userTypeListRelation: [UserTypeListRelationInput], $input: UserInput, $where: UserExpression) {
  user(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm file: $file files: $files booleanList: $booleanList intList: $intList typeList: $typeList isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId fileUserRelation: $fileUserRelation userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation userBooleanListRelation: $userBooleanListRelation userIntListRelation: $userIntListRelation userTypeListRelation: $userTypeListRelation input: $input where: $where) {
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
    file {
      id
      name
    }
    files {
      id
      name
    }
    booleanList
    intList
    typeList
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
}`;

export function createMutation_user_Store(event: LoadEvent | RequestEvent): Mutation_user_Store {
  return createGraphQLMutationStore<User, MutationUserArgs>(query, event);
}

export type Mutation_user_Store = GraphQLStore<User, MutationUserArgs>;