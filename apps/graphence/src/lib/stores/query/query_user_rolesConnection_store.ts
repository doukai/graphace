import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRoleConnectionArgs, User } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_user_rolesConnection($user_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $groupBy: [String!]) {
  user(id: { val: $user_id }) {
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
    rolesConnection(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      totalCount
      edges {
        node {
          id
          name
          description
          users(first: 3) {
            id
            name
            description
          }
          groups(first: 3) {
            id
            name
            description
          }
          composites(first: 3) {
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
        }
      }
    }
  }
}`;

export function createQuery_user_rolesConnection_Store(event: LoadEvent | RequestEvent): Query_user_rolesConnection_Store {
  return createGraphQLQueryStore<User, { user_id: string } & QueryRoleConnectionArgs>(query, event);
}

export async function fetchQuery_user_rolesConnection_Store(event: LoadEvent | RequestEvent, variables: { user_id: string } & QueryRoleConnectionArgs): Promise<Query_user_rolesConnection_Store> {
  return fetchGraphQLQueryStore<User, { user_id: string } & QueryRoleConnectionArgs>(query, event, variables);
}

export type Query_user_rolesConnection_Store = GraphQLStore<User, { user_id: string } & QueryRoleConnectionArgs>;