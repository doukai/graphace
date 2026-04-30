export const fragment_UserFields = /* GraphQL */ `fragment UserFields on User {
    id
    name
    description
    lastName
    login
    salt
    hash
    email
    phones
    disable
    groups {
      id
      name
      description
    }
    roles {
      id
      name
      description
    }
    realm {
      id
      name
      description
    }
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
    syncUserPolicy
  }`;

export const fragment_UserNamedFields = /* GraphQL */ `fragment UserNamedFields on User {
    id
    name
    description
  }`;