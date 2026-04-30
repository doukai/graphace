import type { GraphQLStore, QueryParams, FetchParams, Event } from "@graphace/ui-graphql";
import { fragment_RealmFields } from '~/lib/stores/fragment/fragment_RealmFields';
import { fragment_RoleFields } from '~/lib/stores/fragment/fragment_RoleFields';
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryRealmArgs, Role } from '~/lib/types/schema';

const query = ({ fields, directives }: QueryParams) =>/* GraphQL */ `query Query_role_realm($role_id: String, $id: StringExpression, $name: StringExpression, $description: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: RealmGroupBy) {
  role(id: { val: $role_id }) ${directives}{
    ...RoleFields
    realm(id: $id name: $name description: $description includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId groupBy: $groupBy) {
      ...RealmFields
      ${fields}
    }
  }
}
${fragment_RealmFields}
${fragment_RoleFields}`;

export function createQuery_role_realm_Store(event: Event): Query_role_realm_Store {
  return createGraphQLQueryStore<{ role: Role }, { role_id: string } & QueryRealmArgs>(query, event);
}

export async function fetchQuery_role_realm_Store(event: Event, variables: { role_id: string } & QueryRealmArgs, params?: FetchParams | undefined): Promise<Query_role_realm_Store> {
  return fetchGraphQLQueryStore<{ role: Role }, { role_id: string } & QueryRealmArgs>(query, event, variables, params);
}

export type Query_role_realm_Store = GraphQLStore<{ role: Role }, { role_id: string } & QueryRealmArgs>;