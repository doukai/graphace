import type { GraphQLStore, QueryParams, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationGroupListArgs } from '~/lib/types/schema';
import type { Group } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `mutation Mutation_groupList($id: ID, $name: String, $description: String, $path: String, $deep: Int, $parentId: String, $parent: GroupInput, $subGroups: [GroupInput], $users: [UserInput], $roles: [RoleInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $groupUserRelation: [GroupUserRelationInput], $groupRoleRelation: [GroupRoleRelationInput], $list: [GroupInput], $where: GroupExpression) {
  groupList(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation list: $list where: $where) ${directives}{
    ...GroupFields
    syncGroupPolicy
    ${fields}
  }
}
${fragment_GroupFields}`;

export function createMutation_groupList_Store(event: Event): Mutation_groupList_Store {
  return createGraphQLMutationStore<{ groupList: Group[] }, MutationGroupListArgs>(query, event);
}

export type Mutation_groupList_Store = GraphQLStore<{ groupList: Group[] }, MutationGroupListArgs>;