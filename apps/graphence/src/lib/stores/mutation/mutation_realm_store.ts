import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { fragment_RealmFields } from '~/lib/stores/fragment/fragment_RealmFields';
import { createGraphQLMutationStore } from '~/utils';
import type { MutationRealmArgs } from '~/lib/types/schema';
import type { Realm } from '~/lib/types/schema';

const query = /* GraphQL */ `mutation Mutation_realm($id: ID, $name: String, $description: String, $isDeprecated: Boolean, $version: Int, $realmId: Int, $createUserId: String, $createTime: Timestamp, $updateUserId: String, $updateTime: Timestamp, $createGroupId: String, $input: RealmInput, $where: RealmExpression) {
  realm(id: $id name: $name description: $description isDeprecated: $isDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId input: $input where: $where) {
    ...RealmFields
  }
}
${fragment_RealmFields}`;

export function createMutation_realm_Store(event: LoadEvent | RequestEvent): Mutation_realm_Store {
  return createGraphQLMutationStore<Realm, MutationRealmArgs>(query, event);
}

export type Mutation_realm_Store = GraphQLStore<Realm, MutationRealmArgs>;