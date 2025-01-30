import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore } from '~/utils';
import type { QueryGroupListArgs } from '~/lib/types/schema';
import type { Group } from '~/lib/types/schema';

const query = /* GraphQL */ `query query_groupList($id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupUserRelation: GroupUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $orderBy: GroupOrderBy, $groupBy: [String!], $not: Boolean, $cond: Conditional, $exs: [GroupExpression], $first: Int, $last: Int, $offset: Int, $after: ID, $before: ID) {
  groupList(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation orderBy: $orderBy groupBy: $groupBy not: $not cond: $cond exs: $exs first: $first last: $last offset: $offset after: $after before: $before) {
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
}`;

export async function createQuery_groupList_Store(event: LoadEvent, variables: QueryGroupListArgs): Promise<Query_groupList_Store> {
  return createGraphQLQueryStore<Group[], QueryGroupListArgs>(query, event, variables);
}

export type Query_groupList_Store = GraphQLStore<Group[], QueryGroupListArgs>;