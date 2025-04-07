import type { LoadEvent, RequestEvent } from '@sveltejs/kit';
import { type GraphQLStore } from "@graphace/ui-graphql";
import { createGraphQLQueryStore, fetchGraphQLQueryStore } from '~/utils';
import type { QueryFileListArgs, User } from '~/lib/types/schema';

const query = /* GraphQL */ `query Query_user_files($user_id: String, $id: StringExpression, $name: StringExpression, $contentType: StringExpression, $content: StringExpression, $url: StringExpression, $includeDeprecated: Boolean, $version: IntExpression, $realmId: IntExpression, $createUserId: StringExpression, $createTime: StringExpression, $updateUserId: StringExpression, $updateTime: StringExpression, $createGroupId: StringExpression, $groupBy: [String!], $first: Int, $last: Int, $offset: Int, $orderBy: FileOrderBy, $after: ID, $before: ID) {
  user(id: { val: $user_id }) {
    id
    name
    description
    lastName
    login
    email
    phones
    disable
    booleanList
    intList
    typeList
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    files(id: $id name: $name description: $description lastName: $lastName login: $login salt: $salt hash: $hash email: $email phones: $phones disable: $disable groups: $groups roles: $roles realm: $realm file: $file files: $files booleanList: $booleanList intList: $intList typeList: $typeList includeDeprecated: $includeDeprecated version: $version realmId: $realmId createUserId: $createUserId createTime: $createTime updateUserId: $updateUserId updateTime: $updateTime createGroupId: $createGroupId fileUserRelation: $fileUserRelation userPhonesRelation: $userPhonesRelation groupUserRelation: $groupUserRelation roleUserRelation: $roleUserRelation userBooleanListRelation: $userBooleanListRelation userIntListRelation: $userIntListRelation userTypeListRelation: $userTypeListRelation groupBy: $groupBy not: $not cond: $cond exs: $exs) {
      id
      name
      contentType
      content
      url
      isDeprecated
      version
      realmId
      createUserId
      createTime
      updateUserId
      updateTime
      createGroupId
    }
  }
}`;

export function createQuery_user_files_Store(event: LoadEvent | RequestEvent): Query_user_files_Store {
  return createGraphQLQueryStore<User, { user_id: string } & QueryFileListArgs>(query, event);
}

export async function fetchQuery_user_files_Store(event: LoadEvent | RequestEvent, variables: { user_id: string } & QueryFileListArgs): Promise<Query_user_files_Store> {
  return fetchGraphQLQueryStore<User, { user_id: string } & QueryFileListArgs>(query, event, variables);
}

export type Query_user_files_Store = GraphQLStore<User, { user_id: string } & QueryFileListArgs>;