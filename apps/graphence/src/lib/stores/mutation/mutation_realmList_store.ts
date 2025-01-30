import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationRealmListArgs } from '~/lib/types/schema';
import type { Realm } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_realmList($id: ID, $name: String, $description: String, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $list: [RealmInput], $where: RealmExpression) {
  realmList(id: $id name: $name description: $description isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId list: $list where: $where) {
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
  }
}`;

export async function createMutation_realmList_Store(event: LoadEvent): Promise<Mutation_realmList_Store> {
  return createGraphQLMutationStore<Realm[], MutationRealmListArgs>(query, event);
}

export type Mutation_realmList_Store = GraphQLStore<Realm[], MutationRealmListArgs>;