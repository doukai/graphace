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

export type Api = Meta & {
  __typename?: 'Api';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<ApiType>;
  role?: Maybe<Role>;
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
  roleId?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdSum?: Maybe<Scalars['Int']>;
  realmIdAvg?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['Int']>;
  realmIdMin?: Maybe<Scalars['Int']>;
};


export type ApiRoleArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
};


export type ApiRealmArgs = {
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

export type ApiConnection = {
  __typename?: 'ApiConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<ApiEdge>>>;
};

export type ApiConnectionQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<ApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<ApiExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type ApiEdge = {
  __typename?: 'ApiEdge';
  node?: Maybe<Api>;
  cursor?: Maybe<Scalars['ID']>;
};

export type ApiExpression = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<ApiExpression>>>;
};

export type ApiInput = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ApiType>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
};

export type ApiListMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ApiType>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  list?: InputMaybe<Array<InputMaybe<ApiInput>>>;
  where?: InputMaybe<ApiExpression>;
};

export type ApiListQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<ApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<ApiExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type ApiMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ApiType>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ApiExpression>;
};

export type ApiOrderBy = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  type?: InputMaybe<Sort>;
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

export type ApiQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<ApiExpression>>>;
};

export type ApiType =
  | 'QUERY'
  | 'MUTATION'
  | 'SUBSCRIPTION';

export type ApiTypeExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<ApiType>;
  in?: InputMaybe<Array<InputMaybe<ApiType>>>;
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
  parent?: InputMaybe<GroupExpression>;
  subGroups?: InputMaybe<GroupExpression>;
  users?: InputMaybe<UserExpression>;
  roles?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type GroupSubGroupsArgs = {
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
};


export type GroupUsersArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
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
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  password?: InputMaybe<StringExpression>;
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
  password?: InputMaybe<StringExpression>;
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
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  groupId?: Maybe<Scalars['Int']>;
  from?: Maybe<Group>;
  roleId?: Maybe<Scalars['Int']>;
  to?: Maybe<Role>;
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


export type GroupRoleToArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
};

export type GroupRoleConnection = {
  __typename?: 'GroupRoleConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<GroupRoleEdge>>>;
};

export type GroupRoleConnectionQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  groupId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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
  groupId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  groupId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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

export type GroupRoleQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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

export type Menu = Meta & {
  __typename?: 'Menu';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  type: MenuType;
  path?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  folder?: Maybe<Menu>;
  description?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
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
  iconCount?: Maybe<Scalars['Int']>;
  iconMax?: Maybe<Scalars['String']>;
  iconMin?: Maybe<Scalars['String']>;
  descriptionCount?: Maybe<Scalars['Int']>;
  descriptionMax?: Maybe<Scalars['String']>;
  descriptionMin?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Int']>;
  parentIdCount?: Maybe<Scalars['Int']>;
  parentIdSum?: Maybe<Scalars['Int']>;
  parentIdAvg?: Maybe<Scalars['Int']>;
  parentIdMax?: Maybe<Scalars['Int']>;
  parentIdMin?: Maybe<Scalars['Int']>;
  roleId?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdSum?: Maybe<Scalars['Int']>;
  realmIdAvg?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['Int']>;
  realmIdMin?: Maybe<Scalars['Int']>;
};


export type MenuFolderArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type MenuRoleArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
};


export type MenuRealmArgs = {
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

export type MenuConnection = {
  __typename?: 'MenuConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<MenuEdge>>>;
};

export type MenuConnectionQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<MenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<MenuExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type MenuEdge = {
  __typename?: 'MenuEdge';
  node?: Maybe<Menu>;
  cursor?: Maybe<Scalars['ID']>;
};

export type MenuExpression = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  roleId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<MenuExpression>>>;
};

export type MenuInput = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  type: MenuType;
  path?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<MenuInput>;
  description?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
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
  roleId?: InputMaybe<Scalars['Int']>;
};

export type MenuListMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<MenuType>;
  path?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<MenuInput>;
  description?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
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
  roleId?: InputMaybe<Scalars['Int']>;
  list?: InputMaybe<Array<InputMaybe<MenuInput>>>;
  where?: InputMaybe<MenuExpression>;
};

export type MenuListQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<MenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<MenuExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type MenuMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<MenuType>;
  path?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<MenuInput>;
  description?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
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
  roleId?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MenuExpression>;
};

export type MenuOrderBy = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  type?: InputMaybe<Sort>;
  path?: InputMaybe<Sort>;
  icon?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
  parentId?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
};

export type MenuQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  roleId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<MenuExpression>>>;
};

export type MenuType =
  | 'FOLDER'
  | 'PAGE';

export type MenuTypeExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<MenuType>;
  in?: InputMaybe<Array<InputMaybe<MenuType>>>;
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

export type MutationType = Meta & {
  __typename?: 'MutationType';
  login?: Maybe<Scalars['String']>;
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
  api?: Maybe<Api>;
  apiList?: Maybe<Array<Maybe<Api>>>;
  menu?: Maybe<Menu>;
  menuList?: Maybe<Array<Maybe<Menu>>>;
  userPhones?: Maybe<UserPhones>;
  userPhonesList?: Maybe<Array<Maybe<UserPhones>>>;
  userGroup?: Maybe<UserGroup>;
  userGroupList?: Maybe<Array<Maybe<UserGroup>>>;
  userRole?: Maybe<UserRole>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  roleComposite?: Maybe<RoleComposite>;
  roleCompositeList?: Maybe<Array<Maybe<RoleComposite>>>;
  roleApi?: Maybe<RoleApi>;
  roleApiList?: Maybe<Array<Maybe<RoleApi>>>;
  roleMenu?: Maybe<RoleMenu>;
  roleMenuList?: Maybe<Array<Maybe<RoleMenu>>>;
  groupRole?: Maybe<GroupRole>;
  groupRoleList?: Maybe<Array<Maybe<GroupRole>>>;
};


export type MutationTypeLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};


export type MutationTypeUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  login?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
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
  password?: InputMaybe<Scalars['String']>;
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
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  apis?: InputMaybe<Array<InputMaybe<ApiInput>>>;
  menus?: InputMaybe<Array<InputMaybe<MenuInput>>>;
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
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  roleApi?: InputMaybe<Array<InputMaybe<RoleApiInput>>>;
  roleMenu?: InputMaybe<Array<InputMaybe<RoleMenuInput>>>;
  where?: InputMaybe<RoleExpression>;
};


export type MutationTypeRoleListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  apis?: InputMaybe<Array<InputMaybe<ApiInput>>>;
  menus?: InputMaybe<Array<InputMaybe<MenuInput>>>;
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
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  roleApi?: InputMaybe<Array<InputMaybe<RoleApiInput>>>;
  roleMenu?: InputMaybe<Array<InputMaybe<RoleMenuInput>>>;
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
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PermissionType>;
  level?: InputMaybe<PermissionLevel>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
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
  description?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PermissionType>;
  level?: InputMaybe<PermissionLevel>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  list?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  where?: InputMaybe<PermissionExpression>;
};


export type MutationTypeApiArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ApiType>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ApiExpression>;
};


export type MutationTypeApiListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ApiType>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  list?: InputMaybe<Array<InputMaybe<ApiInput>>>;
  where?: InputMaybe<ApiExpression>;
};


export type MutationTypeMenuArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<MenuType>;
  path?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<MenuInput>;
  description?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
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
  roleId?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MenuExpression>;
};


export type MutationTypeMenuListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<MenuType>;
  path?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<MenuInput>;
  description?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleInput>;
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
  roleId?: InputMaybe<Scalars['Int']>;
  list?: InputMaybe<Array<InputMaybe<MenuInput>>>;
  where?: InputMaybe<MenuExpression>;
};


export type MutationTypeUserPhonesArgs = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<UserInput>;
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
  from?: InputMaybe<UserInput>;
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
  from?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<GroupInput>;
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
  from?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<GroupInput>;
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
  from?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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
  from?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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


export type MutationTypeRoleCompositeArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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
  from?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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


export type MutationTypeRoleApiArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  apiId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<ApiInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RoleApiExpression>;
};


export type MutationTypeRoleApiListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  apiId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<ApiInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RoleApiInput>>>;
  where?: InputMaybe<RoleApiExpression>;
};


export type MutationTypeRoleMenuArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  menuId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<MenuInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RoleMenuExpression>;
};


export type MutationTypeRoleMenuListArgs = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  menuId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<MenuInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RoleMenuInput>>>;
  where?: InputMaybe<RoleMenuExpression>;
};


export type MutationTypeGroupRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
  groupId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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
  groupId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<GroupInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<PermissionType>;
  level?: Maybe<PermissionLevel>;
  role?: Maybe<Role>;
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
  roleId?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdSum?: Maybe<Scalars['Int']>;
  realmIdAvg?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['Int']>;
  realmIdMin?: Maybe<Scalars['Int']>;
};


export type PermissionRoleArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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

export type PermissionConnection = {
  __typename?: 'PermissionConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<PermissionEdge>>>;
};

export type PermissionConnectionQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
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

export type PermissionEdge = {
  __typename?: 'PermissionEdge';
  node?: Maybe<Permission>;
  cursor?: Maybe<Scalars['ID']>;
};

export type PermissionExpression = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
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
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PermissionType>;
  level?: InputMaybe<PermissionLevel>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
};

export type PermissionLevel =
  | 'USER'
  | 'GROUP'
  | 'SUB_GROUP'
  | 'REALM'
  | 'ALL';

export type PermissionLevelExpression = {
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<PermissionLevel>;
  in?: InputMaybe<Array<InputMaybe<PermissionLevel>>>;
};

export type PermissionListMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PermissionType>;
  level?: InputMaybe<PermissionLevel>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  list?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  where?: InputMaybe<PermissionExpression>;
};

export type PermissionListQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
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

export type PermissionMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PermissionType>;
  level?: InputMaybe<PermissionLevel>;
  role?: InputMaybe<RoleInput>;
  realm?: InputMaybe<RealmInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PermissionExpression>;
};

export type PermissionOrderBy = {
  id?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  type?: InputMaybe<Sort>;
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

export type PermissionQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
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
  current?: Maybe<CurrentUser>;
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
  api?: Maybe<Api>;
  apiList?: Maybe<Array<Maybe<Api>>>;
  apiConnection?: Maybe<ApiConnection>;
  menu?: Maybe<Menu>;
  menuList?: Maybe<Array<Maybe<Menu>>>;
  menuConnection?: Maybe<MenuConnection>;
  userPhones?: Maybe<UserPhones>;
  userPhonesList?: Maybe<Array<Maybe<UserPhones>>>;
  userPhonesConnection?: Maybe<UserPhonesConnection>;
  userGroup?: Maybe<UserGroup>;
  userGroupList?: Maybe<Array<Maybe<UserGroup>>>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  userRole?: Maybe<UserRole>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  roleComposite?: Maybe<RoleComposite>;
  roleCompositeList?: Maybe<Array<Maybe<RoleComposite>>>;
  roleCompositeConnection?: Maybe<RoleCompositeConnection>;
  roleApi?: Maybe<RoleApi>;
  roleApiList?: Maybe<Array<Maybe<RoleApi>>>;
  roleApiConnection?: Maybe<RoleApiConnection>;
  roleMenu?: Maybe<RoleMenu>;
  roleMenuList?: Maybe<Array<Maybe<RoleMenu>>>;
  roleMenuConnection?: Maybe<RoleMenuConnection>;
  groupRole?: Maybe<GroupRole>;
  groupRoleList?: Maybe<Array<Maybe<GroupRole>>>;
  groupRoleConnection?: Maybe<GroupRoleConnection>;
};


export type QueryTypeUserArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
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
  password?: InputMaybe<StringExpression>;
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
  password?: InputMaybe<StringExpression>;
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
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
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
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
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
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
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


export type QueryTypeApiArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<ApiExpression>>>;
};


export type QueryTypeApiListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<ApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<ApiExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeApiConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<ApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<ApiExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeMenuArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  roleId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<MenuExpression>>>;
};


export type QueryTypeMenuListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<MenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<MenuExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeMenuConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<MenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<MenuExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeUserPhonesArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
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
  from?: InputMaybe<UserExpression>;
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
  from?: InputMaybe<UserExpression>;
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
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
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
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
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
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
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
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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


export type QueryTypeRoleCompositeArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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


export type QueryTypeRoleApiArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  apiId?: InputMaybe<IntExpression>;
  to?: InputMaybe<ApiExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleApiExpression>>>;
};


export type QueryTypeRoleApiListArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  apiId?: InputMaybe<IntExpression>;
  to?: InputMaybe<ApiExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleApiExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeRoleApiConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  apiId?: InputMaybe<IntExpression>;
  to?: InputMaybe<ApiExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleApiExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeRoleMenuArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  menuId?: InputMaybe<IntExpression>;
  to?: InputMaybe<MenuExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleMenuExpression>>>;
};


export type QueryTypeRoleMenuListArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  menuId?: InputMaybe<IntExpression>;
  to?: InputMaybe<MenuExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleMenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleMenuExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type QueryTypeRoleMenuConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  menuId?: InputMaybe<IntExpression>;
  to?: InputMaybe<MenuExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleMenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleMenuExpression>>>;
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
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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

export type Role = Meta & {
  __typename?: 'Role';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
  composites?: Maybe<Array<Maybe<Role>>>;
  permissions?: Maybe<Array<Maybe<Permission>>>;
  apis?: Maybe<Array<Maybe<Api>>>;
  menus?: Maybe<Array<Maybe<Menu>>>;
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
  compositesAggregate?: Maybe<Role>;
  compositesConnection?: Maybe<RoleConnection>;
  permissionsAggregate?: Maybe<Permission>;
  permissionsConnection?: Maybe<PermissionConnection>;
  apisAggregate?: Maybe<Api>;
  apisConnection?: Maybe<ApiConnection>;
  menusAggregate?: Maybe<Menu>;
  menusConnection?: Maybe<MenuConnection>;
  realmIdCount?: Maybe<Scalars['Int']>;
  realmIdSum?: Maybe<Scalars['Int']>;
  realmIdAvg?: Maybe<Scalars['Int']>;
  realmIdMax?: Maybe<Scalars['Int']>;
  realmIdMin?: Maybe<Scalars['Int']>;
  userRole?: Maybe<Array<Maybe<UserRole>>>;
  userRoleAggregate?: Maybe<UserRole>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  roleComposite?: Maybe<Array<Maybe<RoleComposite>>>;
  roleCompositeAggregate?: Maybe<RoleComposite>;
  roleCompositeConnection?: Maybe<RoleCompositeConnection>;
  roleApi?: Maybe<Array<Maybe<RoleApi>>>;
  roleApiAggregate?: Maybe<RoleApi>;
  roleApiConnection?: Maybe<RoleApiConnection>;
  roleMenu?: Maybe<Array<Maybe<RoleMenu>>>;
  roleMenuAggregate?: Maybe<RoleMenu>;
  roleMenuConnection?: Maybe<RoleMenuConnection>;
};


export type RoleUsersArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
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


export type RoleCompositesArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
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
};


export type RoleApisArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<ApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
};


export type RoleMenusArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<MenuOrderBy>;
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
  password?: InputMaybe<StringExpression>;
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
  password?: InputMaybe<StringExpression>;
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
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type RolePermissionsAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type RolePermissionsConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type RoleApisAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type RoleApisConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type RoleMenusAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
};


export type RoleMenusConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
};


export type RoleRoleApiAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  apiId?: InputMaybe<IntExpression>;
  to?: InputMaybe<ApiExpression>;
};


export type RoleRoleApiConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  apiId?: InputMaybe<IntExpression>;
  to?: InputMaybe<ApiExpression>;
};


export type RoleRoleMenuAggregateArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleMenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  menuId?: InputMaybe<IntExpression>;
  to?: InputMaybe<MenuExpression>;
};


export type RoleRoleMenuConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleMenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  menuId?: InputMaybe<IntExpression>;
  to?: InputMaybe<MenuExpression>;
};

export type RoleApi = Meta & {
  __typename?: 'RoleApi';
  id?: Maybe<Scalars['ID']>;
  roleId?: Maybe<Scalars['Int']>;
  from?: Maybe<Role>;
  apiId?: Maybe<Scalars['Int']>;
  to?: Maybe<Api>;
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
  apiIdCount?: Maybe<Scalars['Int']>;
  apiIdSum?: Maybe<Scalars['Int']>;
  apiIdAvg?: Maybe<Scalars['Int']>;
  apiIdMax?: Maybe<Scalars['Int']>;
  apiIdMin?: Maybe<Scalars['Int']>;
};


export type RoleApiFromArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
};


export type RoleApiToArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
};

export type RoleApiConnection = {
  __typename?: 'RoleApiConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RoleApiEdge>>>;
};

export type RoleApiConnectionQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  apiId?: InputMaybe<IntExpression>;
  to?: InputMaybe<ApiExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleApiExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleApiEdge = {
  __typename?: 'RoleApiEdge';
  node?: Maybe<RoleApi>;
  cursor?: Maybe<Scalars['ID']>;
};

export type RoleApiExpression = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  apiId?: InputMaybe<IntExpression>;
  to?: InputMaybe<ApiExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleApiExpression>>>;
};

export type RoleApiInput = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  apiId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<ApiInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
};

export type RoleApiListMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  apiId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<ApiInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RoleApiInput>>>;
  where?: InputMaybe<RoleApiExpression>;
};

export type RoleApiListQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  apiId?: InputMaybe<IntExpression>;
  to?: InputMaybe<ApiExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleApiExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleApiMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  apiId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<ApiInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RoleApiExpression>;
};

export type RoleApiOrderBy = {
  id?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
  apiId?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type RoleApiQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  apiId?: InputMaybe<IntExpression>;
  to?: InputMaybe<ApiExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleApiExpression>>>;
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


export type RoleCompositeFromArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
};


export type RoleCompositeToArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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
  from?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<RoleInput>;
  compositeId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
};

export type RoleInput = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  apis?: InputMaybe<Array<InputMaybe<ApiInput>>>;
  menus?: InputMaybe<Array<InputMaybe<MenuInput>>>;
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
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  roleApi?: InputMaybe<Array<InputMaybe<RoleApiInput>>>;
  roleMenu?: InputMaybe<Array<InputMaybe<RoleMenuInput>>>;
};

export type RoleListMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  apis?: InputMaybe<Array<InputMaybe<ApiInput>>>;
  menus?: InputMaybe<Array<InputMaybe<MenuInput>>>;
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
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  roleApi?: InputMaybe<Array<InputMaybe<RoleApiInput>>>;
  roleMenu?: InputMaybe<Array<InputMaybe<RoleMenuInput>>>;
  list?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  where?: InputMaybe<RoleExpression>;
};

export type RoleListQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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

export type RoleMenu = Meta & {
  __typename?: 'RoleMenu';
  id?: Maybe<Scalars['ID']>;
  roleId?: Maybe<Scalars['Int']>;
  from?: Maybe<Role>;
  menuId?: Maybe<Scalars['Int']>;
  to?: Maybe<Menu>;
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
  menuIdCount?: Maybe<Scalars['Int']>;
  menuIdSum?: Maybe<Scalars['Int']>;
  menuIdAvg?: Maybe<Scalars['Int']>;
  menuIdMax?: Maybe<Scalars['Int']>;
  menuIdMin?: Maybe<Scalars['Int']>;
};


export type RoleMenuFromArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
};


export type RoleMenuToArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  roleId?: InputMaybe<IntExpression>;
};

export type RoleMenuConnection = {
  __typename?: 'RoleMenuConnection';
  totalCount?: Maybe<Scalars['Int']>;
  pageInfo?: Maybe<PageInfo>;
  edges?: Maybe<Array<Maybe<RoleMenuEdge>>>;
};

export type RoleMenuConnectionQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  menuId?: InputMaybe<IntExpression>;
  to?: InputMaybe<MenuExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleMenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleMenuExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleMenuEdge = {
  __typename?: 'RoleMenuEdge';
  node?: Maybe<RoleMenu>;
  cursor?: Maybe<Scalars['ID']>;
};

export type RoleMenuExpression = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  menuId?: InputMaybe<IntExpression>;
  to?: InputMaybe<MenuExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleMenuExpression>>>;
};

export type RoleMenuInput = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  menuId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<MenuInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
};

export type RoleMenuListMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  menuId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<MenuInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Array<InputMaybe<RoleMenuInput>>>;
  where?: InputMaybe<RoleMenuExpression>;
};

export type RoleMenuListQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  menuId?: InputMaybe<IntExpression>;
  to?: InputMaybe<MenuExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleMenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleMenuExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};

export type RoleMenuMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  roleId?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<RoleInput>;
  menuId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<MenuInput>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Int']>;
  realmId?: InputMaybe<Scalars['Int']>;
  createUserId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<RoleMenuExpression>;
};

export type RoleMenuOrderBy = {
  id?: InputMaybe<Sort>;
  roleId?: InputMaybe<Sort>;
  menuId?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
};

export type RoleMenuQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  menuId?: InputMaybe<IntExpression>;
  to?: InputMaybe<MenuExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleMenuExpression>>>;
};

export type RoleMutationTypeArguments = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  composites?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  permissions?: InputMaybe<Array<InputMaybe<PermissionInput>>>;
  apis?: InputMaybe<Array<InputMaybe<ApiInput>>>;
  menus?: InputMaybe<Array<InputMaybe<MenuInput>>>;
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
  roleComposite?: InputMaybe<Array<InputMaybe<RoleCompositeInput>>>;
  roleApi?: InputMaybe<Array<InputMaybe<RoleApiInput>>>;
  roleMenu?: InputMaybe<Array<InputMaybe<RoleMenuInput>>>;
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

export type RoleQueryTypeArguments = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  api?: Maybe<Api>;
  apiList?: Maybe<Array<Maybe<Api>>>;
  apiConnection?: Maybe<ApiConnection>;
  menu?: Maybe<Menu>;
  menuList?: Maybe<Array<Maybe<Menu>>>;
  menuConnection?: Maybe<MenuConnection>;
  userPhones?: Maybe<UserPhones>;
  userPhonesList?: Maybe<Array<Maybe<UserPhones>>>;
  userPhonesConnection?: Maybe<UserPhonesConnection>;
  userGroup?: Maybe<UserGroup>;
  userGroupList?: Maybe<Array<Maybe<UserGroup>>>;
  userGroupConnection?: Maybe<UserGroupConnection>;
  userRole?: Maybe<UserRole>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  roleComposite?: Maybe<RoleComposite>;
  roleCompositeList?: Maybe<Array<Maybe<RoleComposite>>>;
  roleCompositeConnection?: Maybe<RoleCompositeConnection>;
  roleApi?: Maybe<RoleApi>;
  roleApiList?: Maybe<Array<Maybe<RoleApi>>>;
  roleApiConnection?: Maybe<RoleApiConnection>;
  roleMenu?: Maybe<RoleMenu>;
  roleMenuList?: Maybe<Array<Maybe<RoleMenu>>>;
  roleMenuConnection?: Maybe<RoleMenuConnection>;
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
  password?: InputMaybe<StringExpression>;
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
  password?: InputMaybe<StringExpression>;
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
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
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
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
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
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<PermissionTypeExpression>;
  level?: InputMaybe<PermissionLevelExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
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


export type SubscriptionTypeApiArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<ApiExpression>>>;
};


export type SubscriptionTypeApiListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<ApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<ApiExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeApiConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  type?: InputMaybe<ApiTypeExpression>;
  role?: InputMaybe<RoleExpression>;
  realm?: InputMaybe<RealmExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<ApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<ApiExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeMenuArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  roleId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<MenuExpression>>>;
};


export type SubscriptionTypeMenuListArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<MenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<MenuExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeMenuConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<MenuTypeExpression>;
  path?: InputMaybe<StringExpression>;
  icon?: InputMaybe<StringExpression>;
  folder?: InputMaybe<MenuExpression>;
  description?: InputMaybe<StringExpression>;
  role?: InputMaybe<RoleExpression>;
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
  roleId?: InputMaybe<IntExpression>;
  orderBy?: InputMaybe<MenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<MenuExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeUserPhonesArgs = {
  id?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  from?: InputMaybe<UserExpression>;
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
  from?: InputMaybe<UserExpression>;
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
  from?: InputMaybe<UserExpression>;
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
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
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
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
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
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
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
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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


export type SubscriptionTypeRoleCompositeArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<RoleExpression>;
  compositeId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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


export type SubscriptionTypeRoleApiArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  apiId?: InputMaybe<IntExpression>;
  to?: InputMaybe<ApiExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleApiExpression>>>;
};


export type SubscriptionTypeRoleApiListArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  apiId?: InputMaybe<IntExpression>;
  to?: InputMaybe<ApiExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleApiExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeRoleApiConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  apiId?: InputMaybe<IntExpression>;
  to?: InputMaybe<ApiExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleApiOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleApiExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeRoleMenuArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  menuId?: InputMaybe<IntExpression>;
  to?: InputMaybe<MenuExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleMenuExpression>>>;
};


export type SubscriptionTypeRoleMenuListArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  menuId?: InputMaybe<IntExpression>;
  to?: InputMaybe<MenuExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleMenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleMenuExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionTypeRoleMenuConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  from?: InputMaybe<RoleExpression>;
  menuId?: InputMaybe<IntExpression>;
  to?: InputMaybe<MenuExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<IntExpression>;
  realmId?: InputMaybe<IntExpression>;
  createUserId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  orderBy?: InputMaybe<RoleMenuOrderBy>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  cond?: InputMaybe<Conditional>;
  exs?: InputMaybe<Array<InputMaybe<RoleMenuExpression>>>;
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
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  groupId?: InputMaybe<IntExpression>;
  from?: InputMaybe<GroupExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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

export type User = Meta & {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  login: Scalars['String'];
  password?: Maybe<Scalars['String']>;
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
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  from?: InputMaybe<UserExpression>;
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
  from?: InputMaybe<UserExpression>;
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
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
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
  password?: InputMaybe<StringExpression>;
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
  password?: InputMaybe<StringExpression>;
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
  from?: Maybe<User>;
  groupId?: Maybe<Scalars['Int']>;
  to?: Maybe<Group>;
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


export type UserGroupFromArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
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
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
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
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
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
  from?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<GroupInput>;
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
  from?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<GroupInput>;
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
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
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
  from?: InputMaybe<UserInput>;
  groupId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<GroupInput>;
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
  from?: InputMaybe<UserExpression>;
  groupId?: InputMaybe<IntExpression>;
  to?: InputMaybe<GroupExpression>;
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
  password?: InputMaybe<Scalars['String']>;
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
  password?: InputMaybe<Scalars['String']>;
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
  password?: InputMaybe<StringExpression>;
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
  password?: InputMaybe<Scalars['String']>;
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

export type UserPhones = Meta & {
  __typename?: 'UserPhones';
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['Int']>;
  from?: Maybe<User>;
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


export type UserPhonesFromArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
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
  from?: InputMaybe<UserExpression>;
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
  from?: InputMaybe<UserExpression>;
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
  from?: InputMaybe<UserInput>;
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
  from?: InputMaybe<UserInput>;
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
  from?: InputMaybe<UserExpression>;
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
  from?: InputMaybe<UserInput>;
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
  from?: InputMaybe<UserExpression>;
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
  password?: InputMaybe<StringExpression>;
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
  from?: Maybe<User>;
  roleId?: Maybe<Scalars['Int']>;
  to?: Maybe<Role>;
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


export type UserRoleFromArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  lastName?: InputMaybe<StringExpression>;
  login?: InputMaybe<StringExpression>;
  password?: InputMaybe<StringExpression>;
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


export type UserRoleToArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  description?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  composites?: InputMaybe<RoleExpression>;
  permissions?: InputMaybe<PermissionExpression>;
  apis?: InputMaybe<ApiExpression>;
  menus?: InputMaybe<MenuExpression>;
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
  roleComposite?: InputMaybe<RoleCompositeExpression>;
  roleApi?: InputMaybe<RoleApiExpression>;
  roleMenu?: InputMaybe<RoleMenuExpression>;
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
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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
  from?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
  from?: InputMaybe<UserInput>;
  roleId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<RoleInput>;
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
  from?: InputMaybe<UserExpression>;
  roleId?: InputMaybe<IntExpression>;
  to?: InputMaybe<RoleExpression>;
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
