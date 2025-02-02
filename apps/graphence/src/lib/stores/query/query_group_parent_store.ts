import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryGroupArgs, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_group_parent($group_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!]) {
  group(id: $group_id) {
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
    parent(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupBy: $groupBy) {
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
      parent {
        id
        name
        description
      }
      subGroups {
        id
        name
        description
      }
      users {
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
}`;

export function createQuery_group_parent_Store(event: LoadEvent | RequestEvent): Query_group_parent_Store {
  return createGraphQLQueryStore<Group, { group_id: string } & QueryGroupArgs>(query, event);
}

export async function fetchQuery_group_parent_Store(event: LoadEvent | RequestEvent, variables: { group_id: string } & QueryGroupArgs): Promise<Query_group_parent_Store> {
  return fetchGraphQLQueryStore<Group, { group_id: string } & QueryGroupArgs>(query, event, variables);
}

export type Query_group_parent_Store = GraphQLStore<Group, { group_id: string } & QueryGroupArgs>;