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
  And = 'AND',
  Or = 'OR'
}

export type ConditionalExpression = {
  in?: InputMaybe<Array<InputMaybe<Conditional>>>;
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Conditional>;
};

export type FloatExpression = {
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  opr?: InputMaybe<Operator>;
  skipNull?: InputMaybe<Scalars['Boolean']>;
  val?: InputMaybe<Scalars['Float']>;
};

export enum Function {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  Sum = 'SUM'
}

export type FunctionExpression = {
  in?: InputMaybe<Array<InputMaybe<Function>>>;
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Function>;
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
  isDeprecated?: Maybe<Scalars['Boolean']>;
  organization?: Maybe<Organization>;
  organizationList?: Maybe<Array<Maybe<Organization>>>;
  realmId?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  roleList?: Maybe<Array<Maybe<Role>>>;
  roleRoleType?: Maybe<RoleRoleType>;
  roleRoleTypeList?: Maybe<Array<Maybe<RoleRoleType>>>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userList?: Maybe<Array<Maybe<User>>>;
  userPhones?: Maybe<UserPhones>;
  userPhonesList?: Maybe<Array<Maybe<UserPhones>>>;
  userProfile?: Maybe<UserProfile>;
  userProfileList?: Maybe<Array<Maybe<UserProfile>>>;
  userRole?: Maybe<UserRole>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  userTest1?: Maybe<UserTest1>;
  userTest1List?: Maybe<Array<Maybe<UserTest1>>>;
  userTest2?: Maybe<UserTest2>;
  userTest2List?: Maybe<Array<Maybe<UserTest2>>>;
  version?: Maybe<Scalars['Int']>;
};


export type MutationTypeOrganizationArgs = {
  above?: InputMaybe<OrganizationInput>;
  aboveId?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrganizationExpression>;
};


export type MutationTypeOrganizationListArgs = {
  above?: InputMaybe<OrganizationInput>;
  aboveId?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<OrganizationInput>>>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrganizationExpression>;
};


export type MutationTypeRoleArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<InputMaybe<RoleType>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleExpression>;
};


export type MutationTypeRoleListArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<InputMaybe<RoleType>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleExpression>;
};


export type MutationTypeRoleRoleTypeArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<RoleType>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleRoleTypeExpression>;
};


export type MutationTypeRoleRoleTypeListArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<RoleRoleTypeInput>>>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<RoleType>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleRoleTypeExpression>;
};


export type MutationTypeUserArgs = {
  age?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  login?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<OrganizationInput>;
  organizationId?: InputMaybe<Scalars['Int']>;
  password?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  sex?: InputMaybe<Sex>;
  test1?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  test2?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userProfile?: InputMaybe<UserProfileInput>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserExpression>;
};


export type MutationTypeUserListArgs = {
  age?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserInput>>>;
  login?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<OrganizationInput>;
  organizationId?: InputMaybe<Scalars['Int']>;
  password?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  sex?: InputMaybe<Sex>;
  test1?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  test2?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userProfile?: InputMaybe<UserProfileInput>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserExpression>;
};


export type MutationTypeUserPhonesArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserPhonesExpression>;
};


export type MutationTypeUserPhonesListArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserPhonesInput>>>;
  phone?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserPhonesExpression>;
};


export type MutationTypeUserProfileArgs = {
  address?: InputMaybe<Scalars['String']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  qq?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  userId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserProfileExpression>;
};


export type MutationTypeUserProfileListArgs = {
  address?: InputMaybe<Scalars['String']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserProfileInput>>>;
  qq?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  userId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserProfileExpression>;
};


export type MutationTypeUserRoleArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
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
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserRoleInput>>>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserRoleExpression>;
};


export type MutationTypeUserTest1Args = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  test1?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTest1Expression>;
};


export type MutationTypeUserTest1ListArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserTest1Input>>>;
  realmId?: InputMaybe<Scalars['String']>;
  test1?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTest1Expression>;
};


export type MutationTypeUserTest2Args = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  test2?: InputMaybe<Scalars['Boolean']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTest2Expression>;
};


export type MutationTypeUserTest2ListArgs = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserTest2Input>>>;
  realmId?: InputMaybe<Scalars['String']>;
  test2?: InputMaybe<Scalars['Boolean']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTest2Expression>;
};

export enum Operator {
  Bt = 'BT',
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  In = 'IN',
  Lk = 'LK',
  Lt = 'LT',
  Lte = 'LTE',
  Nbt = 'NBT',
  Neq = 'NEQ',
  Ngt = 'NGT',
  Ngte = 'NGTE',
  Nil = 'NIL',
  Nin = 'NIN',
  Nlk = 'NLK',
  Nlt = 'NLT',
  Nlte = 'NLTE',
  Nnil = 'NNIL'
}

export type OperatorExpression = {
  in?: InputMaybe<Array<InputMaybe<Operator>>>;
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Operator>;
};

export type Organization = Meta & {
  __typename?: 'Organization';
  aboveId?: Maybe<Scalars['Int']>;
  aboveIdAvg?: Maybe<Scalars['Int']>;
  aboveIdCount?: Maybe<Scalars['Int']>;
  aboveIdMax?: Maybe<Scalars['Int']>;
  aboveIdMin?: Maybe<Scalars['Int']>;
  aboveIdSum?: Maybe<Scalars['Int']>;
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['ID']>;
  idMin?: Maybe<Scalars['ID']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  orgLevel3?: Maybe<Array<Maybe<Scalars['Int']>>>;
  realmId?: Maybe<Scalars['String']>;
  roleDisable?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  userByOrg?: Maybe<Array<Maybe<User>>>;
  users?: Maybe<Array<User>>;
  usersAggregate?: Maybe<User>;
  usersConnection?: Maybe<UserConnection>;
  version?: Maybe<Scalars['Int']>;
};


export type OrganizationUsersArgs = {
  after?: InputMaybe<Scalars['ID']>;
  age?: InputMaybe<IntExpression>;
  before?: InputMaybe<Scalars['ID']>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
};


export type OrganizationUsersAggregateArgs = {
  age?: InputMaybe<IntExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
};


export type OrganizationUsersConnectionArgs = {
  age?: InputMaybe<IntExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
};

export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  edges?: Maybe<Array<Maybe<OrganizationEdge>>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type OrganizationEdge = {
  __typename?: 'OrganizationEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<Organization>;
};

export type OrganizationExpression = {
  above?: InputMaybe<OrganizationExpression>;
  aboveId?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<OrganizationExpression>>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};

export type OrganizationInput = {
  above?: InputMaybe<OrganizationInput>;
  aboveId?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  version?: InputMaybe<Scalars['Int']>;
};

export type OrganizationOrderBy = {
  aboveId?: InputMaybe<Sort>;
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

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type Property = {
  name: Scalars['String'];
  required?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  validation?: InputMaybe<ValidationInput>;
};

export type QueryType = Meta & {
  __typename?: 'QueryType';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  findRole2?: Maybe<Array<Maybe<Role>>>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  orgLevel?: Maybe<Scalars['Int']>;
  orgLevel5?: Maybe<Array<Maybe<Scalars['Int']>>>;
  organization?: Maybe<Organization>;
  organizationConnection?: Maybe<OrganizationConnection>;
  organizationList?: Maybe<Array<Maybe<Organization>>>;
  parent2?: Maybe<Organization>;
  realmId?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  roleConnection?: Maybe<RoleConnection>;
  roleDisable2?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  roleList?: Maybe<Array<Maybe<Role>>>;
  roleRoleType?: Maybe<RoleRoleType>;
  roleRoleTypeConnection?: Maybe<RoleRoleTypeConnection>;
  roleRoleTypeList?: Maybe<Array<Maybe<RoleRoleType>>>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userByOrg2?: Maybe<Array<Maybe<User>>>;
  userConnection?: Maybe<UserConnection>;
  userDetail?: Maybe<Scalars['String']>;
  userDetail6?: Maybe<Array<Maybe<Scalars['String']>>>;
  userList?: Maybe<Array<Maybe<User>>>;
  userPhones?: Maybe<UserPhones>;
  userPhonesConnection?: Maybe<UserPhonesConnection>;
  userPhonesList?: Maybe<Array<Maybe<UserPhones>>>;
  userProfile?: Maybe<UserProfile>;
  userProfileConnection?: Maybe<UserProfileConnection>;
  userProfileList?: Maybe<Array<Maybe<UserProfile>>>;
  userRole?: Maybe<UserRole>;
  userRoleConnection?: Maybe<UserRoleConnection>;
  userRoleList?: Maybe<Array<Maybe<UserRole>>>;
  userTest1?: Maybe<UserTest1>;
  userTest1Connection?: Maybe<UserTest1Connection>;
  userTest1List?: Maybe<Array<Maybe<UserTest1>>>;
  userTest2?: Maybe<UserTest2>;
  userTest2Connection?: Maybe<UserTest2Connection>;
  userTest2List?: Maybe<Array<Maybe<UserTest2>>>;
  version?: Maybe<Scalars['Int']>;
};


export type QueryTypeFindRole2Args = {
  disable?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['Int']>;
};


export type QueryTypeOrgLevelArgs = {
  organization?: InputMaybe<OrganizationInput>;
};


export type QueryTypeOrgLevel5Args = {
  organization?: InputMaybe<OrganizationInput>;
};


export type QueryTypeOrganizationArgs = {
  above?: InputMaybe<OrganizationExpression>;
  aboveId?: InputMaybe<IntExpression>;
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
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeOrganizationConnectionArgs = {
  above?: InputMaybe<OrganizationExpression>;
  aboveId?: InputMaybe<IntExpression>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<OrganizationExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrganizationOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeOrganizationListArgs = {
  above?: InputMaybe<OrganizationExpression>;
  aboveId?: InputMaybe<IntExpression>;
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
  orderBy?: InputMaybe<OrganizationOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeParent2Args = {
  organization?: InputMaybe<OrganizationInput>;
};


export type QueryTypeRoleArgs = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRoleConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRoleDisable2Args = {
  organization?: InputMaybe<OrganizationInput>;
};


export type QueryTypeRoleListArgs = {
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
  orderBy?: InputMaybe<RoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRoleRoleTypeArgs = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRoleRoleTypeConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<RoleRoleTypeExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleRoleTypeOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeRoleRoleTypeListArgs = {
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
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleRoleTypeOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserArgs = {
  age?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserByOrg2Args = {
  organization?: InputMaybe<OrganizationInput>;
};


export type QueryTypeUserConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  age?: InputMaybe<IntExpression>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserDetailArgs = {
  user?: InputMaybe<UserInput>;
};


export type QueryTypeUserDetail6Args = {
  user?: InputMaybe<UserInput>;
};


export type QueryTypeUserListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  age?: InputMaybe<IntExpression>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserPhonesArgs = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserPhonesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  phone?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserPhonesListArgs = {
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
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  phone?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserProfileArgs = {
  address?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  qq?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  userId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserProfileConnectionArgs = {
  address?: InputMaybe<StringExpression>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserProfileExpression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserProfileOrderBy>;
  qq?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  userId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserProfileListArgs = {
  address?: InputMaybe<StringExpression>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserProfileOrderBy>;
  qq?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  userId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserRoleArgs = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
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
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
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
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserTest1Args = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  test1?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserTest1ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserTest1Expression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserTest1OrderBy>;
  realmId?: InputMaybe<StringExpression>;
  test1?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserTest1ListArgs = {
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
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserTest1OrderBy>;
  realmId?: InputMaybe<StringExpression>;
  test1?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserTest2Args = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserTest2ConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserTest2Expression>>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserTest2OrderBy>;
  realmId?: InputMaybe<StringExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};


export type QueryTypeUserTest2ListArgs = {
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
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserTest2OrderBy>;
  realmId?: InputMaybe<StringExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};

export type Role = Meta & {
  __typename?: 'Role';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['ID']>;
  idMin?: Maybe<Scalars['ID']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  realmId?: Maybe<Scalars['String']>;
  type: Array<Maybe<RoleType>>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  users?: Maybe<Array<User>>;
  usersAggregate?: Maybe<User>;
  usersConnection?: Maybe<UserConnection>;
  version?: Maybe<Scalars['Int']>;
};


export type RoleTypeArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<RoleType>>>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  opr?: InputMaybe<Operator>;
  sort?: InputMaybe<Sort>;
  val?: InputMaybe<RoleType>;
};


export type RoleUsersArgs = {
  after?: InputMaybe<Scalars['ID']>;
  age?: InputMaybe<IntExpression>;
  before?: InputMaybe<Scalars['ID']>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
};


export type RoleUsersAggregateArgs = {
  age?: InputMaybe<IntExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
};


export type RoleUsersConnectionArgs = {
  age?: InputMaybe<IntExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
};

export type RoleConnection = {
  __typename?: 'RoleConnection';
  edges?: Maybe<Array<Maybe<RoleEdge>>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type RoleEdge = {
  __typename?: 'RoleEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<Role>;
};

export type RoleExpression = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
};

export type RoleInput = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<InputMaybe<RoleType>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>>>;
  version?: InputMaybe<Scalars['Int']>;
};

export type RoleOrderBy = {
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

export type RoleRoleType = Meta & {
  __typename?: 'RoleRoleType';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['ID']>;
  idMin?: Maybe<Scalars['ID']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  realmId?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
  type?: Maybe<RoleType>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type RoleRoleTypeConnection = {
  __typename?: 'RoleRoleTypeConnection';
  edges?: Maybe<Array<Maybe<RoleRoleTypeEdge>>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type RoleRoleTypeEdge = {
  __typename?: 'RoleRoleTypeEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<RoleRoleType>;
};

export type RoleRoleTypeExpression = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<RoleRoleTypeExpression>>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};

export type RoleRoleTypeInput = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<RoleType>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type RoleRoleTypeOrderBy = {
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

export enum RoleType {
  Admin = 'ADMIN',
  Anonymous = 'ANONYMOUS',
  User = 'USER'
}

export type RoleTypeExpression = {
  in?: InputMaybe<Array<InputMaybe<RoleType>>>;
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<RoleType>;
};

export enum Sex {
  Female = 'FEMALE',
  Man = 'MAN'
}

export type SexExpression = {
  in?: InputMaybe<Array<InputMaybe<Sex>>>;
  opr?: InputMaybe<Operator>;
  val?: InputMaybe<Sex>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
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
  age?: Maybe<Scalars['Int']>;
  ageAvg?: Maybe<Scalars['Int']>;
  ageCount?: Maybe<Scalars['Int']>;
  ageMax?: Maybe<Scalars['Int']>;
  ageMin?: Maybe<Scalars['Int']>;
  ageSum?: Maybe<Scalars['Int']>;
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  disable?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['ID']>;
  idMin?: Maybe<Scalars['ID']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  login: Scalars['String'];
  loginCount?: Maybe<Scalars['Int']>;
  loginMax?: Maybe<Scalars['String']>;
  loginMin?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nameCount?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['Int']>;
  organizationIdAvg?: Maybe<Scalars['Int']>;
  organizationIdCount?: Maybe<Scalars['Int']>;
  organizationIdMax?: Maybe<Scalars['Int']>;
  organizationIdMin?: Maybe<Scalars['Int']>;
  organizationIdSum?: Maybe<Scalars['Int']>;
  password: Scalars['String'];
  passwordCount?: Maybe<Scalars['Int']>;
  passwordMax?: Maybe<Scalars['String']>;
  passwordMin?: Maybe<Scalars['String']>;
  phones?: Maybe<Array<Scalars['String']>>;
  realmId?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Role>>;
  rolesAggregate?: Maybe<Role>;
  rolesConnection?: Maybe<RoleConnection>;
  sex?: Maybe<Sex>;
  test1?: Maybe<Array<Scalars['Int']>>;
  test2?: Maybe<Array<Scalars['Boolean']>>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  userDetail2?: Maybe<Scalars['String']>;
  userProfile?: Maybe<UserProfile>;
  version?: Maybe<Scalars['Int']>;
};


export type UserOrganizationArgs = {
  above?: InputMaybe<OrganizationExpression>;
  aboveId?: InputMaybe<IntExpression>;
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
};


export type UserPhonesArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  opr?: InputMaybe<Operator>;
  sort?: InputMaybe<Sort>;
  val?: InputMaybe<Scalars['String']>;
};


export type UserRolesArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringExpression>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  type?: InputMaybe<RoleTypeExpression>;
  users?: InputMaybe<UserExpression>;
};


export type UserRolesAggregateArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  users?: InputMaybe<UserExpression>;
};


export type UserRolesConnectionArgs = {
  id?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  users?: InputMaybe<UserExpression>;
};


export type UserTest1Args = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  opr?: InputMaybe<Operator>;
  sort?: InputMaybe<Sort>;
  val?: InputMaybe<Scalars['Int']>;
};


export type UserTest2Args = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  opr?: InputMaybe<Operator>;
  sort?: InputMaybe<Sort>;
  val?: InputMaybe<Scalars['Boolean']>;
};


export type UserUserProfileArgs = {
  address?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  qq?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  userId?: InputMaybe<StringExpression>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<User>;
};

export type UserExpression = {
  age?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
};

export type UserInput = {
  age?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  login?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<OrganizationInput>;
  organizationId?: InputMaybe<Scalars['Int']>;
  password?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  sex?: InputMaybe<Sex>;
  test1?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  test2?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userProfile?: InputMaybe<UserProfileInput>;
  version?: InputMaybe<Scalars['Int']>;
};

export type UserOrderBy = {
  age?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  disable?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  login?: InputMaybe<Sort>;
  name?: InputMaybe<Sort>;
  organizationId?: InputMaybe<Sort>;
  password?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export type UserPhones = Meta & {
  __typename?: 'UserPhones';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['ID']>;
  idMin?: Maybe<Scalars['ID']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  phone?: Maybe<Scalars['String']>;
  phoneCount?: Maybe<Scalars['Int']>;
  phoneMax?: Maybe<Scalars['String']>;
  phoneMin?: Maybe<Scalars['String']>;
  realmId?: Maybe<Scalars['String']>;
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

export type UserPhonesConnection = {
  __typename?: 'UserPhonesConnection';
  edges?: Maybe<Array<Maybe<UserPhonesEdge>>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserPhonesEdge = {
  __typename?: 'UserPhonesEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<UserPhones>;
};

export type UserPhonesExpression = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};

export type UserPhonesInput = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type UserPhonesOrderBy = {
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  phone?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  userId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export type UserProfile = Meta & {
  __typename?: 'UserProfile';
  address?: Maybe<Scalars['String']>;
  addressCount?: Maybe<Scalars['Int']>;
  addressMax?: Maybe<Scalars['String']>;
  addressMin?: Maybe<Scalars['String']>;
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailCount?: Maybe<Scalars['Int']>;
  emailMax?: Maybe<Scalars['String']>;
  emailMin?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['ID']>;
  idMin?: Maybe<Scalars['ID']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  qq?: Maybe<Scalars['String']>;
  qqCount?: Maybe<Scalars['Int']>;
  qqMax?: Maybe<Scalars['String']>;
  qqMin?: Maybe<Scalars['String']>;
  realmId?: Maybe<Scalars['String']>;
  updateTime?: Maybe<Scalars['Timestamp']>;
  updateUserId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  userIdCount?: Maybe<Scalars['Int']>;
  userIdMax?: Maybe<Scalars['String']>;
  userIdMin?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};


export type UserProfileUserArgs = {
  age?: InputMaybe<IntExpression>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
};

export type UserProfileConnection = {
  __typename?: 'UserProfileConnection';
  edges?: Maybe<Array<Maybe<UserProfileEdge>>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserProfileEdge = {
  __typename?: 'UserProfileEdge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<UserProfile>;
};

export type UserProfileExpression = {
  address?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserProfileExpression>>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  qq?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  userId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
};

export type UserProfileInput = {
  address?: InputMaybe<Scalars['String']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  qq?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  userId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type UserProfileOrderBy = {
  address?: InputMaybe<Sort>;
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  email?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  qq?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  userId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export type UserRole = Meta & {
  __typename?: 'UserRole';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['ID']>;
  idMin?: Maybe<Scalars['ID']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  realmId?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['Int']>;
  roleIdAvg?: Maybe<Scalars['Int']>;
  roleIdCount?: Maybe<Scalars['Int']>;
  roleIdMax?: Maybe<Scalars['Int']>;
  roleIdMin?: Maybe<Scalars['Int']>;
  roleIdSum?: Maybe<Scalars['Int']>;
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

export type UserRoleConnection = {
  __typename?: 'UserRoleConnection';
  edges?: Maybe<Array<Maybe<UserRoleEdge>>>;
  pageInfo: PageInfo;
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
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};

export type UserRoleInput = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
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

export type UserTest1 = Meta & {
  __typename?: 'UserTest1';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['ID']>;
  idMin?: Maybe<Scalars['ID']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  realmId?: Maybe<Scalars['String']>;
  test1?: Maybe<Scalars['Int']>;
  test1Avg?: Maybe<Scalars['Int']>;
  test1Count?: Maybe<Scalars['Int']>;
  test1Max?: Maybe<Scalars['Int']>;
  test1Min?: Maybe<Scalars['Int']>;
  test1Sum?: Maybe<Scalars['Int']>;
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

export type UserTest1Connection = {
  __typename?: 'UserTest1Connection';
  edges?: Maybe<Array<Maybe<UserTest1Edge>>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserTest1Edge = {
  __typename?: 'UserTest1Edge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<UserTest1>;
};

export type UserTest1Expression = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserTest1Expression>>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  test1?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};

export type UserTest1Input = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  test1?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type UserTest1OrderBy = {
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  test1?: InputMaybe<Sort>;
  updateTime?: InputMaybe<Sort>;
  updateUserId?: InputMaybe<Sort>;
  userId?: InputMaybe<Sort>;
  version?: InputMaybe<Sort>;
};

export type UserTest2 = Meta & {
  __typename?: 'UserTest2';
  createGroupId?: Maybe<Scalars['String']>;
  createTime?: Maybe<Scalars['Timestamp']>;
  createUserId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  idCount?: Maybe<Scalars['Int']>;
  idMax?: Maybe<Scalars['ID']>;
  idMin?: Maybe<Scalars['ID']>;
  isDeprecated?: Maybe<Scalars['Boolean']>;
  realmId?: Maybe<Scalars['String']>;
  test2?: Maybe<Scalars['Boolean']>;
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

export type UserTest2Connection = {
  __typename?: 'UserTest2Connection';
  edges?: Maybe<Array<Maybe<UserTest2Edge>>>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserTest2Edge = {
  __typename?: 'UserTest2Edge';
  cursor?: Maybe<Scalars['ID']>;
  node?: Maybe<UserTest2>;
};

export type UserTest2Expression = {
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserTest2Expression>>>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
};

export type UserTest2Input = {
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  test2?: InputMaybe<Scalars['Boolean']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
};

export type UserTest2OrderBy = {
  createGroupId?: InputMaybe<Sort>;
  createTime?: InputMaybe<Sort>;
  createUserId?: InputMaybe<Sort>;
  id?: InputMaybe<Sort>;
  isDeprecated?: InputMaybe<Sort>;
  realmId?: InputMaybe<Sort>;
  test2?: InputMaybe<Sort>;
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

export type MutationCreateGroupIdMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationCreateGroupIdMutation = { __typename?: 'MutationType', createGroupId?: string | null };

export type MutationCreateTimeMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationCreateTimeMutation = { __typename?: 'MutationType', createTime?: any | null };

export type MutationCreateUserIdMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationCreateUserIdMutation = { __typename?: 'MutationType', createUserId?: string | null };

export type MutationIsDeprecatedMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationIsDeprecatedMutation = { __typename?: 'MutationType', isDeprecated?: boolean | null };

export type MutationOrganizationMutationVariables = Exact<{
  above?: InputMaybe<OrganizationInput>;
  aboveId?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>> | InputMaybe<UserInput>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrganizationExpression>;
}>;


export type MutationOrganizationMutation = { __typename?: 'MutationType', organization?: { __typename?: 'Organization', aboveId?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, orgLevel3?: Array<number | null> | null, realmId?: string | null, roleDisable?: Array<boolean | null> | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type MutationOrganizationListMutationVariables = Exact<{
  above?: InputMaybe<OrganizationInput>;
  aboveId?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<OrganizationInput>> | InputMaybe<OrganizationInput>>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>> | InputMaybe<UserInput>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrganizationExpression>;
}>;


export type MutationOrganizationListMutation = { __typename?: 'MutationType', organizationList?: Array<{ __typename?: 'Organization', aboveId?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, orgLevel3?: Array<number | null> | null, realmId?: string | null, roleDisable?: Array<boolean | null> | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type MutationRealmIdMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationRealmIdMutation = { __typename?: 'MutationType', realmId?: string | null };

export type MutationRoleMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<InputMaybe<RoleType>> | InputMaybe<RoleType>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>> | InputMaybe<UserInput>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleExpression>;
}>;


export type MutationRoleMutation = { __typename?: 'MutationType', role?: { __typename?: 'Role', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, realmId?: string | null, type: Array<RoleType | null>, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type MutationRoleListMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<RoleInput>> | InputMaybe<RoleInput>>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<InputMaybe<RoleType>> | InputMaybe<RoleType>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>> | InputMaybe<UserInput>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleExpression>;
}>;


export type MutationRoleListMutation = { __typename?: 'MutationType', roleList?: Array<{ __typename?: 'Role', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, realmId?: string | null, type: Array<RoleType | null>, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type MutationRoleRoleTypeMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<RoleType>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleRoleTypeExpression>;
}>;


export type MutationRoleRoleTypeMutation = { __typename?: 'MutationType', roleRoleType?: { __typename?: 'RoleRoleType', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, type?: RoleType | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type MutationRoleRoleTypeListMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<RoleRoleTypeInput>> | InputMaybe<RoleRoleTypeInput>>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<RoleType>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleRoleTypeExpression>;
}>;


export type MutationRoleRoleTypeListMutation = { __typename?: 'MutationType', roleRoleTypeList?: Array<{ __typename?: 'RoleRoleType', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, type?: RoleType | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type MutationUpdateTimeMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationUpdateTimeMutation = { __typename?: 'MutationType', updateTime?: any | null };

export type MutationUpdateUserIdMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationUpdateUserIdMutation = { __typename?: 'MutationType', updateUserId?: string | null };

export type MutationUserMutationVariables = Exact<{
  age?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  login?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<OrganizationInput>;
  organizationId?: InputMaybe<Scalars['Int']>;
  password?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>> | InputMaybe<RoleInput>>;
  sex?: InputMaybe<Sex>;
  test1?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
  test2?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>> | InputMaybe<Scalars['Boolean']>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userProfile?: InputMaybe<UserProfileInput>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserExpression>;
}>;


export type MutationUserMutation = { __typename?: 'MutationType', user?: { __typename?: 'User', age?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, disable?: boolean | null, id?: string | null, isDeprecated?: boolean | null, login: string, name: string, organizationId?: number | null, password: string, phones?: Array<string> | null, realmId?: string | null, sex?: Sex | null, test1?: Array<number> | null, test2?: Array<boolean> | null, updateTime?: any | null, updateUserId?: string | null, userDetail2?: string | null, version?: number | null } | null };

export type MutationUserListMutationVariables = Exact<{
  age?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserInput>> | InputMaybe<UserInput>>;
  login?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<OrganizationInput>;
  organizationId?: InputMaybe<Scalars['Int']>;
  password?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>> | InputMaybe<RoleInput>>;
  sex?: InputMaybe<Sex>;
  test1?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
  test2?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>> | InputMaybe<Scalars['Boolean']>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userProfile?: InputMaybe<UserProfileInput>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserExpression>;
}>;


export type MutationUserListMutation = { __typename?: 'MutationType', userList?: Array<{ __typename?: 'User', age?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, disable?: boolean | null, id?: string | null, isDeprecated?: boolean | null, login: string, name: string, organizationId?: number | null, password: string, phones?: Array<string> | null, realmId?: string | null, sex?: Sex | null, test1?: Array<number> | null, test2?: Array<boolean> | null, updateTime?: any | null, updateUserId?: string | null, userDetail2?: string | null, version?: number | null } | null> | null };

export type MutationUserPhonesMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserPhonesExpression>;
}>;


export type MutationUserPhonesMutation = { __typename?: 'MutationType', userPhones?: { __typename?: 'UserPhones', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, phone?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type MutationUserPhonesListMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserPhonesInput>> | InputMaybe<UserPhonesInput>>;
  phone?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserPhonesExpression>;
}>;


export type MutationUserPhonesListMutation = { __typename?: 'MutationType', userPhonesList?: Array<{ __typename?: 'UserPhones', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, phone?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type MutationUserProfileMutationVariables = Exact<{
  address?: InputMaybe<Scalars['String']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  qq?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  userId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserProfileExpression>;
}>;


export type MutationUserProfileMutation = { __typename?: 'MutationType', userProfile?: { __typename?: 'UserProfile', address?: string | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, email?: string | null, id?: string | null, isDeprecated?: boolean | null, qq?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: string | null, version?: number | null } | null };

export type MutationUserProfileListMutationVariables = Exact<{
  address?: InputMaybe<Scalars['String']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserProfileInput>> | InputMaybe<UserProfileInput>>;
  qq?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  userId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserProfileExpression>;
}>;


export type MutationUserProfileListMutation = { __typename?: 'MutationType', userProfileList?: Array<{ __typename?: 'UserProfile', address?: string | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, email?: string | null, id?: string | null, isDeprecated?: boolean | null, qq?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: string | null, version?: number | null } | null> | null };

export type MutationUserRoleMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserRoleExpression>;
}>;


export type MutationUserRoleMutation = { __typename?: 'MutationType', userRole?: { __typename?: 'UserRole', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type MutationUserRoleListMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserRoleInput>> | InputMaybe<UserRoleInput>>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserRoleExpression>;
}>;


export type MutationUserRoleListMutation = { __typename?: 'MutationType', userRoleList?: Array<{ __typename?: 'UserRole', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type MutationUserTest1MutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  test1?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTest1Expression>;
}>;


export type MutationUserTest1Mutation = { __typename?: 'MutationType', userTest1?: { __typename?: 'UserTest1', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test1?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type MutationUserTest1ListMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserTest1Input>> | InputMaybe<UserTest1Input>>;
  realmId?: InputMaybe<Scalars['String']>;
  test1?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTest1Expression>;
}>;


export type MutationUserTest1ListMutation = { __typename?: 'MutationType', userTest1List?: Array<{ __typename?: 'UserTest1', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test1?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type MutationUserTest2MutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  test2?: InputMaybe<Scalars['Boolean']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTest2Expression>;
}>;


export type MutationUserTest2Mutation = { __typename?: 'MutationType', userTest2?: { __typename?: 'UserTest2', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test2?: boolean | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type MutationUserTest2ListMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserTest2Input>> | InputMaybe<UserTest2Input>>;
  realmId?: InputMaybe<Scalars['String']>;
  test2?: InputMaybe<Scalars['Boolean']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTest2Expression>;
}>;


export type MutationUserTest2ListMutation = { __typename?: 'MutationType', userTest2List?: Array<{ __typename?: 'UserTest2', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test2?: boolean | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type MutationVersionMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationVersionMutation = { __typename?: 'MutationType', version?: number | null };

export type UpdateCreateGroupIdMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateCreateGroupIdMutation = { __typename?: 'MutationType', createGroupId?: string | null };

export type UpdateCreateTimeMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateCreateTimeMutation = { __typename?: 'MutationType', createTime?: any | null };

export type UpdateCreateUserIdMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateCreateUserIdMutation = { __typename?: 'MutationType', createUserId?: string | null };

export type UpdateIsDeprecatedMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateIsDeprecatedMutation = { __typename?: 'MutationType', isDeprecated?: boolean | null };

export type UpdateOrganizationMutationVariables = Exact<{
  above?: InputMaybe<OrganizationInput>;
  aboveId?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>> | InputMaybe<UserInput>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrganizationExpression>;
}>;


export type UpdateOrganizationMutation = { __typename?: 'MutationType', organization?: { __typename?: 'Organization', aboveId?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, orgLevel3?: Array<number | null> | null, realmId?: string | null, roleDisable?: Array<boolean | null> | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type UpdateOrganizationListMutationVariables = Exact<{
  above?: InputMaybe<OrganizationInput>;
  aboveId?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<OrganizationInput>> | InputMaybe<OrganizationInput>>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>> | InputMaybe<UserInput>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OrganizationExpression>;
}>;


export type UpdateOrganizationListMutation = { __typename?: 'MutationType', organizationList?: Array<{ __typename?: 'Organization', aboveId?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, orgLevel3?: Array<number | null> | null, realmId?: string | null, roleDisable?: Array<boolean | null> | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type UpdateRealmIdMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateRealmIdMutation = { __typename?: 'MutationType', realmId?: string | null };

export type UpdateRoleMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<InputMaybe<RoleType>> | InputMaybe<RoleType>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>> | InputMaybe<UserInput>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleExpression>;
}>;


export type UpdateRoleMutation = { __typename?: 'MutationType', role?: { __typename?: 'Role', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, realmId?: string | null, type: Array<RoleType | null>, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type UpdateRoleListMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<RoleInput>> | InputMaybe<RoleInput>>;
  name?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<InputMaybe<RoleType>> | InputMaybe<RoleType>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<UserInput>> | InputMaybe<UserInput>>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleExpression>;
}>;


export type UpdateRoleListMutation = { __typename?: 'MutationType', roleList?: Array<{ __typename?: 'Role', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, realmId?: string | null, type: Array<RoleType | null>, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type UpdateRoleRoleTypeMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<RoleType>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleRoleTypeExpression>;
}>;


export type UpdateRoleRoleTypeMutation = { __typename?: 'MutationType', roleRoleType?: { __typename?: 'RoleRoleType', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, type?: RoleType | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type UpdateRoleRoleTypeListMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<RoleRoleTypeInput>> | InputMaybe<RoleRoleTypeInput>>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<RoleType>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleRoleTypeExpression>;
}>;


export type UpdateRoleRoleTypeListMutation = { __typename?: 'MutationType', roleRoleTypeList?: Array<{ __typename?: 'RoleRoleType', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, type?: RoleType | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type UpdateUpdateTimeMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateUpdateTimeMutation = { __typename?: 'MutationType', updateTime?: any | null };

export type UpdateUpdateUserIdMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateUpdateUserIdMutation = { __typename?: 'MutationType', updateUserId?: string | null };

export type UpdateUserMutationVariables = Exact<{
  age?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  login?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<OrganizationInput>;
  organizationId?: InputMaybe<Scalars['Int']>;
  password?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>> | InputMaybe<RoleInput>>;
  sex?: InputMaybe<Sex>;
  test1?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
  test2?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>> | InputMaybe<Scalars['Boolean']>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userProfile?: InputMaybe<UserProfileInput>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserExpression>;
}>;


export type UpdateUserMutation = { __typename?: 'MutationType', user?: { __typename?: 'User', age?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, disable?: boolean | null, id?: string | null, isDeprecated?: boolean | null, login: string, name: string, organizationId?: number | null, password: string, phones?: Array<string> | null, realmId?: string | null, sex?: Sex | null, test1?: Array<number> | null, test2?: Array<boolean> | null, updateTime?: any | null, updateUserId?: string | null, userDetail2?: string | null, version?: number | null } | null };

export type UpdateUserListMutationVariables = Exact<{
  age?: InputMaybe<Scalars['Int']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserInput>> | InputMaybe<UserInput>>;
  login?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<OrganizationInput>;
  organizationId?: InputMaybe<Scalars['Int']>;
  password?: InputMaybe<Scalars['String']>;
  phones?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  realmId?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<RoleInput>> | InputMaybe<RoleInput>>;
  sex?: InputMaybe<Sex>;
  test1?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
  test2?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>> | InputMaybe<Scalars['Boolean']>>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userProfile?: InputMaybe<UserProfileInput>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserExpression>;
}>;


export type UpdateUserListMutation = { __typename?: 'MutationType', userList?: Array<{ __typename?: 'User', age?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, disable?: boolean | null, id?: string | null, isDeprecated?: boolean | null, login: string, name: string, organizationId?: number | null, password: string, phones?: Array<string> | null, realmId?: string | null, sex?: Sex | null, test1?: Array<number> | null, test2?: Array<boolean> | null, updateTime?: any | null, updateUserId?: string | null, userDetail2?: string | null, version?: number | null } | null> | null };

export type UpdateUserPhonesMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserPhonesExpression>;
}>;


export type UpdateUserPhonesMutation = { __typename?: 'MutationType', userPhones?: { __typename?: 'UserPhones', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, phone?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type UpdateUserPhonesListMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserPhonesInput>> | InputMaybe<UserPhonesInput>>;
  phone?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserPhonesExpression>;
}>;


export type UpdateUserPhonesListMutation = { __typename?: 'MutationType', userPhonesList?: Array<{ __typename?: 'UserPhones', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, phone?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type UpdateUserProfileMutationVariables = Exact<{
  address?: InputMaybe<Scalars['String']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  qq?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  userId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserProfileExpression>;
}>;


export type UpdateUserProfileMutation = { __typename?: 'MutationType', userProfile?: { __typename?: 'UserProfile', address?: string | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, email?: string | null, id?: string | null, isDeprecated?: boolean | null, qq?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: string | null, version?: number | null } | null };

export type UpdateUserProfileListMutationVariables = Exact<{
  address?: InputMaybe<Scalars['String']>;
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserProfileInput>> | InputMaybe<UserProfileInput>>;
  qq?: InputMaybe<Scalars['String']>;
  realmId?: InputMaybe<Scalars['String']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<UserInput>;
  userId?: InputMaybe<Scalars['String']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserProfileExpression>;
}>;


export type UpdateUserProfileListMutation = { __typename?: 'MutationType', userProfileList?: Array<{ __typename?: 'UserProfile', address?: string | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, email?: string | null, id?: string | null, isDeprecated?: boolean | null, qq?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: string | null, version?: number | null } | null> | null };

export type UpdateUserRoleMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserRoleExpression>;
}>;


export type UpdateUserRoleMutation = { __typename?: 'MutationType', userRole?: { __typename?: 'UserRole', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type UpdateUserRoleListMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserRoleInput>> | InputMaybe<UserRoleInput>>;
  realmId?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserRoleExpression>;
}>;


export type UpdateUserRoleListMutation = { __typename?: 'MutationType', userRoleList?: Array<{ __typename?: 'UserRole', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type UpdateUserTest1MutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  test1?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTest1Expression>;
}>;


export type UpdateUserTest1Mutation = { __typename?: 'MutationType', userTest1?: { __typename?: 'UserTest1', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test1?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type UpdateUserTest1ListMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserTest1Input>> | InputMaybe<UserTest1Input>>;
  realmId?: InputMaybe<Scalars['String']>;
  test1?: InputMaybe<Scalars['Int']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTest1Expression>;
}>;


export type UpdateUserTest1ListMutation = { __typename?: 'MutationType', userTest1List?: Array<{ __typename?: 'UserTest1', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test1?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type UpdateUserTest2MutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<Scalars['String']>;
  test2?: InputMaybe<Scalars['Boolean']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTest2Expression>;
}>;


export type UpdateUserTest2Mutation = { __typename?: 'MutationType', userTest2?: { __typename?: 'UserTest2', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test2?: boolean | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type UpdateUserTest2ListMutationVariables = Exact<{
  createGroupId?: InputMaybe<Scalars['String']>;
  createTime?: InputMaybe<Scalars['Timestamp']>;
  createUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isDeprecated?: InputMaybe<Scalars['Boolean']>;
  list?: InputMaybe<Array<InputMaybe<UserTest2Input>> | InputMaybe<UserTest2Input>>;
  realmId?: InputMaybe<Scalars['String']>;
  test2?: InputMaybe<Scalars['Boolean']>;
  updateTime?: InputMaybe<Scalars['Timestamp']>;
  updateUserId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['Int']>;
  version?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTest2Expression>;
}>;


export type UpdateUserTest2ListMutation = { __typename?: 'MutationType', userTest2List?: Array<{ __typename?: 'UserTest2', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test2?: boolean | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type UpdateVersionMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateVersionMutation = { __typename?: 'MutationType', version?: number | null };

export type QueryCreateGroupIdQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryCreateGroupIdQuery = { __typename?: 'QueryType', createGroupId?: string | null };

export type QueryCreateTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryCreateTimeQuery = { __typename?: 'QueryType', createTime?: any | null };

export type QueryCreateUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryCreateUserIdQuery = { __typename?: 'QueryType', createUserId?: string | null };

export type QueryFindRole2QueryVariables = Exact<{
  disable?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['Int']>;
}>;


export type QueryFindRole2Query = { __typename?: 'QueryType', findRole2?: Array<{ __typename?: 'Role', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, realmId?: string | null, type: Array<RoleType | null>, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type QueryIsDeprecatedQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryIsDeprecatedQuery = { __typename?: 'QueryType', isDeprecated?: boolean | null };

export type QueryOrgLevelQueryVariables = Exact<{
  organization?: InputMaybe<OrganizationInput>;
}>;


export type QueryOrgLevelQuery = { __typename?: 'QueryType', orgLevel?: number | null };

export type QueryOrgLevel5QueryVariables = Exact<{
  organization?: InputMaybe<OrganizationInput>;
}>;


export type QueryOrgLevel5Query = { __typename?: 'QueryType', orgLevel5?: Array<number | null> | null };

export type QueryOrganizationQueryVariables = Exact<{
  above?: InputMaybe<OrganizationExpression>;
  aboveId?: InputMaybe<IntExpression>;
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
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryOrganizationQuery = { __typename?: 'QueryType', organization?: { __typename?: 'Organization', aboveId?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, orgLevel3?: Array<number | null> | null, realmId?: string | null, roleDisable?: Array<boolean | null> | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type QueryOrganizationConnectionQueryVariables = Exact<{
  above?: InputMaybe<OrganizationExpression>;
  aboveId?: InputMaybe<IntExpression>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<OrganizationExpression>> | InputMaybe<OrganizationExpression>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrganizationOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryOrganizationConnectionQuery = { __typename?: 'QueryType', organizationConnection?: { __typename?: 'OrganizationConnection', totalCount?: number | null, edges?: Array<{ __typename?: 'OrganizationEdge', node?: { __typename?: 'Organization', aboveId?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, orgLevel3?: Array<number | null> | null, realmId?: string | null, roleDisable?: Array<boolean | null> | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null } | null> | null } | null };

export type QueryOrganizationListQueryVariables = Exact<{
  above?: InputMaybe<OrganizationExpression>;
  aboveId?: InputMaybe<IntExpression>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrganizationOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryOrganizationListQuery = { __typename?: 'QueryType', organizationList?: Array<{ __typename?: 'Organization', aboveId?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, orgLevel3?: Array<number | null> | null, realmId?: string | null, roleDisable?: Array<boolean | null> | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type QueryParent2QueryVariables = Exact<{
  organization?: InputMaybe<OrganizationInput>;
}>;


export type QueryParent2Query = { __typename?: 'QueryType', parent2?: { __typename?: 'Organization', aboveId?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, orgLevel3?: Array<number | null> | null, realmId?: string | null, roleDisable?: Array<boolean | null> | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type QueryRealmIdQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryRealmIdQuery = { __typename?: 'QueryType', realmId?: string | null };

export type QueryRoleQueryVariables = Exact<{
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryRoleQuery = { __typename?: 'QueryType', role?: { __typename?: 'Role', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, realmId?: string | null, type: Array<RoleType | null>, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type QueryRoleConnectionQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<RoleExpression>> | InputMaybe<RoleExpression>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryRoleConnectionQuery = { __typename?: 'QueryType', roleConnection?: { __typename?: 'RoleConnection', totalCount?: number | null, edges?: Array<{ __typename?: 'RoleEdge', node?: { __typename?: 'Role', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, realmId?: string | null, type: Array<RoleType | null>, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null } | null> | null } | null };

export type QueryRoleDisable2QueryVariables = Exact<{
  organization?: InputMaybe<OrganizationInput>;
}>;


export type QueryRoleDisable2Query = { __typename?: 'QueryType', roleDisable2?: Array<boolean | null> | null };

export type QueryRoleListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  users?: InputMaybe<UserExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryRoleListQuery = { __typename?: 'QueryType', roleList?: Array<{ __typename?: 'Role', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, name: string, realmId?: string | null, type: Array<RoleType | null>, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type QueryRoleRoleTypeQueryVariables = Exact<{
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryRoleRoleTypeQuery = { __typename?: 'QueryType', roleRoleType?: { __typename?: 'RoleRoleType', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, type?: RoleType | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null };

export type QueryRoleRoleTypeConnectionQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<RoleRoleTypeExpression>> | InputMaybe<RoleRoleTypeExpression>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleRoleTypeOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryRoleRoleTypeConnectionQuery = { __typename?: 'QueryType', roleRoleTypeConnection?: { __typename?: 'RoleRoleTypeConnection', totalCount?: number | null, edges?: Array<{ __typename?: 'RoleRoleTypeEdge', node?: { __typename?: 'RoleRoleType', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, type?: RoleType | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null } | null> | null } | null };

export type QueryRoleRoleTypeListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RoleRoleTypeOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  type?: InputMaybe<RoleTypeExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryRoleRoleTypeListQuery = { __typename?: 'QueryType', roleRoleTypeList?: Array<{ __typename?: 'RoleRoleType', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, type?: RoleType | null, updateTime?: any | null, updateUserId?: string | null, version?: number | null } | null> | null };

export type QueryUpdateTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryUpdateTimeQuery = { __typename?: 'QueryType', updateTime?: any | null };

export type QueryUpdateUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryUpdateUserIdQuery = { __typename?: 'QueryType', updateUserId?: string | null };

export type QueryUserQueryVariables = Exact<{
  age?: InputMaybe<IntExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserQuery = { __typename?: 'QueryType', user?: { __typename?: 'User', age?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, disable?: boolean | null, id?: string | null, isDeprecated?: boolean | null, login: string, name: string, organizationId?: number | null, password: string, phones?: Array<string> | null, realmId?: string | null, sex?: Sex | null, test1?: Array<number> | null, test2?: Array<boolean> | null, updateTime?: any | null, updateUserId?: string | null, userDetail2?: string | null, version?: number | null } | null };

export type QueryUserByOrg2QueryVariables = Exact<{
  organization?: InputMaybe<OrganizationInput>;
}>;


export type QueryUserByOrg2Query = { __typename?: 'QueryType', userByOrg2?: Array<{ __typename?: 'User', age?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, disable?: boolean | null, id?: string | null, isDeprecated?: boolean | null, login: string, name: string, organizationId?: number | null, password: string, phones?: Array<string> | null, realmId?: string | null, sex?: Sex | null, test1?: Array<number> | null, test2?: Array<boolean> | null, updateTime?: any | null, updateUserId?: string | null, userDetail2?: string | null, version?: number | null } | null> | null };

export type QueryUserConnectionQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  age?: InputMaybe<IntExpression>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserExpression>> | InputMaybe<UserExpression>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserConnectionQuery = { __typename?: 'QueryType', userConnection?: { __typename?: 'UserConnection', totalCount?: number | null, edges?: Array<{ __typename?: 'UserEdge', node?: { __typename?: 'User', age?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, disable?: boolean | null, id?: string | null, isDeprecated?: boolean | null, login: string, name: string, organizationId?: number | null, password: string, phones?: Array<string> | null, realmId?: string | null, sex?: Sex | null, test1?: Array<number> | null, test2?: Array<boolean> | null, updateTime?: any | null, updateUserId?: string | null, userDetail2?: string | null, version?: number | null } | null } | null> | null } | null };

export type QueryUserDetailQueryVariables = Exact<{
  user?: InputMaybe<UserInput>;
}>;


export type QueryUserDetailQuery = { __typename?: 'QueryType', userDetail?: string | null };

export type QueryUserDetail6QueryVariables = Exact<{
  user?: InputMaybe<UserInput>;
}>;


export type QueryUserDetail6Query = { __typename?: 'QueryType', userDetail6?: Array<string | null> | null };

export type QueryUserListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  age?: InputMaybe<IntExpression>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  disable?: InputMaybe<BooleanExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  login?: InputMaybe<StringExpression>;
  name?: InputMaybe<StringExpression>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserOrderBy>;
  organization?: InputMaybe<OrganizationExpression>;
  organizationId?: InputMaybe<IntExpression>;
  password?: InputMaybe<StringExpression>;
  phones?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  roles?: InputMaybe<RoleExpression>;
  sex?: InputMaybe<SexExpression>;
  test1?: InputMaybe<IntExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userProfile?: InputMaybe<UserProfileExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserListQuery = { __typename?: 'QueryType', userList?: Array<{ __typename?: 'User', age?: number | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, disable?: boolean | null, id?: string | null, isDeprecated?: boolean | null, login: string, name: string, organizationId?: number | null, password: string, phones?: Array<string> | null, realmId?: string | null, sex?: Sex | null, test1?: Array<number> | null, test2?: Array<boolean> | null, updateTime?: any | null, updateUserId?: string | null, userDetail2?: string | null, version?: number | null } | null> | null };

export type QueryUserPhonesQueryVariables = Exact<{
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserPhonesQuery = { __typename?: 'QueryType', userPhones?: { __typename?: 'UserPhones', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, phone?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type QueryUserPhonesConnectionQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserPhonesExpression>> | InputMaybe<UserPhonesExpression>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  phone?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserPhonesConnectionQuery = { __typename?: 'QueryType', userPhonesConnection?: { __typename?: 'UserPhonesConnection', totalCount?: number | null, edges?: Array<{ __typename?: 'UserPhonesEdge', node?: { __typename?: 'UserPhones', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, phone?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null } | null> | null } | null };

export type QueryUserPhonesListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserPhonesOrderBy>;
  phone?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserPhonesListQuery = { __typename?: 'QueryType', userPhonesList?: Array<{ __typename?: 'UserPhones', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, phone?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type QueryUserProfileQueryVariables = Exact<{
  address?: InputMaybe<StringExpression>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  qq?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  userId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserProfileQuery = { __typename?: 'QueryType', userProfile?: { __typename?: 'UserProfile', address?: string | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, email?: string | null, id?: string | null, isDeprecated?: boolean | null, qq?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: string | null, version?: number | null } | null };

export type QueryUserProfileConnectionQueryVariables = Exact<{
  address?: InputMaybe<StringExpression>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserProfileExpression>> | InputMaybe<UserProfileExpression>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserProfileOrderBy>;
  qq?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  userId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserProfileConnectionQuery = { __typename?: 'QueryType', userProfileConnection?: { __typename?: 'UserProfileConnection', totalCount?: number | null, edges?: Array<{ __typename?: 'UserProfileEdge', node?: { __typename?: 'UserProfile', address?: string | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, email?: string | null, id?: string | null, isDeprecated?: boolean | null, qq?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: string | null, version?: number | null } | null } | null> | null } | null };

export type QueryUserProfileListQueryVariables = Exact<{
  address?: InputMaybe<StringExpression>;
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  email?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserProfileOrderBy>;
  qq?: InputMaybe<StringExpression>;
  realmId?: InputMaybe<StringExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  user?: InputMaybe<UserExpression>;
  userId?: InputMaybe<StringExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserProfileListQuery = { __typename?: 'QueryType', userProfileList?: Array<{ __typename?: 'UserProfile', address?: string | null, createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, email?: string | null, id?: string | null, isDeprecated?: boolean | null, qq?: string | null, realmId?: string | null, updateTime?: any | null, updateUserId?: string | null, userId?: string | null, version?: number | null } | null> | null };

export type QueryUserRoleQueryVariables = Exact<{
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserRoleQuery = { __typename?: 'QueryType', userRole?: { __typename?: 'UserRole', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type QueryUserRoleConnectionQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserRoleExpression>> | InputMaybe<UserRoleExpression>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserRoleConnectionQuery = { __typename?: 'QueryType', userRoleConnection?: { __typename?: 'UserRoleConnection', totalCount?: number | null, edges?: Array<{ __typename?: 'UserRoleEdge', node?: { __typename?: 'UserRole', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null } | null> | null } | null };

export type QueryUserRoleListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserRoleOrderBy>;
  realmId?: InputMaybe<StringExpression>;
  roleId?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserRoleListQuery = { __typename?: 'QueryType', userRoleList?: Array<{ __typename?: 'UserRole', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, roleId?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type QueryUserTest1QueryVariables = Exact<{
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  test1?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserTest1Query = { __typename?: 'QueryType', userTest1?: { __typename?: 'UserTest1', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test1?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type QueryUserTest1ConnectionQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserTest1Expression>> | InputMaybe<UserTest1Expression>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserTest1OrderBy>;
  realmId?: InputMaybe<StringExpression>;
  test1?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserTest1ConnectionQuery = { __typename?: 'QueryType', userTest1Connection?: { __typename?: 'UserTest1Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'UserTest1Edge', node?: { __typename?: 'UserTest1', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test1?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null } | null> | null } | null };

export type QueryUserTest1ListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserTest1OrderBy>;
  realmId?: InputMaybe<StringExpression>;
  test1?: InputMaybe<IntExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserTest1ListQuery = { __typename?: 'QueryType', userTest1List?: Array<{ __typename?: 'UserTest1', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test1?: number | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type QueryUserTest2QueryVariables = Exact<{
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  realmId?: InputMaybe<StringExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserTest2Query = { __typename?: 'QueryType', userTest2?: { __typename?: 'UserTest2', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test2?: boolean | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null };

export type QueryUserTest2ConnectionQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  exs?: InputMaybe<Array<InputMaybe<UserTest2Expression>> | InputMaybe<UserTest2Expression>>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserTest2OrderBy>;
  realmId?: InputMaybe<StringExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserTest2ConnectionQuery = { __typename?: 'QueryType', userTest2Connection?: { __typename?: 'UserTest2Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'UserTest2Edge', node?: { __typename?: 'UserTest2', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test2?: boolean | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null } | null> | null } | null };

export type QueryUserTest2ListQueryVariables = Exact<{
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  cond?: InputMaybe<Conditional>;
  createGroupId?: InputMaybe<StringExpression>;
  createTime?: InputMaybe<StringExpression>;
  createUserId?: InputMaybe<StringExpression>;
  first?: InputMaybe<Scalars['Int']>;
  groupBy?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<StringExpression>;
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserTest2OrderBy>;
  realmId?: InputMaybe<StringExpression>;
  test2?: InputMaybe<BooleanExpression>;
  updateTime?: InputMaybe<StringExpression>;
  updateUserId?: InputMaybe<StringExpression>;
  userId?: InputMaybe<IntExpression>;
  version?: InputMaybe<IntExpression>;
}>;


export type QueryUserTest2ListQuery = { __typename?: 'QueryType', userTest2List?: Array<{ __typename?: 'UserTest2', createGroupId?: string | null, createTime?: any | null, createUserId?: string | null, id?: string | null, isDeprecated?: boolean | null, realmId?: string | null, test2?: boolean | null, updateTime?: any | null, updateUserId?: string | null, userId?: number | null, version?: number | null } | null> | null };

export type QueryVersionQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryVersionQuery = { __typename?: 'QueryType', version?: number | null };
