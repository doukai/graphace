import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { QueryUserConnectionArgs, UserInput, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_users($group_id: String, $group_users: [UserInput], $id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $first: Int, $last: Int, $offset: Int, $orderBy: UserOrderBy, $groupBy: [String!]) {
  group(where: { id: { val: $group_id } }, users: $group_users) @merge {
    id
    name
    description
    path
    deep
    parentId
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncGroupPolicy
    usersConnection(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation first: $first last: $last offset: $offset orderBy: $orderBy groupBy: $groupBy) {
      totalCount
      edges {
        node {
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
            name
            description
          }
        }
      }
    }
  }
}`;

export function createMutation_group_users_Store(event: LoadEvent | RequestEvent): Mutation_group_users_Store {
  return createGraphQLMutationStore<Group, { group_id: string, group_users: [UserInput] } & QueryUserConnectionArgs>(query, event);
}

export type Mutation_group_users_Store = GraphQLStore<Group, { group_id: string, group_users: [UserInput] } & QueryUserConnectionArgs>;