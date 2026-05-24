export const fragment_RoleFields = /* GraphQL */ `fragment RoleFields on Role {
    id
    name
    description
    users(first: 3) {
      id
      name
      description
    }
    groups {
      id
      name
      description
    }
    composites {
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
  }`;

export const fragment_RoleNamedFields = /* GraphQL */ `fragment RoleNamedFields on Role {
    id
    name
    description
  }`;