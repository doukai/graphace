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

export type Function =
  | 'COUNT'
  | 'MAX'
  | 'MIN'
  | 'SUM'
  | 'AVG';

export type FunctionExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Function>;
  in?: InputMaybe<Array<InputMaybe<Function>>>;
};

export type Group = Meta & {
  __typename?: 'Group';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  deep?: Maybe<Scalars['Int']>;
  parent?: Maybe<Group>;
  subGroups?: Maybe<Array<Maybe<Group>>>;
  users?: Maybe<Array<Maybe<User>>>;
  roles?: Maybe<Array<Maybe<Role>>>;
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
  pathCount?: Maybe<Scalars['Int']>;
  pathMax?: Maybe<Scalars['String']>;
  pathMin?: Maybe<Scalars['String']>;
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
  parentId?: Maybe<Scalars['Int']>;
  parentIdCount?: Maybe<Scalars['Int']>;
  parentIdSum?: Maybe<Scalars['Int']>;
  parentIdAvg?: Maybe<Scalars['Int']>;
  parentIdMax?: Maybe<Scalars['Int']>;
  parentIdMin?: Maybe<Scalars['Int']>;
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
};


export type GroupParentArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type GroupSubGroupsArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
};


export type GroupUsersArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
};


export type GroupSubGroupsAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type GroupSubGroupsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
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

export type GroupConnectionQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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

export type GroupConnectionSubscriptionTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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

export type GroupEdge = {
  __typename?: 'GroupEdge';
  node?: Maybe<Group>;
  cursor?: Maybe<Scalars['ID']>;
};

export type GroupExpression = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};

export type GroupInput = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  path?: InputMaybe<Scalars['String']>;
  deep?: InputMaybe<Scalars['Int']>;
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
  parentId?: InputMaybe<Scalars['Int']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
};

export type GroupListMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  deep?: InputMaybe<Scalars['Int']>;
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
  parentId?: InputMaybe<Scalars['Int']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  list?: InputMaybe<Array<InputMaybe<GroupInput>>>;
  where?: InputMaybe<GroupExpression>;
};

export type GroupListQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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

export type GroupListSubscriptionTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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

export type GroupMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  deep?: InputMaybe<Scalars['Int']>;
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
  parentId?: InputMaybe<Scalars['Int']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  where?: InputMaybe<GroupExpression>;
};

export type GroupOrderBy = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  path?: InputMaybe<Sort>;
  deep?: InputMaybe<Sort>;
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

export type GroupQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
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
};


export type GroupRoleGroupIdTypeArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
};

export type GroupRoleConnection = {
  __typename?: 'GroupRoleConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<GroupRoleEdge>>>;
};

export type GroupRoleConnectionQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupRoleConnectionSubscriptionTypeArguments = {
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
};

export type GroupRoleListMutationTypeArguments = {
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

export type GroupRoleListQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupRoleListSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type GroupRoleMutationTypeArguments = {
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

export type GroupRoleQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
};

export type GroupRoleSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
};

export type GroupSubscriptionTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
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

export type MutationType = Meta & {
  __typename?: 'MutationType';
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


export type MutationTypeUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
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


export type MutationTypeUserListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
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


export type MutationTypeRoleArgs = {
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


export type MutationTypeRoleListArgs = {
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


export type MutationTypeGroupArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  deep?: InputMaybe<Scalars['Int']>;
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
  parentId?: InputMaybe<Scalars['Int']>;
  userGroup?: InputMaybe<Array<InputMaybe<UserGroupInput>>>;
  groupRole?: InputMaybe<Array<InputMaybe<GroupRoleInput>>>;
  where?: InputMaybe<GroupExpression>;
};


export type MutationTypeGroupListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  deep?: InputMaybe<Scalars['Int']>;
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
  realmId?: InputMaybe<Scalars['Int']>;
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
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RealmInput>>>;
  where?: InputMaybe<RealmExpression>;
};


export type MutationTypePermissionArgs = {
  name?: InputMaybe<Scalars['ID']>;
  field?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  permissionType?: InputMaybe<PermissionType>;
  description?: InputMaybe<Scalars['String']>;
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


export type MutationTypePermissionListArgs = {
  name?: InputMaybe<Scalars['ID']>;
  field?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  permissionType?: InputMaybe<PermissionType>;
  description?: InputMaybe<Scalars['String']>;
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


export type MutationTypeUserPhonesArgs = {
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


export type MutationTypeUserPhonesListArgs = {
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


export type MutationTypeUserGroupArgs = {
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


export type MutationTypeUserGroupListArgs = {
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


export type MutationTypeUserRoleArgs = {
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


export type MutationTypeUserRoleListArgs = {
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


export type MutationTypeGroupRoleArgs = {
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


export type MutationTypeGroupRoleListArgs = {
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


export type MutationTypeRoleCompositeArgs = {
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


export type MutationTypeRoleCompositeListArgs = {
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


export type MutationTypeRolePermissionArgs = {
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


export type MutationTypeRolePermissionListArgs = {
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


export type MutationTypeLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
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

export type Permission = Meta & {
  __typename?: 'Permission';
  name: Scalars['ID'];
  field: Scalars['String'];
  type: Scalars['String'];
  permissionType: PermissionType;
  description?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Role>>>;
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
  fieldCount?: Maybe<Scalars['Int']>;
  fieldMax?: Maybe<Scalars['String']>;
  fieldMin?: Maybe<Scalars['String']>;
  typeCount?: Maybe<Scalars['Int']>;
  typeMax?: Maybe<Scalars['String']>;
  typeMin?: Maybe<Scalars['String']>;
  descriptionCount?: Maybe<Scalars['Int']>;
  descriptionMax?: Maybe<Scalars['String']>;
  descriptionMin?: Maybe<Scalars['String']>;
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
};


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
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type PermissionRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
};


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


export type PermissionRolesConnectionArgs = {
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

export type PermissionConnectionQueryTypeArguments = {
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type PermissionConnectionSubscriptionTypeArguments = {
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};

export type PermissionInput = {
  name: Scalars['ID'];
  field: Scalars['String'];
  type: Scalars['String'];
  permissionType: PermissionType;
  description?: InputMaybe<Scalars['String']>;
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
};

export type PermissionListMutationTypeArguments = {
  name?: InputMaybe<Scalars['ID']>;
  field?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  permissionType?: InputMaybe<PermissionType>;
  description?: InputMaybe<Scalars['String']>;
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

export type PermissionListQueryTypeArguments = {
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type PermissionListSubscriptionTypeArguments = {
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type PermissionMutationTypeArguments = {
  name?: InputMaybe<Scalars['ID']>;
  field?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  permissionType?: InputMaybe<PermissionType>;
  description?: InputMaybe<Scalars['String']>;
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
  field?: InputMaybe<Sort>;
  type?: InputMaybe<Sort>;
  permissionType?: InputMaybe<Sort>;
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

export type PermissionQueryTypeArguments = {
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};

export type PermissionSubscriptionTypeArguments = {
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};

export type PermissionType =
  | 'READ'
  | 'WRITE';

export type PermissionTypeExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<PermissionType>;
  in?: InputMaybe<Array<InputMaybe<PermissionType>>>;
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

export type QueryType = Meta & {
  __typename?: 'QueryType';
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
  currentPermissionList?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryTypeUserArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};


export type QueryTypeUserListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};


export type QueryTypeRoleListArgs = {
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
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};


export type QueryTypeGroupListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
  realmId?: InputMaybe<IntExpression>;
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
  realmId?: InputMaybe<IntExpression>;
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
  realmId?: InputMaybe<IntExpression>;
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
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};


export type QueryTypePermissionListArgs = {
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypePermissionConnectionArgs = {
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeUserPhonesArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
};


export type QueryTypeUserPhonesListArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeUserPhonesConnectionArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeUserGroupArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
};


export type QueryTypeUserGroupListArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
};


export type QueryTypeUserRoleListArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeGroupRoleArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
};


export type QueryTypeGroupRoleListArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeRoleCompositeArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
};


export type QueryTypeRoleCompositeListArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeRolePermissionArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
};


export type QueryTypeRolePermissionListArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeRolePermissionConnectionArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type Realm = Meta & {
  __typename?: 'Realm';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
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
};

export type RealmConnection = {
  __typename?: 'RealmConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RealmEdge>>>;
};

export type RealmConnectionQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RealmConnectionSubscriptionTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
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
  name: Scalars['String'];
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
};

export type RealmListMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
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

export type RealmListQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RealmListSubscriptionTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RealmMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
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
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type RealmQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};

export type RealmSubscriptionTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RealmExpression>>>;
};

export type Role = Meta & {
  __typename?: 'Role';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
  groups?: Maybe<Array<Maybe<Group>>>;
  composites?: Maybe<Array<Maybe<Role>>>;
  permissions?: Maybe<Array<Maybe<Permission>>>;
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
};


export type RoleUsersArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<UserOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type RoleGroupsArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
};


export type RoleCompositesArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
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
};


export type RolePermissionsArgs = {
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type RoleRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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


export type RoleGroupsAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type RoleGroupsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


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
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type RolePermissionsAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type RolePermissionsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


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
};

export type RoleCompositeConnection = {
  __typename?: 'RoleCompositeConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RoleCompositeEdge>>>;
};

export type RoleCompositeConnectionQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleCompositeConnectionSubscriptionTypeArguments = {
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
};

export type RoleCompositeListMutationTypeArguments = {
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

export type RoleCompositeListQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleCompositeListSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleCompositeMutationTypeArguments = {
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

export type RoleCompositeQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
};

export type RoleCompositeSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
};

export type RoleConnection = {
  __typename?: 'RoleConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RoleEdge>>>;
};

export type RoleConnectionQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleConnectionSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};

export type RoleInput = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
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
};

export type RoleListMutationTypeArguments = {
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

export type RoleListQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleListSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleMutationTypeArguments = {
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
};


export type RolePermissionPermissionNameTypeArgs = {
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
};

export type RolePermissionConnection = {
  __typename?: 'RolePermissionConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RolePermissionEdge>>>;
};

export type RolePermissionConnectionQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RolePermissionConnectionSubscriptionTypeArguments = {
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
};

export type RolePermissionListMutationTypeArguments = {
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

export type RolePermissionListQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RolePermissionListSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RolePermissionMutationTypeArguments = {
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

export type RolePermissionQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
};

export type RolePermissionSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
};

export type RoleQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};

export type RoleSubscriptionTypeArguments = {
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

export type SubscriptionType = Meta & {
  __typename?: 'SubscriptionType';
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


export type SubscriptionTypeUserArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
};


export type SubscriptionTypeUserListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};


export type SubscriptionTypeRoleListArgs = {
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
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
  parentId?: InputMaybe<IntExpression>;
  userGroup?: InputMaybe<UserGroupExpression>;
  groupRole?: InputMaybe<GroupRoleExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupExpression>>>;
};


export type SubscriptionTypeGroupListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
  realmId?: InputMaybe<IntExpression>;
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
  realmId?: InputMaybe<IntExpression>;
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
  realmId?: InputMaybe<IntExpression>;
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
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
};


export type SubscriptionTypePermissionListArgs = {
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypePermissionConnectionArgs = {
  name?: InputMaybe<StringExpression>;
  field?: InputMaybe<StringExpression>;
  type?: InputMaybe<StringExpression>;
  permissionType?: InputMaybe<PermissionTypeExpression>;
  description?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<PermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeUserPhonesArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
};


export type SubscriptionTypeUserPhonesListArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeUserPhonesConnectionArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeUserGroupArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
};


export type SubscriptionTypeUserGroupListArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
};


export type SubscriptionTypeUserRoleListArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeGroupRoleArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
};


export type SubscriptionTypeGroupRoleListArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<GroupRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeRoleCompositeArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
};


export type SubscriptionTypeRoleCompositeListArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleCompositeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeRolePermissionArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
};


export type SubscriptionTypeRolePermissionListArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeRolePermissionConnectionArgs = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RolePermissionExpression>>>;
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
  salt?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phones?: Maybe<Array<Maybe<Scalars['String']>>>;
  disable?: Maybe<Scalars['Boolean']>;
  groups?: Maybe<Array<Maybe<Group>>>;
  roles?: Maybe<Array<Maybe<Role>>>;
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
};


export type UserPhonesArgs = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Sort>;
};


export type UserGroupsArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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
};


export type UserRolesArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  groups?: InputMaybe<GroupExpression>;
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
};


export type UserRealmArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
};


export type UserGroupsAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type UserGroupsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GroupOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
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
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
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
  groups?: InputMaybe<GroupExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  realm?: InputMaybe<RealmExpression>;
};


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

export type UserConnectionQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserConnectionSubscriptionTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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


export type UserGroupGroupIdTypeArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  path?: InputMaybe<StringExpression>;
  deep?: InputMaybe<IntExpression>;
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

export type UserGroupConnectionQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserGroupConnectionSubscriptionTypeArguments = {
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
};

export type UserGroupListMutationTypeArguments = {
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

export type UserGroupListQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserGroupListSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserGroupMutationTypeArguments = {
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

export type UserGroupQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
};

export type UserGroupSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserGroupExpression>>>;
};

export type UserInput = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  login: Scalars['String'];
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
};

export type UserListMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
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

export type UserListQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserListSubscriptionTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
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

export type UserPhonesConnection = {
  __typename?: 'UserPhonesConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<UserPhonesEdge>>>;
};

export type UserPhonesConnectionQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserPhonesConnectionSubscriptionTypeArguments = {
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
};

export type UserPhonesListMutationTypeArguments = {
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

export type UserPhonesListQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserPhonesListSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserPhonesMutationTypeArguments = {
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

export type UserPhonesQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
};

export type UserPhonesSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
};

export type UserQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
};

export type UserRoleConnection = {
  __typename?: 'UserRoleConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<UserRoleEdge>>>;
};

export type UserRoleConnectionQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserRoleConnectionSubscriptionTypeArguments = {
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
};

export type UserRoleListMutationTypeArguments = {
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

export type UserRoleListQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserRoleListSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type UserRoleMutationTypeArguments = {
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

export type UserRoleQueryTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
};

export type UserRoleSubscriptionTypeArguments = {
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
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>>>;
};

export type UserSubscriptionTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
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
