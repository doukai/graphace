import type { GraphQLStore, Event } from "@graphace/ui-graphql";
import { fragment_GroupFields } from '~/lib/stores/fragment/fragment_GroupFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationGroupArgs, Group } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_group($id: ID, $name: String, $description: String, $path: String, $deep: Int, $parentId: String, $parent: GroupInput, $subGroups: [GroupInput], $users: [UserInput], $roles: [RoleInput], $realm: RealmInput, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $groupUserRelation: [GroupUserRelationInput], $groupRoleRelation: [GroupRoleRelationInput], $input: GroupInput, $where: GroupExpression) {
  group(id: $id name: $name description: $description path: $path deep: $deep parentId: $parentId parent: $parent subGroups: $subGroups users: $users roles: $roles realm: $realm isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupUserRelation: $groupUserRelation groupRoleRelation: $groupRoleRelation input: $input where: $where) {
    ...GroupFields
    syncGroupPolicy
  }
}
${fragment_GroupFields}`;

export function createMutation_group_Store(event: Event): Mutation_group_Store {
  return createGraphQLMutationStore<{ group: Group }, MutationGroupArgs>(query, event);
}

export type Mutation_group_Store = GraphQLStore<{ group: Group }, MutationGroupArgs>;