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
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
};

export enum Conditional {
  AND = 'AND',
  OR = 'OR'
}

export type ConditionalExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Conditional>;
  in?: InputMaybe<Array<InputMaybe<Conditional>>>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  name?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  realmId?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type FloatExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
};

export enum Function {
  COUNT = 'COUNT',
  MAX = 'MAX',
  MIN = 'MIN',
  SUM = 'SUM',
  AVG = 'AVG'
}

export type FunctionExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Function>;
  in?: InputMaybe<Array<InputMaybe<Function>>>;
};

export type Group = Meta & {
  __typename?: 'Group';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
  roles?: Maybe<Array<Maybe<Role>>>;
  realm?: Maybe<Realm>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  subGroupsConnection?: Maybe<GroupConnection>;
  usersAggregate?: Maybe<User>;
  usersConnection?: Maybe<UserConnection>;
  rolesAggregate?: Maybe<Role>;
  rolesConnection?: Maybe<RoleConnection>;
  parentId?: Maybe<Scalars['Int']>;
  parentIdCount?: Maybe<Scalars['Int']>;
  parentIdSum?: Maybe<Scalars['Int']>;
  parentIdAvg?: Maybe<Scalars['Int']>;
  parentIdMax?: Maybe<Scalars['Int']>;
  parentIdMin?: Maybe<Scalars['Int']>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['String']>;
  realmIdMin?: Maybe<Scalars['String']>;
  userGroup?: Maybe<Array<Maybe<UserGroup>>>;
  userGroupAggregate?: Maybe<UserGroup>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  groupRole?: Maybe<Array<Maybe<GroupRole>>>;
  groupRoleAggregate?: Maybe<GroupRole>;
  groupRoleConnection?: Maybe<GroupRoleConnection>;
};


export type GroupUsersArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type GroupRolesArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type GroupRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
};


export type GroupSubGroupsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type GroupUsersAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
};


export type GroupUsersConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type GroupRolesAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
};


export type GroupRolesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type GroupUserGroupArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type GroupUserGroupAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
};


export type GroupUserGroupConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type GroupGroupRoleArgs = {
  id?: InputMaybe<StringExpression>;
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type GroupGroupRoleAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
};


export type GroupGroupRoleConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
};

export type GroupConnection = {
  __typename?: 'GroupConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<GroupEdge>>>;
};

export type GroupEdge = {
  __typename?: 'GroupEdge';
  node?: Maybe<Group>;
  cursor?: Maybe<Scalars['ID']>;
};

export type GroupExpression = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};

export type GroupInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<GroupInput>;
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['Int']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
};

export type GroupOrderBy = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
  parentId?: InputMaybe<Sort>;
};

export type GroupRole = Meta & {
  __typename?: 'GroupRole';
  id?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['Int']>;
  from?: Maybe<Group>;
  roleId?: Maybe<Scalars['Int']>;
  to?: Maybe<Role>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  groupIdCount?: Maybe<Scalars['Int']>;
  groupIdSum?: Maybe<Scalars['Int']>;
  groupIdAvg?: Maybe<Scalars['Int']>;
  groupIdMax?: Maybe<Scalars['Int']>;
  groupIdMin?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
};


export type GroupRoleFromArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
};


export type GroupRoleToArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
};

export type GroupRoleConnection = {
  __typename?: 'GroupRoleConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<GroupRoleEdge>>>;
};

export type GroupRoleEdge = {
  __typename?: 'GroupRoleEdge';
  node?: Maybe<GroupRole>;
  cursor?: Maybe<Scalars['ID']>;
};

export type GroupRoleExpression = {
  id?: InputMaybe<StringExpression>;
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
};

export type GroupRoleInput = {
  id?: InputMaybe<Scalars['ID']>;
  groupId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
};

export type GroupRoleOrderBy = {
  id?: InputMaybe<Sort>;
  groupId?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type IdExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
};

export type IntExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
};

export type InvokeParameter = {
  name?: InputMaybe<Scalars['String']>;
  className?: InputMaybe<Scalars['String']>;
};

export type MapWith = {
  type?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
};

export type Meta = {
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
};

export type MutationType = Meta & {
  __typename?: 'MutationType';
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userList?: Maybe<Array<Maybe<User>>>;
  role?: Maybe<Role>;
  roleList?: Maybe<Array<Maybe<Role>>>;
  group?: Maybe<Group>;
  groupList?: Maybe<Array<Maybe<Group>>>;
  realm?: Maybe<Realm>;
  realmList?: Maybe<Array<Maybe<Realm>>>;
  permission?: Maybe<Permission>;
  permissionList?: Maybe<Array<Maybe<Permission>>>;
  userGroup?: Maybe<UserGroup>;
  userGroupList?: Maybe<Array<Maybe<UserGroup>>>;
  userRole?: Maybe<UserRole>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  roleComposite?: Maybe<RoleComposite>;
  roleCompositeList?: Maybe<Array<Maybe<RoleComposite>>>;
  groupRole?: Maybe<GroupRole>;
  groupRoleList?: Maybe<Array<Maybe<GroupRole>>>;
};


export type MutationTypeUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  login?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  where?: InputMaybe<UserExpression>;
};


export type MutationTypeUserListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  login?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  list?: InputMaybe<Array<InputMaybe<UserInput>>>;
  where?: InputMaybe<UserExpression>;
};


export type MutationTypeRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  where?: InputMaybe<RoleExpression>;
};


export type MutationTypeRoleListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  list?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  where?: InputMaybe<RoleExpression>;
};


export type MutationTypeGroupArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<GroupInput>;
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['Int']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  where?: InputMaybe<GroupExpression>;
};


export type MutationTypeGroupListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<GroupInput>;
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['Int']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  list?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  where?: InputMaybe<GroupExpression>;
};


export type MutationTypeRealmArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RealmExpression>;
};


export type MutationTypeRealmListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RealmInput>>>;
  where?: InputMaybe<RealmExpression>;
};


export type MutationTypePermissionArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  ofTypeName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<PermissionLevel>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PermissionExpression>;
};


export type MutationTypePermissionListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  ofTypeName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<PermissionLevel>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  list?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  where?: InputMaybe<PermissionExpression>;
};


export type MutationTypeUserGroupArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserGroupExpression>;
};


export type MutationTypeUserGroupListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  where?: InputMaybe<UserGroupExpression>;
};


export type MutationTypeUserRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserRoleExpression>;
};


export type MutationTypeUserRoleListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  where?: InputMaybe<UserRoleExpression>;
};


export type MutationTypeRoleCompositeArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RoleCompositeExpression>;
};


export type MutationTypeRoleCompositeListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  where?: InputMaybe<RoleCompositeExpression>;
};


export type MutationTypeGroupRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
  groupId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<GroupRoleExpression>;
};


export type MutationTypeGroupRoleListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  groupId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  where?: InputMaybe<GroupRoleExpression>;
};

export enum Operator {
  EQ = 'EQ',
  NEQ = 'NEQ',
  LK = 'LK',
  NLK = 'NLK',
  GT = 'GT',
  NLTE = 'NLTE',
  GTE = 'GTE',
  NLT = 'NLT',
  LT = 'LT',
  NGTE = 'NGTE',
  LTE = 'LTE',
  NGT = 'NGT',
  NIL = 'NIL',
  NNIL = 'NNIL',
  IN = 'IN',
  NIN = 'NIN',
  BT = 'BT',
  NBT = 'NBT'
}

export type OperatorExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Operator>;
  in?: InputMaybe<Array<InputMaybe<Operator>>>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type Permission = Meta & {
  __typename?: 'Permission';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  ofTypeName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  level?: Maybe<PermissionLevel>;
  role: Role;
  realm?: Maybe<Realm>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  ofTypeNameCount?: Maybe<Scalars['Int']>;
  ofTypeNameMax?: Maybe<Scalars['String']>;
  ofTypeNameMin?: Maybe<Scalars['String']>;
  descriptionCount?: Maybe<Scalars['Int']>;
  descriptionMax?: Maybe<Scalars['String']>;
  descriptionMin?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['String']>;
  realmIdMin?: Maybe<Scalars['String']>;
};


export type PermissionRoleArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
};


export type PermissionRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
};

export type PermissionConnection = {
  __typename?: 'PermissionConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<PermissionEdge>>>;
};

export type PermissionEdge = {
  __typename?: 'PermissionEdge';
  node?: Maybe<Permission>;
  cursor?: Maybe<Scalars['ID']>;
};

export type PermissionExpression = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};

export type PermissionInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  ofTypeName?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<PermissionLevel>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
};

export enum PermissionLevel {
  READ = 'READ',
  WRITE = 'WRITE'
}

export type PermissionLevelExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<PermissionLevel>;
  in?: InputMaybe<Array<InputMaybe<PermissionLevel>>>;
};

export type PermissionOrderBy = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  ofTypeName?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  level?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
};

export type Property = {
  name: Scalars['String'];
  validation?: InputMaybe<ValidationInput>;
  required?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export enum Protocol {
  LOCAL = 'LOCAL',
  GRPC = 'GRPC',
  HTTP = 'HTTP',
  RSOCKET = 'RSOCKET'
}

export type ProtocolExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Protocol>;
  in?: InputMaybe<Array<InputMaybe<Protocol>>>;
};

export type QueryType = Meta & {
  __typename?: 'QueryType';
  current?: Maybe<CurrentUser>;
  login?: Maybe<Scalars['String']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userList?: Maybe<Array<Maybe<User>>>;
  userConnection?: Maybe<UserConnection>;
  role?: Maybe<Role>;
  roleList?: Maybe<Array<Maybe<Role>>>;
  roleConnection?: Maybe<RoleConnection>;
  group?: Maybe<Group>;
  groupList?: Maybe<Array<Maybe<Group>>>;
  groupConnection?: Maybe<GroupConnection>;
  realm?: Maybe<Realm>;
  realmList?: Maybe<Array<Maybe<Realm>>>;
  realmConnection?: Maybe<RealmConnection>;
  permission?: Maybe<Permission>;
  permissionList?: Maybe<Array<Maybe<Permission>>>;
  permissionConnection?: Maybe<PermissionConnection>;
  userGroup?: Maybe<UserGroup>;
  userGroupList?: Maybe<Array<Maybe<UserGroup>>>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  userRole?: Maybe<UserRole>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  roleComposite?: Maybe<RoleComposite>;
  roleCompositeList?: Maybe<Array<Maybe<RoleComposite>>>;
  roleCompositeConnection?: Maybe<RoleCompositeConnection>;
  groupRole?: Maybe<GroupRole>;
  groupRoleList?: Maybe<Array<Maybe<GroupRole>>>;
  groupRoleConnection?: Maybe<GroupRoleConnection>;
};


export type QueryTypeLoginArgs = {
  login?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type QueryTypeUserArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};


export type QueryTypeUserListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeUserConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeRoleArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};


export type QueryTypeRoleListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeRoleConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeGroupArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};


export type QueryTypeGroupListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeGroupConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};


export type QueryTypeRealmListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RealmOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeRealmConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RealmOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypePermissionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};


export type QueryTypePermissionListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypePermissionConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeUserGroupArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
};


export type QueryTypeUserGroupListArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeUserGroupConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeUserRoleArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
};


export type QueryTypeUserRoleListArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeUserRoleConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeRoleCompositeArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
};


export type QueryTypeRoleCompositeListArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeRoleCompositeConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeGroupRoleArgs = {
  id?: InputMaybe<StringExpression>;
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
};


export type QueryTypeGroupRoleListArgs = {
  id?: InputMaybe<StringExpression>;
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeGroupRoleConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type Realm = Meta & {
  __typename?: 'Realm';
  id: Scalars['ID'];
  name: Scalars['String'];
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['String']>;
  idMin?: Maybe<Scalars['String']>;
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
};

export type RealmConnection = {
  __typename?: 'RealmConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RealmEdge>>>;
};

export type RealmEdge = {
  __typename?: 'RealmEdge';
  node?: Maybe<Realm>;
  cursor?: Maybe<Scalars['ID']>;
};

export type RealmExpression = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};

export type RealmInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
};

export type RealmOrderBy = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type Role = Meta & {
  __typename?: 'Role';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
  permissions?: Maybe<Array<Maybe<Permission>>>;
  realm?: Maybe<Realm>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  descriptionCount?: Maybe<Scalars['Int']>;
  descriptionMax?: Maybe<Scalars['String']>;
  descriptionMin?: Maybe<Scalars['String']>;
  usersAggregate?: Maybe<User>;
  usersConnection?: Maybe<UserConnection>;
  compositesConnection?: Maybe<RoleConnection>;
  permissionsAggregate?: Maybe<Permission>;
  permissionsConnection?: Maybe<PermissionConnection>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['String']>;
  realmIdMin?: Maybe<Scalars['String']>;
  userRole?: Maybe<Array<Maybe<UserRole>>>;
  userRoleAggregate?: Maybe<UserRole>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  roleComposite?: Maybe<Array<Maybe<RoleComposite>>>;
  roleCompositeAggregate?: Maybe<RoleComposite>;
  roleCompositeConnection?: Maybe<RoleCompositeConnection>;
};


export type RoleUsersArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type RolePermissionsArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
};


export type RoleRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
};


export type RoleUsersAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
};


export type RoleUsersConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type RoleCompositesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type RolePermissionsAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
};


export type RolePermissionsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type RoleUserRoleArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type RoleUserRoleAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
};


export type RoleUserRoleConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type RoleRoleCompositeArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type RoleRoleCompositeAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
};


export type RoleRoleCompositeConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
};

export type RoleComposite = Meta & {
  __typename?: 'RoleComposite';
  id?: Maybe<Scalars['ID']>;
  roleId?: Maybe<Scalars['Int']>;
  from?: Maybe<Role>;
  compositeId?: Maybe<Scalars['Int']>;
  to?: Maybe<Role>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
  compositeIdCount?: Maybe<Scalars['Int']>;
  compositeIdSum?: Maybe<Scalars['Int']>;
  compositeIdAvg?: Maybe<Scalars['Int']>;
  compositeIdMax?: Maybe<Scalars['Int']>;
  compositeIdMin?: Maybe<Scalars['Int']>;
};


export type RoleCompositeFromArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
};


export type RoleCompositeToArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
};

export type RoleCompositeConnection = {
  __typename?: 'RoleCompositeConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RoleCompositeEdge>>>;
};

export type RoleCompositeEdge = {
  __typename?: 'RoleCompositeEdge';
  node?: Maybe<RoleComposite>;
  cursor?: Maybe<Scalars['ID']>;
};

export type RoleCompositeExpression = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
};

export type RoleCompositeInput = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
};

export type RoleCompositeOrderBy = {
  id?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
  compositeId?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type RoleConnection = {
  __typename?: 'RoleConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RoleEdge>>>;
};

export type RoleEdge = {
  __typename?: 'RoleEdge';
  node?: Maybe<Role>;
  cursor?: Maybe<Scalars['ID']>;
};

export type RoleExpression = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};

export type RoleInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
};

export type RoleOrderBy = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type SortExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Sort>;
  in?: InputMaybe<Array<InputMaybe<Sort>>>;
};

export type StringExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
};

export type SubscriptionType = Meta & {
  __typename?: 'SubscriptionType';
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userList?: Maybe<Array<Maybe<User>>>;
  userConnection?: Maybe<UserConnection>;
  role?: Maybe<Role>;
  roleList?: Maybe<Array<Maybe<Role>>>;
  roleConnection?: Maybe<RoleConnection>;
  group?: Maybe<Group>;
  groupList?: Maybe<Array<Maybe<Group>>>;
  groupConnection?: Maybe<GroupConnection>;
  realm?: Maybe<Realm>;
  realmList?: Maybe<Array<Maybe<Realm>>>;
  realmConnection?: Maybe<RealmConnection>;
  permission?: Maybe<Permission>;
  permissionList?: Maybe<Array<Maybe<Permission>>>;
  permissionConnection?: Maybe<PermissionConnection>;
  userGroup?: Maybe<UserGroup>;
  userGroupList?: Maybe<Array<Maybe<UserGroup>>>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  userRole?: Maybe<UserRole>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  roleComposite?: Maybe<RoleComposite>;
  roleCompositeList?: Maybe<Array<Maybe<RoleComposite>>>;
  roleCompositeConnection?: Maybe<RoleCompositeConnection>;
  groupRole?: Maybe<GroupRole>;
  groupRoleList?: Maybe<Array<Maybe<GroupRole>>>;
  groupRoleConnection?: Maybe<GroupRoleConnection>;
};


export type SubscriptionTypeUserArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};


export type SubscriptionTypeUserListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeUserConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeRoleArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};


export type SubscriptionTypeRoleListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeRoleConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeGroupArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};


export type SubscriptionTypeGroupListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeGroupConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};


export type SubscriptionTypeRealmListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RealmOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeRealmConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RealmOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypePermissionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};


export type SubscriptionTypePermissionListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypePermissionConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  ofTypeName?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeUserGroupArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
};


export type SubscriptionTypeUserGroupListArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeUserGroupConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeUserRoleArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
};


export type SubscriptionTypeUserRoleListArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeUserRoleConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeRoleCompositeArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
};


export type SubscriptionTypeRoleCompositeListArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeRoleCompositeConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeGroupRoleArgs = {
  id?: InputMaybe<StringExpression>;
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
};


export type SubscriptionTypeGroupRoleListArgs = {
  id?: InputMaybe<StringExpression>;
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeGroupRoleConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type User = Meta & {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  login: Scalars['String'];
  password: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  disable?: Maybe<Scalars['Boolean']>;
  groups?: Maybe<Array<Maybe<Group>>>;
  roles?: Maybe<Array<Maybe<Role>>>;
  realm?: Maybe<Realm>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  lastNameCount?: Maybe<Scalars['Int']>;
  lastNameMax?: Maybe<Scalars['String']>;
  lastNameMin?: Maybe<Scalars['String']>;
  loginCount?: Maybe<Scalars['Int']>;
  loginMax?: Maybe<Scalars['String']>;
  loginMin?: Maybe<Scalars['String']>;
  passwordCount?: Maybe<Scalars['Int']>;
  passwordMax?: Maybe<Scalars['String']>;
  passwordMin?: Maybe<Scalars['String']>;
  emailCount?: Maybe<Scalars['Int']>;
  emailMax?: Maybe<Scalars['String']>;
  emailMin?: Maybe<Scalars['String']>;
  groupsAggregate?: Maybe<Group>;
  groupsConnection?: Maybe<GroupConnection>;
  rolesAggregate?: Maybe<Role>;
  rolesConnection?: Maybe<RoleConnection>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['String']>;
  realmIdMin?: Maybe<Scalars['String']>;
  userGroup?: Maybe<Array<Maybe<UserGroup>>>;
  userGroupAggregate?: Maybe<UserGroup>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  userRole?: Maybe<Array<Maybe<UserRole>>>;
  userRoleAggregate?: Maybe<UserRole>;
  userRoleConnection?: Maybe<UserRoleConnection>;
};


export type UserGroupsArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
};


export type UserRolesArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
};


export type UserRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
};


export type UserGroupsAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
};


export type UserGroupsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type UserRolesAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
};


export type UserRolesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type UserUserGroupArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type UserUserGroupAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
};


export type UserUserGroupConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  totalCount?: InputMaybe<IntExpression>;
};


export type UserUserRoleArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type UserUserRoleAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
};


export type UserUserRoleConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  totalCount?: InputMaybe<IntExpression>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<UserEdge>>>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  node?: Maybe<User>;
  cursor?: Maybe<Scalars['ID']>;
};

export type UserExpression = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};

export type UserGroup = Meta & {
  __typename?: 'UserGroup';
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['Int']>;
  from?: Maybe<User>;
  groupId?: Maybe<Scalars['Int']>;
  to?: Maybe<Group>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  userIdCount?: Maybe<Scalars['Int']>;
  userIdSum?: Maybe<Scalars['Int']>;
  userIdAvg?: Maybe<Scalars['Int']>;
  userIdMax?: Maybe<Scalars['Int']>;
  userIdMin?: Maybe<Scalars['Int']>;
  groupIdCount?: Maybe<Scalars['Int']>;
  groupIdSum?: Maybe<Scalars['Int']>;
  groupIdAvg?: Maybe<Scalars['Int']>;
  groupIdMax?: Maybe<Scalars['Int']>;
  groupIdMin?: Maybe<Scalars['Int']>;
};


export type UserGroupFromArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
};


export type UserGroupToArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
};

export type UserGroupConnection = {
  __typename?: 'UserGroupConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<UserGroupEdge>>>;
};

export type UserGroupEdge = {
  __typename?: 'UserGroupEdge';
  node?: Maybe<UserGroup>;
  cursor?: Maybe<Scalars['ID']>;
};

export type UserGroupExpression = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
};

export type UserGroupInput = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
};

export type UserGroupOrderBy = {
  id?: InputMaybe<Sort>;
  userId?: InputMaybe<Sort>;
  groupId?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type UserInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  login?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
};

export type UserOrderBy = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  lastName?: InputMaybe<Sort>;
  login?: InputMaybe<Sort>;
  password?: InputMaybe<Sort>;
  email?: InputMaybe<Sort>;
  disable?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type UserRole = Meta & {
  __typename?: 'UserRole';
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['Int']>;
  from?: Maybe<User>;
  roleId?: Maybe<Scalars['Int']>;
  to?: Maybe<Role>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  userIdCount?: Maybe<Scalars['Int']>;
  userIdSum?: Maybe<Scalars['Int']>;
  userIdAvg?: Maybe<Scalars['Int']>;
  userIdMax?: Maybe<Scalars['Int']>;
  userIdMin?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
};


export type UserRoleFromArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
};


export type UserRoleToArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
};

export type UserRoleConnection = {
  __typename?: 'UserRoleConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<UserRoleEdge>>>;
};

export type UserRoleEdge = {
  __typename?: 'UserRoleEdge';
  node?: Maybe<UserRole>;
  cursor?: Maybe<Scalars['ID']>;
};

export type UserRoleExpression = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
};

export type UserRoleInput = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['String']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
};

export type UserRoleOrderBy = {
  id?: InputMaybe<Sort>;
  userId?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type ValidationInput = {
  minLength?: InputMaybe<Scalars['Int']>;
  maxLength?: InputMaybe<Scalars['Int']>;
  pattern?: InputMaybe<Scalars['String']>;
  format?: InputMaybe<Scalars['String']>;
  contentMediaType?: InputMaybe<Scalars['String']>;
  contentEncoding?: InputMaybe<Scalars['String']>;
  minimum?: InputMaybe<Scalars['Float']>;
  exclusiveMinimum?: InputMaybe<Scalars['Float']>;
  maximum?: InputMaybe<Scalars['Float']>;
  exclusiveMaximum?: InputMaybe<Scalars['Float']>;
  multipleOf?: InputMaybe<Scalars['Float']>;
  const?: InputMaybe<Scalars['String']>;
  enum?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  items?: InputMaybe<ValidationInput>;
  minItems?: InputMaybe<Scalars['Int']>;
  maxItems?: InputMaybe<Scalars['Int']>;
  uniqueItems?: InputMaybe<Scalars['Boolean']>;
  allOf?: InputMaybe<Array<InputMaybe<ValidationInput>>>;
  anyOf?: InputMaybe<Array<InputMaybe<ValidationInput>>>;
  oneOf?: InputMaybe<Array<InputMaybe<ValidationInput>>>;
  not?: InputMaybe<ValidationInput>;
  properties?: InputMaybe<Array<InputMaybe<Property>>>;
  if?: InputMaybe<ValidationInput>;
  then?: InputMaybe<ValidationInput>;
  else?: InputMaybe<ValidationInput>;
  dependentRequired?: InputMaybe<Array<InputMaybe<Property>>>;
};
