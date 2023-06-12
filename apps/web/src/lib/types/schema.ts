export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInteger: any;
  Date: any;
  DateTime: any;
  Time: any;
  Timestamp: any;
};

export type BooleanExpression = {
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  opr?: InputMaybe<Operator>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
  val?: InputMaybe<Scalars['Boolean']>;
};

export enum Conditional {
  AND = 'AND',
  OR = 'OR'
}

export type ConditionalExpression = {
  in?: InputMaybe<Array<InputMaybe<Conditional>>>;
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Conditional>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
  lastName?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  realmId?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type FloatExpression = {
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  opr?: InputMaybe<Operator>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
  val?: InputMaybe<Scalars['Float']>;
};

export enum Function {
  AVG = 'AVG',
  COUNT = 'COUNT',
  MAX = 'MAX',
  MIN = 'MIN',
  SUM = 'SUM'
}

export type FunctionExpression = {
  in?: InputMaybe<Array<InputMaybe<Function>>>;
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Function>;
};

export type Group = Meta & {
  __typename?: 'Group';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  groupRole?: Maybe<Array<Maybe<GroupRole>>>;
  groupRoleAggregate?: Maybe<GroupRole>;
  groupRoleConnection?: Maybe<GroupRoleConnection>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Int']>;
  parentIdAvg?: Maybe<Scalars['Int']>;
  parentIdCount?: Maybe<Scalars['Int']>;
  parentIdMax?: Maybe<Scalars['Int']>;
  parentIdMin?: Maybe<Scalars['Int']>;
  parentIdSum?: Maybe<Scalars['Int']>;
  realm?: Maybe<Realm>;
  realmId?: Maybe<Scalars['String']>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['String']>;
  realmIdMin?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Role>>>;
  rolesAggregate?: Maybe<Role>;
  rolesConnection?: Maybe<RoleConnection>;
  subGroupsConnection?: Maybe<GroupConnection>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  userGroup?: Maybe<Array<Maybe<UserGroup>>>;
  userGroupAggregate?: Maybe<UserGroup>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  users?: Maybe<Array<Maybe<User>>>;
  usersAggregate?: Maybe<User>;
  usersConnection?: Maybe<UserConnection>;
  version?: Maybe<Scalars['Int']>;
};


export type GroupGroupRoleArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type GroupGroupRoleAggregateArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type GroupGroupRoleConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type GroupRealmArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type GroupRolesArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  composites?: InputMaybe<RoleExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type GroupRolesAggregateArgs = {
  composites?: InputMaybe<RoleExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type GroupRolesConnectionArgs = {
  composites?: InputMaybe<RoleExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  totalCount?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type GroupSubGroupsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  parent?: InputMaybe<GroupExpression>;
  realm?: InputMaybe<RealmExpression>;
  roles?: InputMaybe<RoleExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  totalCount?: InputMaybe<IntExpression>;
  users?: InputMaybe<UserExpression>;
};


export type GroupUserGroupArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  to?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type GroupUserGroupAggregateArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  to?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type GroupUserGroupConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  to?: InputMaybe<GroupExpression>;
  totalCount?: InputMaybe<IntExpression>;
  userId?: InputMaybe<IntExpression>;
};


export type GroupUsersArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  email?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groups?: InputMaybe<GroupExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  password?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  version?: InputMaybe<IntExpression>;
};


export type GroupUsersAggregateArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  email?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groups?: InputMaybe<GroupExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  password?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  version?: InputMaybe<IntExpression>;
};


export type GroupUsersConnectionArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  email?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groups?: InputMaybe<GroupExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  password?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  version?: InputMaybe<IntExpression>;
};

export type GroupConnection = {
  __typename?: 'GroupConnection';
  edges?: Maybe<Array<Maybe<GroupEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type GroupEdge = {
  __typename?: 'GroupEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<Group>;
};

export type GroupExpression = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  parentId?: InputMaybe<IntExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};

export type GroupInput = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<GroupInput>;
  parentId?: InputMaybe<Scalars['Int']>;
  realm?: InputMaybe<RealmInput>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  version?: InputMaybe<Scalars['Int']>;
};

export type GroupOrderBy = {
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  parentId?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export type GroupRole = Meta & {
  __typename?: 'GroupRole';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  from?: Maybe<Group>;
  groupId?: Maybe<Scalars['Int']>;
  groupIdAvg?: Maybe<Scalars['Int']>;
  groupIdCount?: Maybe<Scalars['Int']>;
  groupIdMax?: Maybe<Scalars['Int']>;
  groupIdMin?: Maybe<Scalars['Int']>;
  groupIdSum?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  realmId?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  to?: Maybe<Role>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};


export type GroupRoleFromArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  parentId?: InputMaybe<IntExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type GroupRoleToArgs = {
  composites?: InputMaybe<RoleExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};

export type GroupRoleConnection = {
  __typename?: 'GroupRoleConnection';
  edges?: Maybe<Array<Maybe<GroupRoleEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type GroupRoleEdge = {
  __typename?: 'GroupRoleEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<GroupRole>;
};

export type GroupRoleExpression = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  from?: InputMaybe<GroupExpression>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};

export type GroupRoleInput = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<GroupInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type GroupRoleOrderBy = {
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  groupId?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export type IdExpression = {
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  opr?: InputMaybe<Operator>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
  val?: InputMaybe<Scalars['ID']>;
};

export type IntExpression = {
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  opr?: InputMaybe<Operator>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
  val?: InputMaybe<Scalars['Int']>;
};

export type InvokeParameter = {
  className?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type MapWith = {
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Meta = {
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  realmId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type MutationType = Meta & {
  __typename?: 'MutationType';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  group?: Maybe<Group>;
  groupList?: Maybe<Array<Maybe<Group>>>;
  groupRole?: Maybe<GroupRole>;
  groupRoleList?: Maybe<Array<Maybe<GroupRole>>>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  permission?: Maybe<Permission>;
  permissionList?: Maybe<Array<Maybe<Permission>>>;
  realm?: Maybe<Realm>;
  realmId?: Maybe<Scalars['String']>;
  realmList?: Maybe<Array<Maybe<Realm>>>;
  role?: Maybe<Role>;
  roleComposite?: Maybe<RoleComposite>;
  roleCompositeList?: Maybe<Array<Maybe<RoleComposite>>>;
  roleList?: Maybe<Array<Maybe<Role>>>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userGroup?: Maybe<UserGroup>;
  userGroupList?: Maybe<Array<Maybe<UserGroup>>>;
  userList?: Maybe<Array<Maybe<User>>>;
  userRole?: Maybe<UserRole>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  version?: Maybe<Scalars['Int']>;
};


export type MutationTypeGroupArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<GroupInput>;
  parentId?: InputMaybe<Scalars['Int']>;
  realm?: InputMaybe<RealmInput>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupExpression>;
};


export type MutationTypeGroupListArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<GroupInput>;
  parentId?: InputMaybe<Scalars['Int']>;
  realm?: InputMaybe<RealmInput>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupExpression>;
};


export type MutationTypeGroupRoleArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<GroupInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupRoleExpression>;
};


export type MutationTypeGroupRoleListArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<GroupInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupRoleExpression>;
};


export type MutationTypePermissionArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  level?: InputMaybe<PermissionLevel>;
  name?: InputMaybe<Scalars['String']>;
  ofTypeName?: InputMaybe<Scalars['String']>;
  realm?: InputMaybe<RealmInput>;
  realmId?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PermissionExpression>;
};


export type MutationTypePermissionListArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  level?: InputMaybe<PermissionLevel>;
  list?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  name?: InputMaybe<Scalars['String']>;
  ofTypeName?: InputMaybe<Scalars['String']>;
  realm?: InputMaybe<RealmInput>;
  realmId?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PermissionExpression>;
};


export type MutationTypeRealmArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RealmExpression>;
};


export type MutationTypeRealmListArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<RealmInput>>>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RealmExpression>;
};


export type MutationTypeRoleArgs = {
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  realm?: InputMaybe<RealmInput>;
  realmId?: InputMaybe<Scalars['String']>;
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleExpression>;
};


export type MutationTypeRoleCompositeArgs = {
  compositeId?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<RoleInput>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleCompositeExpression>;
};


export type MutationTypeRoleCompositeListArgs = {
  compositeId?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<RoleInput>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleCompositeExpression>;
};


export type MutationTypeRoleListArgs = {
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  realm?: InputMaybe<RealmInput>;
  realmId?: InputMaybe<Scalars['String']>;
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleExpression>;
};


export type MutationTypeUserArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  login?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  realm?: InputMaybe<RealmInput>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserExpression>;
};


export type MutationTypeUserGroupArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<GroupInput>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserGroupExpression>;
};


export type MutationTypeUserGroupListArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  realmId?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<GroupInput>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserGroupExpression>;
};


export type MutationTypeUserListArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<UserInput>>>;
  login?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  realm?: InputMaybe<RealmInput>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserExpression>;
};


export type MutationTypeUserRoleArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<UserInput>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserRoleExpression>;
};


export type MutationTypeUserRoleListArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<UserInput>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserRoleExpression>;
};

export enum Operator {
  BT = 'BT',
  EQ = 'EQ',
  GT = 'GT',
  GTE = 'GTE',
  IN = 'IN',
  LK = 'LK',
  LT = 'LT',
  LTE = 'LTE',
  NBT = 'NBT',
  NEQ = 'NEQ',
  NGT = 'NGT',
  NGTE = 'NGTE',
  NIL = 'NIL',
  NIN = 'NIN',
  NLK = 'NLK',
  NLT = 'NLT',
  NLTE = 'NLTE',
  NNIL = 'NNIL'
}

export type OperatorExpression = {
  in?: InputMaybe<Array<InputMaybe<Operator>>>;
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Operator>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type Permission = Meta & {
  __typename?: 'Permission';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  descriptionCount?: Maybe<Scalars['Int']>;
  descriptionMax?: Maybe<Scalars['String']>;
  descriptionMin?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  level?: Maybe<PermissionLevel>;
  name?: Maybe<Scalars['String']>;
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  ofTypeName?: Maybe<Scalars['String']>;
  ofTypeNameCount?: Maybe<Scalars['Int']>;
  ofTypeNameMax?: Maybe<Scalars['String']>;
  ofTypeNameMin?: Maybe<Scalars['String']>;
  realm?: Maybe<Realm>;
  realmId?: Maybe<Scalars['String']>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['String']>;
  realmIdMin?: Maybe<Scalars['String']>;
  role: Role;
  roleId?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};


export type PermissionRealmArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type PermissionRoleArgs = {
  composites?: InputMaybe<RoleExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};

export type PermissionConnection = {
  __typename?: 'PermissionConnection';
  edges?: Maybe<Array<Maybe<PermissionEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PermissionEdge = {
  __typename?: 'PermissionEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<Permission>;
};

export type PermissionExpression = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  level?: InputMaybe<PermissionLevelExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  roleId?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};

export type PermissionInput = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  level?: InputMaybe<PermissionLevel>;
  name?: InputMaybe<Scalars['String']>;
  ofTypeName?: InputMaybe<Scalars['String']>;
  realm?: InputMaybe<RealmInput>;
  realmId?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};

export enum PermissionLevel {
  READ = 'READ',
  WRITE = 'WRITE'
}

export type PermissionLevelExpression = {
  in?: InputMaybe<Array<InputMaybe<PermissionLevel>>>;
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<PermissionLevel>;
};

export type PermissionOrderBy = {
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  level?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  ofTypeName?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export type Property = {
  name: Scalars['String'];
  required?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  validation?: InputMaybe<ValidationInput>;
};

export enum Protocol {
  GRPC = 'GRPC',
  HTTP = 'HTTP',
  LOCAL = 'LOCAL',
  RSOCKET = 'RSOCKET'
}

export type ProtocolExpression = {
  in?: InputMaybe<Array<InputMaybe<Protocol>>>;
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Protocol>;
};

export type QueryType = Meta & {
  __typename?: 'QueryType';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  current?: Maybe<CurrentUser>;
  group?: Maybe<Group>;
  groupConnection?: Maybe<GroupConnection>;
  groupList?: Maybe<Array<Maybe<Group>>>;
  groupRole?: Maybe<GroupRole>;
  groupRoleConnection?: Maybe<GroupRoleConnection>;
  groupRoleList?: Maybe<Array<Maybe<GroupRole>>>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  login?: Maybe<Scalars['String']>;
  permission?: Maybe<Permission>;
  permissionConnection?: Maybe<PermissionConnection>;
  permissionList?: Maybe<Array<Maybe<Permission>>>;
  realm?: Maybe<Realm>;
  realmConnection?: Maybe<RealmConnection>;
  realmId?: Maybe<Scalars['String']>;
  realmList?: Maybe<Array<Maybe<Realm>>>;
  role?: Maybe<Role>;
  roleComposite?: Maybe<RoleComposite>;
  roleCompositeConnection?: Maybe<RoleCompositeConnection>;
  roleCompositeList?: Maybe<Array<Maybe<RoleComposite>>>;
  roleConnection?: Maybe<RoleConnection>;
  roleList?: Maybe<Array<Maybe<Role>>>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userConnection?: Maybe<UserConnection>;
  userGroup?: Maybe<UserGroup>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  userGroupList?: Maybe<Array<Maybe<UserGroup>>>;
  userList?: Maybe<Array<Maybe<User>>>;
  userRole?: Maybe<UserRole>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  version?: Maybe<Scalars['Int']>;
};


export type QueryTypeGroupArgs = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  parentId?: InputMaybe<IntExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeGroupConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  parent?: InputMaybe<GroupExpression>;
  parentId?: InputMaybe<IntExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeGroupListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  parent?: InputMaybe<GroupExpression>;
  parentId?: InputMaybe<IntExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeGroupRoleArgs = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  from?: InputMaybe<GroupExpression>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeGroupRoleConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeGroupRoleListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeLoginArgs = {
  login?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type QueryTypePermissionArgs = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  level?: InputMaybe<PermissionLevelExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  roleId?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypePermissionConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<PermissionLevelExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  roleId?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypePermissionListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<PermissionLevelExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  roleId?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRealmArgs = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRealmConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RealmOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRealmListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RealmOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRoleArgs = {
  composites?: InputMaybe<RoleExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRoleCompositeArgs = {
  compositeId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  from?: InputMaybe<RoleExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRoleCompositeConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  compositeId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRoleCompositeListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  compositeId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRoleConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  composites?: InputMaybe<RoleExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRoleListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  composites?: InputMaybe<RoleExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserArgs = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  email?: InputMaybe<StringExpression>;
  groups?: InputMaybe<GroupExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  email?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groups?: InputMaybe<GroupExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  password?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserGroupArgs = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  to?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserGroupConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  to?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserGroupListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  to?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  email?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groups?: InputMaybe<GroupExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  password?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserRoleArgs = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  from?: InputMaybe<UserExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserRoleConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserRoleListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};

export type Realm = Meta & {
  __typename?: 'Realm';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['String']>;
  idMin?: Maybe<Scalars['String']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  realmId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type RealmConnection = {
  __typename?: 'RealmConnection';
  edges?: Maybe<Array<Maybe<RealmEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type RealmEdge = {
  __typename?: 'RealmEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<Realm>;
};

export type RealmExpression = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};

export type RealmInput = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type RealmOrderBy = {
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export type Role = Meta & {
  __typename?: 'Role';
  compositesConnection?: Maybe<RoleConnection>;
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  descriptionCount?: Maybe<Scalars['Int']>;
  descriptionMax?: Maybe<Scalars['String']>;
  descriptionMin?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Permission>>>;
  permissionsAggregate?: Maybe<Permission>;
  permissionsConnection?: Maybe<PermissionConnection>;
  realm?: Maybe<Realm>;
  realmId?: Maybe<Scalars['String']>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['String']>;
  realmIdMin?: Maybe<Scalars['String']>;
  roleComposite?: Maybe<Array<Maybe<RoleComposite>>>;
  roleCompositeAggregate?: Maybe<RoleComposite>;
  roleCompositeConnection?: Maybe<RoleCompositeConnection>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  userRole?: Maybe<Array<Maybe<UserRole>>>;
  userRoleAggregate?: Maybe<UserRole>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  users?: Maybe<Array<Maybe<User>>>;
  usersAggregate?: Maybe<User>;
  usersConnection?: Maybe<UserConnection>;
  version?: Maybe<Scalars['Int']>;
};


export type RoleCompositesConnectionArgs = {
  composites?: InputMaybe<RoleExpression>;
  description?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  totalCount?: InputMaybe<IntExpression>;
  users?: InputMaybe<UserExpression>;
};


export type RolePermissionsArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<PermissionLevelExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  roleId?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type RolePermissionsAggregateArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<PermissionLevelExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  roleId?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type RolePermissionsConnectionArgs = {
  description?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  last?: InputMaybe<Scalars['Int']>;
  level?: InputMaybe<PermissionLevelExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  realm?: InputMaybe<RealmExpression>;
  role?: InputMaybe<RoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type RoleRealmArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type RoleRoleCompositeArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  compositeId?: InputMaybe<IntExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type RoleRoleCompositeAggregateArgs = {
  compositeId?: InputMaybe<IntExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type RoleRoleCompositeConnectionArgs = {
  compositeId?: InputMaybe<IntExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type RoleUserRoleArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type RoleUserRoleAggregateArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type RoleUserRoleConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
  userId?: InputMaybe<IntExpression>;
};


export type RoleUsersArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  email?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groups?: InputMaybe<GroupExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  password?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  version?: InputMaybe<IntExpression>;
};


export type RoleUsersAggregateArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  email?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groups?: InputMaybe<GroupExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  password?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  version?: InputMaybe<IntExpression>;
};


export type RoleUsersConnectionArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  email?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groups?: InputMaybe<GroupExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  password?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  version?: InputMaybe<IntExpression>;
};

export type RoleComposite = Meta & {
  __typename?: 'RoleComposite';
  compositeId?: Maybe<Scalars['Int']>;
  compositeIdAvg?: Maybe<Scalars['Int']>;
  compositeIdCount?: Maybe<Scalars['Int']>;
  compositeIdMax?: Maybe<Scalars['Int']>;
  compositeIdMin?: Maybe<Scalars['Int']>;
  compositeIdSum?: Maybe<Scalars['Int']>;
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  from?: Maybe<Role>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  realmId?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  to?: Maybe<Role>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};


export type RoleCompositeFromArgs = {
  composites?: InputMaybe<RoleExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type RoleCompositeToArgs = {
  composites?: InputMaybe<RoleExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};

export type RoleCompositeConnection = {
  __typename?: 'RoleCompositeConnection';
  edges?: Maybe<Array<Maybe<RoleCompositeEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type RoleCompositeEdge = {
  __typename?: 'RoleCompositeEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<RoleComposite>;
};

export type RoleCompositeExpression = {
  compositeId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  from?: InputMaybe<RoleExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};

export type RoleCompositeInput = {
  compositeId?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<RoleInput>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type RoleCompositeOrderBy = {
  compositeId?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export type RoleConnection = {
  __typename?: 'RoleConnection';
  edges?: Maybe<Array<Maybe<RoleEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type RoleEdge = {
  __typename?: 'RoleEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<Role>;
};

export type RoleExpression = {
  composites?: InputMaybe<RoleExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};

export type RoleInput = {
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  realm?: InputMaybe<RealmInput>;
  realmId?: InputMaybe<Scalars['String']>;
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  version?: InputMaybe<Scalars['Int']>;
};

export type RoleOrderBy = {
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type SortExpression = {
  in?: InputMaybe<Array<InputMaybe<Sort>>>;
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Sort>;
};

export type StringExpression = {
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  opr?: InputMaybe<Operator>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
  val?: InputMaybe<Scalars['String']>;
};

export type User = Meta & {
  __typename?: 'User';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  disable?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  emailCount?: Maybe<Scalars['Int']>;
  emailMax?: Maybe<Scalars['String']>;
  emailMin?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Maybe<Group>>>;
  groupsAggregate?: Maybe<Group>;
  groupsConnection?: Maybe<GroupConnection>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  lastNameCount?: Maybe<Scalars['Int']>;
  lastNameMax?: Maybe<Scalars['String']>;
  lastNameMin?: Maybe<Scalars['String']>;
  login: Scalars['String'];
  loginCount?: Maybe<Scalars['Int']>;
  loginMax?: Maybe<Scalars['String']>;
  loginMin?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  passwordCount?: Maybe<Scalars['Int']>;
  passwordMax?: Maybe<Scalars['String']>;
  passwordMin?: Maybe<Scalars['String']>;
  realm?: Maybe<Realm>;
  realmId?: Maybe<Scalars['String']>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['String']>;
  realmIdMin?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Role>>>;
  rolesAggregate?: Maybe<Role>;
  rolesConnection?: Maybe<RoleConnection>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  userGroup?: Maybe<Array<Maybe<UserGroup>>>;
  userGroupAggregate?: Maybe<UserGroup>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  userRole?: Maybe<Array<Maybe<UserRole>>>;
  userRoleAggregate?: Maybe<UserRole>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  version?: Maybe<Scalars['Int']>;
};


export type UserGroupsArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  parent?: InputMaybe<GroupExpression>;
  parentId?: InputMaybe<IntExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type UserGroupsAggregateArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  parent?: InputMaybe<GroupExpression>;
  parentId?: InputMaybe<IntExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type UserGroupsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  parent?: InputMaybe<GroupExpression>;
  realm?: InputMaybe<RealmExpression>;
  roles?: InputMaybe<RoleExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  totalCount?: InputMaybe<IntExpression>;
  users?: InputMaybe<UserExpression>;
};


export type UserRealmArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type UserRolesArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  composites?: InputMaybe<RoleExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type UserRolesAggregateArgs = {
  composites?: InputMaybe<RoleExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type UserRolesConnectionArgs = {
  composites?: InputMaybe<RoleExpression>;
  description?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  totalCount?: InputMaybe<IntExpression>;
  users?: InputMaybe<UserExpression>;
};


export type UserUserGroupArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  to?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type UserUserGroupAggregateArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  to?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type UserUserGroupConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  to?: InputMaybe<GroupExpression>;
  totalCount?: InputMaybe<IntExpression>;
  userId?: InputMaybe<IntExpression>;
};


export type UserUserRoleArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type UserUserRoleAggregateArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type UserUserRoleConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
  userId?: InputMaybe<IntExpression>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<User>;
};

export type UserExpression = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  email?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  groups?: InputMaybe<GroupExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  version?: InputMaybe<IntExpression>;
};

export type UserGroup = Meta & {
  __typename?: 'UserGroup';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  from?: Maybe<User>;
  groupId?: Maybe<Scalars['Int']>;
  groupIdAvg?: Maybe<Scalars['Int']>;
  groupIdCount?: Maybe<Scalars['Int']>;
  groupIdMax?: Maybe<Scalars['Int']>;
  groupIdMin?: Maybe<Scalars['Int']>;
  groupIdSum?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  realmId?: Maybe<Scalars['String']>;
  to?: Maybe<Group>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
  userIdAvg?: Maybe<Scalars['Int']>;
  userIdCount?: Maybe<Scalars['Int']>;
  userIdMax?: Maybe<Scalars['Int']>;
  userIdMin?: Maybe<Scalars['Int']>;
  userIdSum?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['Int']>;
};


export type UserGroupFromArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  email?: InputMaybe<StringExpression>;
  groups?: InputMaybe<GroupExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  version?: InputMaybe<IntExpression>;
};


export type UserGroupToArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  parentId?: InputMaybe<IntExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};

export type UserGroupConnection = {
  __typename?: 'UserGroupConnection';
  edges?: Maybe<Array<Maybe<UserGroupEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserGroupEdge = {
  __typename?: 'UserGroupEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<UserGroup>;
};

export type UserGroupExpression = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  to?: InputMaybe<GroupExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};

export type UserGroupInput = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<GroupInput>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type UserGroupOrderBy = {
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  groupId?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  userId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export type UserInput = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  login?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  realm?: InputMaybe<RealmInput>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  version?: InputMaybe<Scalars['Int']>;
};

export type UserOrderBy = {
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  disable?: InputMaybe<Sort>;
  email?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  lastName?: InputMaybe<Sort>;
  login?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  password?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export type UserRole = Meta & {
  __typename?: 'UserRole';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  from?: Maybe<User>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  realmId?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  to?: Maybe<Role>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
  userIdAvg?: Maybe<Scalars['Int']>;
  userIdCount?: Maybe<Scalars['Int']>;
  userIdMax?: Maybe<Scalars['Int']>;
  userIdMin?: Maybe<Scalars['Int']>;
  userIdSum?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['Int']>;
};


export type UserRoleFromArgs = {
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  email?: InputMaybe<StringExpression>;
  groups?: InputMaybe<GroupExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  version?: InputMaybe<IntExpression>;
};


export type UserRoleToArgs = {
  composites?: InputMaybe<RoleExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  realmId?: InputMaybe<StringExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};

export type UserRoleConnection = {
  __typename?: 'UserRoleConnection';
  edges?: Maybe<Array<Maybe<UserRoleEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserRoleEdge = {
  __typename?: 'UserRoleEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<UserRole>;
};

export type UserRoleExpression = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  from?: InputMaybe<UserExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};

export type UserRoleInput = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<UserInput>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type UserRoleOrderBy = {
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  userId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export type ValidationInput = {
  allOf?: InputMaybe<Array<InputMaybe<ValidationInput>>>;
  anyOf?: InputMaybe<Array<InputMaybe<ValidationInput>>>;
  const?: InputMaybe<Scalars['String']>;
  contentEncoding?: InputMaybe<Scalars['String']>;
  contentMediaType?: InputMaybe<Scalars['String']>;
  dependentRequired?: InputMaybe<Array<InputMaybe<Property>>>;
  else?: InputMaybe<ValidationInput>;
  enum?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  exclusiveMaximum?: InputMaybe<Scalars['Float']>;
  exclusiveMinimum?: InputMaybe<Scalars['Float']>;
  format?: InputMaybe<Scalars['String']>;
  if?: InputMaybe<ValidationInput>;
  items?: InputMaybe<ValidationInput>;
  maxItems?: InputMaybe<Scalars['Int']>;
  maxLength?: InputMaybe<Scalars['Int']>;
  maximum?: InputMaybe<Scalars['Float']>;
  minItems?: InputMaybe<Scalars['Int']>;
  minLength?: InputMaybe<Scalars['Int']>;
  minimum?: InputMaybe<Scalars['Float']>;
  multipleOf?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<ValidationInput>;
  oneOf?: InputMaybe<Array<InputMaybe<ValidationInput>>>;
  pattern?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<Array<InputMaybe<Property>>>;
  then?: InputMaybe<ValidationInput>;
  uniqueItems?: InputMaybe<Scalars['Boolean']>;
};
