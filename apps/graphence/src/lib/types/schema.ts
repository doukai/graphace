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
  BigDecimal: number;
  BigInteger: number;
  Date: string;
  DateTime: string;
  Time: string;
  Timestamp: string;
  Upload: string;
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

/** Current */
export type Current = {
  __typename?: 'Current';
  /** ID */
  id?: Maybe<Scalars['String']>;
  /** 姓名 */
  name?: Maybe<Scalars['String']>;
  /** 姓氏 */
  lastName?: Maybe<Scalars['String']>;
  /** 账号 */
  login?: Maybe<Scalars['String']>;
  /** 租户ID */
  realmId?: Maybe<Scalars['Int']>;
  /** 组 */
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** 角色 */
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
  /** 已移除 */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** 版本 */
  version?: Maybe<Scalars['Int']>;
  /** 域 */
  realmId?: Maybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: Maybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: Maybe<Scalars['String']>;
  /** 用户 组 关系 */
  groupUserRelation?: Maybe<Array<Maybe<GroupUserRelation>>>;
  /** 角色 组 关系 */
  groupRoleRelation?: Maybe<Array<Maybe<GroupRoleRelation>>>;
  /** 下级 统计字段 */
  subGroupsAggregate?: Maybe<Group>;
  /** 下级 连接 */
  subGroupsConnection?: Maybe<GroupConnection>;
  /** 用户 统计字段 */
  usersAggregate?: Maybe<User>;
  /** 用户 连接 */
  usersConnection?: Maybe<UserConnection>;
  /** 角色 统计字段 */
  rolesAggregate?: Maybe<Role>;
  /** 角色 连接 */
  rolesConnection?: Maybe<RoleConnection>;
  /** 用户 组 关系 统计字段 */
  groupUserRelationAggregate?: Maybe<GroupUserRelation>;
  /** 用户 组 关系 连接 */
  groupUserRelationConnection?: Maybe<GroupUserRelationConnection>;
  /** 角色 组 关系 统计字段 */
  groupRoleRelationAggregate?: Maybe<GroupRoleRelation>;
  /** 角色 组 关系 连接 */
  groupRoleRelationConnection?: Maybe<GroupRoleRelationConnection>;
  /** 组 数量 */
  idCount?: Maybe<Scalars['Int']>;
  /** ID 最大值 */
  idMax?: Maybe<Scalars['Int']>;
  /** ID 最小值 */
  idMin?: Maybe<Scalars['Int']>;
  /** 名称 数量 */
  nameCount?: Maybe<Scalars['Int']>;
  /** 名称 最大值 */
  nameMax?: Maybe<Scalars['String']>;
  /** 名称 最小值 */
  nameMin?: Maybe<Scalars['String']>;
  /** 描述 数量 */
  descriptionCount?: Maybe<Scalars['Int']>;
  /** 描述 最大值 */
  descriptionMax?: Maybe<Scalars['String']>;
  /** 描述 最小值 */
  descriptionMin?: Maybe<Scalars['String']>;
  /** 路径 数量 */
  pathCount?: Maybe<Scalars['Int']>;
  /** 路径 最大值 */
  pathMax?: Maybe<Scalars['String']>;
  /** 路径 最小值 */
  pathMin?: Maybe<Scalars['String']>;
  /** 上级ID 数量 */
  parentIdCount?: Maybe<Scalars['Int']>;
  /** 上级ID 最大值 */
  parentIdMax?: Maybe<Scalars['String']>;
  /** 上级ID 最小值 */
  parentIdMin?: Maybe<Scalars['String']>;
  /** 层级 数量 */
  deepCount?: Maybe<Scalars['Int']>;
  /** 层级 合计 */
  deepSum?: Maybe<Scalars['Int']>;
  /** 层级 平均值 */
  deepAvg?: Maybe<Scalars['Int']>;
  /** 层级 最大值 */
  deepMax?: Maybe<Scalars['Int']>;
  /** 层级 最小值 */
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

/** 组 连接 */
export type GroupConnection = {
  __typename?: 'GroupConnection';
  /** 条数 */
  totalCount?: Maybe<Scalars['Int']>;
  /** 分页信息 */
  pageInfo?: Maybe<PageInfo>;
  /** 边缘 */
  edges?: Maybe<Array<Maybe<GroupEdge>>>;
};

/** 组连接 查询参数 */
export type GroupConnectionQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 路径 */
  path?: InputMaybe<StringExpression>;
  /** 层级 */
  deep?: InputMaybe<IntExpression>;
  /** 上级ID */
  parentId?: InputMaybe<StringExpression>;
  /** 上级 */
  parent?: InputMaybe<GroupExpression>;
  /** 下级 */
  subGroups?: InputMaybe<GroupExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<GroupOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 组列表 订阅参数 */
export type GroupConnectionSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 路径 */
  path?: InputMaybe<StringExpression>;
  /** 层级 */
  deep?: InputMaybe<IntExpression>;
  /** 上级ID */
  parentId?: InputMaybe<StringExpression>;
  /** 上级 */
  parent?: InputMaybe<GroupExpression>;
  /** 下级 */
  subGroups?: InputMaybe<GroupExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<GroupOrderBy>;
  /** 排序 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 组 边缘 */
export type GroupEdge = {
  __typename?: 'GroupEdge';
  /** 节点 */
  node?: Maybe<Group>;
  /** 游标 */
  cursor?: Maybe<Scalars['String']>;
};

/** 组 查询表达式 */
export type GroupExpression = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 路径 */
  path?: InputMaybe<StringExpression>;
  /** 层级 */
  deep?: InputMaybe<IntExpression>;
  /** 上级ID */
  parentId?: InputMaybe<StringExpression>;
  /** 上级 */
  parent?: InputMaybe<GroupExpression>;
  /** 下级 */
  subGroups?: InputMaybe<GroupExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};

/** 组 查询表达式 */
export type GroupExpressionBase = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 路径 */
  path?: InputMaybe<StringExpression>;
  /** 层级 */
  deep?: InputMaybe<IntExpression>;
  /** 上级ID */
  parentId?: InputMaybe<StringExpression>;
  /** 上级 */
  parent?: InputMaybe<GroupExpression>;
  /** 下级 */
  subGroups?: InputMaybe<GroupExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};

/** 组 变更内容 */
export type GroupInput = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 路径 */
  path?: InputMaybe<Scalars['String']>;
  /** 层级 */
  deep?: InputMaybe<Scalars['Int']>;
  /** 上级ID */
  parentId?: InputMaybe<Scalars['String']>;
  /** 上级 */
  parent?: InputMaybe<GroupInput>;
  /** 下级 */
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 用户 */
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  /** 角色 */
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<GroupExpression>;
};

/** 组 变更内容 */
export type GroupInputBase = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 路径 */
  path?: InputMaybe<Scalars['String']>;
  /** 层级 */
  deep?: InputMaybe<Scalars['Int']>;
  /** 上级ID */
  parentId?: InputMaybe<Scalars['String']>;
  /** 上级 */
  parent?: InputMaybe<GroupInput>;
  /** 下级 */
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 用户 */
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  /** 角色 */
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<GroupExpression>;
};

/** 组列表 变更参数  */
export type GroupListMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 路径 */
  path?: InputMaybe<Scalars['String']>;
  /** 层级 */
  deep?: InputMaybe<Scalars['Int']>;
  /** 上级ID */
  parentId?: InputMaybe<Scalars['String']>;
  /** 上级 */
  parent?: InputMaybe<GroupInput>;
  /** 下级 */
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 用户 */
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  /** 角色 */
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  /** 变更内容列表 */
  list?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<GroupExpression>;
};

/** 组列表 查询参数 */
export type GroupListQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 路径 */
  path?: InputMaybe<StringExpression>;
  /** 层级 */
  deep?: InputMaybe<IntExpression>;
  /** 上级ID */
  parentId?: InputMaybe<StringExpression>;
  /** 上级 */
  parent?: InputMaybe<GroupExpression>;
  /** 下级 */
  subGroups?: InputMaybe<GroupExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<GroupOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 组列表 订阅参数 */
export type GroupListSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 路径 */
  path?: InputMaybe<StringExpression>;
  /** 层级 */
  deep?: InputMaybe<IntExpression>;
  /** 上级ID */
  parentId?: InputMaybe<StringExpression>;
  /** 上级 */
  parent?: InputMaybe<GroupExpression>;
  /** 下级 */
  subGroups?: InputMaybe<GroupExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<GroupOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 变更内容列表 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 组 变更参数 */
export type GroupMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 路径 */
  path?: InputMaybe<Scalars['String']>;
  /** 层级 */
  deep?: InputMaybe<Scalars['Int']>;
  /** 上级ID */
  parentId?: InputMaybe<Scalars['String']>;
  /** 上级 */
  parent?: InputMaybe<GroupInput>;
  /** 下级 */
  subGroups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 用户 */
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  /** 角色 */
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  /** 变更内容 */
  input?: InputMaybe<GroupInput>;
  /** 匹配条件 */
  where?: InputMaybe<GroupExpression>;
};

/** 组 排序 */
export type GroupOrderBy = {
  /** ID */
  id?: InputMaybe<Sort>;
  /** 名称 */
  name?: InputMaybe<Sort>;
  /** 描述 */
  description?: InputMaybe<Sort>;
  /** 路径 */
  path?: InputMaybe<Sort>;
  /** 层级 */
  deep?: InputMaybe<Sort>;
  /** 上级ID */
  parentId?: InputMaybe<Sort>;
  /** 上级 */
  parent?: InputMaybe<GroupOrderBy>;
  /** 下级 */
  subGroups?: InputMaybe<GroupOrderBy>;
  /** 用户 */
  users?: InputMaybe<UserOrderBy>;
  /** 角色 */
  roles?: InputMaybe<RoleOrderBy>;
  /** 租户 */
  realm?: InputMaybe<RealmOrderBy>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Sort>;
  /** 版本 */
  version?: InputMaybe<Sort>;
  /** 域 */
  realmId?: InputMaybe<Sort>;
  /** 创建者 */
  createUserId?: InputMaybe<Sort>;
  /** 创建时间 */
  createTime?: InputMaybe<Sort>;
  /** 更新者 */
  updateUserId?: InputMaybe<Sort>;
  /** 更新时间 */
  updateTime?: InputMaybe<Sort>;
  /** 创建组 */
  createGroupId?: InputMaybe<Sort>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationOrderBy>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationOrderBy>;
  /** 下级 统计字段 */
  subGroupsAggregate?: InputMaybe<GroupOrderBy>;
  /** 用户 统计字段 */
  usersAggregate?: InputMaybe<UserOrderBy>;
  /** 角色 统计字段 */
  rolesAggregate?: InputMaybe<RoleOrderBy>;
  /** 用户 组 关系 统计字段 */
  groupUserRelationAggregate?: InputMaybe<GroupUserRelationOrderBy>;
  /** 角色 组 关系 统计字段 */
  groupRoleRelationAggregate?: InputMaybe<GroupRoleRelationOrderBy>;
  /** 组 数量 */
  idCount?: InputMaybe<Sort>;
  /** ID 最大值 */
  idMax?: InputMaybe<Sort>;
  /** ID 最小值 */
  idMin?: InputMaybe<Sort>;
  /** 名称 数量 */
  nameCount?: InputMaybe<Sort>;
  /** 名称 最大值 */
  nameMax?: InputMaybe<Sort>;
  /** 名称 最小值 */
  nameMin?: InputMaybe<Sort>;
  /** 描述 数量 */
  descriptionCount?: InputMaybe<Sort>;
  /** 描述 最大值 */
  descriptionMax?: InputMaybe<Sort>;
  /** 描述 最小值 */
  descriptionMin?: InputMaybe<Sort>;
  /** 路径 数量 */
  pathCount?: InputMaybe<Sort>;
  /** 路径 最大值 */
  pathMax?: InputMaybe<Sort>;
  /** 路径 最小值 */
  pathMin?: InputMaybe<Sort>;
  /** 上级ID 数量 */
  parentIdCount?: InputMaybe<Sort>;
  /** 上级ID 最大值 */
  parentIdMax?: InputMaybe<Sort>;
  /** 上级ID 最小值 */
  parentIdMin?: InputMaybe<Sort>;
  /** 层级 数量 */
  deepCount?: InputMaybe<Sort>;
  /** 层级 合计 */
  deepSum?: InputMaybe<Sort>;
  /** 层级 平均值 */
  deepAvg?: InputMaybe<Sort>;
  /** 层级 最大值 */
  deepMax?: InputMaybe<Sort>;
  /** 层级 最小值 */
  deepMin?: InputMaybe<Sort>;
};

/** 组 查询参数 */
export type GroupQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 路径 */
  path?: InputMaybe<StringExpression>;
  /** 层级 */
  deep?: InputMaybe<IntExpression>;
  /** 上级ID */
  parentId?: InputMaybe<StringExpression>;
  /** 上级 */
  parent?: InputMaybe<GroupExpression>;
  /** 下级 */
  subGroups?: InputMaybe<GroupExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};

/** 角色 组 关系 */
export type GroupRoleRelation = Meta & {
  __typename?: 'GroupRoleRelation';
  /** ID */
  id?: Maybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: Maybe<Scalars['String']>;
  /** 角色 */
  role?: Maybe<Role>;
  /** 组 引用 */
  groupRef?: Maybe<Scalars['String']>;
  /** 组 */
  group?: Maybe<Group>;
  /** 已移除 */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** 版本 */
  version?: Maybe<Scalars['Int']>;
  /** 域 */
  realmId?: Maybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: Maybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: Maybe<Scalars['String']>;
  /** 角色 组 关系 数量 */
  idCount?: Maybe<Scalars['Int']>;
  /** ID 最大值 */
  idMax?: Maybe<Scalars['Int']>;
  /** ID 最小值 */
  idMin?: Maybe<Scalars['Int']>;
  /** 角色 引用 数量 */
  roleRefCount?: Maybe<Scalars['Int']>;
  /** 角色 引用 最大值 */
  roleRefMax?: Maybe<Scalars['String']>;
  /** 角色 引用 最小值 */
  roleRefMin?: Maybe<Scalars['String']>;
  /** 组 引用 数量 */
  groupRefCount?: Maybe<Scalars['Int']>;
  /** 组 引用 最大值 */
  groupRefMax?: Maybe<Scalars['String']>;
  /** 组 引用 最小值 */
  groupRefMin?: Maybe<Scalars['String']>;
};


/** 角色 组 关系 */
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


/** 角色 组 关系 */
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

/** 角色 组 关系 连接 */
export type GroupRoleRelationConnection = {
  __typename?: 'GroupRoleRelationConnection';
  /** 条数 */
  totalCount?: Maybe<Scalars['Int']>;
  /** 分页信息 */
  pageInfo?: Maybe<PageInfo>;
  /** 边缘 */
  edges?: Maybe<Array<Maybe<GroupRoleRelationEdge>>>;
};

/** 角色 组 关系连接 查询参数 */
export type GroupRoleRelationConnectionQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 组 关系列表 订阅参数 */
export type GroupRoleRelationConnectionSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  /** 排序 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 组 关系 边缘 */
export type GroupRoleRelationEdge = {
  __typename?: 'GroupRoleRelationEdge';
  /** 节点 */
  node?: Maybe<GroupRoleRelation>;
  /** 游标 */
  cursor?: Maybe<Scalars['String']>;
};

/** 角色 组 关系 查询表达式 */
export type GroupRoleRelationExpression = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
};

/** 角色 组 关系 查询表达式 */
export type GroupRoleRelationExpressionBase = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
};

/** 角色 组 关系 变更内容 */
export type GroupRoleRelationInput = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 组 引用 */
  groupRef?: InputMaybe<Scalars['String']>;
  /** 组 */
  group?: InputMaybe<GroupInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<GroupRoleRelationExpression>;
};

/** 角色 组 关系 变更内容 */
export type GroupRoleRelationInputBase = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 组 引用 */
  groupRef?: InputMaybe<Scalars['String']>;
  /** 组 */
  group?: InputMaybe<GroupInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<GroupRoleRelationExpression>;
};

/** 角色 组 关系列表 变更参数  */
export type GroupRoleRelationListMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 组 引用 */
  groupRef?: InputMaybe<Scalars['String']>;
  /** 组 */
  group?: InputMaybe<GroupInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容列表 */
  list?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<GroupRoleRelationExpression>;
};

/** 角色 组 关系列表 查询参数 */
export type GroupRoleRelationListQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 组 关系列表 订阅参数 */
export type GroupRoleRelationListSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<GroupRoleRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 变更内容列表 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 组 关系 变更参数 */
export type GroupRoleRelationMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 组 引用 */
  groupRef?: InputMaybe<Scalars['String']>;
  /** 组 */
  group?: InputMaybe<GroupInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容 */
  input?: InputMaybe<GroupRoleRelationInput>;
  /** 匹配条件 */
  where?: InputMaybe<GroupRoleRelationExpression>;
};

/** 角色 组 关系 排序 */
export type GroupRoleRelationOrderBy = {
  /** ID */
  id?: InputMaybe<Sort>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Sort>;
  /** 角色 */
  role?: InputMaybe<RoleOrderBy>;
  /** 组 引用 */
  groupRef?: InputMaybe<Sort>;
  /** 组 */
  group?: InputMaybe<GroupOrderBy>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Sort>;
  /** 版本 */
  version?: InputMaybe<Sort>;
  /** 域 */
  realmId?: InputMaybe<Sort>;
  /** 创建者 */
  createUserId?: InputMaybe<Sort>;
  /** 创建时间 */
  createTime?: InputMaybe<Sort>;
  /** 更新者 */
  updateUserId?: InputMaybe<Sort>;
  /** 更新时间 */
  updateTime?: InputMaybe<Sort>;
  /** 创建组 */
  createGroupId?: InputMaybe<Sort>;
  /** 角色 组 关系 数量 */
  idCount?: InputMaybe<Sort>;
  /** ID 最大值 */
  idMax?: InputMaybe<Sort>;
  /** ID 最小值 */
  idMin?: InputMaybe<Sort>;
  /** 角色 引用 数量 */
  roleRefCount?: InputMaybe<Sort>;
  /** 角色 引用 最大值 */
  roleRefMax?: InputMaybe<Sort>;
  /** 角色 引用 最小值 */
  roleRefMin?: InputMaybe<Sort>;
  /** 组 引用 数量 */
  groupRefCount?: InputMaybe<Sort>;
  /** 组 引用 最大值 */
  groupRefMax?: InputMaybe<Sort>;
  /** 组 引用 最小值 */
  groupRefMin?: InputMaybe<Sort>;
};

/** 角色 组 关系 查询参数 */
export type GroupRoleRelationQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
};

/** 角色 组 关系 订阅参数 */
export type GroupRoleRelationSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupRoleRelationExpression>>>;
};

/** 组 订阅参数 */
export type GroupSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 路径 */
  path?: InputMaybe<StringExpression>;
  /** 层级 */
  deep?: InputMaybe<IntExpression>;
  /** 上级ID */
  parentId?: InputMaybe<StringExpression>;
  /** 上级 */
  parent?: InputMaybe<GroupExpression>;
  /** 下级 */
  subGroups?: InputMaybe<GroupExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};

/** 用户 组 关系 */
export type GroupUserRelation = Meta & {
  __typename?: 'GroupUserRelation';
  /** ID */
  id?: Maybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: Maybe<Scalars['String']>;
  /** 用户 */
  user?: Maybe<User>;
  /** 组 引用 */
  groupRef?: Maybe<Scalars['String']>;
  /** 组 */
  group?: Maybe<Group>;
  /** 已移除 */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** 版本 */
  version?: Maybe<Scalars['Int']>;
  /** 域 */
  realmId?: Maybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: Maybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: Maybe<Scalars['String']>;
  /** 用户 组 关系 数量 */
  idCount?: Maybe<Scalars['Int']>;
  /** ID 最大值 */
  idMax?: Maybe<Scalars['Int']>;
  /** ID 最小值 */
  idMin?: Maybe<Scalars['Int']>;
  /** 用户 引用 数量 */
  userRefCount?: Maybe<Scalars['Int']>;
  /** 用户 引用 最大值 */
  userRefMax?: Maybe<Scalars['String']>;
  /** 用户 引用 最小值 */
  userRefMin?: Maybe<Scalars['String']>;
  /** 组 引用 数量 */
  groupRefCount?: Maybe<Scalars['Int']>;
  /** 组 引用 最大值 */
  groupRefMax?: Maybe<Scalars['String']>;
  /** 组 引用 最小值 */
  groupRefMin?: Maybe<Scalars['String']>;
};


/** 用户 组 关系 */
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


/** 用户 组 关系 */
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

/** 用户 组 关系 连接 */
export type GroupUserRelationConnection = {
  __typename?: 'GroupUserRelationConnection';
  /** 条数 */
  totalCount?: Maybe<Scalars['Int']>;
  /** 分页信息 */
  pageInfo?: Maybe<PageInfo>;
  /** 边缘 */
  edges?: Maybe<Array<Maybe<GroupUserRelationEdge>>>;
};

/** 用户 组 关系连接 查询参数 */
export type GroupUserRelationConnectionQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 组 关系列表 订阅参数 */
export type GroupUserRelationConnectionSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  /** 排序 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 组 关系 边缘 */
export type GroupUserRelationEdge = {
  __typename?: 'GroupUserRelationEdge';
  /** 节点 */
  node?: Maybe<GroupUserRelation>;
  /** 游标 */
  cursor?: Maybe<Scalars['String']>;
};

/** 用户 组 关系 查询表达式 */
export type GroupUserRelationExpression = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
};

/** 用户 组 关系 查询表达式 */
export type GroupUserRelationExpressionBase = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
};

/** 用户 组 关系 变更内容 */
export type GroupUserRelationInput = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: InputMaybe<Scalars['String']>;
  /** 用户 */
  user?: InputMaybe<UserInput>;
  /** 组 引用 */
  groupRef?: InputMaybe<Scalars['String']>;
  /** 组 */
  group?: InputMaybe<GroupInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<GroupUserRelationExpression>;
};

/** 用户 组 关系 变更内容 */
export type GroupUserRelationInputBase = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: InputMaybe<Scalars['String']>;
  /** 用户 */
  user?: InputMaybe<UserInput>;
  /** 组 引用 */
  groupRef?: InputMaybe<Scalars['String']>;
  /** 组 */
  group?: InputMaybe<GroupInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<GroupUserRelationExpression>;
};

/** 用户 组 关系列表 变更参数  */
export type GroupUserRelationListMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: InputMaybe<Scalars['String']>;
  /** 用户 */
  user?: InputMaybe<UserInput>;
  /** 组 引用 */
  groupRef?: InputMaybe<Scalars['String']>;
  /** 组 */
  group?: InputMaybe<GroupInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容列表 */
  list?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<GroupUserRelationExpression>;
};

/** 用户 组 关系列表 查询参数 */
export type GroupUserRelationListQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 组 关系列表 订阅参数 */
export type GroupUserRelationListSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<GroupUserRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 变更内容列表 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 组 关系 变更参数 */
export type GroupUserRelationMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: InputMaybe<Scalars['String']>;
  /** 用户 */
  user?: InputMaybe<UserInput>;
  /** 组 引用 */
  groupRef?: InputMaybe<Scalars['String']>;
  /** 组 */
  group?: InputMaybe<GroupInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容 */
  input?: InputMaybe<GroupUserRelationInput>;
  /** 匹配条件 */
  where?: InputMaybe<GroupUserRelationExpression>;
};

/** 用户 组 关系 排序 */
export type GroupUserRelationOrderBy = {
  /** ID */
  id?: InputMaybe<Sort>;
  /** 用户 引用 */
  userRef?: InputMaybe<Sort>;
  /** 用户 */
  user?: InputMaybe<UserOrderBy>;
  /** 组 引用 */
  groupRef?: InputMaybe<Sort>;
  /** 组 */
  group?: InputMaybe<GroupOrderBy>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Sort>;
  /** 版本 */
  version?: InputMaybe<Sort>;
  /** 域 */
  realmId?: InputMaybe<Sort>;
  /** 创建者 */
  createUserId?: InputMaybe<Sort>;
  /** 创建时间 */
  createTime?: InputMaybe<Sort>;
  /** 更新者 */
  updateUserId?: InputMaybe<Sort>;
  /** 更新时间 */
  updateTime?: InputMaybe<Sort>;
  /** 创建组 */
  createGroupId?: InputMaybe<Sort>;
  /** 用户 组 关系 数量 */
  idCount?: InputMaybe<Sort>;
  /** ID 最大值 */
  idMax?: InputMaybe<Sort>;
  /** ID 最小值 */
  idMin?: InputMaybe<Sort>;
  /** 用户 引用 数量 */
  userRefCount?: InputMaybe<Sort>;
  /** 用户 引用 最大值 */
  userRefMax?: InputMaybe<Sort>;
  /** 用户 引用 最小值 */
  userRefMin?: InputMaybe<Sort>;
  /** 组 引用 数量 */
  groupRefCount?: InputMaybe<Sort>;
  /** 组 引用 最大值 */
  groupRefMax?: InputMaybe<Sort>;
  /** 组 引用 最小值 */
  groupRefMin?: InputMaybe<Sort>;
};

/** 用户 组 关系 查询参数 */
export type GroupUserRelationQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<GroupUserRelationExpression>>>;
};

/** 用户 组 关系 订阅参数 */
export type GroupUserRelationSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 组 引用 */
  groupRef?: InputMaybe<StringExpression>;
  /** 组 */
  group?: InputMaybe<GroupExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
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
  directiveName?: InputMaybe<Scalars['String']>;
  onField?: InputMaybe<Scalars['Boolean']>;
  onInputValue?: InputMaybe<Scalars['Boolean']>;
  onExpression?: InputMaybe<Scalars['Boolean']>;
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
  /** 已移除 */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** 版本 */
  version?: Maybe<Scalars['Int']>;
  /** 域 */
  realmId?: Maybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: Maybe<Scalars['Timestamp']>;
  /** 创建组 */
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

/** Mutation */
export type Mutation = {
  __typename?: 'Mutation';
  /** 用户 变更接口 */
  user?: Maybe<User>;
  /** 用户列表 变更接口 */
  userList?: Maybe<Array<Maybe<User>>>;
  /** 角色 变更接口 */
  role?: Maybe<Role>;
  /** 角色列表 变更接口 */
  roleList?: Maybe<Array<Maybe<Role>>>;
  /** 组 变更接口 */
  group?: Maybe<Group>;
  /** 组列表 变更接口 */
  groupList?: Maybe<Array<Maybe<Group>>>;
  /** 租户 变更接口 */
  realm?: Maybe<Realm>;
  /** 租户列表 变更接口 */
  realmList?: Maybe<Array<Maybe<Realm>>>;
  /** 权限 变更接口 */
  permission?: Maybe<Permission>;
  /** 权限列表 变更接口 */
  permissionList?: Maybe<Array<Maybe<Permission>>>;
  /** 用户 手机号 关系 变更接口 */
  userPhonesRelation?: Maybe<UserPhonesRelation>;
  /** 用户 手机号 关系列表 变更接口 */
  userPhonesRelationList?: Maybe<Array<Maybe<UserPhonesRelation>>>;
  /** 用户 组 关系 变更接口 */
  groupUserRelation?: Maybe<GroupUserRelation>;
  /** 用户 组 关系列表 变更接口 */
  groupUserRelationList?: Maybe<Array<Maybe<GroupUserRelation>>>;
  /** 用户 角色 关系 变更接口 */
  roleUserRelation?: Maybe<RoleUserRelation>;
  /** 用户 角色 关系列表 变更接口 */
  roleUserRelationList?: Maybe<Array<Maybe<RoleUserRelation>>>;
  /** 角色 组 关系 变更接口 */
  groupRoleRelation?: Maybe<GroupRoleRelation>;
  /** 角色 组 关系列表 变更接口 */
  groupRoleRelationList?: Maybe<Array<Maybe<GroupRoleRelation>>>;
  /** 角色 角色 关系 变更接口 */
  roleCompositeRelation?: Maybe<RoleCompositeRelation>;
  /** 角色 角色 关系列表 变更接口 */
  roleCompositeRelationList?: Maybe<Array<Maybe<RoleCompositeRelation>>>;
  /** 角色 权限 关系 变更接口 */
  permissionRoleRelation?: Maybe<PermissionRoleRelation>;
  /** 角色 权限 关系列表 变更接口 */
  permissionRoleRelationList?: Maybe<Array<Maybe<PermissionRoleRelation>>>;
  currentUserUpdate?: Maybe<User>;
  currentUserResetPassword?: Maybe<User>;
  login?: Maybe<Scalars['String']>;
  syncModelPolicy?: Maybe<Scalars['Boolean']>;
  syncPermissionRoleRelationPolicy?: Maybe<Scalars['Boolean']>;
};


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
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


/** Mutation */
export type MutationCurrentUserUpdateArgs = {
  userInput: UserInput;
};


/** Mutation */
export type MutationCurrentUserResetPasswordArgs = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};


/** Mutation */
export type MutationLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};


/** Mutation */
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

/** Query Expression Input for NamedStruct */
export type NamedStructExpression = {
  /** name */
  name?: InputMaybe<StringExpression>;
  /** description */
  description?: InputMaybe<StringExpression>;
  /** Include Deprecated */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** version */
  version?: InputMaybe<IntExpression>;
  /** realmId */
  realmId?: InputMaybe<IntExpression>;
  /** createUserId */
  createUserId?: InputMaybe<StringExpression>;
  /** createTime */
  createTime?: InputMaybe<StringExpression>;
  /** updateUserId */
  updateUserId?: InputMaybe<StringExpression>;
  /** updateTime */
  updateTime?: InputMaybe<StringExpression>;
  /** createGroupId */
  createGroupId?: InputMaybe<StringExpression>;
  /** Not */
  not?: InputMaybe<Scalars['Boolean']>;
  /** Condition */
  cond?: InputMaybe<Conditional>;
};

/** Mutation Input for NamedStruct */
export type NamedStructInput = {
  /** name */
  name?: InputMaybe<Scalars['String']>;
  /** description */
  description?: InputMaybe<Scalars['String']>;
  /** Is Deprecated */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** version */
  version?: InputMaybe<Scalars['Int']>;
  /** realmId */
  realmId?: InputMaybe<Scalars['Int']>;
  /** createUserId */
  createUserId?: InputMaybe<Scalars['String']>;
  /** createTime */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** updateUserId */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** updateTime */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** createGroupId */
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
  /** 已移除 */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** 版本 */
  version?: Maybe<Scalars['Int']>;
  /** 域 */
  realmId?: Maybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: Maybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: Maybe<Scalars['String']>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: Maybe<Array<Maybe<PermissionRoleRelation>>>;
  /** 角色 统计字段 */
  rolesAggregate?: Maybe<Role>;
  /** 角色 连接 */
  rolesConnection?: Maybe<RoleConnection>;
  /** 角色 权限 关系 统计字段 */
  permissionRoleRelationAggregate?: Maybe<PermissionRoleRelation>;
  /** 角色 权限 关系 连接 */
  permissionRoleRelationConnection?: Maybe<PermissionRoleRelationConnection>;
  /** 权限 数量 */
  nameCount?: Maybe<Scalars['Int']>;
  /** 名称 最大值 */
  nameMax?: Maybe<Scalars['String']>;
  /** 名称 最小值 */
  nameMin?: Maybe<Scalars['String']>;
  /** 描述 数量 */
  descriptionCount?: Maybe<Scalars['Int']>;
  /** 描述 最大值 */
  descriptionMax?: Maybe<Scalars['String']>;
  /** 描述 最小值 */
  descriptionMin?: Maybe<Scalars['String']>;
  /** 字段 数量 */
  fieldCount?: Maybe<Scalars['Int']>;
  /** 字段 最大值 */
  fieldMax?: Maybe<Scalars['String']>;
  /** 字段 最小值 */
  fieldMin?: Maybe<Scalars['String']>;
  /** 实体 数量 */
  typeCount?: Maybe<Scalars['Int']>;
  /** 实体 最大值 */
  typeMax?: Maybe<Scalars['String']>;
  /** 实体 最小值 */
  typeMin?: Maybe<Scalars['String']>;
  /** 权限类型 数量 */
  permissionTypeCount?: Maybe<Scalars['Int']>;
  /** 权限类型 最大值 */
  permissionTypeMax?: Maybe<PermissionType>;
  /** 权限类型 最小值 */
  permissionTypeMin?: Maybe<PermissionType>;
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

/** 权限 连接 */
export type PermissionConnection = {
  __typename?: 'PermissionConnection';
  /** 条数 */
  totalCount?: Maybe<Scalars['Int']>;
  /** 分页信息 */
  pageInfo?: Maybe<PageInfo>;
  /** 边缘 */
  edges?: Maybe<Array<Maybe<PermissionEdge>>>;
};

/** 权限连接 查询参数 */
export type PermissionConnectionQueryArguments = {
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 字段 */
  field?: InputMaybe<StringExpression>;
  /** 实体 */
  type?: InputMaybe<StringExpression>;
  /** 权限类型 */
  permissionType?: InputMaybe<PermissionTypeExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<PermissionOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 权限列表 订阅参数 */
export type PermissionConnectionSubscriptionArguments = {
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 字段 */
  field?: InputMaybe<StringExpression>;
  /** 实体 */
  type?: InputMaybe<StringExpression>;
  /** 权限类型 */
  permissionType?: InputMaybe<PermissionTypeExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<PermissionOrderBy>;
  /** 排序 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 权限 边缘 */
export type PermissionEdge = {
  __typename?: 'PermissionEdge';
  /** 节点 */
  node?: Maybe<Permission>;
  /** 游标 */
  cursor?: Maybe<Scalars['String']>;
};

/** 权限 查询表达式 */
export type PermissionExpression = {
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 字段 */
  field?: InputMaybe<StringExpression>;
  /** 实体 */
  type?: InputMaybe<StringExpression>;
  /** 权限类型 */
  permissionType?: InputMaybe<PermissionTypeExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};

/** 权限 查询表达式 */
export type PermissionExpressionBase = {
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 字段 */
  field?: InputMaybe<StringExpression>;
  /** 实体 */
  type?: InputMaybe<StringExpression>;
  /** 权限类型 */
  permissionType?: InputMaybe<PermissionTypeExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};

/** 权限 变更内容 */
export type PermissionInput = {
  /** 名称 */
  name?: InputMaybe<Scalars['ID']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 字段 */
  field?: InputMaybe<Scalars['String']>;
  /** 实体 */
  type?: InputMaybe<Scalars['String']>;
  /** 权限类型 */
  permissionType?: InputMaybe<PermissionType>;
  /** 角色 */
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<PermissionExpression>;
};

/** 权限 变更内容 */
export type PermissionInputBase = {
  /** 名称 */
  name?: InputMaybe<Scalars['ID']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 字段 */
  field?: InputMaybe<Scalars['String']>;
  /** 实体 */
  type?: InputMaybe<Scalars['String']>;
  /** 权限类型 */
  permissionType?: InputMaybe<PermissionType>;
  /** 角色 */
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<PermissionExpression>;
};

/** 权限列表 变更参数  */
export type PermissionListMutationArguments = {
  /** 名称 */
  name?: InputMaybe<Scalars['ID']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 字段 */
  field?: InputMaybe<Scalars['String']>;
  /** 实体 */
  type?: InputMaybe<Scalars['String']>;
  /** 权限类型 */
  permissionType?: InputMaybe<PermissionType>;
  /** 角色 */
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  /** 变更内容列表 */
  list?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<PermissionExpression>;
};

/** 权限列表 查询参数 */
export type PermissionListQueryArguments = {
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 字段 */
  field?: InputMaybe<StringExpression>;
  /** 实体 */
  type?: InputMaybe<StringExpression>;
  /** 权限类型 */
  permissionType?: InputMaybe<PermissionTypeExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<PermissionOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 权限列表 订阅参数 */
export type PermissionListSubscriptionArguments = {
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 字段 */
  field?: InputMaybe<StringExpression>;
  /** 实体 */
  type?: InputMaybe<StringExpression>;
  /** 权限类型 */
  permissionType?: InputMaybe<PermissionTypeExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<PermissionOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 变更内容列表 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 权限 变更参数 */
export type PermissionMutationArguments = {
  /** 名称 */
  name?: InputMaybe<Scalars['ID']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 字段 */
  field?: InputMaybe<Scalars['String']>;
  /** 实体 */
  type?: InputMaybe<Scalars['String']>;
  /** 权限类型 */
  permissionType?: InputMaybe<PermissionType>;
  /** 角色 */
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  /** 变更内容 */
  input?: InputMaybe<PermissionInput>;
  /** 匹配条件 */
  where?: InputMaybe<PermissionExpression>;
};

/** 权限 排序 */
export type PermissionOrderBy = {
  /** 名称 */
  name?: InputMaybe<Sort>;
  /** 描述 */
  description?: InputMaybe<Sort>;
  /** 字段 */
  field?: InputMaybe<Sort>;
  /** 实体 */
  type?: InputMaybe<Sort>;
  /** 权限类型 */
  permissionType?: InputMaybe<Sort>;
  /** 角色 */
  roles?: InputMaybe<RoleOrderBy>;
  /** 租户 */
  realm?: InputMaybe<RealmOrderBy>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Sort>;
  /** 版本 */
  version?: InputMaybe<Sort>;
  /** 域 */
  realmId?: InputMaybe<Sort>;
  /** 创建者 */
  createUserId?: InputMaybe<Sort>;
  /** 创建时间 */
  createTime?: InputMaybe<Sort>;
  /** 更新者 */
  updateUserId?: InputMaybe<Sort>;
  /** 更新时间 */
  updateTime?: InputMaybe<Sort>;
  /** 创建组 */
  createGroupId?: InputMaybe<Sort>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationOrderBy>;
  /** 角色 统计字段 */
  rolesAggregate?: InputMaybe<RoleOrderBy>;
  /** 角色 权限 关系 统计字段 */
  permissionRoleRelationAggregate?: InputMaybe<PermissionRoleRelationOrderBy>;
  /** 权限 数量 */
  nameCount?: InputMaybe<Sort>;
  /** 名称 最大值 */
  nameMax?: InputMaybe<Sort>;
  /** 名称 最小值 */
  nameMin?: InputMaybe<Sort>;
  /** 描述 数量 */
  descriptionCount?: InputMaybe<Sort>;
  /** 描述 最大值 */
  descriptionMax?: InputMaybe<Sort>;
  /** 描述 最小值 */
  descriptionMin?: InputMaybe<Sort>;
  /** 字段 数量 */
  fieldCount?: InputMaybe<Sort>;
  /** 字段 最大值 */
  fieldMax?: InputMaybe<Sort>;
  /** 字段 最小值 */
  fieldMin?: InputMaybe<Sort>;
  /** 实体 数量 */
  typeCount?: InputMaybe<Sort>;
  /** 实体 最大值 */
  typeMax?: InputMaybe<Sort>;
  /** 实体 最小值 */
  typeMin?: InputMaybe<Sort>;
  /** 权限类型 数量 */
  permissionTypeCount?: InputMaybe<Sort>;
  /** 权限类型 最大值 */
  permissionTypeMax?: InputMaybe<Sort>;
  /** 权限类型 最小值 */
  permissionTypeMin?: InputMaybe<Sort>;
};

/** 权限 查询参数 */
export type PermissionQueryArguments = {
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 字段 */
  field?: InputMaybe<StringExpression>;
  /** 实体 */
  type?: InputMaybe<StringExpression>;
  /** 权限类型 */
  permissionType?: InputMaybe<PermissionTypeExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};

/** 角色 权限 关系 */
export type PermissionRoleRelation = Meta & {
  __typename?: 'PermissionRoleRelation';
  /** ID */
  id?: Maybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: Maybe<Scalars['String']>;
  /** 角色 */
  role?: Maybe<Role>;
  /** 权限 引用 */
  permissionRef?: Maybe<Scalars['String']>;
  /** 权限 */
  permission?: Maybe<Permission>;
  /** 已移除 */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** 版本 */
  version?: Maybe<Scalars['Int']>;
  /** 域 */
  realmId?: Maybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: Maybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: Maybe<Scalars['String']>;
  /** 角色 权限 关系 数量 */
  idCount?: Maybe<Scalars['Int']>;
  /** ID 最大值 */
  idMax?: Maybe<Scalars['Int']>;
  /** ID 最小值 */
  idMin?: Maybe<Scalars['Int']>;
  /** 角色 引用 数量 */
  roleRefCount?: Maybe<Scalars['Int']>;
  /** 角色 引用 最大值 */
  roleRefMax?: Maybe<Scalars['String']>;
  /** 角色 引用 最小值 */
  roleRefMin?: Maybe<Scalars['String']>;
  /** 权限 引用 数量 */
  permissionRefCount?: Maybe<Scalars['Int']>;
  /** 权限 引用 最大值 */
  permissionRefMax?: Maybe<Scalars['String']>;
  /** 权限 引用 最小值 */
  permissionRefMin?: Maybe<Scalars['String']>;
};


/** 角色 权限 关系 */
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


/** 角色 权限 关系 */
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

/** 角色 权限 关系 连接 */
export type PermissionRoleRelationConnection = {
  __typename?: 'PermissionRoleRelationConnection';
  /** 条数 */
  totalCount?: Maybe<Scalars['Int']>;
  /** 分页信息 */
  pageInfo?: Maybe<PageInfo>;
  /** 边缘 */
  edges?: Maybe<Array<Maybe<PermissionRoleRelationEdge>>>;
};

/** 角色 权限 关系连接 查询参数 */
export type PermissionRoleRelationConnectionQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<StringExpression>;
  /** 权限 */
  permission?: InputMaybe<PermissionExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 权限 关系列表 订阅参数 */
export type PermissionRoleRelationConnectionSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<StringExpression>;
  /** 权限 */
  permission?: InputMaybe<PermissionExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  /** 排序 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 权限 关系 边缘 */
export type PermissionRoleRelationEdge = {
  __typename?: 'PermissionRoleRelationEdge';
  /** 节点 */
  node?: Maybe<PermissionRoleRelation>;
  /** 游标 */
  cursor?: Maybe<Scalars['String']>;
};

/** 角色 权限 关系 查询表达式 */
export type PermissionRoleRelationExpression = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<StringExpression>;
  /** 权限 */
  permission?: InputMaybe<PermissionExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
};

/** 角色 权限 关系 查询表达式 */
export type PermissionRoleRelationExpressionBase = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<StringExpression>;
  /** 权限 */
  permission?: InputMaybe<PermissionExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
};

/** 角色 权限 关系 变更内容 */
export type PermissionRoleRelationInput = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<Scalars['String']>;
  /** 权限 */
  permission?: InputMaybe<PermissionInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<PermissionRoleRelationExpression>;
};

/** 角色 权限 关系 变更内容 */
export type PermissionRoleRelationInputBase = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<Scalars['String']>;
  /** 权限 */
  permission?: InputMaybe<PermissionInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<PermissionRoleRelationExpression>;
};

/** 角色 权限 关系列表 变更参数  */
export type PermissionRoleRelationListMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<Scalars['String']>;
  /** 权限 */
  permission?: InputMaybe<PermissionInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容列表 */
  list?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<PermissionRoleRelationExpression>;
};

/** 角色 权限 关系列表 查询参数 */
export type PermissionRoleRelationListQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<StringExpression>;
  /** 权限 */
  permission?: InputMaybe<PermissionExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 权限 关系列表 订阅参数 */
export type PermissionRoleRelationListSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<StringExpression>;
  /** 权限 */
  permission?: InputMaybe<PermissionExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<PermissionRoleRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 变更内容列表 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 权限 关系 变更参数 */
export type PermissionRoleRelationMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<Scalars['String']>;
  /** 权限 */
  permission?: InputMaybe<PermissionInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容 */
  input?: InputMaybe<PermissionRoleRelationInput>;
  /** 匹配条件 */
  where?: InputMaybe<PermissionRoleRelationExpression>;
};

/** 角色 权限 关系 排序 */
export type PermissionRoleRelationOrderBy = {
  /** ID */
  id?: InputMaybe<Sort>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Sort>;
  /** 角色 */
  role?: InputMaybe<RoleOrderBy>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<Sort>;
  /** 权限 */
  permission?: InputMaybe<PermissionOrderBy>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Sort>;
  /** 版本 */
  version?: InputMaybe<Sort>;
  /** 域 */
  realmId?: InputMaybe<Sort>;
  /** 创建者 */
  createUserId?: InputMaybe<Sort>;
  /** 创建时间 */
  createTime?: InputMaybe<Sort>;
  /** 更新者 */
  updateUserId?: InputMaybe<Sort>;
  /** 更新时间 */
  updateTime?: InputMaybe<Sort>;
  /** 创建组 */
  createGroupId?: InputMaybe<Sort>;
  /** 角色 权限 关系 数量 */
  idCount?: InputMaybe<Sort>;
  /** ID 最大值 */
  idMax?: InputMaybe<Sort>;
  /** ID 最小值 */
  idMin?: InputMaybe<Sort>;
  /** 角色 引用 数量 */
  roleRefCount?: InputMaybe<Sort>;
  /** 角色 引用 最大值 */
  roleRefMax?: InputMaybe<Sort>;
  /** 角色 引用 最小值 */
  roleRefMin?: InputMaybe<Sort>;
  /** 权限 引用 数量 */
  permissionRefCount?: InputMaybe<Sort>;
  /** 权限 引用 最大值 */
  permissionRefMax?: InputMaybe<Sort>;
  /** 权限 引用 最小值 */
  permissionRefMin?: InputMaybe<Sort>;
};

/** 角色 权限 关系 查询参数 */
export type PermissionRoleRelationQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<StringExpression>;
  /** 权限 */
  permission?: InputMaybe<PermissionExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
};

/** 角色 权限 关系 订阅参数 */
export type PermissionRoleRelationSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 权限 引用 */
  permissionRef?: InputMaybe<StringExpression>;
  /** 权限 */
  permission?: InputMaybe<PermissionExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionRoleRelationExpression>>>;
};

/** 权限 订阅参数 */
export type PermissionSubscriptionArguments = {
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 字段 */
  field?: InputMaybe<StringExpression>;
  /** 实体 */
  type?: InputMaybe<StringExpression>;
  /** 权限类型 */
  permissionType?: InputMaybe<PermissionTypeExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};

/** 权限类型 */
export type PermissionType =
  /** 读取 */
  | 'READ'
  /** 写入 */
  | 'WRITE';

/** 权限类型 查询表达式 */
export type PermissionTypeExpression = {
  /** 条件 */
  opr?: InputMaybe<Operator>;
  /** 值 */
  val?: InputMaybe<PermissionType>;
  /** 组 */
  arr?: InputMaybe<Array<InputMaybe<PermissionType>>>;
};

/** Policy */
export type Policy = {
  __typename?: 'Policy';
  id?: Maybe<Scalars['String']>;
  policy?: Maybe<Scalars['String']>;
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

/** Query */
export type Query = {
  __typename?: 'Query';
  /** 用户 查询接口 */
  user?: Maybe<User>;
  /** 用户列表 查询接口 */
  userList?: Maybe<Array<Maybe<User>>>;
  /** 用户连接 查询接口 */
  userConnection?: Maybe<UserConnection>;
  /** 角色 查询接口 */
  role?: Maybe<Role>;
  /** 角色列表 查询接口 */
  roleList?: Maybe<Array<Maybe<Role>>>;
  /** 角色连接 查询接口 */
  roleConnection?: Maybe<RoleConnection>;
  /** 组 查询接口 */
  group?: Maybe<Group>;
  /** 组列表 查询接口 */
  groupList?: Maybe<Array<Maybe<Group>>>;
  /** 组连接 查询接口 */
  groupConnection?: Maybe<GroupConnection>;
  /** 租户 查询接口 */
  realm?: Maybe<Realm>;
  /** 租户列表 查询接口 */
  realmList?: Maybe<Array<Maybe<Realm>>>;
  /** 租户连接 查询接口 */
  realmConnection?: Maybe<RealmConnection>;
  /** 权限 查询接口 */
  permission?: Maybe<Permission>;
  /** 权限列表 查询接口 */
  permissionList?: Maybe<Array<Maybe<Permission>>>;
  /** 权限连接 查询接口 */
  permissionConnection?: Maybe<PermissionConnection>;
  /** 用户 手机号 关系 查询接口 */
  userPhonesRelation?: Maybe<UserPhonesRelation>;
  /** 用户 手机号 关系列表 查询接口 */
  userPhonesRelationList?: Maybe<Array<Maybe<UserPhonesRelation>>>;
  /** 用户 手机号 关系连接 查询接口 */
  userPhonesRelationConnection?: Maybe<UserPhonesRelationConnection>;
  /** 用户 组 关系 查询接口 */
  groupUserRelation?: Maybe<GroupUserRelation>;
  /** 用户 组 关系列表 查询接口 */
  groupUserRelationList?: Maybe<Array<Maybe<GroupUserRelation>>>;
  /** 用户 组 关系连接 查询接口 */
  groupUserRelationConnection?: Maybe<GroupUserRelationConnection>;
  /** 用户 角色 关系 查询接口 */
  roleUserRelation?: Maybe<RoleUserRelation>;
  /** 用户 角色 关系列表 查询接口 */
  roleUserRelationList?: Maybe<Array<Maybe<RoleUserRelation>>>;
  /** 用户 角色 关系连接 查询接口 */
  roleUserRelationConnection?: Maybe<RoleUserRelationConnection>;
  /** 角色 组 关系 查询接口 */
  groupRoleRelation?: Maybe<GroupRoleRelation>;
  /** 角色 组 关系列表 查询接口 */
  groupRoleRelationList?: Maybe<Array<Maybe<GroupRoleRelation>>>;
  /** 角色 组 关系连接 查询接口 */
  groupRoleRelationConnection?: Maybe<GroupRoleRelationConnection>;
  /** 角色 角色 关系 查询接口 */
  roleCompositeRelation?: Maybe<RoleCompositeRelation>;
  /** 角色 角色 关系列表 查询接口 */
  roleCompositeRelationList?: Maybe<Array<Maybe<RoleCompositeRelation>>>;
  /** 角色 角色 关系连接 查询接口 */
  roleCompositeRelationConnection?: Maybe<RoleCompositeRelationConnection>;
  /** 角色 权限 关系 查询接口 */
  permissionRoleRelation?: Maybe<PermissionRoleRelation>;
  /** 角色 权限 关系列表 查询接口 */
  permissionRoleRelationList?: Maybe<Array<Maybe<PermissionRoleRelation>>>;
  /** 角色 权限 关系连接 查询接口 */
  permissionRoleRelationConnection?: Maybe<PermissionRoleRelationConnection>;
  current?: Maybe<Current>;
  currentUser?: Maybe<User>;
  currentPermissionTypeList?: Maybe<Array<Maybe<Scalars['String']>>>;
  currentPermissionNameListByTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  policyList?: Maybe<Array<Maybe<Policy>>>;
  jsonSchema?: Maybe<Scalars['String']>;
};


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
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


/** Query */
export type QueryCurrentPermissionNameListByTypesArgs = {
  types?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Query */
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
export type Realm = NamedStruct & Meta & {
  __typename?: 'Realm';
  /** ID */
  id?: Maybe<Scalars['ID']>;
  /** 名称 */
  name: Scalars['String'];
  /** 描述 */
  description?: Maybe<Scalars['String']>;
  /** 已移除 */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** 版本 */
  version?: Maybe<Scalars['Int']>;
  /** 域 */
  realmId?: Maybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: Maybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: Maybe<Scalars['String']>;
  /** 租户 数量 */
  idCount?: Maybe<Scalars['Int']>;
  /** ID 最大值 */
  idMax?: Maybe<Scalars['Int']>;
  /** ID 最小值 */
  idMin?: Maybe<Scalars['Int']>;
  /** 名称 数量 */
  nameCount?: Maybe<Scalars['Int']>;
  /** 名称 最大值 */
  nameMax?: Maybe<Scalars['String']>;
  /** 名称 最小值 */
  nameMin?: Maybe<Scalars['String']>;
  /** 描述 数量 */
  descriptionCount?: Maybe<Scalars['Int']>;
  /** 描述 最大值 */
  descriptionMax?: Maybe<Scalars['String']>;
  /** 描述 最小值 */
  descriptionMin?: Maybe<Scalars['String']>;
};

/** 租户 连接 */
export type RealmConnection = {
  __typename?: 'RealmConnection';
  /** 条数 */
  totalCount?: Maybe<Scalars['Int']>;
  /** 分页信息 */
  pageInfo?: Maybe<PageInfo>;
  /** 边缘 */
  edges?: Maybe<Array<Maybe<RealmEdge>>>;
};

/** 租户连接 查询参数 */
export type RealmConnectionQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RealmOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 租户列表 订阅参数 */
export type RealmConnectionSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RealmOrderBy>;
  /** 排序 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 租户 边缘 */
export type RealmEdge = {
  __typename?: 'RealmEdge';
  /** 节点 */
  node?: Maybe<Realm>;
  /** 游标 */
  cursor?: Maybe<Scalars['String']>;
};

/** 租户 查询表达式 */
export type RealmExpression = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};

/** 租户 查询表达式 */
export type RealmExpressionBase = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};

/** 租户 变更内容 */
export type RealmInput = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<RealmExpression>;
};

/** 租户 变更内容 */
export type RealmInputBase = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<RealmExpression>;
};

/** 租户列表 变更参数  */
export type RealmListMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容列表 */
  list?: InputMaybe<Array<InputMaybe<RealmInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<RealmExpression>;
};

/** 租户列表 查询参数 */
export type RealmListQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RealmOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 租户列表 订阅参数 */
export type RealmListSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RealmOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 变更内容列表 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 租户 变更参数 */
export type RealmMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容 */
  input?: InputMaybe<RealmInput>;
  /** 匹配条件 */
  where?: InputMaybe<RealmExpression>;
};

/** 租户 排序 */
export type RealmOrderBy = {
  /** ID */
  id?: InputMaybe<Sort>;
  /** 名称 */
  name?: InputMaybe<Sort>;
  /** 描述 */
  description?: InputMaybe<Sort>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Sort>;
  /** 版本 */
  version?: InputMaybe<Sort>;
  /** 域 */
  realmId?: InputMaybe<Sort>;
  /** 创建者 */
  createUserId?: InputMaybe<Sort>;
  /** 创建时间 */
  createTime?: InputMaybe<Sort>;
  /** 更新者 */
  updateUserId?: InputMaybe<Sort>;
  /** 更新时间 */
  updateTime?: InputMaybe<Sort>;
  /** 创建组 */
  createGroupId?: InputMaybe<Sort>;
  /** 租户 数量 */
  idCount?: InputMaybe<Sort>;
  /** ID 最大值 */
  idMax?: InputMaybe<Sort>;
  /** ID 最小值 */
  idMin?: InputMaybe<Sort>;
  /** 名称 数量 */
  nameCount?: InputMaybe<Sort>;
  /** 名称 最大值 */
  nameMax?: InputMaybe<Sort>;
  /** 名称 最小值 */
  nameMin?: InputMaybe<Sort>;
  /** 描述 数量 */
  descriptionCount?: InputMaybe<Sort>;
  /** 描述 最大值 */
  descriptionMax?: InputMaybe<Sort>;
  /** 描述 最小值 */
  descriptionMin?: InputMaybe<Sort>;
};

/** 租户 查询参数 */
export type RealmQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};

/** 租户 订阅参数 */
export type RealmSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
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
  /** 已移除 */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** 版本 */
  version?: Maybe<Scalars['Int']>;
  /** 域 */
  realmId?: Maybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: Maybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: Maybe<Scalars['String']>;
  /** 用户 角色 关系 */
  roleUserRelation?: Maybe<Array<Maybe<RoleUserRelation>>>;
  /** 角色 组 关系 */
  groupRoleRelation?: Maybe<Array<Maybe<GroupRoleRelation>>>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: Maybe<Array<Maybe<RoleCompositeRelation>>>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: Maybe<Array<Maybe<PermissionRoleRelation>>>;
  /** 用户 统计字段 */
  usersAggregate?: Maybe<User>;
  /** 用户 连接 */
  usersConnection?: Maybe<UserConnection>;
  /** 组 统计字段 */
  groupsAggregate?: Maybe<Group>;
  /** 组 连接 */
  groupsConnection?: Maybe<GroupConnection>;
  /** 组合 统计字段 */
  compositesAggregate?: Maybe<Role>;
  /** 组合 连接 */
  compositesConnection?: Maybe<RoleConnection>;
  /** 权限 统计字段 */
  permissionsAggregate?: Maybe<Permission>;
  /** 权限 连接 */
  permissionsConnection?: Maybe<PermissionConnection>;
  /** 用户 角色 关系 统计字段 */
  roleUserRelationAggregate?: Maybe<RoleUserRelation>;
  /** 用户 角色 关系 连接 */
  roleUserRelationConnection?: Maybe<RoleUserRelationConnection>;
  /** 角色 组 关系 统计字段 */
  groupRoleRelationAggregate?: Maybe<GroupRoleRelation>;
  /** 角色 组 关系 连接 */
  groupRoleRelationConnection?: Maybe<GroupRoleRelationConnection>;
  /** 角色 角色 关系 统计字段 */
  roleCompositeRelationAggregate?: Maybe<RoleCompositeRelation>;
  /** 角色 角色 关系 连接 */
  roleCompositeRelationConnection?: Maybe<RoleCompositeRelationConnection>;
  /** 角色 权限 关系 统计字段 */
  permissionRoleRelationAggregate?: Maybe<PermissionRoleRelation>;
  /** 角色 权限 关系 连接 */
  permissionRoleRelationConnection?: Maybe<PermissionRoleRelationConnection>;
  /** 角色 数量 */
  idCount?: Maybe<Scalars['Int']>;
  /** ID 最大值 */
  idMax?: Maybe<Scalars['Int']>;
  /** ID 最小值 */
  idMin?: Maybe<Scalars['Int']>;
  /** 名称 数量 */
  nameCount?: Maybe<Scalars['Int']>;
  /** 名称 最大值 */
  nameMax?: Maybe<Scalars['String']>;
  /** 名称 最小值 */
  nameMin?: Maybe<Scalars['String']>;
  /** 描述 数量 */
  descriptionCount?: Maybe<Scalars['Int']>;
  /** 描述 最大值 */
  descriptionMax?: Maybe<Scalars['String']>;
  /** 描述 最小值 */
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

/** 角色 角色 关系 */
export type RoleCompositeRelation = Meta & {
  __typename?: 'RoleCompositeRelation';
  /** ID */
  id?: Maybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: Maybe<Scalars['String']>;
  /** 角色 */
  role?: Maybe<Role>;
  /** 角色 引用 */
  compositeRef?: Maybe<Scalars['String']>;
  /** 角色 */
  composite?: Maybe<Role>;
  /** 已移除 */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** 版本 */
  version?: Maybe<Scalars['Int']>;
  /** 域 */
  realmId?: Maybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: Maybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: Maybe<Scalars['String']>;
  /** 角色 角色 关系 数量 */
  idCount?: Maybe<Scalars['Int']>;
  /** ID 最大值 */
  idMax?: Maybe<Scalars['Int']>;
  /** ID 最小值 */
  idMin?: Maybe<Scalars['Int']>;
  /** 角色 引用 数量 */
  roleRefCount?: Maybe<Scalars['Int']>;
  /** 角色 引用 最大值 */
  roleRefMax?: Maybe<Scalars['String']>;
  /** 角色 引用 最小值 */
  roleRefMin?: Maybe<Scalars['String']>;
  /** 角色 引用 数量 */
  compositeRefCount?: Maybe<Scalars['Int']>;
  /** 角色 引用 最大值 */
  compositeRefMax?: Maybe<Scalars['String']>;
  /** 角色 引用 最小值 */
  compositeRefMin?: Maybe<Scalars['String']>;
};


/** 角色 角色 关系 */
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


/** 角色 角色 关系 */
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

/** 角色 角色 关系 连接 */
export type RoleCompositeRelationConnection = {
  __typename?: 'RoleCompositeRelationConnection';
  /** 条数 */
  totalCount?: Maybe<Scalars['Int']>;
  /** 分页信息 */
  pageInfo?: Maybe<PageInfo>;
  /** 边缘 */
  edges?: Maybe<Array<Maybe<RoleCompositeRelationEdge>>>;
};

/** 角色 角色 关系连接 查询参数 */
export type RoleCompositeRelationConnectionQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<StringExpression>;
  /** 角色 */
  composite?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 角色 关系列表 订阅参数 */
export type RoleCompositeRelationConnectionSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<StringExpression>;
  /** 角色 */
  composite?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  /** 排序 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 角色 关系 边缘 */
export type RoleCompositeRelationEdge = {
  __typename?: 'RoleCompositeRelationEdge';
  /** 节点 */
  node?: Maybe<RoleCompositeRelation>;
  /** 游标 */
  cursor?: Maybe<Scalars['String']>;
};

/** 角色 角色 关系 查询表达式 */
export type RoleCompositeRelationExpression = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<StringExpression>;
  /** 角色 */
  composite?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
};

/** 角色 角色 关系 查询表达式 */
export type RoleCompositeRelationExpressionBase = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<StringExpression>;
  /** 角色 */
  composite?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
};

/** 角色 角色 关系 变更内容 */
export type RoleCompositeRelationInput = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  composite?: InputMaybe<RoleInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<RoleCompositeRelationExpression>;
};

/** 角色 角色 关系 变更内容 */
export type RoleCompositeRelationInputBase = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  composite?: InputMaybe<RoleInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<RoleCompositeRelationExpression>;
};

/** 角色 角色 关系列表 变更参数  */
export type RoleCompositeRelationListMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  composite?: InputMaybe<RoleInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容列表 */
  list?: InputMaybe<Array<InputMaybe<RoleCompositeRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<RoleCompositeRelationExpression>;
};

/** 角色 角色 关系列表 查询参数 */
export type RoleCompositeRelationListQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<StringExpression>;
  /** 角色 */
  composite?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 角色 关系列表 订阅参数 */
export type RoleCompositeRelationListSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<StringExpression>;
  /** 角色 */
  composite?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RoleCompositeRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 变更内容列表 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 角色 关系 变更参数 */
export type RoleCompositeRelationMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  composite?: InputMaybe<RoleInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容 */
  input?: InputMaybe<RoleCompositeRelationInput>;
  /** 匹配条件 */
  where?: InputMaybe<RoleCompositeRelationExpression>;
};

/** 角色 角色 关系 排序 */
export type RoleCompositeRelationOrderBy = {
  /** ID */
  id?: InputMaybe<Sort>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Sort>;
  /** 角色 */
  role?: InputMaybe<RoleOrderBy>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<Sort>;
  /** 角色 */
  composite?: InputMaybe<RoleOrderBy>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Sort>;
  /** 版本 */
  version?: InputMaybe<Sort>;
  /** 域 */
  realmId?: InputMaybe<Sort>;
  /** 创建者 */
  createUserId?: InputMaybe<Sort>;
  /** 创建时间 */
  createTime?: InputMaybe<Sort>;
  /** 更新者 */
  updateUserId?: InputMaybe<Sort>;
  /** 更新时间 */
  updateTime?: InputMaybe<Sort>;
  /** 创建组 */
  createGroupId?: InputMaybe<Sort>;
  /** 角色 角色 关系 数量 */
  idCount?: InputMaybe<Sort>;
  /** ID 最大值 */
  idMax?: InputMaybe<Sort>;
  /** ID 最小值 */
  idMin?: InputMaybe<Sort>;
  /** 角色 引用 数量 */
  roleRefCount?: InputMaybe<Sort>;
  /** 角色 引用 最大值 */
  roleRefMax?: InputMaybe<Sort>;
  /** 角色 引用 最小值 */
  roleRefMin?: InputMaybe<Sort>;
  /** 角色 引用 数量 */
  compositeRefCount?: InputMaybe<Sort>;
  /** 角色 引用 最大值 */
  compositeRefMax?: InputMaybe<Sort>;
  /** 角色 引用 最小值 */
  compositeRefMin?: InputMaybe<Sort>;
};

/** 角色 角色 关系 查询参数 */
export type RoleCompositeRelationQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<StringExpression>;
  /** 角色 */
  composite?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
};

/** 角色 角色 关系 订阅参数 */
export type RoleCompositeRelationSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 角色 引用 */
  compositeRef?: InputMaybe<StringExpression>;
  /** 角色 */
  composite?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeRelationExpression>>>;
};

/** 角色 连接 */
export type RoleConnection = {
  __typename?: 'RoleConnection';
  /** 条数 */
  totalCount?: Maybe<Scalars['Int']>;
  /** 分页信息 */
  pageInfo?: Maybe<PageInfo>;
  /** 边缘 */
  edges?: Maybe<Array<Maybe<RoleEdge>>>;
};

/** 角色连接 查询参数 */
export type RoleConnectionQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 组合 */
  composites?: InputMaybe<RoleExpression>;
  /** 权限 */
  permissions?: InputMaybe<PermissionExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RoleOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色列表 订阅参数 */
export type RoleConnectionSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 组合 */
  composites?: InputMaybe<RoleExpression>;
  /** 权限 */
  permissions?: InputMaybe<PermissionExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RoleOrderBy>;
  /** 排序 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 边缘 */
export type RoleEdge = {
  __typename?: 'RoleEdge';
  /** 节点 */
  node?: Maybe<Role>;
  /** 游标 */
  cursor?: Maybe<Scalars['String']>;
};

/** 角色 查询表达式 */
export type RoleExpression = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 组合 */
  composites?: InputMaybe<RoleExpression>;
  /** 权限 */
  permissions?: InputMaybe<PermissionExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};

/** 角色 查询表达式 */
export type RoleExpressionBase = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 组合 */
  composites?: InputMaybe<RoleExpression>;
  /** 权限 */
  permissions?: InputMaybe<PermissionExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};

/** 角色 变更内容 */
export type RoleInput = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 用户 */
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  /** 组 */
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 组合 */
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 权限 */
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<Array<InputMaybe<RoleCompositeRelationInput>>>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<RoleExpression>;
};

/** 角色 变更内容 */
export type RoleInputBase = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 用户 */
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  /** 组 */
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 组合 */
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 权限 */
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<Array<InputMaybe<RoleCompositeRelationInput>>>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<RoleExpression>;
};

/** 角色列表 变更参数  */
export type RoleListMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 用户 */
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  /** 组 */
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 组合 */
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 权限 */
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<Array<InputMaybe<RoleCompositeRelationInput>>>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  /** 变更内容列表 */
  list?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<RoleExpression>;
};

/** 角色列表 查询参数 */
export type RoleListQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 组合 */
  composites?: InputMaybe<RoleExpression>;
  /** 权限 */
  permissions?: InputMaybe<PermissionExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RoleOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色列表 订阅参数 */
export type RoleListSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 组合 */
  composites?: InputMaybe<RoleExpression>;
  /** 权限 */
  permissions?: InputMaybe<PermissionExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RoleOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 变更内容列表 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 角色 变更参数 */
export type RoleMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 名称 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 用户 */
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  /** 组 */
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 组合 */
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 权限 */
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<Array<InputMaybe<GroupRoleRelationInput>>>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<Array<InputMaybe<RoleCompositeRelationInput>>>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<Array<InputMaybe<PermissionRoleRelationInput>>>;
  /** 变更内容 */
  input?: InputMaybe<RoleInput>;
  /** 匹配条件 */
  where?: InputMaybe<RoleExpression>;
};

/** 角色 排序 */
export type RoleOrderBy = {
  /** ID */
  id?: InputMaybe<Sort>;
  /** 名称 */
  name?: InputMaybe<Sort>;
  /** 描述 */
  description?: InputMaybe<Sort>;
  /** 用户 */
  users?: InputMaybe<UserOrderBy>;
  /** 组 */
  groups?: InputMaybe<GroupOrderBy>;
  /** 组合 */
  composites?: InputMaybe<RoleOrderBy>;
  /** 权限 */
  permissions?: InputMaybe<PermissionOrderBy>;
  /** 租户 */
  realm?: InputMaybe<RealmOrderBy>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Sort>;
  /** 版本 */
  version?: InputMaybe<Sort>;
  /** 域 */
  realmId?: InputMaybe<Sort>;
  /** 创建者 */
  createUserId?: InputMaybe<Sort>;
  /** 创建时间 */
  createTime?: InputMaybe<Sort>;
  /** 更新者 */
  updateUserId?: InputMaybe<Sort>;
  /** 更新时间 */
  updateTime?: InputMaybe<Sort>;
  /** 创建组 */
  createGroupId?: InputMaybe<Sort>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationOrderBy>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationOrderBy>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationOrderBy>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationOrderBy>;
  /** 用户 统计字段 */
  usersAggregate?: InputMaybe<UserOrderBy>;
  /** 组 统计字段 */
  groupsAggregate?: InputMaybe<GroupOrderBy>;
  /** 组合 统计字段 */
  compositesAggregate?: InputMaybe<RoleOrderBy>;
  /** 权限 统计字段 */
  permissionsAggregate?: InputMaybe<PermissionOrderBy>;
  /** 用户 角色 关系 统计字段 */
  roleUserRelationAggregate?: InputMaybe<RoleUserRelationOrderBy>;
  /** 角色 组 关系 统计字段 */
  groupRoleRelationAggregate?: InputMaybe<GroupRoleRelationOrderBy>;
  /** 角色 角色 关系 统计字段 */
  roleCompositeRelationAggregate?: InputMaybe<RoleCompositeRelationOrderBy>;
  /** 角色 权限 关系 统计字段 */
  permissionRoleRelationAggregate?: InputMaybe<PermissionRoleRelationOrderBy>;
  /** 角色 数量 */
  idCount?: InputMaybe<Sort>;
  /** ID 最大值 */
  idMax?: InputMaybe<Sort>;
  /** ID 最小值 */
  idMin?: InputMaybe<Sort>;
  /** 名称 数量 */
  nameCount?: InputMaybe<Sort>;
  /** 名称 最大值 */
  nameMax?: InputMaybe<Sort>;
  /** 名称 最小值 */
  nameMin?: InputMaybe<Sort>;
  /** 描述 数量 */
  descriptionCount?: InputMaybe<Sort>;
  /** 描述 最大值 */
  descriptionMax?: InputMaybe<Sort>;
  /** 描述 最小值 */
  descriptionMin?: InputMaybe<Sort>;
};

/** 角色 查询参数 */
export type RoleQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 组合 */
  composites?: InputMaybe<RoleExpression>;
  /** 权限 */
  permissions?: InputMaybe<PermissionExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};

/** 角色 订阅参数 */
export type RoleSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 名称 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 用户 */
  users?: InputMaybe<UserExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 组合 */
  composites?: InputMaybe<RoleExpression>;
  /** 权限 */
  permissions?: InputMaybe<PermissionExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 角色 组 关系 */
  groupRoleRelation?: InputMaybe<GroupRoleRelationExpression>;
  /** 角色 角色 关系 */
  roleCompositeRelation?: InputMaybe<RoleCompositeRelationExpression>;
  /** 角色 权限 关系 */
  permissionRoleRelation?: InputMaybe<PermissionRoleRelationExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};

/** 用户 角色 关系 */
export type RoleUserRelation = Meta & {
  __typename?: 'RoleUserRelation';
  /** ID */
  id?: Maybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: Maybe<Scalars['String']>;
  /** 用户 */
  user?: Maybe<User>;
  /** 角色 引用 */
  roleRef?: Maybe<Scalars['String']>;
  /** 角色 */
  role?: Maybe<Role>;
  /** 已移除 */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** 版本 */
  version?: Maybe<Scalars['Int']>;
  /** 域 */
  realmId?: Maybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: Maybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: Maybe<Scalars['String']>;
  /** 用户 角色 关系 数量 */
  idCount?: Maybe<Scalars['Int']>;
  /** ID 最大值 */
  idMax?: Maybe<Scalars['Int']>;
  /** ID 最小值 */
  idMin?: Maybe<Scalars['Int']>;
  /** 用户 引用 数量 */
  userRefCount?: Maybe<Scalars['Int']>;
  /** 用户 引用 最大值 */
  userRefMax?: Maybe<Scalars['String']>;
  /** 用户 引用 最小值 */
  userRefMin?: Maybe<Scalars['String']>;
  /** 角色 引用 数量 */
  roleRefCount?: Maybe<Scalars['Int']>;
  /** 角色 引用 最大值 */
  roleRefMax?: Maybe<Scalars['String']>;
  /** 角色 引用 最小值 */
  roleRefMin?: Maybe<Scalars['String']>;
};


/** 用户 角色 关系 */
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


/** 用户 角色 关系 */
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

/** 用户 角色 关系 连接 */
export type RoleUserRelationConnection = {
  __typename?: 'RoleUserRelationConnection';
  /** 条数 */
  totalCount?: Maybe<Scalars['Int']>;
  /** 分页信息 */
  pageInfo?: Maybe<PageInfo>;
  /** 边缘 */
  edges?: Maybe<Array<Maybe<RoleUserRelationEdge>>>;
};

/** 用户 角色 关系连接 查询参数 */
export type RoleUserRelationConnectionQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 角色 关系列表 订阅参数 */
export type RoleUserRelationConnectionSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  /** 排序 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 角色 关系 边缘 */
export type RoleUserRelationEdge = {
  __typename?: 'RoleUserRelationEdge';
  /** 节点 */
  node?: Maybe<RoleUserRelation>;
  /** 游标 */
  cursor?: Maybe<Scalars['String']>;
};

/** 用户 角色 关系 查询表达式 */
export type RoleUserRelationExpression = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
};

/** 用户 角色 关系 查询表达式 */
export type RoleUserRelationExpressionBase = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
};

/** 用户 角色 关系 变更内容 */
export type RoleUserRelationInput = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: InputMaybe<Scalars['String']>;
  /** 用户 */
  user?: InputMaybe<UserInput>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<RoleUserRelationExpression>;
};

/** 用户 角色 关系 变更内容 */
export type RoleUserRelationInputBase = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: InputMaybe<Scalars['String']>;
  /** 用户 */
  user?: InputMaybe<UserInput>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<RoleUserRelationExpression>;
};

/** 用户 角色 关系列表 变更参数  */
export type RoleUserRelationListMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: InputMaybe<Scalars['String']>;
  /** 用户 */
  user?: InputMaybe<UserInput>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容列表 */
  list?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<RoleUserRelationExpression>;
};

/** 用户 角色 关系列表 查询参数 */
export type RoleUserRelationListQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 角色 关系列表 订阅参数 */
export type RoleUserRelationListSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<RoleUserRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 变更内容列表 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 角色 关系 变更参数 */
export type RoleUserRelationMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: InputMaybe<Scalars['String']>;
  /** 用户 */
  user?: InputMaybe<UserInput>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Scalars['String']>;
  /** 角色 */
  role?: InputMaybe<RoleInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容 */
  input?: InputMaybe<RoleUserRelationInput>;
  /** 匹配条件 */
  where?: InputMaybe<RoleUserRelationExpression>;
};

/** 用户 角色 关系 排序 */
export type RoleUserRelationOrderBy = {
  /** ID */
  id?: InputMaybe<Sort>;
  /** 用户 引用 */
  userRef?: InputMaybe<Sort>;
  /** 用户 */
  user?: InputMaybe<UserOrderBy>;
  /** 角色 引用 */
  roleRef?: InputMaybe<Sort>;
  /** 角色 */
  role?: InputMaybe<RoleOrderBy>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Sort>;
  /** 版本 */
  version?: InputMaybe<Sort>;
  /** 域 */
  realmId?: InputMaybe<Sort>;
  /** 创建者 */
  createUserId?: InputMaybe<Sort>;
  /** 创建时间 */
  createTime?: InputMaybe<Sort>;
  /** 更新者 */
  updateUserId?: InputMaybe<Sort>;
  /** 更新时间 */
  updateTime?: InputMaybe<Sort>;
  /** 创建组 */
  createGroupId?: InputMaybe<Sort>;
  /** 用户 角色 关系 数量 */
  idCount?: InputMaybe<Sort>;
  /** ID 最大值 */
  idMax?: InputMaybe<Sort>;
  /** ID 最小值 */
  idMin?: InputMaybe<Sort>;
  /** 用户 引用 数量 */
  userRefCount?: InputMaybe<Sort>;
  /** 用户 引用 最大值 */
  userRefMax?: InputMaybe<Sort>;
  /** 用户 引用 最小值 */
  userRefMin?: InputMaybe<Sort>;
  /** 角色 引用 数量 */
  roleRefCount?: InputMaybe<Sort>;
  /** 角色 引用 最大值 */
  roleRefMax?: InputMaybe<Sort>;
  /** 角色 引用 最小值 */
  roleRefMin?: InputMaybe<Sort>;
};

/** 用户 角色 关系 查询参数 */
export type RoleUserRelationQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<RoleUserRelationExpression>>>;
};

/** 用户 角色 关系 订阅参数 */
export type RoleUserRelationSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 角色 引用 */
  roleRef?: InputMaybe<StringExpression>;
  /** 角色 */
  role?: InputMaybe<RoleExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
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

/** Subscription */
export type Subscription = {
  __typename?: 'Subscription';
  /** 用户 订阅接口 */
  user?: Maybe<User>;
  /** 用户列表 订阅接口 */
  userList?: Maybe<Array<Maybe<User>>>;
  /** 用户连接 订阅接口 */
  userConnection?: Maybe<UserConnection>;
  /** 角色 订阅接口 */
  role?: Maybe<Role>;
  /** 角色列表 订阅接口 */
  roleList?: Maybe<Array<Maybe<Role>>>;
  /** 角色连接 订阅接口 */
  roleConnection?: Maybe<RoleConnection>;
  /** 组 订阅接口 */
  group?: Maybe<Group>;
  /** 组列表 订阅接口 */
  groupList?: Maybe<Array<Maybe<Group>>>;
  /** 组连接 订阅接口 */
  groupConnection?: Maybe<GroupConnection>;
  /** 租户 订阅接口 */
  realm?: Maybe<Realm>;
  /** 租户列表 订阅接口 */
  realmList?: Maybe<Array<Maybe<Realm>>>;
  /** 租户连接 订阅接口 */
  realmConnection?: Maybe<RealmConnection>;
  /** 权限 订阅接口 */
  permission?: Maybe<Permission>;
  /** 权限列表 订阅接口 */
  permissionList?: Maybe<Array<Maybe<Permission>>>;
  /** 权限连接 订阅接口 */
  permissionConnection?: Maybe<PermissionConnection>;
  /** 用户 手机号 关系 订阅接口 */
  userPhonesRelation?: Maybe<UserPhonesRelation>;
  /** 用户 手机号 关系列表 订阅接口 */
  userPhonesRelationList?: Maybe<Array<Maybe<UserPhonesRelation>>>;
  /** 用户 手机号 关系连接 订阅接口 */
  userPhonesRelationConnection?: Maybe<UserPhonesRelationConnection>;
  /** 用户 组 关系 订阅接口 */
  groupUserRelation?: Maybe<GroupUserRelation>;
  /** 用户 组 关系列表 订阅接口 */
  groupUserRelationList?: Maybe<Array<Maybe<GroupUserRelation>>>;
  /** 用户 组 关系连接 订阅接口 */
  groupUserRelationConnection?: Maybe<GroupUserRelationConnection>;
  /** 用户 角色 关系 订阅接口 */
  roleUserRelation?: Maybe<RoleUserRelation>;
  /** 用户 角色 关系列表 订阅接口 */
  roleUserRelationList?: Maybe<Array<Maybe<RoleUserRelation>>>;
  /** 用户 角色 关系连接 订阅接口 */
  roleUserRelationConnection?: Maybe<RoleUserRelationConnection>;
  /** 角色 组 关系 订阅接口 */
  groupRoleRelation?: Maybe<GroupRoleRelation>;
  /** 角色 组 关系列表 订阅接口 */
  groupRoleRelationList?: Maybe<Array<Maybe<GroupRoleRelation>>>;
  /** 角色 组 关系连接 订阅接口 */
  groupRoleRelationConnection?: Maybe<GroupRoleRelationConnection>;
  /** 角色 角色 关系 订阅接口 */
  roleCompositeRelation?: Maybe<RoleCompositeRelation>;
  /** 角色 角色 关系列表 订阅接口 */
  roleCompositeRelationList?: Maybe<Array<Maybe<RoleCompositeRelation>>>;
  /** 角色 角色 关系连接 订阅接口 */
  roleCompositeRelationConnection?: Maybe<RoleCompositeRelationConnection>;
  /** 角色 权限 关系 订阅接口 */
  permissionRoleRelation?: Maybe<PermissionRoleRelation>;
  /** 角色 权限 关系列表 订阅接口 */
  permissionRoleRelationList?: Maybe<Array<Maybe<PermissionRoleRelation>>>;
  /** 角色 权限 关系连接 订阅接口 */
  permissionRoleRelationConnection?: Maybe<PermissionRoleRelationConnection>;
};


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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


/** Subscription */
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

/** Query Expression Input for TreeStruct */
export type TreeStructExpression = {
  /** name */
  name?: InputMaybe<StringExpression>;
  /** path */
  path?: InputMaybe<StringExpression>;
  /** deep */
  deep?: InputMaybe<IntExpression>;
  /** parentId */
  parentId?: InputMaybe<StringExpression>;
  /** Include Deprecated */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** version */
  version?: InputMaybe<IntExpression>;
  /** realmId */
  realmId?: InputMaybe<IntExpression>;
  /** createUserId */
  createUserId?: InputMaybe<StringExpression>;
  /** createTime */
  createTime?: InputMaybe<StringExpression>;
  /** updateUserId */
  updateUserId?: InputMaybe<StringExpression>;
  /** updateTime */
  updateTime?: InputMaybe<StringExpression>;
  /** createGroupId */
  createGroupId?: InputMaybe<StringExpression>;
  /** Not */
  not?: InputMaybe<Scalars['Boolean']>;
  /** Condition */
  cond?: InputMaybe<Conditional>;
};

/** Mutation Input for TreeStruct */
export type TreeStructInput = {
  /** name */
  name?: InputMaybe<Scalars['String']>;
  /** path */
  path?: InputMaybe<Scalars['String']>;
  /** deep */
  deep?: InputMaybe<Scalars['Int']>;
  /** parentId */
  parentId?: InputMaybe<Scalars['String']>;
  /** Is Deprecated */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** version */
  version?: InputMaybe<Scalars['Int']>;
  /** realmId */
  realmId?: InputMaybe<Scalars['Int']>;
  /** createUserId */
  createUserId?: InputMaybe<Scalars['String']>;
  /** createTime */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** updateUserId */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** updateTime */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** createGroupId */
  createGroupId?: InputMaybe<Scalars['String']>;
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
  /** 已移除 */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** 版本 */
  version?: Maybe<Scalars['Int']>;
  /** 域 */
  realmId?: Maybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: Maybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: Maybe<Scalars['String']>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: Maybe<Array<Maybe<UserPhonesRelation>>>;
  /** 用户 组 关系 */
  groupUserRelation?: Maybe<Array<Maybe<GroupUserRelation>>>;
  /** 用户 角色 关系 */
  roleUserRelation?: Maybe<Array<Maybe<RoleUserRelation>>>;
  /** 组 统计字段 */
  groupsAggregate?: Maybe<Group>;
  /** 组 连接 */
  groupsConnection?: Maybe<GroupConnection>;
  /** 角色 统计字段 */
  rolesAggregate?: Maybe<Role>;
  /** 角色 连接 */
  rolesConnection?: Maybe<RoleConnection>;
  /** 用户 手机号 关系 统计字段 */
  userPhonesRelationAggregate?: Maybe<UserPhonesRelation>;
  /** 用户 手机号 关系 连接 */
  userPhonesRelationConnection?: Maybe<UserPhonesRelationConnection>;
  /** 用户 组 关系 统计字段 */
  groupUserRelationAggregate?: Maybe<GroupUserRelation>;
  /** 用户 组 关系 连接 */
  groupUserRelationConnection?: Maybe<GroupUserRelationConnection>;
  /** 用户 角色 关系 统计字段 */
  roleUserRelationAggregate?: Maybe<RoleUserRelation>;
  /** 用户 角色 关系 连接 */
  roleUserRelationConnection?: Maybe<RoleUserRelationConnection>;
  /** 用户 数量 */
  idCount?: Maybe<Scalars['Int']>;
  /** ID 最大值 */
  idMax?: Maybe<Scalars['Int']>;
  /** ID 最小值 */
  idMin?: Maybe<Scalars['Int']>;
  /** 姓名 数量 */
  nameCount?: Maybe<Scalars['Int']>;
  /** 姓名 最大值 */
  nameMax?: Maybe<Scalars['String']>;
  /** 姓名 最小值 */
  nameMin?: Maybe<Scalars['String']>;
  /** 描述 数量 */
  descriptionCount?: Maybe<Scalars['Int']>;
  /** 描述 最大值 */
  descriptionMax?: Maybe<Scalars['String']>;
  /** 描述 最小值 */
  descriptionMin?: Maybe<Scalars['String']>;
  /** 姓氏 数量 */
  lastNameCount?: Maybe<Scalars['Int']>;
  /** 姓氏 最大值 */
  lastNameMax?: Maybe<Scalars['String']>;
  /** 姓氏 最小值 */
  lastNameMin?: Maybe<Scalars['String']>;
  /** 账号 数量 */
  loginCount?: Maybe<Scalars['Int']>;
  /** 账号 最大值 */
  loginMax?: Maybe<Scalars['String']>;
  /** 账号 最小值 */
  loginMin?: Maybe<Scalars['String']>;
  /** 盐 数量 */
  saltCount?: Maybe<Scalars['Int']>;
  /** 盐 最大值 */
  saltMax?: Maybe<Scalars['String']>;
  /** 盐 最小值 */
  saltMin?: Maybe<Scalars['String']>;
  /** 哈希 数量 */
  hashCount?: Maybe<Scalars['Int']>;
  /** 哈希 最大值 */
  hashMax?: Maybe<Scalars['String']>;
  /** 哈希 最小值 */
  hashMin?: Maybe<Scalars['String']>;
  /** 邮箱 数量 */
  emailCount?: Maybe<Scalars['Int']>;
  /** 邮箱 最大值 */
  emailMax?: Maybe<Scalars['String']>;
  /** 邮箱 最小值 */
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

/** 用户 连接 */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** 条数 */
  totalCount?: Maybe<Scalars['Int']>;
  /** 分页信息 */
  pageInfo?: Maybe<PageInfo>;
  /** 边缘 */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
};

/** 用户连接 查询参数 */
export type UserConnectionQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 姓名 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 姓氏 */
  lastName?: InputMaybe<StringExpression>;
  /** 账号 */
  login?: InputMaybe<StringExpression>;
  /** 盐 */
  salt?: InputMaybe<StringExpression>;
  /** 哈希 */
  hash?: InputMaybe<StringExpression>;
  /** 邮箱 */
  email?: InputMaybe<StringExpression>;
  /** 手机号 */
  phones?: InputMaybe<StringExpression>;
  /** 禁用 */
  disable?: InputMaybe<BooleanExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<UserOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户列表 订阅参数 */
export type UserConnectionSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 姓名 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 姓氏 */
  lastName?: InputMaybe<StringExpression>;
  /** 账号 */
  login?: InputMaybe<StringExpression>;
  /** 盐 */
  salt?: InputMaybe<StringExpression>;
  /** 哈希 */
  hash?: InputMaybe<StringExpression>;
  /** 邮箱 */
  email?: InputMaybe<StringExpression>;
  /** 手机号 */
  phones?: InputMaybe<StringExpression>;
  /** 禁用 */
  disable?: InputMaybe<BooleanExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<UserOrderBy>;
  /** 排序 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 边缘 */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** 节点 */
  node?: Maybe<User>;
  /** 游标 */
  cursor?: Maybe<Scalars['String']>;
};

/** 用户 查询表达式 */
export type UserExpression = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 姓名 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 姓氏 */
  lastName?: InputMaybe<StringExpression>;
  /** 账号 */
  login?: InputMaybe<StringExpression>;
  /** 盐 */
  salt?: InputMaybe<StringExpression>;
  /** 哈希 */
  hash?: InputMaybe<StringExpression>;
  /** 邮箱 */
  email?: InputMaybe<StringExpression>;
  /** 手机号 */
  phones?: InputMaybe<StringExpression>;
  /** 禁用 */
  disable?: InputMaybe<BooleanExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};

/** 用户 查询表达式 */
export type UserExpressionBase = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 姓名 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 姓氏 */
  lastName?: InputMaybe<StringExpression>;
  /** 账号 */
  login?: InputMaybe<StringExpression>;
  /** 盐 */
  salt?: InputMaybe<StringExpression>;
  /** 哈希 */
  hash?: InputMaybe<StringExpression>;
  /** 邮箱 */
  email?: InputMaybe<StringExpression>;
  /** 手机号 */
  phones?: InputMaybe<StringExpression>;
  /** 禁用 */
  disable?: InputMaybe<BooleanExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};

/** 用户 变更内容 */
export type UserInput = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 姓名 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 姓氏 */
  lastName?: InputMaybe<Scalars['String']>;
  /** 账号 */
  login?: InputMaybe<Scalars['String']>;
  /** 盐 */
  salt?: InputMaybe<Scalars['String']>;
  /** 哈希 */
  hash?: InputMaybe<Scalars['String']>;
  /** 邮箱 */
  email?: InputMaybe<Scalars['String']>;
  /** 手机号 */
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 禁用 */
  disable?: InputMaybe<Scalars['Boolean']>;
  /** 组 */
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 角色 */
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<Array<InputMaybe<UserPhonesRelationInput>>>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<UserExpression>;
};

/** 用户 变更内容 */
export type UserInputBase = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 姓名 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 姓氏 */
  lastName?: InputMaybe<Scalars['String']>;
  /** 账号 */
  login?: InputMaybe<Scalars['String']>;
  /** 盐 */
  salt?: InputMaybe<Scalars['String']>;
  /** 哈希 */
  hash?: InputMaybe<Scalars['String']>;
  /** 邮箱 */
  email?: InputMaybe<Scalars['String']>;
  /** 手机号 */
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 禁用 */
  disable?: InputMaybe<Scalars['Boolean']>;
  /** 组 */
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 角色 */
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<Array<InputMaybe<UserPhonesRelationInput>>>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<UserExpression>;
};

/** 用户列表 变更参数  */
export type UserListMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 姓名 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 姓氏 */
  lastName?: InputMaybe<Scalars['String']>;
  /** 账号 */
  login?: InputMaybe<Scalars['String']>;
  /** 盐 */
  salt?: InputMaybe<Scalars['String']>;
  /** 哈希 */
  hash?: InputMaybe<Scalars['String']>;
  /** 邮箱 */
  email?: InputMaybe<Scalars['String']>;
  /** 手机号 */
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 禁用 */
  disable?: InputMaybe<Scalars['Boolean']>;
  /** 组 */
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 角色 */
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<Array<InputMaybe<UserPhonesRelationInput>>>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  /** 变更内容列表 */
  list?: InputMaybe<Array<InputMaybe<UserInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<UserExpression>;
};

/** 用户列表 查询参数 */
export type UserListQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 姓名 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 姓氏 */
  lastName?: InputMaybe<StringExpression>;
  /** 账号 */
  login?: InputMaybe<StringExpression>;
  /** 盐 */
  salt?: InputMaybe<StringExpression>;
  /** 哈希 */
  hash?: InputMaybe<StringExpression>;
  /** 邮箱 */
  email?: InputMaybe<StringExpression>;
  /** 手机号 */
  phones?: InputMaybe<StringExpression>;
  /** 禁用 */
  disable?: InputMaybe<BooleanExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<UserOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户列表 订阅参数 */
export type UserListSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 姓名 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 姓氏 */
  lastName?: InputMaybe<StringExpression>;
  /** 账号 */
  login?: InputMaybe<StringExpression>;
  /** 盐 */
  salt?: InputMaybe<StringExpression>;
  /** 哈希 */
  hash?: InputMaybe<StringExpression>;
  /** 邮箱 */
  email?: InputMaybe<StringExpression>;
  /** 手机号 */
  phones?: InputMaybe<StringExpression>;
  /** 禁用 */
  disable?: InputMaybe<BooleanExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 排序 */
  orderBy?: InputMaybe<UserOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 变更内容列表 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 变更参数 */
export type UserMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 姓名 */
  name?: InputMaybe<Scalars['String']>;
  /** 描述 */
  description?: InputMaybe<Scalars['String']>;
  /** 姓氏 */
  lastName?: InputMaybe<Scalars['String']>;
  /** 账号 */
  login?: InputMaybe<Scalars['String']>;
  /** 盐 */
  salt?: InputMaybe<Scalars['String']>;
  /** 哈希 */
  hash?: InputMaybe<Scalars['String']>;
  /** 邮箱 */
  email?: InputMaybe<Scalars['String']>;
  /** 手机号 */
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** 禁用 */
  disable?: InputMaybe<Scalars['Boolean']>;
  /** 组 */
  groups?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  /** 角色 */
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  /** 租户 */
  realm?: InputMaybe<RealmInput>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<Array<InputMaybe<UserPhonesRelationInput>>>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<Array<InputMaybe<GroupUserRelationInput>>>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<Array<InputMaybe<RoleUserRelationInput>>>;
  /** 变更内容 */
  input?: InputMaybe<UserInput>;
  /** 匹配条件 */
  where?: InputMaybe<UserExpression>;
};

/** 用户 排序 */
export type UserOrderBy = {
  /** ID */
  id?: InputMaybe<Sort>;
  /** 姓名 */
  name?: InputMaybe<Sort>;
  /** 描述 */
  description?: InputMaybe<Sort>;
  /** 姓氏 */
  lastName?: InputMaybe<Sort>;
  /** 账号 */
  login?: InputMaybe<Sort>;
  /** 盐 */
  salt?: InputMaybe<Sort>;
  /** 哈希 */
  hash?: InputMaybe<Sort>;
  /** 邮箱 */
  email?: InputMaybe<Sort>;
  /** 手机号 */
  phones?: InputMaybe<Sort>;
  /** 禁用 */
  disable?: InputMaybe<Sort>;
  /** 组 */
  groups?: InputMaybe<GroupOrderBy>;
  /** 角色 */
  roles?: InputMaybe<RoleOrderBy>;
  /** 租户 */
  realm?: InputMaybe<RealmOrderBy>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Sort>;
  /** 版本 */
  version?: InputMaybe<Sort>;
  /** 域 */
  realmId?: InputMaybe<Sort>;
  /** 创建者 */
  createUserId?: InputMaybe<Sort>;
  /** 创建时间 */
  createTime?: InputMaybe<Sort>;
  /** 更新者 */
  updateUserId?: InputMaybe<Sort>;
  /** 更新时间 */
  updateTime?: InputMaybe<Sort>;
  /** 创建组 */
  createGroupId?: InputMaybe<Sort>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<UserPhonesRelationOrderBy>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationOrderBy>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationOrderBy>;
  /** 组 统计字段 */
  groupsAggregate?: InputMaybe<GroupOrderBy>;
  /** 角色 统计字段 */
  rolesAggregate?: InputMaybe<RoleOrderBy>;
  /** 用户 手机号 关系 统计字段 */
  userPhonesRelationAggregate?: InputMaybe<UserPhonesRelationOrderBy>;
  /** 用户 组 关系 统计字段 */
  groupUserRelationAggregate?: InputMaybe<GroupUserRelationOrderBy>;
  /** 用户 角色 关系 统计字段 */
  roleUserRelationAggregate?: InputMaybe<RoleUserRelationOrderBy>;
  /** 用户 数量 */
  idCount?: InputMaybe<Sort>;
  /** ID 最大值 */
  idMax?: InputMaybe<Sort>;
  /** ID 最小值 */
  idMin?: InputMaybe<Sort>;
  /** 姓名 数量 */
  nameCount?: InputMaybe<Sort>;
  /** 姓名 最大值 */
  nameMax?: InputMaybe<Sort>;
  /** 姓名 最小值 */
  nameMin?: InputMaybe<Sort>;
  /** 描述 数量 */
  descriptionCount?: InputMaybe<Sort>;
  /** 描述 最大值 */
  descriptionMax?: InputMaybe<Sort>;
  /** 描述 最小值 */
  descriptionMin?: InputMaybe<Sort>;
  /** 姓氏 数量 */
  lastNameCount?: InputMaybe<Sort>;
  /** 姓氏 最大值 */
  lastNameMax?: InputMaybe<Sort>;
  /** 姓氏 最小值 */
  lastNameMin?: InputMaybe<Sort>;
  /** 账号 数量 */
  loginCount?: InputMaybe<Sort>;
  /** 账号 最大值 */
  loginMax?: InputMaybe<Sort>;
  /** 账号 最小值 */
  loginMin?: InputMaybe<Sort>;
  /** 盐 数量 */
  saltCount?: InputMaybe<Sort>;
  /** 盐 最大值 */
  saltMax?: InputMaybe<Sort>;
  /** 盐 最小值 */
  saltMin?: InputMaybe<Sort>;
  /** 哈希 数量 */
  hashCount?: InputMaybe<Sort>;
  /** 哈希 最大值 */
  hashMax?: InputMaybe<Sort>;
  /** 哈希 最小值 */
  hashMin?: InputMaybe<Sort>;
  /** 邮箱 数量 */
  emailCount?: InputMaybe<Sort>;
  /** 邮箱 最大值 */
  emailMax?: InputMaybe<Sort>;
  /** 邮箱 最小值 */
  emailMin?: InputMaybe<Sort>;
};

/** 用户 手机号 关系 */
export type UserPhonesRelation = Meta & {
  __typename?: 'UserPhonesRelation';
  /** ID */
  id?: Maybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: Maybe<Scalars['String']>;
  /** 用户 */
  user?: Maybe<User>;
  /** 手机号 引用 */
  phonesRef?: Maybe<Scalars['String']>;
  /** 已移除 */
  isDeprecated?: Maybe<Scalars['Boolean']>;
  /** 版本 */
  version?: Maybe<Scalars['Int']>;
  /** 域 */
  realmId?: Maybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: Maybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: Maybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: Maybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: Maybe<Scalars['String']>;
  /** 用户 手机号 关系 数量 */
  idCount?: Maybe<Scalars['Int']>;
  /** ID 最大值 */
  idMax?: Maybe<Scalars['Int']>;
  /** ID 最小值 */
  idMin?: Maybe<Scalars['Int']>;
  /** 用户 引用 数量 */
  userRefCount?: Maybe<Scalars['Int']>;
  /** 用户 引用 最大值 */
  userRefMax?: Maybe<Scalars['String']>;
  /** 用户 引用 最小值 */
  userRefMin?: Maybe<Scalars['String']>;
  /** 手机号 引用 数量 */
  phonesRefCount?: Maybe<Scalars['Int']>;
  /** 手机号 引用 最大值 */
  phonesRefMax?: Maybe<Scalars['String']>;
  /** 手机号 引用 最小值 */
  phonesRefMin?: Maybe<Scalars['String']>;
};


/** 用户 手机号 关系 */
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

/** 用户 手机号 关系 连接 */
export type UserPhonesRelationConnection = {
  __typename?: 'UserPhonesRelationConnection';
  /** 条数 */
  totalCount?: Maybe<Scalars['Int']>;
  /** 分页信息 */
  pageInfo?: Maybe<PageInfo>;
  /** 边缘 */
  edges?: Maybe<Array<Maybe<UserPhonesRelationEdge>>>;
};

/** 用户 手机号 关系连接 查询参数 */
export type UserPhonesRelationConnectionQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 手机号 关系列表 订阅参数 */
export type UserPhonesRelationConnectionSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  /** 排序 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 手机号 关系 边缘 */
export type UserPhonesRelationEdge = {
  __typename?: 'UserPhonesRelationEdge';
  /** 节点 */
  node?: Maybe<UserPhonesRelation>;
  /** 游标 */
  cursor?: Maybe<Scalars['String']>;
};

/** 用户 手机号 关系 查询表达式 */
export type UserPhonesRelationExpression = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
};

/** 用户 手机号 关系 查询表达式 */
export type UserPhonesRelationExpressionBase = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
};

/** 用户 手机号 关系 变更内容 */
export type UserPhonesRelationInput = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: InputMaybe<Scalars['String']>;
  /** 用户 */
  user?: InputMaybe<UserInput>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<Scalars['String']>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<UserPhonesRelationExpression>;
};

/** 用户 手机号 关系 变更内容 */
export type UserPhonesRelationInputBase = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: InputMaybe<Scalars['String']>;
  /** 用户 */
  user?: InputMaybe<UserInput>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<Scalars['String']>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 匹配条件 */
  where?: InputMaybe<UserPhonesRelationExpression>;
};

/** 用户 手机号 关系列表 变更参数  */
export type UserPhonesRelationListMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: InputMaybe<Scalars['String']>;
  /** 用户 */
  user?: InputMaybe<UserInput>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<Scalars['String']>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容列表 */
  list?: InputMaybe<Array<InputMaybe<UserPhonesRelationInput>>>;
  /** 匹配条件 */
  where?: InputMaybe<UserPhonesRelationExpression>;
};

/** 用户 手机号 关系列表 查询参数 */
export type UserPhonesRelationListQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 后...条数 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 手机号 关系列表 订阅参数 */
export type UserPhonesRelationListSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 排序 */
  orderBy?: InputMaybe<UserPhonesRelationOrderBy>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
  /** 前...条数 */
  first?: InputMaybe<Scalars['Int']>;
  /** 变更内容列表 */
  last?: InputMaybe<Scalars['Int']>;
  /** 偏移条数 */
  offset?: InputMaybe<Scalars['Int']>;
  /** 取...之后 */
  after?: InputMaybe<Scalars['ID']>;
  /** 取...之前 */
  before?: InputMaybe<Scalars['ID']>;
};

/** 用户 手机号 关系 变更参数 */
export type UserPhonesRelationMutationArguments = {
  /** ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 用户 引用 */
  userRef?: InputMaybe<Scalars['String']>;
  /** 用户 */
  user?: InputMaybe<UserInput>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<Scalars['String']>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<Scalars['Int']>;
  /** 域 */
  realmId?: InputMaybe<Scalars['Int']>;
  /** 创建者 */
  createUserId?: InputMaybe<Scalars['String']>;
  /** 创建时间 */
  createTime?: InputMaybe<Scalars['Timestamp']>;
  /** 更新者 */
  updateUserId?: InputMaybe<Scalars['String']>;
  /** 更新时间 */
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  /** 创建组 */
  createGroupId?: InputMaybe<Scalars['String']>;
  /** 变更内容 */
  input?: InputMaybe<UserPhonesRelationInput>;
  /** 匹配条件 */
  where?: InputMaybe<UserPhonesRelationExpression>;
};

/** 用户 手机号 关系 排序 */
export type UserPhonesRelationOrderBy = {
  /** ID */
  id?: InputMaybe<Sort>;
  /** 用户 引用 */
  userRef?: InputMaybe<Sort>;
  /** 用户 */
  user?: InputMaybe<UserOrderBy>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<Sort>;
  /** 已移除 */
  isDeprecated?: InputMaybe<Sort>;
  /** 版本 */
  version?: InputMaybe<Sort>;
  /** 域 */
  realmId?: InputMaybe<Sort>;
  /** 创建者 */
  createUserId?: InputMaybe<Sort>;
  /** 创建时间 */
  createTime?: InputMaybe<Sort>;
  /** 更新者 */
  updateUserId?: InputMaybe<Sort>;
  /** 更新时间 */
  updateTime?: InputMaybe<Sort>;
  /** 创建组 */
  createGroupId?: InputMaybe<Sort>;
  /** 用户 手机号 关系 数量 */
  idCount?: InputMaybe<Sort>;
  /** ID 最大值 */
  idMax?: InputMaybe<Sort>;
  /** ID 最小值 */
  idMin?: InputMaybe<Sort>;
  /** 用户 引用 数量 */
  userRefCount?: InputMaybe<Sort>;
  /** 用户 引用 最大值 */
  userRefMax?: InputMaybe<Sort>;
  /** 用户 引用 最小值 */
  userRefMin?: InputMaybe<Sort>;
  /** 手机号 引用 数量 */
  phonesRefCount?: InputMaybe<Sort>;
  /** 手机号 引用 最大值 */
  phonesRefMax?: InputMaybe<Sort>;
  /** 手机号 引用 最小值 */
  phonesRefMin?: InputMaybe<Sort>;
};

/** 用户 手机号 关系 查询参数 */
export type UserPhonesRelationQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
};

/** 用户 手机号 关系 订阅参数 */
export type UserPhonesRelationSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 用户 引用 */
  userRef?: InputMaybe<StringExpression>;
  /** 用户 */
  user?: InputMaybe<UserExpression>;
  /** 手机号 引用 */
  phonesRef?: InputMaybe<StringExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserPhonesRelationExpression>>>;
};

/** 用户 查询参数 */
export type UserQueryArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 姓名 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 姓氏 */
  lastName?: InputMaybe<StringExpression>;
  /** 账号 */
  login?: InputMaybe<StringExpression>;
  /** 盐 */
  salt?: InputMaybe<StringExpression>;
  /** 哈希 */
  hash?: InputMaybe<StringExpression>;
  /** 邮箱 */
  email?: InputMaybe<StringExpression>;
  /** 手机号 */
  phones?: InputMaybe<StringExpression>;
  /** 禁用 */
  disable?: InputMaybe<BooleanExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};

/** 用户 订阅参数 */
export type UserSubscriptionArguments = {
  /** ID */
  id?: InputMaybe<StringExpression>;
  /** 姓名 */
  name?: InputMaybe<StringExpression>;
  /** 描述 */
  description?: InputMaybe<StringExpression>;
  /** 姓氏 */
  lastName?: InputMaybe<StringExpression>;
  /** 账号 */
  login?: InputMaybe<StringExpression>;
  /** 盐 */
  salt?: InputMaybe<StringExpression>;
  /** 哈希 */
  hash?: InputMaybe<StringExpression>;
  /** 邮箱 */
  email?: InputMaybe<StringExpression>;
  /** 手机号 */
  phones?: InputMaybe<StringExpression>;
  /** 禁用 */
  disable?: InputMaybe<BooleanExpression>;
  /** 组 */
  groups?: InputMaybe<GroupExpression>;
  /** 角色 */
  roles?: InputMaybe<RoleExpression>;
  /** 租户 */
  realm?: InputMaybe<RealmExpression>;
  /** 包含已移除 */
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  /** 版本 */
  version?: InputMaybe<IntExpression>;
  /** 域 */
  realmId?: InputMaybe<IntExpression>;
  /** 创建者 */
  createUserId?: InputMaybe<StringExpression>;
  /** 创建时间 */
  createTime?: InputMaybe<StringExpression>;
  /** 更新者 */
  updateUserId?: InputMaybe<StringExpression>;
  /** 更新时间 */
  updateTime?: InputMaybe<StringExpression>;
  /** 创建组 */
  createGroupId?: InputMaybe<StringExpression>;
  /** 用户 手机号 关系 */
  userPhonesRelation?: InputMaybe<UserPhonesRelationExpression>;
  /** 用户 组 关系 */
  groupUserRelation?: InputMaybe<GroupUserRelationExpression>;
  /** 用户 角色 关系 */
  roleUserRelation?: InputMaybe<RoleUserRelationExpression>;
  /** 分组 */
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  /** 取非 */
  not?: InputMaybe<Scalars['Boolean']>;
  /** 与/或 */
  cond?: InputMaybe<Conditional>;
  /** 查询表达式组 */
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};

export type With = {
  type?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
};
