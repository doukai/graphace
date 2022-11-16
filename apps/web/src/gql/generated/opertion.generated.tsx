import * as Types from './schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateGroupIdQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateGroupIdQuery = { __typename?: 'QueryType', createGroupId?: string | null };

export type CreateTimeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateTimeQuery = { __typename?: 'QueryType', createTime?: any | null };

export type CreateUserIdQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateUserIdQuery = { __typename?: 'QueryType', createUserId?: string | null };

export type FindRole2QueryVariables = Types.Exact<{
  disable?: Types.InputMaybe<Types.Scalars['Boolean']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  type?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type FindRole2Query = { __typename?: 'QueryType', findRole2?: Array<{ __typename?: 'Role', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, realmId?: string | null, type: Array<Types.RoleType | null>, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type IsDeprecatedQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type IsDeprecatedQuery = { __typename?: 'QueryType', isDeprecated?: boolean | null };

export type OrgLevelQueryVariables = Types.Exact<{
  organization?: Types.InputMaybe<Types.OrganizationInput>;
}>;


export type OrgLevelQuery = { __typename?: 'QueryType', orgLevel?: number | null };

export type OrgLevel5QueryVariables = Types.Exact<{
  organization?: Types.InputMaybe<Types.OrganizationInput>;
}>;


export type OrgLevel5Query = { __typename?: 'QueryType', orgLevel5?: Array<number | null> | null };

export type OrganizationQueryVariables = Types.Exact<{
  above?: Types.InputMaybe<Types.OrganizationExpression>;
  aboveId?: Types.InputMaybe<Types.IntExpression>;
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  name?: Types.InputMaybe<Types.StringExpression>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  users?: Types.InputMaybe<Types.UserExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type OrganizationQuery = { __typename?: 'QueryType', organization?: { __typename?: 'Organization', aboveId?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, orgLevel3?: Array<number | null> | null, realmId?: string | null, roleDisable?: Array<boolean | null> | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type OrganizationListQueryVariables = Types.Exact<{
  above?: Types.InputMaybe<Types.OrganizationExpression>;
  aboveId?: Types.InputMaybe<Types.IntExpression>;
  after?: Types.InputMaybe<Types.Scalars['ID']>;
  before?: Types.InputMaybe<Types.Scalars['ID']>;
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  groupBy?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  name?: Types.InputMaybe<Types.StringExpression>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.OrganizationOrderBy>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  users?: Types.InputMaybe<Types.UserExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type OrganizationListQuery = { __typename?: 'QueryType', organizationList?: Array<{ __typename?: 'Organization', aboveId?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, orgLevel3?: Array<number | null> | null, realmId?: string | null, roleDisable?: Array<boolean | null> | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type Parent2QueryVariables = Types.Exact<{
  organization?: Types.InputMaybe<Types.OrganizationInput>;
}>;


export type Parent2Query = { __typename?: 'QueryType', parent2?: { __typename?: 'Organization', aboveId?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, orgLevel3?: Array<number | null> | null, realmId?: string | null, roleDisable?: Array<boolean | null> | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type RealmIdQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RealmIdQuery = { __typename?: 'QueryType', realmId?: string | null };

export type RoleQueryVariables = Types.Exact<{
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  name?: Types.InputMaybe<Types.StringExpression>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  type?: Types.InputMaybe<Types.RoleTypeExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  users?: Types.InputMaybe<Types.UserExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type RoleQuery = { __typename?: 'QueryType', role?: { __typename?: 'Role', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, realmId?: string | null, type: Array<Types.RoleType | null>, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type RoleDisable2QueryVariables = Types.Exact<{
  organization?: Types.InputMaybe<Types.OrganizationInput>;
}>;


export type RoleDisable2Query = { __typename?: 'QueryType', roleDisable2?: Array<boolean | null> | null };

export type RoleListQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['ID']>;
  before?: Types.InputMaybe<Types.Scalars['ID']>;
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  groupBy?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  name?: Types.InputMaybe<Types.StringExpression>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.RoleOrderBy>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  type?: Types.InputMaybe<Types.RoleTypeExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  users?: Types.InputMaybe<Types.UserExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type RoleListQuery = { __typename?: 'QueryType', roleList?: Array<{ __typename?: 'Role', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, realmId?: string | null, type: Array<Types.RoleType | null>, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type RoleRoleTypeQueryVariables = Types.Exact<{
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  roleId?: Types.InputMaybe<Types.IntExpression>;
  type?: Types.InputMaybe<Types.RoleTypeExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type RoleRoleTypeQuery = { __typename?: 'QueryType', roleRoleType?: { __typename?: 'RoleRoleType', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, type?: Types.RoleType | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type RoleRoleTypeListQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['ID']>;
  before?: Types.InputMaybe<Types.Scalars['ID']>;
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  groupBy?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.RoleRoleTypeOrderBy>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  roleId?: Types.InputMaybe<Types.IntExpression>;
  type?: Types.InputMaybe<Types.RoleTypeExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type RoleRoleTypeListQuery = { __typename?: 'QueryType', roleRoleTypeList?: Array<{ __typename?: 'RoleRoleType', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, type?: Types.RoleType | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type UpdateTimeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UpdateTimeQuery = { __typename?: 'QueryType', updateTime?: any | null };

export type UpdateUserIdQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UpdateUserIdQuery = { __typename?: 'QueryType', updateUserId?: string | null };

export type UserQueryVariables = Types.Exact<{
  age?: Types.InputMaybe<Types.IntExpression>;
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  disable?: Types.InputMaybe<Types.BooleanExpression>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  login?: Types.InputMaybe<Types.StringExpression>;
  name?: Types.InputMaybe<Types.StringExpression>;
  organization?: Types.InputMaybe<Types.OrganizationExpression>;
  organizationId?: Types.InputMaybe<Types.IntExpression>;
  password?: Types.InputMaybe<Types.StringExpression>;
  phones?: Types.InputMaybe<Types.StringExpression>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  roles?: Types.InputMaybe<Types.RoleExpression>;
  sex?: Types.InputMaybe<Types.SexExpression>;
  test1?: Types.InputMaybe<Types.IntExpression>;
  test2?: Types.InputMaybe<Types.BooleanExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  userProfile?: Types.InputMaybe<Types.UserProfileExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type UserQuery = { __typename?: 'QueryType', user?: { __typename?: 'User', age?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, disable?: boolean | null, id?: string | null, isDeprecated?: boolean | null, login: string, name: string, organizationId?: number | null, password: string, phones?: Array<string> | null, realmId?: string | null, sex?: Types.Sex | null, test1?: Array<number> | null, test2?: Array<boolean> | null, updateTime?: any | null, updateUserId?: string | null, userDetail2?: string | null, version?: number | null } | null };

export type UserByOrg2QueryVariables = Types.Exact<{
  organization?: Types.InputMaybe<Types.OrganizationInput>;
}>;


export type UserByOrg2Query = { __typename?: 'QueryType', userByOrg2?: Array<{ __typename?: 'User', age?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, disable?: boolean | null, id?: string | null, isDeprecated?: boolean | null, login: string, name: string, organizationId?: number | null, password: string, phones?: Array<string> | null, realmId?: string | null, sex?: Types.Sex | null, test1?: Array<number> | null, test2?: Array<boolean> | null, updateTime?: any | null, updateUserId?: string | null, userDetail2?: string | null, version?: number | null } | null> | null };

export type UserDetailQueryVariables = Types.Exact<{
  user?: Types.InputMaybe<Types.UserInput>;
}>;


export type UserDetailQuery = { __typename?: 'QueryType', userDetail?: string | null };

export type UserDetail6QueryVariables = Types.Exact<{
  user?: Types.InputMaybe<Types.UserInput>;
}>;


export type UserDetail6Query = { __typename?: 'QueryType', userDetail6?: Array<string | null> | null };

export type UserListQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['ID']>;
  age?: Types.InputMaybe<Types.IntExpression>;
  before?: Types.InputMaybe<Types.Scalars['ID']>;
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  disable?: Types.InputMaybe<Types.BooleanExpression>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  groupBy?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  login?: Types.InputMaybe<Types.StringExpression>;
  name?: Types.InputMaybe<Types.StringExpression>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.UserOrderBy>;
  organization?: Types.InputMaybe<Types.OrganizationExpression>;
  organizationId?: Types.InputMaybe<Types.IntExpression>;
  password?: Types.InputMaybe<Types.StringExpression>;
  phones?: Types.InputMaybe<Types.StringExpression>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  roles?: Types.InputMaybe<Types.RoleExpression>;
  sex?: Types.InputMaybe<Types.SexExpression>;
  test1?: Types.InputMaybe<Types.IntExpression>;
  test2?: Types.InputMaybe<Types.BooleanExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  userProfile?: Types.InputMaybe<Types.UserProfileExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type UserListQuery = { __typename?: 'QueryType', userList?: Array<{ __typename?: 'User', age?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, disable?: boolean | null, id?: string | null, isDeprecated?: boolean | null, login: string, name: string, organizationId?: number | null, password: string, phones?: Array<string> | null, realmId?: string | null, sex?: Types.Sex | null, test1?: Array<number> | null, test2?: Array<boolean> | null, updateTime?: any | null, updateUserId?: string | null, userDetail2?: string | null, version?: number | null } | null> | null };

export type UserPhonesQueryVariables = Types.Exact<{
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  phone?: Types.InputMaybe<Types.StringExpression>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  userId?: Types.InputMaybe<Types.IntExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type UserPhonesQuery = { __typename?: 'QueryType', userPhones?: { __typename?: 'UserPhones', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, phone?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type UserPhonesListQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['ID']>;
  before?: Types.InputMaybe<Types.Scalars['ID']>;
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  groupBy?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.UserPhonesOrderBy>;
  phone?: Types.InputMaybe<Types.StringExpression>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  userId?: Types.InputMaybe<Types.IntExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type UserPhonesListQuery = { __typename?: 'QueryType', userPhonesList?: Array<{ __typename?: 'UserPhones', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, phone?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type UserProfileQueryVariables = Types.Exact<{
  address?: Types.InputMaybe<Types.StringExpression>;
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  email?: Types.InputMaybe<Types.StringExpression>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  qq?: Types.InputMaybe<Types.StringExpression>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  user?: Types.InputMaybe<Types.UserExpression>;
  userId?: Types.InputMaybe<Types.StringExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type UserProfileQuery = { __typename?: 'QueryType', userProfile?: { __typename?: 'UserProfile', address?: string | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, email?: string | null, id?: string | null, isDeprecated?: boolean | null, qq?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: string | null, version?: number | null } | null };

export type UserProfileListQueryVariables = Types.Exact<{
  address?: Types.InputMaybe<Types.StringExpression>;
  after?: Types.InputMaybe<Types.Scalars['ID']>;
  before?: Types.InputMaybe<Types.Scalars['ID']>;
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  email?: Types.InputMaybe<Types.StringExpression>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  groupBy?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.UserProfileOrderBy>;
  qq?: Types.InputMaybe<Types.StringExpression>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  user?: Types.InputMaybe<Types.UserExpression>;
  userId?: Types.InputMaybe<Types.StringExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type UserProfileListQuery = { __typename?: 'QueryType', userProfileList?: Array<{ __typename?: 'UserProfile', address?: string | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, email?: string | null, id?: string | null, isDeprecated?: boolean | null, qq?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: string | null, version?: number | null } | null> | null };

export type UserRoleQueryVariables = Types.Exact<{
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  roleId?: Types.InputMaybe<Types.IntExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  userId?: Types.InputMaybe<Types.IntExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type UserRoleQuery = { __typename?: 'QueryType', userRole?: { __typename?: 'UserRole', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type UserRoleListQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['ID']>;
  before?: Types.InputMaybe<Types.Scalars['ID']>;
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  groupBy?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.UserRoleOrderBy>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  roleId?: Types.InputMaybe<Types.IntExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  userId?: Types.InputMaybe<Types.IntExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type UserRoleListQuery = { __typename?: 'QueryType', userRoleList?: Array<{ __typename?: 'UserRole', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type UserTest1QueryVariables = Types.Exact<{
  cond?: Types.InputMaybe<Types.Conditional>;
  createGroupId?: Types.InputMaybe<Types.StringExpression>;
  createTime?: Types.InputMaybe<Types.StringExpression>;
  createUserId?: Types.InputMaybe<Types.StringExpression>;
  id?: Types.InputMaybe<Types.StringExpression>;
  includeDeprecated?: Types.InputMaybe<Types.Scalars['Boolean']>;
  realmId?: Types.InputMaybe<Types.StringExpression>;
  test1?: Types.InputMaybe<Types.IntExpression>;
  updateTime?: Types.InputMaybe<Types.StringExpression>;
  updateUserId?: Types.InputMaybe<Types.StringExpression>;
  userId?: Types.InputMaybe<Types.IntExpression>;
  version?: Types.InputMaybe<Types.IntExpression>;
}>;


export type UserTest1Query = { __typename?: 'QueryType', userTest1?: { __typename?: 'UserTest1', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test1?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };


export const CreateGroupIdDocument = gql`
    query CreateGroupId {
  createGroupId
}
    `;

/**
 * __useCreateGroupIdQuery__
 *
 * To run a query within a React component, call `useCreateGroupIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateGroupIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreateGroupIdQuery(baseOptions?: Apollo.QueryHookOptions<CreateGroupIdQuery, CreateGroupIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CreateGroupIdQuery, CreateGroupIdQueryVariables>(CreateGroupIdDocument, options);
      }
export function useCreateGroupIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreateGroupIdQuery, CreateGroupIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CreateGroupIdQuery, CreateGroupIdQueryVariables>(CreateGroupIdDocument, options);
        }
export type CreateGroupIdQueryHookResult = ReturnType<typeof useCreateGroupIdQuery>;
export type CreateGroupIdLazyQueryHookResult = ReturnType<typeof useCreateGroupIdLazyQuery>;
export type CreateGroupIdQueryResult = Apollo.QueryResult<CreateGroupIdQuery, CreateGroupIdQueryVariables>;
export const CreateTimeDocument = gql`
    query CreateTime {
  createTime
}
    `;

/**
 * __useCreateTimeQuery__
 *
 * To run a query within a React component, call `useCreateTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateTimeQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreateTimeQuery(baseOptions?: Apollo.QueryHookOptions<CreateTimeQuery, CreateTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CreateTimeQuery, CreateTimeQueryVariables>(CreateTimeDocument, options);
      }
export function useCreateTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreateTimeQuery, CreateTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CreateTimeQuery, CreateTimeQueryVariables>(CreateTimeDocument, options);
        }
export type CreateTimeQueryHookResult = ReturnType<typeof useCreateTimeQuery>;
export type CreateTimeLazyQueryHookResult = ReturnType<typeof useCreateTimeLazyQuery>;
export type CreateTimeQueryResult = Apollo.QueryResult<CreateTimeQuery, CreateTimeQueryVariables>;
export const CreateUserIdDocument = gql`
    query CreateUserId {
  createUserId
}
    `;

/**
 * __useCreateUserIdQuery__
 *
 * To run a query within a React component, call `useCreateUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreateUserIdQuery(baseOptions?: Apollo.QueryHookOptions<CreateUserIdQuery, CreateUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CreateUserIdQuery, CreateUserIdQueryVariables>(CreateUserIdDocument, options);
      }
export function useCreateUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreateUserIdQuery, CreateUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CreateUserIdQuery, CreateUserIdQueryVariables>(CreateUserIdDocument, options);
        }
export type CreateUserIdQueryHookResult = ReturnType<typeof useCreateUserIdQuery>;
export type CreateUserIdLazyQueryHookResult = ReturnType<typeof useCreateUserIdLazyQuery>;
export type CreateUserIdQueryResult = Apollo.QueryResult<CreateUserIdQuery, CreateUserIdQueryVariables>;
export const FindRole2Document = gql`
    query FindRole2($disable: Boolean, $name: String, $type: Int) {
  findRole2(disable: $disable, name: $name, type: $type) {
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    name
    realmId
    type
    updateTime
    updateUserId
    version
  }
}
    `;

/**
 * __useFindRole2Query__
 *
 * To run a query within a React component, call `useFindRole2Query` and pass it any options that fit your needs.
 * When your component renders, `useFindRole2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRole2Query({
 *   variables: {
 *      disable: // value for 'disable'
 *      name: // value for 'name'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useFindRole2Query(baseOptions?: Apollo.QueryHookOptions<FindRole2Query, FindRole2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRole2Query, FindRole2QueryVariables>(FindRole2Document, options);
      }
export function useFindRole2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRole2Query, FindRole2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRole2Query, FindRole2QueryVariables>(FindRole2Document, options);
        }
export type FindRole2QueryHookResult = ReturnType<typeof useFindRole2Query>;
export type FindRole2LazyQueryHookResult = ReturnType<typeof useFindRole2LazyQuery>;
export type FindRole2QueryResult = Apollo.QueryResult<FindRole2Query, FindRole2QueryVariables>;
export const IsDeprecatedDocument = gql`
    query IsDeprecated {
  isDeprecated
}
    `;

/**
 * __useIsDeprecatedQuery__
 *
 * To run a query within a React component, call `useIsDeprecatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsDeprecatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsDeprecatedQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsDeprecatedQuery(baseOptions?: Apollo.QueryHookOptions<IsDeprecatedQuery, IsDeprecatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsDeprecatedQuery, IsDeprecatedQueryVariables>(IsDeprecatedDocument, options);
      }
export function useIsDeprecatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsDeprecatedQuery, IsDeprecatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsDeprecatedQuery, IsDeprecatedQueryVariables>(IsDeprecatedDocument, options);
        }
export type IsDeprecatedQueryHookResult = ReturnType<typeof useIsDeprecatedQuery>;
export type IsDeprecatedLazyQueryHookResult = ReturnType<typeof useIsDeprecatedLazyQuery>;
export type IsDeprecatedQueryResult = Apollo.QueryResult<IsDeprecatedQuery, IsDeprecatedQueryVariables>;
export const OrgLevelDocument = gql`
    query OrgLevel($organization: OrganizationInput) {
  orgLevel(organization: $organization)
}
    `;

/**
 * __useOrgLevelQuery__
 *
 * To run a query within a React component, call `useOrgLevelQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrgLevelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrgLevelQuery({
 *   variables: {
 *      organization: // value for 'organization'
 *   },
 * });
 */
export function useOrgLevelQuery(baseOptions?: Apollo.QueryHookOptions<OrgLevelQuery, OrgLevelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrgLevelQuery, OrgLevelQueryVariables>(OrgLevelDocument, options);
      }
export function useOrgLevelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrgLevelQuery, OrgLevelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrgLevelQuery, OrgLevelQueryVariables>(OrgLevelDocument, options);
        }
export type OrgLevelQueryHookResult = ReturnType<typeof useOrgLevelQuery>;
export type OrgLevelLazyQueryHookResult = ReturnType<typeof useOrgLevelLazyQuery>;
export type OrgLevelQueryResult = Apollo.QueryResult<OrgLevelQuery, OrgLevelQueryVariables>;
export const OrgLevel5Document = gql`
    query OrgLevel5($organization: OrganizationInput) {
  orgLevel5(organization: $organization)
}
    `;

/**
 * __useOrgLevel5Query__
 *
 * To run a query within a React component, call `useOrgLevel5Query` and pass it any options that fit your needs.
 * When your component renders, `useOrgLevel5Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrgLevel5Query({
 *   variables: {
 *      organization: // value for 'organization'
 *   },
 * });
 */
export function useOrgLevel5Query(baseOptions?: Apollo.QueryHookOptions<OrgLevel5Query, OrgLevel5QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrgLevel5Query, OrgLevel5QueryVariables>(OrgLevel5Document, options);
      }
export function useOrgLevel5LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrgLevel5Query, OrgLevel5QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrgLevel5Query, OrgLevel5QueryVariables>(OrgLevel5Document, options);
        }
export type OrgLevel5QueryHookResult = ReturnType<typeof useOrgLevel5Query>;
export type OrgLevel5LazyQueryHookResult = ReturnType<typeof useOrgLevel5LazyQuery>;
export type OrgLevel5QueryResult = Apollo.QueryResult<OrgLevel5Query, OrgLevel5QueryVariables>;
export const OrganizationDocument = gql`
    query Organization($above: OrganizationExpression, $aboveId: IntExpression, $cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $id: StringExpression, $includeDeprecated: Boolean, $name: StringExpression, $realmId: StringExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $users: UserExpression, $version: IntExpression) {
  organization(
    above: $above
    aboveId: $aboveId
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    id: $id
    includeDeprecated: $includeDeprecated
    name: $name
    realmId: $realmId
    updateTime: $updateTime
    updateUserId: $updateUserId
    users: $users
    version: $version
  ) {
    aboveId
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    name
    orgLevel3
    realmId
    roleDisable
    updateTime
    updateUserId
    version
  }
}
    `;

/**
 * __useOrganizationQuery__
 *
 * To run a query within a React component, call `useOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationQuery({
 *   variables: {
 *      above: // value for 'above'
 *      aboveId: // value for 'aboveId'
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      name: // value for 'name'
 *      realmId: // value for 'realmId'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      users: // value for 'users'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useOrganizationQuery(baseOptions?: Apollo.QueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
      }
export function useOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
        }
export type OrganizationQueryHookResult = ReturnType<typeof useOrganizationQuery>;
export type OrganizationLazyQueryHookResult = ReturnType<typeof useOrganizationLazyQuery>;
export type OrganizationQueryResult = Apollo.QueryResult<OrganizationQuery, OrganizationQueryVariables>;
export const OrganizationListDocument = gql`
    query OrganizationList($above: OrganizationExpression, $aboveId: IntExpression, $after: ID, $before: ID, $cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $first: Int, $groupBy: [String!], $id: StringExpression, $includeDeprecated: Boolean, $last: Int, $name: StringExpression, $offset: Int, $orderBy: OrganizationOrderBy, $realmId: StringExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $users: UserExpression, $version: IntExpression) {
  organizationList(
    above: $above
    aboveId: $aboveId
    after: $after
    before: $before
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    first: $first
    groupBy: $groupBy
    id: $id
    includeDeprecated: $includeDeprecated
    last: $last
    name: $name
    offset: $offset
    orderBy: $orderBy
    realmId: $realmId
    updateTime: $updateTime
    updateUserId: $updateUserId
    users: $users
    version: $version
  ) {
    aboveId
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    name
    orgLevel3
    realmId
    roleDisable
    updateTime
    updateUserId
    version
  }
}
    `;

/**
 * __useOrganizationListQuery__
 *
 * To run a query within a React component, call `useOrganizationListQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationListQuery({
 *   variables: {
 *      above: // value for 'above'
 *      aboveId: // value for 'aboveId'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      first: // value for 'first'
 *      groupBy: // value for 'groupBy'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      last: // value for 'last'
 *      name: // value for 'name'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      realmId: // value for 'realmId'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      users: // value for 'users'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useOrganizationListQuery(baseOptions?: Apollo.QueryHookOptions<OrganizationListQuery, OrganizationListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationListQuery, OrganizationListQueryVariables>(OrganizationListDocument, options);
      }
export function useOrganizationListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationListQuery, OrganizationListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationListQuery, OrganizationListQueryVariables>(OrganizationListDocument, options);
        }
export type OrganizationListQueryHookResult = ReturnType<typeof useOrganizationListQuery>;
export type OrganizationListLazyQueryHookResult = ReturnType<typeof useOrganizationListLazyQuery>;
export type OrganizationListQueryResult = Apollo.QueryResult<OrganizationListQuery, OrganizationListQueryVariables>;
export const Parent2Document = gql`
    query Parent2($organization: OrganizationInput) {
  parent2(organization: $organization) {
    aboveId
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    name
    orgLevel3
    realmId
    roleDisable
    updateTime
    updateUserId
    version
  }
}
    `;

/**
 * __useParent2Query__
 *
 * To run a query within a React component, call `useParent2Query` and pass it any options that fit your needs.
 * When your component renders, `useParent2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParent2Query({
 *   variables: {
 *      organization: // value for 'organization'
 *   },
 * });
 */
export function useParent2Query(baseOptions?: Apollo.QueryHookOptions<Parent2Query, Parent2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Parent2Query, Parent2QueryVariables>(Parent2Document, options);
      }
export function useParent2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Parent2Query, Parent2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Parent2Query, Parent2QueryVariables>(Parent2Document, options);
        }
export type Parent2QueryHookResult = ReturnType<typeof useParent2Query>;
export type Parent2LazyQueryHookResult = ReturnType<typeof useParent2LazyQuery>;
export type Parent2QueryResult = Apollo.QueryResult<Parent2Query, Parent2QueryVariables>;
export const RealmIdDocument = gql`
    query RealmId {
  realmId
}
    `;

/**
 * __useRealmIdQuery__
 *
 * To run a query within a React component, call `useRealmIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRealmIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRealmIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useRealmIdQuery(baseOptions?: Apollo.QueryHookOptions<RealmIdQuery, RealmIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RealmIdQuery, RealmIdQueryVariables>(RealmIdDocument, options);
      }
export function useRealmIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RealmIdQuery, RealmIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RealmIdQuery, RealmIdQueryVariables>(RealmIdDocument, options);
        }
export type RealmIdQueryHookResult = ReturnType<typeof useRealmIdQuery>;
export type RealmIdLazyQueryHookResult = ReturnType<typeof useRealmIdLazyQuery>;
export type RealmIdQueryResult = Apollo.QueryResult<RealmIdQuery, RealmIdQueryVariables>;
export const RoleDocument = gql`
    query Role($cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $id: StringExpression, $includeDeprecated: Boolean, $name: StringExpression, $realmId: StringExpression, $type: RoleTypeExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $users: UserExpression, $version: IntExpression) {
  role(
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    id: $id
    includeDeprecated: $includeDeprecated
    name: $name
    realmId: $realmId
    type: $type
    updateTime: $updateTime
    updateUserId: $updateUserId
    users: $users
    version: $version
  ) {
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    name
    realmId
    type
    updateTime
    updateUserId
    version
  }
}
    `;

/**
 * __useRoleQuery__
 *
 * To run a query within a React component, call `useRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoleQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      name: // value for 'name'
 *      realmId: // value for 'realmId'
 *      type: // value for 'type'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      users: // value for 'users'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useRoleQuery(baseOptions?: Apollo.QueryHookOptions<RoleQuery, RoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoleQuery, RoleQueryVariables>(RoleDocument, options);
      }
export function useRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoleQuery, RoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoleQuery, RoleQueryVariables>(RoleDocument, options);
        }
export type RoleQueryHookResult = ReturnType<typeof useRoleQuery>;
export type RoleLazyQueryHookResult = ReturnType<typeof useRoleLazyQuery>;
export type RoleQueryResult = Apollo.QueryResult<RoleQuery, RoleQueryVariables>;
export const RoleDisable2Document = gql`
    query RoleDisable2($organization: OrganizationInput) {
  roleDisable2(organization: $organization)
}
    `;

/**
 * __useRoleDisable2Query__
 *
 * To run a query within a React component, call `useRoleDisable2Query` and pass it any options that fit your needs.
 * When your component renders, `useRoleDisable2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoleDisable2Query({
 *   variables: {
 *      organization: // value for 'organization'
 *   },
 * });
 */
export function useRoleDisable2Query(baseOptions?: Apollo.QueryHookOptions<RoleDisable2Query, RoleDisable2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoleDisable2Query, RoleDisable2QueryVariables>(RoleDisable2Document, options);
      }
export function useRoleDisable2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoleDisable2Query, RoleDisable2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoleDisable2Query, RoleDisable2QueryVariables>(RoleDisable2Document, options);
        }
export type RoleDisable2QueryHookResult = ReturnType<typeof useRoleDisable2Query>;
export type RoleDisable2LazyQueryHookResult = ReturnType<typeof useRoleDisable2LazyQuery>;
export type RoleDisable2QueryResult = Apollo.QueryResult<RoleDisable2Query, RoleDisable2QueryVariables>;
export const RoleListDocument = gql`
    query RoleList($after: ID, $before: ID, $cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $first: Int, $groupBy: [String!], $id: StringExpression, $includeDeprecated: Boolean, $last: Int, $name: StringExpression, $offset: Int, $orderBy: RoleOrderBy, $realmId: StringExpression, $type: RoleTypeExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $users: UserExpression, $version: IntExpression) {
  roleList(
    after: $after
    before: $before
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    first: $first
    groupBy: $groupBy
    id: $id
    includeDeprecated: $includeDeprecated
    last: $last
    name: $name
    offset: $offset
    orderBy: $orderBy
    realmId: $realmId
    type: $type
    updateTime: $updateTime
    updateUserId: $updateUserId
    users: $users
    version: $version
  ) {
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    name
    realmId
    type
    updateTime
    updateUserId
    version
  }
}
    `;

/**
 * __useRoleListQuery__
 *
 * To run a query within a React component, call `useRoleListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoleListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoleListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      first: // value for 'first'
 *      groupBy: // value for 'groupBy'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      last: // value for 'last'
 *      name: // value for 'name'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      realmId: // value for 'realmId'
 *      type: // value for 'type'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      users: // value for 'users'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useRoleListQuery(baseOptions?: Apollo.QueryHookOptions<RoleListQuery, RoleListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoleListQuery, RoleListQueryVariables>(RoleListDocument, options);
      }
export function useRoleListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoleListQuery, RoleListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoleListQuery, RoleListQueryVariables>(RoleListDocument, options);
        }
export type RoleListQueryHookResult = ReturnType<typeof useRoleListQuery>;
export type RoleListLazyQueryHookResult = ReturnType<typeof useRoleListLazyQuery>;
export type RoleListQueryResult = Apollo.QueryResult<RoleListQuery, RoleListQueryVariables>;
export const RoleRoleTypeDocument = gql`
    query RoleRoleType($cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $id: StringExpression, $includeDeprecated: Boolean, $realmId: StringExpression, $roleId: IntExpression, $type: RoleTypeExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $version: IntExpression) {
  roleRoleType(
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    id: $id
    includeDeprecated: $includeDeprecated
    realmId: $realmId
    roleId: $roleId
    type: $type
    updateTime: $updateTime
    updateUserId: $updateUserId
    version: $version
  ) {
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    realmId
    roleId
    type
    updateTime
    updateUserId
    version
  }
}
    `;

/**
 * __useRoleRoleTypeQuery__
 *
 * To run a query within a React component, call `useRoleRoleTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoleRoleTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoleRoleTypeQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      realmId: // value for 'realmId'
 *      roleId: // value for 'roleId'
 *      type: // value for 'type'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useRoleRoleTypeQuery(baseOptions?: Apollo.QueryHookOptions<RoleRoleTypeQuery, RoleRoleTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoleRoleTypeQuery, RoleRoleTypeQueryVariables>(RoleRoleTypeDocument, options);
      }
export function useRoleRoleTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoleRoleTypeQuery, RoleRoleTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoleRoleTypeQuery, RoleRoleTypeQueryVariables>(RoleRoleTypeDocument, options);
        }
export type RoleRoleTypeQueryHookResult = ReturnType<typeof useRoleRoleTypeQuery>;
export type RoleRoleTypeLazyQueryHookResult = ReturnType<typeof useRoleRoleTypeLazyQuery>;
export type RoleRoleTypeQueryResult = Apollo.QueryResult<RoleRoleTypeQuery, RoleRoleTypeQueryVariables>;
export const RoleRoleTypeListDocument = gql`
    query RoleRoleTypeList($after: ID, $before: ID, $cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $first: Int, $groupBy: [String!], $id: StringExpression, $includeDeprecated: Boolean, $last: Int, $offset: Int, $orderBy: RoleRoleTypeOrderBy, $realmId: StringExpression, $roleId: IntExpression, $type: RoleTypeExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $version: IntExpression) {
  roleRoleTypeList(
    after: $after
    before: $before
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    first: $first
    groupBy: $groupBy
    id: $id
    includeDeprecated: $includeDeprecated
    last: $last
    offset: $offset
    orderBy: $orderBy
    realmId: $realmId
    roleId: $roleId
    type: $type
    updateTime: $updateTime
    updateUserId: $updateUserId
    version: $version
  ) {
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    realmId
    roleId
    type
    updateTime
    updateUserId
    version
  }
}
    `;

/**
 * __useRoleRoleTypeListQuery__
 *
 * To run a query within a React component, call `useRoleRoleTypeListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoleRoleTypeListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoleRoleTypeListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      first: // value for 'first'
 *      groupBy: // value for 'groupBy'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      last: // value for 'last'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      realmId: // value for 'realmId'
 *      roleId: // value for 'roleId'
 *      type: // value for 'type'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useRoleRoleTypeListQuery(baseOptions?: Apollo.QueryHookOptions<RoleRoleTypeListQuery, RoleRoleTypeListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoleRoleTypeListQuery, RoleRoleTypeListQueryVariables>(RoleRoleTypeListDocument, options);
      }
export function useRoleRoleTypeListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoleRoleTypeListQuery, RoleRoleTypeListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoleRoleTypeListQuery, RoleRoleTypeListQueryVariables>(RoleRoleTypeListDocument, options);
        }
export type RoleRoleTypeListQueryHookResult = ReturnType<typeof useRoleRoleTypeListQuery>;
export type RoleRoleTypeListLazyQueryHookResult = ReturnType<typeof useRoleRoleTypeListLazyQuery>;
export type RoleRoleTypeListQueryResult = Apollo.QueryResult<RoleRoleTypeListQuery, RoleRoleTypeListQueryVariables>;
export const UpdateTimeDocument = gql`
    query UpdateTime {
  updateTime
}
    `;

/**
 * __useUpdateTimeQuery__
 *
 * To run a query within a React component, call `useUpdateTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateTimeQuery({
 *   variables: {
 *   },
 * });
 */
export function useUpdateTimeQuery(baseOptions?: Apollo.QueryHookOptions<UpdateTimeQuery, UpdateTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UpdateTimeQuery, UpdateTimeQueryVariables>(UpdateTimeDocument, options);
      }
export function useUpdateTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpdateTimeQuery, UpdateTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UpdateTimeQuery, UpdateTimeQueryVariables>(UpdateTimeDocument, options);
        }
export type UpdateTimeQueryHookResult = ReturnType<typeof useUpdateTimeQuery>;
export type UpdateTimeLazyQueryHookResult = ReturnType<typeof useUpdateTimeLazyQuery>;
export type UpdateTimeQueryResult = Apollo.QueryResult<UpdateTimeQuery, UpdateTimeQueryVariables>;
export const UpdateUserIdDocument = gql`
    query UpdateUserId {
  updateUserId
}
    `;

/**
 * __useUpdateUserIdQuery__
 *
 * To run a query within a React component, call `useUpdateUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useUpdateUserIdQuery(baseOptions?: Apollo.QueryHookOptions<UpdateUserIdQuery, UpdateUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UpdateUserIdQuery, UpdateUserIdQueryVariables>(UpdateUserIdDocument, options);
      }
export function useUpdateUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpdateUserIdQuery, UpdateUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UpdateUserIdQuery, UpdateUserIdQueryVariables>(UpdateUserIdDocument, options);
        }
export type UpdateUserIdQueryHookResult = ReturnType<typeof useUpdateUserIdQuery>;
export type UpdateUserIdLazyQueryHookResult = ReturnType<typeof useUpdateUserIdLazyQuery>;
export type UpdateUserIdQueryResult = Apollo.QueryResult<UpdateUserIdQuery, UpdateUserIdQueryVariables>;
export const UserDocument = gql`
    query User($age: IntExpression, $cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $disable: BooleanExpression, $id: StringExpression, $includeDeprecated: Boolean, $login: StringExpression, $name: StringExpression, $organization: OrganizationExpression, $organizationId: IntExpression, $password: StringExpression, $phones: StringExpression, $realmId: StringExpression, $roles: RoleExpression, $sex: SexExpression, $test1: IntExpression, $test2: BooleanExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $userProfile: UserProfileExpression, $version: IntExpression) {
  user(
    age: $age
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    disable: $disable
    id: $id
    includeDeprecated: $includeDeprecated
    login: $login
    name: $name
    organization: $organization
    organizationId: $organizationId
    password: $password
    phones: $phones
    realmId: $realmId
    roles: $roles
    sex: $sex
    test1: $test1
    test2: $test2
    updateTime: $updateTime
    updateUserId: $updateUserId
    userProfile: $userProfile
    version: $version
  ) {
    age
    createGroupId
    createTime
    createUserId
    disable
    id
    isDeprecated
    login
    name
    organizationId
    password
    phones
    realmId
    sex
    test1
    test2
    updateTime
    updateUserId
    userDetail2
    version
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      age: // value for 'age'
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      disable: // value for 'disable'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      login: // value for 'login'
 *      name: // value for 'name'
 *      organization: // value for 'organization'
 *      organizationId: // value for 'organizationId'
 *      password: // value for 'password'
 *      phones: // value for 'phones'
 *      realmId: // value for 'realmId'
 *      roles: // value for 'roles'
 *      sex: // value for 'sex'
 *      test1: // value for 'test1'
 *      test2: // value for 'test2'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      userProfile: // value for 'userProfile'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserByOrg2Document = gql`
    query UserByOrg2($organization: OrganizationInput) {
  userByOrg2(organization: $organization) {
    age
    createGroupId
    createTime
    createUserId
    disable
    id
    isDeprecated
    login
    name
    organizationId
    password
    phones
    realmId
    sex
    test1
    test2
    updateTime
    updateUserId
    userDetail2
    version
  }
}
    `;

/**
 * __useUserByOrg2Query__
 *
 * To run a query within a React component, call `useUserByOrg2Query` and pass it any options that fit your needs.
 * When your component renders, `useUserByOrg2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByOrg2Query({
 *   variables: {
 *      organization: // value for 'organization'
 *   },
 * });
 */
export function useUserByOrg2Query(baseOptions?: Apollo.QueryHookOptions<UserByOrg2Query, UserByOrg2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByOrg2Query, UserByOrg2QueryVariables>(UserByOrg2Document, options);
      }
export function useUserByOrg2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByOrg2Query, UserByOrg2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByOrg2Query, UserByOrg2QueryVariables>(UserByOrg2Document, options);
        }
export type UserByOrg2QueryHookResult = ReturnType<typeof useUserByOrg2Query>;
export type UserByOrg2LazyQueryHookResult = ReturnType<typeof useUserByOrg2LazyQuery>;
export type UserByOrg2QueryResult = Apollo.QueryResult<UserByOrg2Query, UserByOrg2QueryVariables>;
export const UserDetailDocument = gql`
    query UserDetail($user: UserInput) {
  userDetail(user: $user)
}
    `;

/**
 * __useUserDetailQuery__
 *
 * To run a query within a React component, call `useUserDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDetailQuery({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUserDetailQuery(baseOptions?: Apollo.QueryHookOptions<UserDetailQuery, UserDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserDetailQuery, UserDetailQueryVariables>(UserDetailDocument, options);
      }
export function useUserDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserDetailQuery, UserDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserDetailQuery, UserDetailQueryVariables>(UserDetailDocument, options);
        }
export type UserDetailQueryHookResult = ReturnType<typeof useUserDetailQuery>;
export type UserDetailLazyQueryHookResult = ReturnType<typeof useUserDetailLazyQuery>;
export type UserDetailQueryResult = Apollo.QueryResult<UserDetailQuery, UserDetailQueryVariables>;
export const UserDetail6Document = gql`
    query UserDetail6($user: UserInput) {
  userDetail6(user: $user)
}
    `;

/**
 * __useUserDetail6Query__
 *
 * To run a query within a React component, call `useUserDetail6Query` and pass it any options that fit your needs.
 * When your component renders, `useUserDetail6Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDetail6Query({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUserDetail6Query(baseOptions?: Apollo.QueryHookOptions<UserDetail6Query, UserDetail6QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserDetail6Query, UserDetail6QueryVariables>(UserDetail6Document, options);
      }
export function useUserDetail6LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserDetail6Query, UserDetail6QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserDetail6Query, UserDetail6QueryVariables>(UserDetail6Document, options);
        }
export type UserDetail6QueryHookResult = ReturnType<typeof useUserDetail6Query>;
export type UserDetail6LazyQueryHookResult = ReturnType<typeof useUserDetail6LazyQuery>;
export type UserDetail6QueryResult = Apollo.QueryResult<UserDetail6Query, UserDetail6QueryVariables>;
export const UserListDocument = gql`
    query UserList($after: ID, $age: IntExpression, $before: ID, $cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $disable: BooleanExpression, $first: Int, $groupBy: [String!], $id: StringExpression, $includeDeprecated: Boolean, $last: Int, $login: StringExpression, $name: StringExpression, $offset: Int, $orderBy: UserOrderBy, $organization: OrganizationExpression, $organizationId: IntExpression, $password: StringExpression, $phones: StringExpression, $realmId: StringExpression, $roles: RoleExpression, $sex: SexExpression, $test1: IntExpression, $test2: BooleanExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $userProfile: UserProfileExpression, $version: IntExpression) {
  userList(
    after: $after
    age: $age
    before: $before
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    disable: $disable
    first: $first
    groupBy: $groupBy
    id: $id
    includeDeprecated: $includeDeprecated
    last: $last
    login: $login
    name: $name
    offset: $offset
    orderBy: $orderBy
    organization: $organization
    organizationId: $organizationId
    password: $password
    phones: $phones
    realmId: $realmId
    roles: $roles
    sex: $sex
    test1: $test1
    test2: $test2
    updateTime: $updateTime
    updateUserId: $updateUserId
    userProfile: $userProfile
    version: $version
  ) {
    age
    createGroupId
    createTime
    createUserId
    disable
    id
    isDeprecated
    login
    name
    organizationId
    password
    phones
    realmId
    sex
    test1
    test2
    updateTime
    updateUserId
    userDetail2
    version
  }
}
    `;

/**
 * __useUserListQuery__
 *
 * To run a query within a React component, call `useUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      age: // value for 'age'
 *      before: // value for 'before'
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      disable: // value for 'disable'
 *      first: // value for 'first'
 *      groupBy: // value for 'groupBy'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      last: // value for 'last'
 *      login: // value for 'login'
 *      name: // value for 'name'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      organization: // value for 'organization'
 *      organizationId: // value for 'organizationId'
 *      password: // value for 'password'
 *      phones: // value for 'phones'
 *      realmId: // value for 'realmId'
 *      roles: // value for 'roles'
 *      sex: // value for 'sex'
 *      test1: // value for 'test1'
 *      test2: // value for 'test2'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      userProfile: // value for 'userProfile'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useUserListQuery(baseOptions?: Apollo.QueryHookOptions<UserListQuery, UserListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
      }
export function useUserListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserListQuery, UserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
        }
export type UserListQueryHookResult = ReturnType<typeof useUserListQuery>;
export type UserListLazyQueryHookResult = ReturnType<typeof useUserListLazyQuery>;
export type UserListQueryResult = Apollo.QueryResult<UserListQuery, UserListQueryVariables>;
export const UserPhonesDocument = gql`
    query UserPhones($cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $id: StringExpression, $includeDeprecated: Boolean, $phone: StringExpression, $realmId: StringExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $userId: IntExpression, $version: IntExpression) {
  userPhones(
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    id: $id
    includeDeprecated: $includeDeprecated
    phone: $phone
    realmId: $realmId
    updateTime: $updateTime
    updateUserId: $updateUserId
    userId: $userId
    version: $version
  ) {
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    phone
    realmId
    updateTime
    updateUserId
    userId
    version
  }
}
    `;

/**
 * __useUserPhonesQuery__
 *
 * To run a query within a React component, call `useUserPhonesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPhonesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPhonesQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      phone: // value for 'phone'
 *      realmId: // value for 'realmId'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      userId: // value for 'userId'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useUserPhonesQuery(baseOptions?: Apollo.QueryHookOptions<UserPhonesQuery, UserPhonesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserPhonesQuery, UserPhonesQueryVariables>(UserPhonesDocument, options);
      }
export function useUserPhonesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPhonesQuery, UserPhonesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserPhonesQuery, UserPhonesQueryVariables>(UserPhonesDocument, options);
        }
export type UserPhonesQueryHookResult = ReturnType<typeof useUserPhonesQuery>;
export type UserPhonesLazyQueryHookResult = ReturnType<typeof useUserPhonesLazyQuery>;
export type UserPhonesQueryResult = Apollo.QueryResult<UserPhonesQuery, UserPhonesQueryVariables>;
export const UserPhonesListDocument = gql`
    query UserPhonesList($after: ID, $before: ID, $cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $first: Int, $groupBy: [String!], $id: StringExpression, $includeDeprecated: Boolean, $last: Int, $offset: Int, $orderBy: UserPhonesOrderBy, $phone: StringExpression, $realmId: StringExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $userId: IntExpression, $version: IntExpression) {
  userPhonesList(
    after: $after
    before: $before
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    first: $first
    groupBy: $groupBy
    id: $id
    includeDeprecated: $includeDeprecated
    last: $last
    offset: $offset
    orderBy: $orderBy
    phone: $phone
    realmId: $realmId
    updateTime: $updateTime
    updateUserId: $updateUserId
    userId: $userId
    version: $version
  ) {
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    phone
    realmId
    updateTime
    updateUserId
    userId
    version
  }
}
    `;

/**
 * __useUserPhonesListQuery__
 *
 * To run a query within a React component, call `useUserPhonesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPhonesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPhonesListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      first: // value for 'first'
 *      groupBy: // value for 'groupBy'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      last: // value for 'last'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      phone: // value for 'phone'
 *      realmId: // value for 'realmId'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      userId: // value for 'userId'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useUserPhonesListQuery(baseOptions?: Apollo.QueryHookOptions<UserPhonesListQuery, UserPhonesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserPhonesListQuery, UserPhonesListQueryVariables>(UserPhonesListDocument, options);
      }
export function useUserPhonesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPhonesListQuery, UserPhonesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserPhonesListQuery, UserPhonesListQueryVariables>(UserPhonesListDocument, options);
        }
export type UserPhonesListQueryHookResult = ReturnType<typeof useUserPhonesListQuery>;
export type UserPhonesListLazyQueryHookResult = ReturnType<typeof useUserPhonesListLazyQuery>;
export type UserPhonesListQueryResult = Apollo.QueryResult<UserPhonesListQuery, UserPhonesListQueryVariables>;
export const UserProfileDocument = gql`
    query UserProfile($address: StringExpression, $cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $email: StringExpression, $id: StringExpression, $includeDeprecated: Boolean, $qq: StringExpression, $realmId: StringExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $user: UserExpression, $userId: StringExpression, $version: IntExpression) {
  userProfile(
    address: $address
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    email: $email
    id: $id
    includeDeprecated: $includeDeprecated
    qq: $qq
    realmId: $realmId
    updateTime: $updateTime
    updateUserId: $updateUserId
    user: $user
    userId: $userId
    version: $version
  ) {
    address
    createGroupId
    createTime
    createUserId
    email
    id
    isDeprecated
    qq
    realmId
    updateTime
    updateUserId
    userId
    version
  }
}
    `;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      address: // value for 'address'
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      email: // value for 'email'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      qq: // value for 'qq'
 *      realmId: // value for 'realmId'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      user: // value for 'user'
 *      userId: // value for 'userId'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export const UserProfileListDocument = gql`
    query UserProfileList($address: StringExpression, $after: ID, $before: ID, $cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $email: StringExpression, $first: Int, $groupBy: [String!], $id: StringExpression, $includeDeprecated: Boolean, $last: Int, $offset: Int, $orderBy: UserProfileOrderBy, $qq: StringExpression, $realmId: StringExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $user: UserExpression, $userId: StringExpression, $version: IntExpression) {
  userProfileList(
    address: $address
    after: $after
    before: $before
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    email: $email
    first: $first
    groupBy: $groupBy
    id: $id
    includeDeprecated: $includeDeprecated
    last: $last
    offset: $offset
    orderBy: $orderBy
    qq: $qq
    realmId: $realmId
    updateTime: $updateTime
    updateUserId: $updateUserId
    user: $user
    userId: $userId
    version: $version
  ) {
    address
    createGroupId
    createTime
    createUserId
    email
    id
    isDeprecated
    qq
    realmId
    updateTime
    updateUserId
    userId
    version
  }
}
    `;

/**
 * __useUserProfileListQuery__
 *
 * To run a query within a React component, call `useUserProfileListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileListQuery({
 *   variables: {
 *      address: // value for 'address'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      email: // value for 'email'
 *      first: // value for 'first'
 *      groupBy: // value for 'groupBy'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      last: // value for 'last'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      qq: // value for 'qq'
 *      realmId: // value for 'realmId'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      user: // value for 'user'
 *      userId: // value for 'userId'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useUserProfileListQuery(baseOptions?: Apollo.QueryHookOptions<UserProfileListQuery, UserProfileListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileListQuery, UserProfileListQueryVariables>(UserProfileListDocument, options);
      }
export function useUserProfileListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileListQuery, UserProfileListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileListQuery, UserProfileListQueryVariables>(UserProfileListDocument, options);
        }
export type UserProfileListQueryHookResult = ReturnType<typeof useUserProfileListQuery>;
export type UserProfileListLazyQueryHookResult = ReturnType<typeof useUserProfileListLazyQuery>;
export type UserProfileListQueryResult = Apollo.QueryResult<UserProfileListQuery, UserProfileListQueryVariables>;
export const UserRoleDocument = gql`
    query UserRole($cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $id: StringExpression, $includeDeprecated: Boolean, $realmId: StringExpression, $roleId: IntExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $userId: IntExpression, $version: IntExpression) {
  userRole(
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    id: $id
    includeDeprecated: $includeDeprecated
    realmId: $realmId
    roleId: $roleId
    updateTime: $updateTime
    updateUserId: $updateUserId
    userId: $userId
    version: $version
  ) {
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    realmId
    roleId
    updateTime
    updateUserId
    userId
    version
  }
}
    `;

/**
 * __useUserRoleQuery__
 *
 * To run a query within a React component, call `useUserRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRoleQuery({
 *   variables: {
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      realmId: // value for 'realmId'
 *      roleId: // value for 'roleId'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      userId: // value for 'userId'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useUserRoleQuery(baseOptions?: Apollo.QueryHookOptions<UserRoleQuery, UserRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserRoleQuery, UserRoleQueryVariables>(UserRoleDocument, options);
      }
export function useUserRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserRoleQuery, UserRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserRoleQuery, UserRoleQueryVariables>(UserRoleDocument, options);
        }
export type UserRoleQueryHookResult = ReturnType<typeof useUserRoleQuery>;
export type UserRoleLazyQueryHookResult = ReturnType<typeof useUserRoleLazyQuery>;
export type UserRoleQueryResult = Apollo.QueryResult<UserRoleQuery, UserRoleQueryVariables>;
export const UserRoleListDocument = gql`
    query UserRoleList($after: ID, $before: ID, $cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $first: Int, $groupBy: [String!], $id: StringExpression, $includeDeprecated: Boolean, $last: Int, $offset: Int, $orderBy: UserRoleOrderBy, $realmId: StringExpression, $roleId: IntExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $userId: IntExpression, $version: IntExpression) {
  userRoleList(
    after: $after
    before: $before
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    first: $first
    groupBy: $groupBy
    id: $id
    includeDeprecated: $includeDeprecated
    last: $last
    offset: $offset
    orderBy: $orderBy
    realmId: $realmId
    roleId: $roleId
    updateTime: $updateTime
    updateUserId: $updateUserId
    userId: $userId
    version: $version
  ) {
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    realmId
    roleId
    updateTime
    updateUserId
    userId
    version
  }
}
    `;

/**
 * __useUserRoleListQuery__
 *
 * To run a query within a React component, call `useUserRoleListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRoleListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRoleListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      first: // value for 'first'
 *      groupBy: // value for 'groupBy'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      last: // value for 'last'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      realmId: // value for 'realmId'
 *      roleId: // value for 'roleId'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      userId: // value for 'userId'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useUserRoleListQuery(baseOptions?: Apollo.QueryHookOptions<UserRoleListQuery, UserRoleListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserRoleListQuery, UserRoleListQueryVariables>(UserRoleListDocument, options);
      }
export function useUserRoleListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserRoleListQuery, UserRoleListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserRoleListQuery, UserRoleListQueryVariables>(UserRoleListDocument, options);
        }
export type UserRoleListQueryHookResult = ReturnType<typeof useUserRoleListQuery>;
export type UserRoleListLazyQueryHookResult = ReturnType<typeof useUserRoleListLazyQuery>;
export type UserRoleListQueryResult = Apollo.QueryResult<UserRoleListQuery, UserRoleListQueryVariables>;
export const UserTest1Document = gql`
    query UserTest1($cond: Conditional, $createGroupId: StringExpression, $createTime: StringExpression, $createUserId: StringExpression, $id: StringExpression, $includeDeprecated: Boolean, $realmId: StringExpression, $test1: IntExpression, $updateTime: StringExpression, $updateUserId: StringExpression, $userId: IntExpression, $version: IntExpression) {
  userTest1(
    cond: $cond
    createGroupId: $createGroupId
    createTime: $createTime
    createUserId: $createUserId
    id: $id
    includeDeprecated: $includeDeprecated
    realmId: $realmId
    test1: $test1
    updateTime: $updateTime
    updateUserId: $updateUserId
    userId: $userId
    version: $version
  ) {
    createGroupId
    createTime
    createUserId
    id
    isDeprecated
    realmId
    test1
    updateTime
    updateUserId
    userId
    version
  }
}
    `;

/**
 * __useUserTest1Query__
 *
 * To run a query within a React component, call `useUserTest1Query` and pass it any options that fit your needs.
 * When your component renders, `useUserTest1Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTest1Query({
 *   variables: {
 *      cond: // value for 'cond'
 *      createGroupId: // value for 'createGroupId'
 *      createTime: // value for 'createTime'
 *      createUserId: // value for 'createUserId'
 *      id: // value for 'id'
 *      includeDeprecated: // value for 'includeDeprecated'
 *      realmId: // value for 'realmId'
 *      test1: // value for 'test1'
 *      updateTime: // value for 'updateTime'
 *      updateUserId: // value for 'updateUserId'
 *      userId: // value for 'userId'
 *      version: // value for 'version'
 *   },
 * });
 */
export function useUserTest1Query(baseOptions?: Apollo.QueryHookOptions<UserTest1Query, UserTest1QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserTest1Query, UserTest1QueryVariables>(UserTest1Document, options);
      }
export function useUserTest1LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserTest1Query, UserTest1QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserTest1Query, UserTest1QueryVariables>(UserTest1Document, options);
        }
export type UserTest1QueryHookResult = ReturnType<typeof useUserTest1Query>;
export type UserTest1LazyQueryHookResult = ReturnType<typeof useUserTest1LazyQuery>;
export type UserTest1QueryResult = Apollo.QueryResult<UserTest1Query, UserTest1QueryVariables>;