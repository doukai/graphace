import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';
import type { QueryUserConnectionArgs, Role } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_role_users($role_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $lastName: StringExpression, $login: StringExpression, $salt: StringExpression, $hash: StringExpression, $email: StringExpression, $phones: StringExpression, $disable: BooleanExpression, $groups: GroupExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $userPhonesRelation: UserPhonesRelationExpression, $groupUserRelation: GroupUserRelationExpression, $roleUserRelation: RoleUserRelationExpression, $first: Int, $last: Int, $offset: Int, $orderBy: UserOrderBy, $groupBy: [String!]) {
  role(id: $role_id) {
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

export async function createQuery_role_users_Store(event: LoadEvent, variables: { role_id: string } & QueryUserConnectionArgs): Promise<Query_role_users_Store> {
  return createGraphQLQueryStore<Role, { role_id: string } & QueryUserConnectionArgs>(query, event, variables);
}

export type Query_role_users_Store = GraphQLStore<Role, { role_id: string } & QueryUserConnectionArgs>;