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

export type Conditional =
  | 'AND'
  | 'OR';

export type ConditionalExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Conditional>;
  in?: InputMaybe<Array<InputMaybe<Conditional>>>;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  realmId?: Maybe<Scalars['Int']>;
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type FloatExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
};

export type Func =
  | 'COUNT'
  | 'MAX'
  | 'MIN'
  | 'SUM'
  | 'AVG';

export type FuncExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Func>;
  in?: InputMaybe<Array<InputMaybe<Func>>>;
};

/** 组 */
export type Group = TreeStruct & NamedStruct & Meta & {
  __typename?: 'Group';
  /** ID */
  id?: Maybe<Scalars['ID']>;
  /** 名称 */
  name: Scalars['String'];
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  /** 路径 */
  path?: Maybe<Scalars['String']>;
  /** 层级 */
  deep?: Maybe<Scalars['Int']>;
  /** 上级ID */
  parentId?: Maybe<Scalars['String']>;
  /** 上级 */
  parent?: Maybe<Group>;
  /** 下级 */
  subGroups?: Maybe<Array<Maybe<Group>>>;
  /** 用户 */
  users?: Maybe<Array<Maybe<User>>>;
  /** 角色 */
  roles?: Maybe<Array<Maybe<Role>>>;
  /** 租户 */
  realm?: Maybe<Realm>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
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
  pathCount?: Maybe<Scalars['Int']>;
  pathMax?: Maybe<Scalars['String']>;
  pathMin?: Maybe<Scalars['String']>;
  parentIdCount?: Maybe<Scalars['Int']>;
  parentIdMax?: Maybe<Scalars['String']>;
  parentIdMin?: Maybe<Scalars['String']>;
  deepCount?: Maybe<Scalars['Int']>;
  deepSum?: Maybe<Scalars['Int']>;
  deepAvg?: Maybe<Scalars['Int']>;
  deepMax?: Maybe<Scalars['Int']>;
  deepMin?: Maybe<Scalars['Int']>;
  subGroupsAggregate?: Maybe<Group>;
  subGroupsConnection?: Maybe<GroupConnection>;
  usersAggregate?: Maybe<User>;
  usersConnection?: Maybe<UserConnection>;
  rolesAggregate?: Maybe<Role>;
  rolesConnection?: Maybe<RoleConnection>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdSum?: Maybe<Scalars['Int']>;
  realmIdAvg?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['Int']>;
  realmIdMin?: Maybe<Scalars['Int']>;
  userGroup?: Maybe<Array<Maybe<UserGroup>>>;
  userGroupAggregate?: Maybe<UserGroup>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  groupRole?: Maybe<Array<Maybe<GroupRole>>>;
  groupRoleAggregate?: Maybe<GroupRole>;
  groupRoleConnection?: Maybe<GroupRoleConnection>;
  syncGroupPolicy?: Maybe<Scalars['Boolean']>;
};


/** 组 */
export type GroupParentArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 组 */
export type GroupSubGroupsArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<GroupOrderBy>;
};


/** 组 */
export type GroupUsersArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<UserOrderBy>;
};


/** 组 */
export type GroupRolesArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<RoleOrderBy>;
};


/** 组 */
export type GroupRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 组 */
export type GroupSubGroupsAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


/** 组 */
export type GroupSubGroupsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


/** 组 */
export type GroupUsersAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
};


/** 组 */
export type GroupUsersConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
};


/** 组 */
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
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
};


/** 组 */
export type GroupRolesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
};


/** 组 */
export type GroupUserGroupAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
};


/** 组 */
export type GroupUserGroupConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
};


/** 组 */
export type GroupGroupRoleAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
};


/** 组 */
export type GroupGroupRoleConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
};

export type GroupConnection = {
  __typename?: 'GroupConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<GroupEdge>>>;
};

export type GroupConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupEdge = {
  __typename?: 'GroupEdge';
  node?: Maybe<Group>;
  cursor?: Maybe<Scalars['ID']>;
};

export type GroupExpression = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};

export type GroupInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  deep?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<GroupInput>;
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  where?: InputMaybe<GroupExpression>;
};

export type GroupListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  deep?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<GroupInput>;
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  list?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  where?: InputMaybe<GroupExpression>;
};

export type GroupListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  deep?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<GroupInput>;
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  where?: InputMaybe<GroupExpression>;
};

export type GroupOrderBy = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  path?: InputMaybe<Sort>;
  deep?: InputMaybe<Sort>;
  parentId?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type GroupQueryArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};

export type GroupRole = Meta & {
  __typename?: 'GroupRole';
  id?: Maybe<Scalars['ID']>;
  roleId?: Maybe<Scalars['Int']>;
  roleIdType?: Maybe<Role>;
  groupId?: Maybe<Scalars['Int']>;
  groupIdType?: Maybe<Group>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
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
  groupIdCount?: Maybe<Scalars['Int']>;
  groupIdSum?: Maybe<Scalars['Int']>;
  groupIdAvg?: Maybe<Scalars['Int']>;
  groupIdMax?: Maybe<Scalars['Int']>;
  groupIdMin?: Maybe<Scalars['Int']>;
};


export type GroupRoleRoleIdTypeArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type GroupRoleGroupIdTypeArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type GroupRoleConnection = {
  __typename?: 'GroupRoleConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<GroupRoleEdge>>>;
};

export type GroupRoleConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupRoleConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupRoleEdge = {
  __typename?: 'GroupRoleEdge';
  node?: Maybe<GroupRole>;
  cursor?: Maybe<Scalars['ID']>;
};

export type GroupRoleExpression = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
};

export type GroupRoleInput = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  groupIdType?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<GroupRoleExpression>;
};

export type GroupRoleListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  groupIdType?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  where?: InputMaybe<GroupRoleExpression>;
};

export type GroupRoleListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupRoleListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupRoleMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  groupIdType?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<GroupRoleExpression>;
};

export type GroupRoleOrderBy = {
  id?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
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

export type GroupRoleQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
};

export type GroupRoleSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
};

export type GroupSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
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

export type Invoke = {
  className?: InputMaybe<Scalars['String']>;
  methodName?: InputMaybe<Scalars['String']>;
  parameters?: InputMaybe<Array<InputMaybe<InvokeParameter>>>;
  returnClassName?: InputMaybe<Scalars['String']>;
  thrownTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type InvokeParameter = {
  name?: InputMaybe<Scalars['String']>;
  className?: InputMaybe<Scalars['String']>;
};

export type Meta = {
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
};

export type MetaExpression = {
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
};

export type MetaInput = {
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
};

export type Mutation = Meta & {
  __typename?: 'Mutation';
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
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
  userPhones?: Maybe<UserPhones>;
  userPhonesList?: Maybe<Array<Maybe<UserPhones>>>;
  userGroup?: Maybe<UserGroup>;
  userGroupList?: Maybe<Array<Maybe<UserGroup>>>;
  userRole?: Maybe<UserRole>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  groupRole?: Maybe<GroupRole>;
  groupRoleList?: Maybe<Array<Maybe<GroupRole>>>;
  roleComposite?: Maybe<RoleComposite>;
  roleCompositeList?: Maybe<Array<Maybe<RoleComposite>>>;
  rolePermission?: Maybe<RolePermission>;
  rolePermissionList?: Maybe<Array<Maybe<RolePermission>>>;
  login?: Maybe<Scalars['String']>;
};


export type MutationUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  login?: InputMaybe<Scalars['String']>;
  salt?: InputMaybe<Scalars['String']>;
  hash?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  disable?: InputMaybe<Scalars['Boolean']>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userPhones?: InputMaybe<Array<InputMaybe<UserPhonesInput>>>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  where?: InputMaybe<UserExpression>;
};


export type MutationUserListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  login?: InputMaybe<Scalars['String']>;
  salt?: InputMaybe<Scalars['String']>;
  hash?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  disable?: InputMaybe<Scalars['Boolean']>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userPhones?: InputMaybe<Array<InputMaybe<UserPhonesInput>>>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  list?: InputMaybe<Array<InputMaybe<UserInput>>>;
  where?: InputMaybe<UserExpression>;
};


export type MutationRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  rolePermission?: InputMaybe<Array<InputMaybe<RolePermissionInput>>>;
  where?: InputMaybe<RoleExpression>;
};


export type MutationRoleListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  rolePermission?: InputMaybe<Array<InputMaybe<RolePermissionInput>>>;
  list?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  where?: InputMaybe<RoleExpression>;
};


export type MutationGroupArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  deep?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<GroupInput>;
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  where?: InputMaybe<GroupExpression>;
};


export type MutationGroupListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  deep?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<GroupInput>;
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  list?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  where?: InputMaybe<GroupExpression>;
};


export type MutationRealmArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RealmExpression>;
};


export type MutationRealmListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RealmInput>>>;
  where?: InputMaybe<RealmExpression>;
};


export type MutationPermissionArgs = {
  name?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  permissionType?: InputMaybe<PermissionType>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  rolePermission?: InputMaybe<Array<InputMaybe<RolePermissionInput>>>;
  where?: InputMaybe<PermissionExpression>;
};


export type MutationPermissionListArgs = {
  name?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  permissionType?: InputMaybe<PermissionType>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  rolePermission?: InputMaybe<Array<InputMaybe<RolePermissionInput>>>;
  list?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  where?: InputMaybe<PermissionExpression>;
};


export type MutationUserPhonesArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  phone?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserPhonesExpression>;
};


export type MutationUserPhonesListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  phone?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<UserPhonesInput>>>;
  where?: InputMaybe<UserPhonesExpression>;
};


export type MutationUserGroupArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  groupIdType?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserGroupExpression>;
};


export type MutationUserGroupListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  groupIdType?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  where?: InputMaybe<UserGroupExpression>;
};


export type MutationUserRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserRoleExpression>;
};


export type MutationUserRoleListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  where?: InputMaybe<UserRoleExpression>;
};


export type MutationGroupRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  groupIdType?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<GroupRoleExpression>;
};


export type MutationGroupRoleListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  groupIdType?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  where?: InputMaybe<GroupRoleExpression>;
};


export type MutationRoleCompositeArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  compositeIdType?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RoleCompositeExpression>;
};


export type MutationRoleCompositeListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  compositeIdType?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  where?: InputMaybe<RoleCompositeExpression>;
};


export type MutationRolePermissionArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  permissionName?: InputMaybe<Scalars['String']>;
  permissionNameType?: InputMaybe<PermissionInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RolePermissionExpression>;
};


export type MutationRolePermissionListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  permissionName?: InputMaybe<Scalars['String']>;
  permissionNameType?: InputMaybe<PermissionInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RolePermissionInput>>>;
  where?: InputMaybe<RolePermissionExpression>;
};


export type MutationLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation_Login_Arguments = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type NamedStruct = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type NamedStructExpression = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
};

export type NamedStructInput = {
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
};

export type Operator =
  | 'EQ'
  | 'NEQ'
  | 'LK'
  | 'NLK'
  | 'GT'
  | 'NLTE'
  | 'GTE'
  | 'NLT'
  | 'LT'
  | 'NGTE'
  | 'LTE'
  | 'NGT'
  | 'NIL'
  | 'NNIL'
  | 'IN'
  | 'NIN'
  | 'BT'
  | 'NBT';

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

/** 权限 */
export type Permission = Meta & {
  __typename?: 'Permission';
  /** 名称 */
  name: Scalars['ID'];
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  /** 字段 */
  field: Scalars['String'];
  /** 实体 */
  type: Scalars['String'];
  /** 权限类型 */
  permissionType: PermissionType;
  /** 角色 */
  roles?: Maybe<Array<Maybe<Role>>>;
  /** 租户 */
  realm?: Maybe<Realm>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  descriptionCount?: Maybe<Scalars['Int']>;
  descriptionMax?: Maybe<Scalars['String']>;
  descriptionMin?: Maybe<Scalars['String']>;
  fieldCount?: Maybe<Scalars['Int']>;
  fieldMax?: Maybe<Scalars['String']>;
  fieldMin?: Maybe<Scalars['String']>;
  typeCount?: Maybe<Scalars['Int']>;
  typeMax?: Maybe<Scalars['String']>;
  typeMin?: Maybe<Scalars['String']>;
  rolesAggregate?: Maybe<Role>;
  rolesConnection?: Maybe<RoleConnection>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdSum?: Maybe<Scalars['Int']>;
  realmIdAvg?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['Int']>;
  realmIdMin?: Maybe<Scalars['Int']>;
  rolePermission?: Maybe<Array<Maybe<RolePermission>>>;
  rolePermissionAggregate?: Maybe<RolePermission>;
  rolePermissionConnection?: Maybe<RolePermissionConnection>;
  syncPermissionPolicy?: Maybe<Scalars['Boolean']>;
};


/** 权限 */
export type PermissionRolesArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<RoleOrderBy>;
};


/** 权限 */
export type PermissionRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 权限 */
export type PermissionRolesAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
};


/** 权限 */
export type PermissionRolesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
};


/** 权限 */
export type PermissionRolePermissionAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RolePermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
};


/** 权限 */
export type PermissionRolePermissionConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RolePermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
};

export type PermissionConnection = {
  __typename?: 'PermissionConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<PermissionEdge>>>;
};

export type PermissionConnectionQueryArguments = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type PermissionConnectionSubscriptionArguments = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type PermissionEdge = {
  __typename?: 'PermissionEdge';
  node?: Maybe<Permission>;
  cursor?: Maybe<Scalars['ID']>;
};

export type PermissionExpression = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};

export type PermissionInput = {
  name?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  permissionType?: InputMaybe<PermissionType>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  rolePermission?: InputMaybe<Array<InputMaybe<RolePermissionInput>>>;
  where?: InputMaybe<PermissionExpression>;
};

export type PermissionListMutationArguments = {
  name?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  permissionType?: InputMaybe<PermissionType>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  rolePermission?: InputMaybe<Array<InputMaybe<RolePermissionInput>>>;
  list?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  where?: InputMaybe<PermissionExpression>;
};

export type PermissionListQueryArguments = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type PermissionListSubscriptionArguments = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type PermissionMutationArguments = {
  name?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  field?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  permissionType?: InputMaybe<PermissionType>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  rolePermission?: InputMaybe<Array<InputMaybe<RolePermissionInput>>>;
  where?: InputMaybe<PermissionExpression>;
};

export type PermissionOrderBy = {
  name?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  field?: InputMaybe<Sort>;
  type?: InputMaybe<Sort>;
  permissionType?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type PermissionQueryArguments = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};

export type PermissionSubscriptionArguments = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};

/** 权限类型 */
export type PermissionType =
  /** 读取 */
  | 'READ'
  /** 写入 */
  | 'WRITE';

export type PermissionTypeExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<PermissionType>;
  in?: InputMaybe<Array<InputMaybe<PermissionType>>>;
};

export type Policy = {
  __typename?: 'Policy';
  id?: Maybe<Scalars['String']>;
  ptype?: Maybe<Scalars['String']>;
  v0?: Maybe<Scalars['String']>;
  v1?: Maybe<Scalars['String']>;
  v2?: Maybe<Scalars['String']>;
  v3?: Maybe<Scalars['String']>;
  v4?: Maybe<Scalars['String']>;
  v5?: Maybe<Scalars['String']>;
};

export type Property = {
  name: Scalars['String'];
  validation?: InputMaybe<ValidationInput>;
  required?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Protocol =
  | 'LOCAL'
  | 'GRPC'
  | 'HTTP'
  | 'RSOCKET';

export type ProtocolExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Protocol>;
  in?: InputMaybe<Array<InputMaybe<Protocol>>>;
};

export type Query = Meta & {
  __typename?: 'Query';
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
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
  userPhones?: Maybe<UserPhones>;
  userPhonesList?: Maybe<Array<Maybe<UserPhones>>>;
  userPhonesConnection?: Maybe<UserPhonesConnection>;
  userGroup?: Maybe<UserGroup>;
  userGroupList?: Maybe<Array<Maybe<UserGroup>>>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  userRole?: Maybe<UserRole>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  groupRole?: Maybe<GroupRole>;
  groupRoleList?: Maybe<Array<Maybe<GroupRole>>>;
  groupRoleConnection?: Maybe<GroupRoleConnection>;
  roleComposite?: Maybe<RoleComposite>;
  roleCompositeList?: Maybe<Array<Maybe<RoleComposite>>>;
  roleCompositeConnection?: Maybe<RoleCompositeConnection>;
  rolePermission?: Maybe<RolePermission>;
  rolePermissionList?: Maybe<Array<Maybe<RolePermission>>>;
  rolePermissionConnection?: Maybe<RolePermissionConnection>;
  current?: Maybe<CurrentUser>;
  currentPermissionTypeList?: Maybe<Array<Maybe<Scalars['String']>>>;
  currentPermissionNameList?: Maybe<Array<Maybe<Scalars['String']>>>;
  policyList?: Maybe<Array<Maybe<Policy>>>;
};


export type QueryUserArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};


export type QueryUserListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryUserConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryRoleArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};


export type QueryRoleListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryRoleConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryGroupArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};


export type QueryGroupListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryGroupConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};


export type QueryRealmListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RealmOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryRealmConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RealmOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryPermissionArgs = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};


export type QueryPermissionListArgs = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryPermissionConnectionArgs = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryUserPhonesArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
};


export type QueryUserPhonesListArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryUserPhonesConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryUserGroupArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
};


export type QueryUserGroupListArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryUserGroupConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryUserRoleArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
};


export type QueryUserRoleListArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryUserRoleConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryGroupRoleArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
};


export type QueryGroupRoleListArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryGroupRoleConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryRoleCompositeArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
};


export type QueryRoleCompositeListArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryRoleCompositeConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryRolePermissionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
};


export type QueryRolePermissionListArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RolePermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryRolePermissionConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RolePermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryCurrentPermissionNameListArgs = {
  types?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Query_CurrentPermissionNameList_Arguments = {
  types?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** 租户 */
export type Realm = Meta & NamedStruct & {
  __typename?: 'Realm';
  /** ID */
  id?: Maybe<Scalars['ID']>;
  /** 名称 */
  name: Scalars['String'];
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
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
};

export type RealmConnection = {
  __typename?: 'RealmConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RealmEdge>>>;
};

export type RealmConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RealmOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RealmConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RealmOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RealmEdge = {
  __typename?: 'RealmEdge';
  node?: Maybe<Realm>;
  cursor?: Maybe<Scalars['ID']>;
};

export type RealmExpression = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};

export type RealmInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RealmExpression>;
};

export type RealmListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RealmInput>>>;
  where?: InputMaybe<RealmExpression>;
};

export type RealmListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RealmOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RealmListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RealmOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RealmMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RealmExpression>;
};

export type RealmOrderBy = {
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

export type RealmQueryArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};

export type RealmSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};

/** 角色 */
export type Role = NamedStruct & Meta & {
  __typename?: 'Role';
  /** ID */
  id?: Maybe<Scalars['ID']>;
  /** 名称 */
  name: Scalars['String'];
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  /** 用户 */
  users?: Maybe<Array<Maybe<User>>>;
  /** 组 */
  groups?: Maybe<Array<Maybe<Group>>>;
  /** 组合 */
  composites?: Maybe<Array<Maybe<Role>>>;
  /** 权限 */
  permissions?: Maybe<Array<Maybe<Permission>>>;
  /** 租户 */
  realm?: Maybe<Realm>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
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
  groupsAggregate?: Maybe<Group>;
  groupsConnection?: Maybe<GroupConnection>;
  compositesAggregate?: Maybe<Role>;
  compositesConnection?: Maybe<RoleConnection>;
  permissionsAggregate?: Maybe<Permission>;
  permissionsConnection?: Maybe<PermissionConnection>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdSum?: Maybe<Scalars['Int']>;
  realmIdAvg?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['Int']>;
  realmIdMin?: Maybe<Scalars['Int']>;
  userRole?: Maybe<Array<Maybe<UserRole>>>;
  userRoleAggregate?: Maybe<UserRole>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  groupRole?: Maybe<Array<Maybe<GroupRole>>>;
  groupRoleAggregate?: Maybe<GroupRole>;
  groupRoleConnection?: Maybe<GroupRoleConnection>;
  roleComposite?: Maybe<Array<Maybe<RoleComposite>>>;
  roleCompositeAggregate?: Maybe<RoleComposite>;
  roleCompositeConnection?: Maybe<RoleCompositeConnection>;
  rolePermission?: Maybe<Array<Maybe<RolePermission>>>;
  rolePermissionAggregate?: Maybe<RolePermission>;
  rolePermissionConnection?: Maybe<RolePermissionConnection>;
  syncRolePolicy?: Maybe<Scalars['Boolean']>;
};


/** 角色 */
export type RoleUsersArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<UserOrderBy>;
};


/** 角色 */
export type RoleGroupsArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<GroupOrderBy>;
};


/** 角色 */
export type RoleCompositesArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<RoleOrderBy>;
};


/** 角色 */
export type RolePermissionsArgs = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
};


/** 角色 */
export type RoleRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RoleUsersAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
};


/** 角色 */
export type RoleUsersConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
};


/** 角色 */
export type RoleGroupsAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


/** 角色 */
export type RoleGroupsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


/** 角色 */
export type RoleCompositesAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
};


/** 角色 */
export type RoleCompositesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
};


/** 角色 */
export type RolePermissionsAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


/** 角色 */
export type RolePermissionsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


/** 角色 */
export type RoleUserRoleAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
};


/** 角色 */
export type RoleUserRoleConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
};


/** 角色 */
export type RoleGroupRoleAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
};


/** 角色 */
export type RoleGroupRoleConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
};


/** 角色 */
export type RoleRoleCompositeAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
};


/** 角色 */
export type RoleRoleCompositeConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
};


/** 角色 */
export type RoleRolePermissionAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RolePermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
};


/** 角色 */
export type RoleRolePermissionConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RolePermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
};

export type RoleComposite = Meta & {
  __typename?: 'RoleComposite';
  id?: Maybe<Scalars['ID']>;
  roleId?: Maybe<Scalars['Int']>;
  roleIdType?: Maybe<Role>;
  compositeId?: Maybe<Scalars['Int']>;
  compositeIdType?: Maybe<Role>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
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


export type RoleCompositeRoleIdTypeArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type RoleCompositeCompositeIdTypeArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type RoleCompositeConnection = {
  __typename?: 'RoleCompositeConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RoleCompositeEdge>>>;
};

export type RoleCompositeConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleCompositeConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleCompositeEdge = {
  __typename?: 'RoleCompositeEdge';
  node?: Maybe<RoleComposite>;
  cursor?: Maybe<Scalars['ID']>;
};

export type RoleCompositeExpression = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
};

export type RoleCompositeInput = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  compositeIdType?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RoleCompositeExpression>;
};

export type RoleCompositeListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  compositeIdType?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  where?: InputMaybe<RoleCompositeExpression>;
};

export type RoleCompositeListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleCompositeListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleCompositeMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  compositeIdType?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RoleCompositeExpression>;
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

export type RoleCompositeQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
};

export type RoleCompositeSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
};

export type RoleConnection = {
  __typename?: 'RoleConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RoleEdge>>>;
};

export type RoleConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
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
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};

export type RoleInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  rolePermission?: InputMaybe<Array<InputMaybe<RolePermissionInput>>>;
  where?: InputMaybe<RoleExpression>;
};

export type RoleListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  rolePermission?: InputMaybe<Array<InputMaybe<RolePermissionInput>>>;
  list?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  where?: InputMaybe<RoleExpression>;
};

export type RoleListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  rolePermission?: InputMaybe<Array<InputMaybe<RolePermissionInput>>>;
  where?: InputMaybe<RoleExpression>;
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

export type RolePermission = Meta & {
  __typename?: 'RolePermission';
  id?: Maybe<Scalars['ID']>;
  roleId?: Maybe<Scalars['Int']>;
  roleIdType?: Maybe<Role>;
  permissionName?: Maybe<Scalars['String']>;
  permissionNameType?: Maybe<Permission>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  permissionNameCount?: Maybe<Scalars['Int']>;
  permissionNameMax?: Maybe<Scalars['String']>;
  permissionNameMin?: Maybe<Scalars['String']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
};


export type RolePermissionRoleIdTypeArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type RolePermissionPermissionNameTypeArgs = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type RolePermissionConnection = {
  __typename?: 'RolePermissionConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RolePermissionEdge>>>;
};

export type RolePermissionConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RolePermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RolePermissionConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RolePermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RolePermissionEdge = {
  __typename?: 'RolePermissionEdge';
  node?: Maybe<RolePermission>;
  cursor?: Maybe<Scalars['ID']>;
};

export type RolePermissionExpression = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
};

export type RolePermissionInput = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  permissionName?: InputMaybe<Scalars['String']>;
  permissionNameType?: InputMaybe<PermissionInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RolePermissionExpression>;
};

export type RolePermissionListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  permissionName?: InputMaybe<Scalars['String']>;
  permissionNameType?: InputMaybe<PermissionInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RolePermissionInput>>>;
  where?: InputMaybe<RolePermissionExpression>;
};

export type RolePermissionListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RolePermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RolePermissionListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RolePermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RolePermissionMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  permissionName?: InputMaybe<Scalars['String']>;
  permissionNameType?: InputMaybe<PermissionInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RolePermissionExpression>;
};

export type RolePermissionOrderBy = {
  id?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
  permissionName?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type RolePermissionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
};

export type RolePermissionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
};

export type RoleQueryArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};

export type RoleSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};

export type Sort =
  | 'ASC'
  | 'DESC';

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

export type Subscription = Meta & {
  __typename?: 'Subscription';
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
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
  userPhones?: Maybe<UserPhones>;
  userPhonesList?: Maybe<Array<Maybe<UserPhones>>>;
  userPhonesConnection?: Maybe<UserPhonesConnection>;
  userGroup?: Maybe<UserGroup>;
  userGroupList?: Maybe<Array<Maybe<UserGroup>>>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  userRole?: Maybe<UserRole>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  groupRole?: Maybe<GroupRole>;
  groupRoleList?: Maybe<Array<Maybe<GroupRole>>>;
  groupRoleConnection?: Maybe<GroupRoleConnection>;
  roleComposite?: Maybe<RoleComposite>;
  roleCompositeList?: Maybe<Array<Maybe<RoleComposite>>>;
  roleCompositeConnection?: Maybe<RoleCompositeConnection>;
  rolePermission?: Maybe<RolePermission>;
  rolePermissionList?: Maybe<Array<Maybe<RolePermission>>>;
  rolePermissionConnection?: Maybe<RolePermissionConnection>;
};


export type SubscriptionUserArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};


export type SubscriptionUserListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionUserConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionRoleArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};


export type SubscriptionRoleListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionRoleConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionGroupArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};


export type SubscriptionGroupListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionGroupConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};


export type SubscriptionRealmListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RealmOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionRealmConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RealmOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionPermissionArgs = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};


export type SubscriptionPermissionListArgs = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionPermissionConnectionArgs = {
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionUserPhonesArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
};


export type SubscriptionUserPhonesListArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionUserPhonesConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionUserGroupArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
};


export type SubscriptionUserGroupListArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionUserGroupConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionUserRoleArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
};


export type SubscriptionUserRoleListArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionUserRoleConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionGroupRoleArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
};


export type SubscriptionGroupRoleListArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionGroupRoleConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionRoleCompositeArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
};


export type SubscriptionRoleCompositeListArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionRoleCompositeConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  compositeIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionRolePermissionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
};


export type SubscriptionRolePermissionListArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RolePermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionRolePermissionConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  permissionName?: InputMaybe<StringExpression>;
  permissionNameType?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RolePermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type TreeStruct = {
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  deep?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['String']>;
};

export type TreeStructExpression = {
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
};

export type TreeStructInput = {
  name?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  deep?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['String']>;
};

/** 用户 */
export type User = NamedStruct & Meta & {
  __typename?: 'User';
  /** ID */
  id?: Maybe<Scalars['ID']>;
  /** 姓名 */
  name: Scalars['String'];
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  /** 姓氏 */
  lastName?: Maybe<Scalars['String']>;
  /** 账号 */
  login: Scalars['String'];
  /** 盐 */
  salt?: Maybe<Scalars['String']>;
  /** 哈希 */
  hash?: Maybe<Scalars['String']>;
  /** 邮箱 */
  email?: Maybe<Scalars['String']>;
  /** 手机号 */
  phones?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** 禁用 */
  disable?: Maybe<Scalars['Boolean']>;
  /** 组 */
  groups?: Maybe<Array<Maybe<Group>>>;
  /** 角色 */
  roles?: Maybe<Array<Maybe<Role>>>;
  /** 租户 */
  realm?: Maybe<Realm>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
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
  lastNameCount?: Maybe<Scalars['Int']>;
  lastNameMax?: Maybe<Scalars['String']>;
  lastNameMin?: Maybe<Scalars['String']>;
  loginCount?: Maybe<Scalars['Int']>;
  loginMax?: Maybe<Scalars['String']>;
  loginMin?: Maybe<Scalars['String']>;
  saltCount?: Maybe<Scalars['Int']>;
  saltMax?: Maybe<Scalars['String']>;
  saltMin?: Maybe<Scalars['String']>;
  hashCount?: Maybe<Scalars['Int']>;
  hashMax?: Maybe<Scalars['String']>;
  hashMin?: Maybe<Scalars['String']>;
  emailCount?: Maybe<Scalars['Int']>;
  emailMax?: Maybe<Scalars['String']>;
  emailMin?: Maybe<Scalars['String']>;
  groupsAggregate?: Maybe<Group>;
  groupsConnection?: Maybe<GroupConnection>;
  rolesAggregate?: Maybe<Role>;
  rolesConnection?: Maybe<RoleConnection>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdSum?: Maybe<Scalars['Int']>;
  realmIdAvg?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['Int']>;
  realmIdMin?: Maybe<Scalars['Int']>;
  userPhones?: Maybe<Array<Maybe<UserPhones>>>;
  userPhonesAggregate?: Maybe<UserPhones>;
  userPhonesConnection?: Maybe<UserPhonesConnection>;
  userGroup?: Maybe<Array<Maybe<UserGroup>>>;
  userGroupAggregate?: Maybe<UserGroup>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  userRole?: Maybe<Array<Maybe<UserRole>>>;
  userRoleAggregate?: Maybe<UserRole>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  syncUserPolicy?: Maybe<Scalars['Boolean']>;
};


/** 用户 */
export type UserPhonesArgs = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Sort>;
};


/** 用户 */
export type UserGroupsArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<GroupOrderBy>;
};


/** 用户 */
export type UserRolesArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<RoleOrderBy>;
};


/** 用户 */
export type UserRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 用户 */
export type UserGroupsAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


/** 用户 */
export type UserGroupsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


/** 用户 */
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
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
};


/** 用户 */
export type UserRolesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
};


/** 用户 */
export type UserUserPhonesAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
};


/** 用户 */
export type UserUserPhonesConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
};


/** 用户 */
export type UserUserGroupAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
};


/** 用户 */
export type UserUserGroupConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
};


/** 用户 */
export type UserUserRoleAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
};


/** 用户 */
export type UserUserRoleConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<UserEdge>>>;
};

export type UserConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  node?: Maybe<User>;
  cursor?: Maybe<Scalars['ID']>;
};

export type UserExpression = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};

export type UserGroup = Meta & {
  __typename?: 'UserGroup';
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['Int']>;
  userIdType?: Maybe<User>;
  groupId?: Maybe<Scalars['Int']>;
  groupIdType?: Maybe<Group>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
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


export type UserGroupUserIdTypeArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type UserGroupGroupIdTypeArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parentId?: InputMaybe<StringExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type UserGroupConnection = {
  __typename?: 'UserGroupConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<UserGroupEdge>>>;
};

export type UserGroupConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserGroupConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserGroupEdge = {
  __typename?: 'UserGroupEdge';
  node?: Maybe<UserGroup>;
  cursor?: Maybe<Scalars['ID']>;
};

export type UserGroupExpression = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
};

export type UserGroupInput = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  groupIdType?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserGroupExpression>;
};

export type UserGroupListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  groupIdType?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  where?: InputMaybe<UserGroupExpression>;
};

export type UserGroupListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserGroupListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserGroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserGroupMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  groupIdType?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserGroupExpression>;
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

export type UserGroupQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
};

export type UserGroupSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  groupIdType?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
};

export type UserInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  login?: InputMaybe<Scalars['String']>;
  salt?: InputMaybe<Scalars['String']>;
  hash?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  disable?: InputMaybe<Scalars['Boolean']>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userPhones?: InputMaybe<Array<InputMaybe<UserPhonesInput>>>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  where?: InputMaybe<UserExpression>;
};

export type UserListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  login?: InputMaybe<Scalars['String']>;
  salt?: InputMaybe<Scalars['String']>;
  hash?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  disable?: InputMaybe<Scalars['Boolean']>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userPhones?: InputMaybe<Array<InputMaybe<UserPhonesInput>>>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  list?: InputMaybe<Array<InputMaybe<UserInput>>>;
  where?: InputMaybe<UserExpression>;
};

export type UserListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  login?: InputMaybe<Scalars['String']>;
  salt?: InputMaybe<Scalars['String']>;
  hash?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  disable?: InputMaybe<Scalars['Boolean']>;
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  userPhones?: InputMaybe<Array<InputMaybe<UserPhonesInput>>>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  userRole?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  where?: InputMaybe<UserExpression>;
};

export type UserOrderBy = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  lastName?: InputMaybe<Sort>;
  login?: InputMaybe<Sort>;
  salt?: InputMaybe<Sort>;
  hash?: InputMaybe<Sort>;
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

export type UserPhones = Meta & {
  __typename?: 'UserPhones';
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['Int']>;
  userIdType?: Maybe<User>;
  phone?: Maybe<Scalars['String']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
  createUserId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  createGroupId?: Maybe<Scalars['String']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  phoneCount?: Maybe<Scalars['Int']>;
  phoneMax?: Maybe<Scalars['String']>;
  phoneMin?: Maybe<Scalars['String']>;
  userIdCount?: Maybe<Scalars['Int']>;
  userIdSum?: Maybe<Scalars['Int']>;
  userIdAvg?: Maybe<Scalars['Int']>;
  userIdMax?: Maybe<Scalars['Int']>;
  userIdMin?: Maybe<Scalars['Int']>;
};


export type UserPhonesUserIdTypeArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type UserPhonesConnection = {
  __typename?: 'UserPhonesConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<UserPhonesEdge>>>;
};

export type UserPhonesConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserPhonesConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserPhonesEdge = {
  __typename?: 'UserPhonesEdge';
  node?: Maybe<UserPhones>;
  cursor?: Maybe<Scalars['ID']>;
};

export type UserPhonesExpression = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
};

export type UserPhonesInput = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  phone?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserPhonesExpression>;
};

export type UserPhonesListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  phone?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<UserPhonesInput>>>;
  where?: InputMaybe<UserPhonesExpression>;
};

export type UserPhonesListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserPhonesListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserPhonesMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  phone?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserPhonesExpression>;
};

export type UserPhonesOrderBy = {
  id?: InputMaybe<Sort>;
  userId?: InputMaybe<Sort>;
  phone?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type UserPhonesQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
};

export type UserPhonesSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  phone?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
};

export type UserQueryArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};

export type UserRole = Meta & {
  __typename?: 'UserRole';
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['Int']>;
  userIdType?: Maybe<User>;
  roleId?: Maybe<Scalars['Int']>;
  roleIdType?: Maybe<Role>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  version?: Maybe<Scalars['Int']>;
  realmId?: Maybe<Scalars['Int']>;
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


export type UserRoleUserIdTypeArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type UserRoleRoleIdTypeArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  rolePermission?: InputMaybe<RolePermissionExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type UserRoleConnection = {
  __typename?: 'UserRoleConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<UserRoleEdge>>>;
};

export type UserRoleConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserRoleConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserRoleEdge = {
  __typename?: 'UserRoleEdge';
  node?: Maybe<UserRole>;
  cursor?: Maybe<Scalars['ID']>;
};

export type UserRoleExpression = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
};

export type UserRoleInput = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserRoleExpression>;
};

export type UserRoleListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  where?: InputMaybe<UserRoleExpression>;
};

export type UserRoleListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserRoleListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserRoleMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  userIdType?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  roleIdType?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserRoleExpression>;
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

export type UserRoleQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
};

export type UserRoleSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  userIdType?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  roleIdType?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
};

export type UserSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  salt?: InputMaybe<StringExpression>;
  hash?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  groups?: InputMaybe<GroupExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  userPhones?: InputMaybe<UserPhonesExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  userRole?: InputMaybe<UserRoleExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
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

export type With = {
  type?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
};
