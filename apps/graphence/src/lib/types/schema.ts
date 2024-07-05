export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
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
  arr?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
};

export type Conditional =
  | 'AND'
  | 'OR';

export type ConditionalExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Conditional>;
  arr?: InputMaybe<Array<InputMaybe<Conditional>>>;
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
  arr?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
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
  arr?: InputMaybe<Array<InputMaybe<Func>>>;
};

/** 组 */
export type Group = Meta & NamedStruct & TreeStruct & {
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
  groupUserRelation?: Maybe<Array<Maybe<GroupUserRelation>>>;
  groupRoleRelation?: Maybe<Array<Maybe<GroupRoleRelation>>>;
  subGroupsAggregate?: Maybe<Group>;
  subGroupsConnection?: Maybe<GroupConnection>;
  usersAggregate?: Maybe<User>;
  usersConnection?: Maybe<UserConnection>;
  rolesAggregate?: Maybe<Role>;
  rolesConnection?: Maybe<RoleConnection>;
  groupUserRelationAggregate?: Maybe<GroupUserRelation>;
  groupUserRelationConnection?: Maybe<GroupUserRelationConnection>;
  groupRoleRelationAggregate?: Maybe<GroupRoleRelation>;
  groupRoleRelationConnection?: Maybe<GroupRoleRelationConnection>;
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
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 组 */
export type GroupRealmArgs = {
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


/** 组 */
export type GroupGroupUserRelationArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 组 */
export type GroupGroupRoleRelationArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 组 */
export type GroupSubGroupsAggregateArgs = {
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 组 */
export type GroupSubGroupsConnectionArgs = {
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 组 */
export type GroupUsersAggregateArgs = {
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 组 */
export type GroupUsersConnectionArgs = {
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 组 */
export type GroupRolesAggregateArgs = {
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 组 */
export type GroupRolesConnectionArgs = {
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 组 */
export type GroupGroupUserRelationAggregateArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 组 */
export type GroupGroupUserRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 组 */
export type GroupGroupRoleRelationAggregateArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 组 */
export type GroupGroupRoleRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
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
  cursor?: Maybe<Scalars['String']>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
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
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
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
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
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
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  input?: InputMaybe<GroupInput>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};

export type GroupRoleRelation = Meta & {
  __typename?: 'GroupRoleRelation';
  id?: Maybe<Scalars['ID']>;
  roleRef?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  groupRef?: Maybe<Scalars['String']>;
  group?: Maybe<Group>;
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
  roleRefCount?: Maybe<Scalars['Int']>;
  roleRefMax?: Maybe<Scalars['String']>;
  roleRefMin?: Maybe<Scalars['String']>;
  groupRefCount?: Maybe<Scalars['Int']>;
  groupRefMax?: Maybe<Scalars['String']>;
  groupRefMin?: Maybe<Scalars['String']>;
};


export type GroupRoleRelationRoleArgs = {
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type GroupRoleRelationGroupArgs = {
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type GroupRoleRelationConnection = {
  __typename?: 'GroupRoleRelationConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<GroupRoleRelationEdge>>>;
};

export type GroupRoleRelationConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupRoleRelationConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupRoleRelationEdge = {
  __typename?: 'GroupRoleRelationEdge';
  node?: Maybe<GroupRoleRelation>;
  cursor?: Maybe<Scalars['String']>;
};

export type GroupRoleRelationExpression = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
};

export type GroupRoleRelationInput = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  groupRef?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<GroupRoleRelationExpression>;
};

export type GroupRoleRelationListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  groupRef?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  where?: InputMaybe<GroupRoleRelationExpression>;
};

export type GroupRoleRelationListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupRoleRelationListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupRoleRelationMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  groupRef?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<GroupRoleRelationInput>;
  where?: InputMaybe<GroupRoleRelationExpression>;
};

export type GroupRoleRelationOrderBy = {
  id?: InputMaybe<Sort>;
  roleRef?: InputMaybe<Sort>;
  groupRef?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type GroupRoleRelationQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
};

export type GroupRoleRelationSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};

export type GroupUserRelation = Meta & {
  __typename?: 'GroupUserRelation';
  id?: Maybe<Scalars['ID']>;
  userRef?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  groupRef?: Maybe<Scalars['String']>;
  group?: Maybe<Group>;
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
  userRefCount?: Maybe<Scalars['Int']>;
  userRefMax?: Maybe<Scalars['String']>;
  userRefMin?: Maybe<Scalars['String']>;
  groupRefCount?: Maybe<Scalars['Int']>;
  groupRefMax?: Maybe<Scalars['String']>;
  groupRefMin?: Maybe<Scalars['String']>;
};


export type GroupUserRelationUserArgs = {
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type GroupUserRelationGroupArgs = {
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type GroupUserRelationConnection = {
  __typename?: 'GroupUserRelationConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<GroupUserRelationEdge>>>;
};

export type GroupUserRelationConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupUserRelationConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupUserRelationEdge = {
  __typename?: 'GroupUserRelationEdge';
  node?: Maybe<GroupUserRelation>;
  cursor?: Maybe<Scalars['String']>;
};

export type GroupUserRelationExpression = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
};

export type GroupUserRelationInput = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  groupRef?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<GroupUserRelationExpression>;
};

export type GroupUserRelationListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  groupRef?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  where?: InputMaybe<GroupUserRelationExpression>;
};

export type GroupUserRelationListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupUserRelationListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupUserRelationMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  groupRef?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<GroupUserRelationInput>;
  where?: InputMaybe<GroupUserRelationExpression>;
};

export type GroupUserRelationOrderBy = {
  id?: InputMaybe<Sort>;
  userRef?: InputMaybe<Sort>;
  groupRef?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type GroupUserRelationQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
};

export type GroupUserRelationSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
};

export type IdExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Scalars['ID']>;
  arr?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
};

export type IntExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Scalars['Int']>;
  arr?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
};

export type Invoke = {
  className?: InputMaybe<Scalars['String']>;
  methodName?: InputMaybe<Scalars['String']>;
  parameters?: InputMaybe<Array<InputMaybe<InvokeParameter>>>;
  returnClassName?: InputMaybe<Scalars['String']>;
  thrownTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  async?: InputMaybe<Scalars['Boolean']>;
};

export type InvokeParameter = {
  name?: InputMaybe<Scalars['String']>;
  className?: InputMaybe<Scalars['String']>;
};

export type JsonSchema = {
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
  items?: InputMaybe<JsonSchema>;
  minItems?: InputMaybe<Scalars['Int']>;
  maxItems?: InputMaybe<Scalars['Int']>;
  uniqueItems?: InputMaybe<Scalars['Boolean']>;
  allOf?: InputMaybe<Array<InputMaybe<JsonSchema>>>;
  anyOf?: InputMaybe<Array<InputMaybe<JsonSchema>>>;
  oneOf?: InputMaybe<Array<InputMaybe<JsonSchema>>>;
  not?: InputMaybe<JsonSchema>;
  properties?: InputMaybe<Array<InputMaybe<Property>>>;
  if?: InputMaybe<JsonSchema>;
  then?: InputMaybe<JsonSchema>;
  else?: InputMaybe<JsonSchema>;
  dependentRequired?: InputMaybe<Array<InputMaybe<Property>>>;
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

export type Mutation = {
  __typename?: 'Mutation';
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
  userPhonesRelation?: Maybe<UserPhonesRelation>;
  userPhonesRelationList?: Maybe<Array<Maybe<UserPhonesRelation>>>;
  groupUserRelation?: Maybe<GroupUserRelation>;
  groupUserRelationList?: Maybe<Array<Maybe<GroupUserRelation>>>;
  roleUserRelation?: Maybe<RoleUserRelation>;
  roleUserRelationList?: Maybe<Array<Maybe<RoleUserRelation>>>;
  groupRoleRelation?: Maybe<GroupRoleRelation>;
  groupRoleRelationList?: Maybe<Array<Maybe<GroupRoleRelation>>>;
  roleCompositeRelation?: Maybe<RoleCompositeRelation>;
  roleCompositeRelationList?: Maybe<Array<Maybe<RoleCompositeRelation>>>;
  permissionRoleRelation?: Maybe<PermissionRoleRelation>;
  permissionRoleRelationList?: Maybe<Array<Maybe<PermissionRoleRelation>>>;
  currentUserUpdate?: Maybe<User>;
  currentUserResetPassword?: Maybe<User>;
  login?: Maybe<Scalars['String']>;
  syncPermissionRoleRelationPolicy?: Maybe<Scalars['Boolean']>;
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
  userPhonesRelation?: InputMaybe<Array<InputMaybe<UserPhonesRelationInput>>>;
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  input?: InputMaybe<UserInput>;
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
  userPhonesRelation?: InputMaybe<Array<InputMaybe<UserPhonesRelationInput>>>;
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
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
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  roleCompositeRelation?: InputMaybe<Array<InputMaybe<RoleCompositeRelationInput>>>;
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  input?: InputMaybe<RoleInput>;
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
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  roleCompositeRelation?: InputMaybe<Array<InputMaybe<RoleCompositeRelationInput>>>;
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
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
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  input?: InputMaybe<GroupInput>;
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
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
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
  input?: InputMaybe<RealmInput>;
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
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  input?: InputMaybe<PermissionInput>;
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
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  list?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  where?: InputMaybe<PermissionExpression>;
};


export type MutationUserPhonesRelationArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  phonesRef?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<UserPhonesRelationInput>;
  where?: InputMaybe<UserPhonesRelationExpression>;
};


export type MutationUserPhonesRelationListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  phonesRef?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<UserPhonesRelationInput>>>;
  where?: InputMaybe<UserPhonesRelationExpression>;
};


export type MutationGroupUserRelationArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  groupRef?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<GroupUserRelationInput>;
  where?: InputMaybe<GroupUserRelationExpression>;
};


export type MutationGroupUserRelationListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  groupRef?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  where?: InputMaybe<GroupUserRelationExpression>;
};


export type MutationRoleUserRelationArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<RoleUserRelationInput>;
  where?: InputMaybe<RoleUserRelationExpression>;
};


export type MutationRoleUserRelationListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  where?: InputMaybe<RoleUserRelationExpression>;
};


export type MutationGroupRoleRelationArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  groupRef?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<GroupRoleRelationInput>;
  where?: InputMaybe<GroupRoleRelationExpression>;
};


export type MutationGroupRoleRelationListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  groupRef?: InputMaybe<Scalars['String']>;
  group?: InputMaybe<GroupInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  where?: InputMaybe<GroupRoleRelationExpression>;
};


export type MutationRoleCompositeRelationArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  compositeRef?: InputMaybe<Scalars['String']>;
  composite?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<RoleCompositeRelationInput>;
  where?: InputMaybe<RoleCompositeRelationExpression>;
};


export type MutationRoleCompositeRelationListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  compositeRef?: InputMaybe<Scalars['String']>;
  composite?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RoleCompositeRelationInput>>>;
  where?: InputMaybe<RoleCompositeRelationExpression>;
};


export type MutationPermissionRoleRelationArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  permissionRef?: InputMaybe<Scalars['String']>;
  permission?: InputMaybe<PermissionInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<PermissionRoleRelationInput>;
  where?: InputMaybe<PermissionRoleRelationExpression>;
};


export type MutationPermissionRoleRelationListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  permissionRef?: InputMaybe<Scalars['String']>;
  permission?: InputMaybe<PermissionInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  where?: InputMaybe<PermissionRoleRelationExpression>;
};


export type MutationCurrentUserUpdateArgs = {
  userInput: UserInput;
};


export type MutationCurrentUserResetPasswordArgs = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSyncPermissionRoleRelationPolicyArgs = {
  roleId?: InputMaybe<Scalars['String']>;
  permissionNameList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  removedPermissionNameList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Mutation_CurrentUserResetPassword_Arguments = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};

export type Mutation_CurrentUserUpdate_Arguments = {
  userInput: UserInput;
};

export type Mutation_Login_Arguments = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation_SyncPermissionRoleRelationPolicy_Arguments = {
  roleId?: InputMaybe<Scalars['String']>;
  permissionNameList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  removedPermissionNameList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type NamedStruct = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type NamedStructExpression = {
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
};

export type NamedStructInput = {
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
  arr?: InputMaybe<Array<InputMaybe<Operator>>>;
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
  permissionRoleRelation?: Maybe<Array<Maybe<PermissionRoleRelation>>>;
  rolesAggregate?: Maybe<Role>;
  rolesConnection?: Maybe<RoleConnection>;
  permissionRoleRelationAggregate?: Maybe<PermissionRoleRelation>;
  permissionRoleRelationConnection?: Maybe<PermissionRoleRelationConnection>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
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
export type PermissionPermissionRoleRelationArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 权限 */
export type PermissionRolesAggregateArgs = {
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 权限 */
export type PermissionRolesConnectionArgs = {
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 权限 */
export type PermissionPermissionRoleRelationAggregateArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 权限 */
export type PermissionPermissionRoleRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  cursor?: Maybe<Scalars['String']>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
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
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  input?: InputMaybe<PermissionInput>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};

export type PermissionRoleRelation = Meta & {
  __typename?: 'PermissionRoleRelation';
  id?: Maybe<Scalars['ID']>;
  roleRef?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  permissionRef?: Maybe<Scalars['String']>;
  permission?: Maybe<Permission>;
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
  roleRefCount?: Maybe<Scalars['Int']>;
  roleRefMax?: Maybe<Scalars['String']>;
  roleRefMin?: Maybe<Scalars['String']>;
  permissionRefCount?: Maybe<Scalars['Int']>;
  permissionRefMax?: Maybe<Scalars['String']>;
  permissionRefMin?: Maybe<Scalars['String']>;
};


export type PermissionRoleRelationRoleArgs = {
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type PermissionRoleRelationPermissionArgs = {
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type PermissionRoleRelationConnection = {
  __typename?: 'PermissionRoleRelationConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<PermissionRoleRelationEdge>>>;
};

export type PermissionRoleRelationConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type PermissionRoleRelationConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type PermissionRoleRelationEdge = {
  __typename?: 'PermissionRoleRelationEdge';
  node?: Maybe<PermissionRoleRelation>;
  cursor?: Maybe<Scalars['String']>;
};

export type PermissionRoleRelationExpression = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
};

export type PermissionRoleRelationInput = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  permissionRef?: InputMaybe<Scalars['String']>;
  permission?: InputMaybe<PermissionInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<PermissionRoleRelationExpression>;
};

export type PermissionRoleRelationListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  permissionRef?: InputMaybe<Scalars['String']>;
  permission?: InputMaybe<PermissionInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  where?: InputMaybe<PermissionRoleRelationExpression>;
};

export type PermissionRoleRelationListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type PermissionRoleRelationListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type PermissionRoleRelationMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  permissionRef?: InputMaybe<Scalars['String']>;
  permission?: InputMaybe<PermissionInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<PermissionRoleRelationInput>;
  where?: InputMaybe<PermissionRoleRelationExpression>;
};

export type PermissionRoleRelationOrderBy = {
  id?: InputMaybe<Sort>;
  roleRef?: InputMaybe<Sort>;
  permissionRef?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type PermissionRoleRelationQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
};

export type PermissionRoleRelationSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  arr?: InputMaybe<Array<InputMaybe<PermissionType>>>;
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
  validation?: InputMaybe<JsonSchema>;
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
  arr?: InputMaybe<Array<InputMaybe<Protocol>>>;
};

export type Query = {
  __typename?: 'Query';
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
  userPhonesRelation?: Maybe<UserPhonesRelation>;
  userPhonesRelationList?: Maybe<Array<Maybe<UserPhonesRelation>>>;
  userPhonesRelationConnection?: Maybe<UserPhonesRelationConnection>;
  groupUserRelation?: Maybe<GroupUserRelation>;
  groupUserRelationList?: Maybe<Array<Maybe<GroupUserRelation>>>;
  groupUserRelationConnection?: Maybe<GroupUserRelationConnection>;
  roleUserRelation?: Maybe<RoleUserRelation>;
  roleUserRelationList?: Maybe<Array<Maybe<RoleUserRelation>>>;
  roleUserRelationConnection?: Maybe<RoleUserRelationConnection>;
  groupRoleRelation?: Maybe<GroupRoleRelation>;
  groupRoleRelationList?: Maybe<Array<Maybe<GroupRoleRelation>>>;
  groupRoleRelationConnection?: Maybe<GroupRoleRelationConnection>;
  roleCompositeRelation?: Maybe<RoleCompositeRelation>;
  roleCompositeRelationList?: Maybe<Array<Maybe<RoleCompositeRelation>>>;
  roleCompositeRelationConnection?: Maybe<RoleCompositeRelationConnection>;
  permissionRoleRelation?: Maybe<PermissionRoleRelation>;
  permissionRoleRelationList?: Maybe<Array<Maybe<PermissionRoleRelation>>>;
  permissionRoleRelationConnection?: Maybe<PermissionRoleRelationConnection>;
  current?: Maybe<CurrentUser>;
  currentUser?: Maybe<User>;
  currentPermissionTypeList?: Maybe<Array<Maybe<Scalars['String']>>>;
  currentPermissionNameListByTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  policyList?: Maybe<Array<Maybe<Policy>>>;
  jsonSchema?: Maybe<Scalars['String']>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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


export type QueryUserPhonesRelationArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
};


export type QueryUserPhonesRelationListArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryUserPhonesRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryGroupUserRelationArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
};


export type QueryGroupUserRelationListArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryGroupUserRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryRoleUserRelationArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
};


export type QueryRoleUserRelationListArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryRoleUserRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryGroupRoleRelationArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
};


export type QueryGroupRoleRelationListArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryGroupRoleRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryRoleCompositeRelationArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
};


export type QueryRoleCompositeRelationListArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryRoleCompositeRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryPermissionRoleRelationArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
};


export type QueryPermissionRoleRelationListArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryPermissionRoleRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryCurrentPermissionNameListByTypesArgs = {
  types?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryJsonSchemaArgs = {
  name?: InputMaybe<Scalars['String']>;
};

export type Query_CurrentPermissionNameListByTypes_Arguments = {
  types?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Query_JsonSchema_Arguments = {
  name?: InputMaybe<Scalars['String']>;
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
  cursor?: Maybe<Scalars['String']>;
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
  input?: InputMaybe<RealmInput>;
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
export type Role = Meta & NamedStruct & {
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
  roleUserRelation?: Maybe<Array<Maybe<RoleUserRelation>>>;
  groupRoleRelation?: Maybe<Array<Maybe<GroupRoleRelation>>>;
  roleCompositeRelation?: Maybe<Array<Maybe<RoleCompositeRelation>>>;
  permissionRoleRelation?: Maybe<Array<Maybe<PermissionRoleRelation>>>;
  usersAggregate?: Maybe<User>;
  usersConnection?: Maybe<UserConnection>;
  groupsAggregate?: Maybe<Group>;
  groupsConnection?: Maybe<GroupConnection>;
  compositesAggregate?: Maybe<Role>;
  compositesConnection?: Maybe<RoleConnection>;
  permissionsAggregate?: Maybe<Permission>;
  permissionsConnection?: Maybe<PermissionConnection>;
  roleUserRelationAggregate?: Maybe<RoleUserRelation>;
  roleUserRelationConnection?: Maybe<RoleUserRelationConnection>;
  groupRoleRelationAggregate?: Maybe<GroupRoleRelation>;
  groupRoleRelationConnection?: Maybe<GroupRoleRelationConnection>;
  roleCompositeRelationAggregate?: Maybe<RoleCompositeRelation>;
  roleCompositeRelationConnection?: Maybe<RoleCompositeRelationConnection>;
  permissionRoleRelationAggregate?: Maybe<PermissionRoleRelation>;
  permissionRoleRelationConnection?: Maybe<PermissionRoleRelationConnection>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['Int']>;
  idMin?: Maybe<Scalars['Int']>;
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  descriptionCount?: Maybe<Scalars['Int']>;
  descriptionMax?: Maybe<Scalars['String']>;
  descriptionMin?: Maybe<Scalars['String']>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
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
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
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
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
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
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 角色 */
export type RoleRealmArgs = {
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


/** 角色 */
export type RoleRoleUserRelationArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 角色 */
export type RoleGroupRoleRelationArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 角色 */
export type RoleRoleCompositeRelationArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 角色 */
export type RolePermissionRoleRelationArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 角色 */
export type RoleUsersAggregateArgs = {
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RoleUsersConnectionArgs = {
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RoleGroupsAggregateArgs = {
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
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RoleGroupsConnectionArgs = {
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
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RoleCompositesAggregateArgs = {
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RoleCompositesConnectionArgs = {
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RolePermissionsAggregateArgs = {
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
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RolePermissionsConnectionArgs = {
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
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RoleRoleUserRelationAggregateArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RoleRoleUserRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RoleGroupRoleRelationAggregateArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RoleGroupRoleRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RoleRoleCompositeRelationAggregateArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RoleRoleCompositeRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RolePermissionRoleRelationAggregateArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 角色 */
export type RolePermissionRoleRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type RoleCompositeRelation = Meta & {
  __typename?: 'RoleCompositeRelation';
  id?: Maybe<Scalars['ID']>;
  roleRef?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  compositeRef?: Maybe<Scalars['String']>;
  composite?: Maybe<Role>;
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
  roleRefCount?: Maybe<Scalars['Int']>;
  roleRefMax?: Maybe<Scalars['String']>;
  roleRefMin?: Maybe<Scalars['String']>;
  compositeRefCount?: Maybe<Scalars['Int']>;
  compositeRefMax?: Maybe<Scalars['String']>;
  compositeRefMin?: Maybe<Scalars['String']>;
};


export type RoleCompositeRelationRoleArgs = {
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type RoleCompositeRelationCompositeArgs = {
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type RoleCompositeRelationConnection = {
  __typename?: 'RoleCompositeRelationConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RoleCompositeRelationEdge>>>;
};

export type RoleCompositeRelationConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleCompositeRelationConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleCompositeRelationEdge = {
  __typename?: 'RoleCompositeRelationEdge';
  node?: Maybe<RoleCompositeRelation>;
  cursor?: Maybe<Scalars['String']>;
};

export type RoleCompositeRelationExpression = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
};

export type RoleCompositeRelationInput = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  compositeRef?: InputMaybe<Scalars['String']>;
  composite?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RoleCompositeRelationExpression>;
};

export type RoleCompositeRelationListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  compositeRef?: InputMaybe<Scalars['String']>;
  composite?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RoleCompositeRelationInput>>>;
  where?: InputMaybe<RoleCompositeRelationExpression>;
};

export type RoleCompositeRelationListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleCompositeRelationListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleCompositeRelationMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  compositeRef?: InputMaybe<Scalars['String']>;
  composite?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<RoleCompositeRelationInput>;
  where?: InputMaybe<RoleCompositeRelationExpression>;
};

export type RoleCompositeRelationOrderBy = {
  id?: InputMaybe<Sort>;
  roleRef?: InputMaybe<Sort>;
  compositeRef?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type RoleCompositeRelationQueryArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
};

export type RoleCompositeRelationSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  cursor?: Maybe<Scalars['String']>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  roleCompositeRelation?: InputMaybe<Array<InputMaybe<RoleCompositeRelationInput>>>;
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
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
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  roleCompositeRelation?: InputMaybe<Array<InputMaybe<RoleCompositeRelationInput>>>;
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  roleCompositeRelation?: InputMaybe<Array<InputMaybe<RoleCompositeRelationInput>>>;
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  input?: InputMaybe<RoleInput>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};

export type RoleUserRelation = Meta & {
  __typename?: 'RoleUserRelation';
  id?: Maybe<Scalars['ID']>;
  userRef?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  roleRef?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
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
  userRefCount?: Maybe<Scalars['Int']>;
  userRefMax?: Maybe<Scalars['String']>;
  userRefMin?: Maybe<Scalars['String']>;
  roleRefCount?: Maybe<Scalars['Int']>;
  roleRefMax?: Maybe<Scalars['String']>;
  roleRefMin?: Maybe<Scalars['String']>;
};


export type RoleUserRelationUserArgs = {
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type RoleUserRelationRoleArgs = {
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type RoleUserRelationConnection = {
  __typename?: 'RoleUserRelationConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RoleUserRelationEdge>>>;
};

export type RoleUserRelationConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleUserRelationConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleUserRelationEdge = {
  __typename?: 'RoleUserRelationEdge';
  node?: Maybe<RoleUserRelation>;
  cursor?: Maybe<Scalars['String']>;
};

export type RoleUserRelationExpression = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
};

export type RoleUserRelationInput = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RoleUserRelationExpression>;
};

export type RoleUserRelationListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  where?: InputMaybe<RoleUserRelationExpression>;
};

export type RoleUserRelationListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleUserRelationListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleUserRelationMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  roleRef?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<RoleUserRelationInput>;
  where?: InputMaybe<RoleUserRelationExpression>;
};

export type RoleUserRelationOrderBy = {
  id?: InputMaybe<Sort>;
  userRef?: InputMaybe<Sort>;
  roleRef?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type RoleUserRelationQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
};

export type RoleUserRelationSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
};

export type Sort =
  | 'ASC'
  | 'DESC';

export type SortExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Sort>;
  arr?: InputMaybe<Array<InputMaybe<Sort>>>;
};

export type StringExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Scalars['String']>;
  arr?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
};

export type Subscription = {
  __typename?: 'Subscription';
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
  userPhonesRelation?: Maybe<UserPhonesRelation>;
  userPhonesRelationList?: Maybe<Array<Maybe<UserPhonesRelation>>>;
  userPhonesRelationConnection?: Maybe<UserPhonesRelationConnection>;
  groupUserRelation?: Maybe<GroupUserRelation>;
  groupUserRelationList?: Maybe<Array<Maybe<GroupUserRelation>>>;
  groupUserRelationConnection?: Maybe<GroupUserRelationConnection>;
  roleUserRelation?: Maybe<RoleUserRelation>;
  roleUserRelationList?: Maybe<Array<Maybe<RoleUserRelation>>>;
  roleUserRelationConnection?: Maybe<RoleUserRelationConnection>;
  groupRoleRelation?: Maybe<GroupRoleRelation>;
  groupRoleRelationList?: Maybe<Array<Maybe<GroupRoleRelation>>>;
  groupRoleRelationConnection?: Maybe<GroupRoleRelationConnection>;
  roleCompositeRelation?: Maybe<RoleCompositeRelation>;
  roleCompositeRelationList?: Maybe<Array<Maybe<RoleCompositeRelation>>>;
  roleCompositeRelationConnection?: Maybe<RoleCompositeRelationConnection>;
  permissionRoleRelation?: Maybe<PermissionRoleRelation>;
  permissionRoleRelationList?: Maybe<Array<Maybe<PermissionRoleRelation>>>;
  permissionRoleRelationConnection?: Maybe<PermissionRoleRelationConnection>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
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
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
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


export type SubscriptionUserPhonesRelationArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
};


export type SubscriptionUserPhonesRelationListArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionUserPhonesRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionGroupUserRelationArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
};


export type SubscriptionGroupUserRelationListArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionGroupUserRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionRoleUserRelationArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
};


export type SubscriptionRoleUserRelationListArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionRoleUserRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionGroupRoleRelationArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
};


export type SubscriptionGroupRoleRelationListArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionGroupRoleRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionRoleCompositeRelationArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
};


export type SubscriptionRoleCompositeRelationListArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionRoleCompositeRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  compositeRef?: InputMaybe<StringExpression>;
  composite?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionPermissionRoleRelationArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
};


export type SubscriptionPermissionRoleRelationListArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionPermissionRoleRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  permissionRef?: InputMaybe<StringExpression>;
  permission?: InputMaybe<PermissionExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
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
};

export type TreeStructInput = {
  name?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  deep?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
};

/** 用户 */
export type User = Meta & NamedStruct & {
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
  userPhonesRelation?: Maybe<Array<Maybe<UserPhonesRelation>>>;
  groupUserRelation?: Maybe<Array<Maybe<GroupUserRelation>>>;
  roleUserRelation?: Maybe<Array<Maybe<RoleUserRelation>>>;
  groupsAggregate?: Maybe<Group>;
  groupsConnection?: Maybe<GroupConnection>;
  rolesAggregate?: Maybe<Role>;
  rolesConnection?: Maybe<RoleConnection>;
  userPhonesRelationAggregate?: Maybe<UserPhonesRelation>;
  userPhonesRelationConnection?: Maybe<UserPhonesRelationConnection>;
  groupUserRelationAggregate?: Maybe<GroupUserRelation>;
  groupUserRelationConnection?: Maybe<GroupUserRelationConnection>;
  roleUserRelationAggregate?: Maybe<RoleUserRelation>;
  roleUserRelationConnection?: Maybe<RoleUserRelationConnection>;
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
  syncUserPolicy?: Maybe<Scalars['Boolean']>;
};


/** 用户 */
export type UserPhonesArgs = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Scalars['String']>;
  arr?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Sort>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
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
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
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
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 用户 */
export type UserRealmArgs = {
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


/** 用户 */
export type UserUserPhonesRelationArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 用户 */
export type UserGroupUserRelationArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 用户 */
export type UserRoleUserRelationArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


/** 用户 */
export type UserGroupsAggregateArgs = {
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
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 用户 */
export type UserGroupsConnectionArgs = {
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
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 用户 */
export type UserRolesAggregateArgs = {
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
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 用户 */
export type UserRolesConnectionArgs = {
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
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 用户 */
export type UserUserPhonesRelationAggregateArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 用户 */
export type UserUserPhonesRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 用户 */
export type UserGroupUserRelationAggregateArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 用户 */
export type UserGroupUserRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  groupRef?: InputMaybe<StringExpression>;
  group?: InputMaybe<GroupExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 用户 */
export type UserRoleUserRelationAggregateArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


/** 用户 */
export type UserRoleUserRelationConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  roleRef?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
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
  cursor?: Maybe<Scalars['String']>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
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
  userPhonesRelation?: InputMaybe<Array<InputMaybe<UserPhonesRelationInput>>>;
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
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
  userPhonesRelation?: InputMaybe<Array<InputMaybe<UserPhonesRelationInput>>>;
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
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
  userPhonesRelation?: InputMaybe<Array<InputMaybe<UserPhonesRelationInput>>>;
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  input?: InputMaybe<UserInput>;
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

export type UserPhonesRelation = Meta & {
  __typename?: 'UserPhonesRelation';
  id?: Maybe<Scalars['ID']>;
  userRef?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  phonesRef?: Maybe<Scalars['String']>;
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
  userRefCount?: Maybe<Scalars['Int']>;
  userRefMax?: Maybe<Scalars['String']>;
  userRefMin?: Maybe<Scalars['String']>;
  phonesRefCount?: Maybe<Scalars['Int']>;
  phonesRefMax?: Maybe<Scalars['String']>;
  phonesRefMin?: Maybe<Scalars['String']>;
};


export type UserPhonesRelationUserArgs = {
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};

export type UserPhonesRelationConnection = {
  __typename?: 'UserPhonesRelationConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<UserPhonesRelationEdge>>>;
};

export type UserPhonesRelationConnectionQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserPhonesRelationConnectionSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserPhonesRelationEdge = {
  __typename?: 'UserPhonesRelationEdge';
  node?: Maybe<UserPhonesRelation>;
  cursor?: Maybe<Scalars['String']>;
};

export type UserPhonesRelationExpression = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
};

export type UserPhonesRelationInput = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  phonesRef?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserPhonesRelationExpression>;
};

export type UserPhonesRelationListMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  phonesRef?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<UserPhonesRelationInput>>>;
  where?: InputMaybe<UserPhonesRelationExpression>;
};

export type UserPhonesRelationListQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserPhonesRelationListSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserPhonesRelationMutationArguments = {
  id?: InputMaybe<Scalars['ID']>;
  userRef?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  phonesRef?: InputMaybe<Scalars['String']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<UserPhonesRelationInput>;
  where?: InputMaybe<UserPhonesRelationExpression>;
};

export type UserPhonesRelationOrderBy = {
  id?: InputMaybe<Sort>;
  userRef?: InputMaybe<Sort>;
  phonesRef?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type UserPhonesRelationQueryArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
};

export type UserPhonesRelationSubscriptionArguments = {
  id?: InputMaybe<StringExpression>;
  userRef?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  phonesRef?: InputMaybe<StringExpression>;
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
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
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
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  not?: InputMaybe<Scalars['Boolean']>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};

export type With = {
  type?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
};
