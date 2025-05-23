import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationGroupArgs } from '~/lib/types/schema';
import type { Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group($id: ID, $name: String, $description: String, $path: String, $deep: Int, $parentId: String, $parent: GroupInput, $subGroups: [GroupInput], $users: [UserInput], $roles: [RoleInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $groupUserRelation: [GroupUserRelationInput], $groupRoleRelation: [GroupRoleRelationInput], $input: GroupInput, $where: GroupExpression) {
  group(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation input: $input where: $where) {
    id
    name
    description
    path
    deep
    parentId
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
    syncGroupPolicy
  }
}`;

export function createMutation_group_Store(event: LoadEvent | RequestEvent): Mutation_group_Store {
  return createGraphQLMutationStore<Group, MutationGroupArgs>(query, event);
}

export type Mutation_group_Store = GraphQLStore<Group, MutationGroupArgs>;