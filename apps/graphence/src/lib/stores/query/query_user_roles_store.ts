import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';
import type { QueryRoleConnectionArgs, User } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_user_roles($user_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $users: UserExpression, $groups: GroupExpression, $composites: RoleExpression, $permissions: PermissionExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $first: Int, $last: Int, $offset: Int, $orderBy: RoleOrderBy, $groupBy: [String!]) {
  user(id: $user_id) {
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
    rolesConnection(id: $id name: $name description: $description users: $users groups: $groups composites: $composites permissions: $permissions realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId first: $first last: $last offset: $offset orderBy: $orderBy groupBy: $groupBy) {
      totalCount
      edges {
        node {
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
            name
            description
          }
        }
      }
    }
  }
}`;

export async function createQuery_user_roles_Store(event: LoadEvent, variables: { user_id: string } & QueryRoleConnectionArgs): Promise<Query_user_roles_Store> {
  return createGraphQLQueryStore<User, { user_id: string } & QueryRoleConnectionArgs>(query, event, variables);
}

export type Query_user_roles_Store = GraphQLStore<User, { user_id: string } & QueryRoleConnectionArgs>;