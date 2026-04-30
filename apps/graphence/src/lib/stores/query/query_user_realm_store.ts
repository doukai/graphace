import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_RealmFields } from '~/lib/stores/fragment/fragment_RealmFields';
import { fragment_UserFields } from '~/lib/stores/fragment/fragment_UserFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRealmArgs, User } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_user_realm($user_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: RealmGroupBy) {
  user(id: { val: $user_id }) ${directives}{
    ...UserFields
    realm(id: $id name: $name description: $description includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupBy: $groupBy) {
      ...RealmFields
      ${fields}
    }
  }
}
${fragment_RealmFields}
${fragment_UserFields}`;

export function createQuery_user_realm_Store(event: Event): Query_user_realm_Store {
  return createGraphQLQueryStore<{ user: User }, { user_id: string } & QueryRealmArgs>(query, event);
}

export async function fetchQuery_user_realm_Store(event: Event, variables: { user_id: string } & QueryRealmArgs, params?: FetchParams | undefined): Promise<Query_user_realm_Store> {
  return fetchGraphQLQueryStore<{ user: User }, { user_id: string } & QueryRealmArgs>(query, event, variables, params);
}

export type Query_user_realm_Store = GraphQLStore<{ user: User }, { user_id: string } & QueryRealmArgs>;