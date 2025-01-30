import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationGroupConnectionArgs, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group_subGroups($group_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $path: StringExpression, $deep: IntExpression, $parentId: StringExpression, $parent: GroupExpression, $subGroups: GroupExpression, $users: UserExpression, $roles: RoleExpression, $realm: RealmExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupUserRelation: GroupUserRelationExpression, $groupRoleRelation: GroupRoleRelationExpression, $first: Int, $last: Int, $offset: Int, $orderBy: GroupOrderBy, $groupBy: [String!]) {
  group(where: { id: { val: $group_id } }) @merge {
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
    subGroupsConnection(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation first: $first last: $last offset: $offset orderBy: $orderBy groupBy: $groupBy) {
      totalCount
      edges {
        node {
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
    }
  }
}`;

export async function createMutation_group_subGroups_Store(event: LoadEvent): Promise<Mutation_group_subGroups_Store> {
  return createGraphQLMutationStore<Group, { group_id: string } & MutationGroupConnectionArgs>(query, event);
}

export type Mutation_group_subGroups_Store = GraphQLStore<Group, { group_id: string } & MutationGroupConnectionArgs>;