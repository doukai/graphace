import type { LoadEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLMutationStore } from '~/utils';
import type { MutationRealmArgs } from '~/lib/types/schema';
import type { Realm } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_realm($id: ID, $name: String, $description: String, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $input: RealmInput, $where: RealmExpression) {
  realm(id: $id name: $name description: $description isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId input: $input where: $where) {
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

export async function createMutationRealmStore(event: LoadEvent): Promise<GraphQLStore<Realm, MutationRealmArgs>> {
  return createGraphQLMutationStore<Realm, MutationRealmArgs>(query, event);
}