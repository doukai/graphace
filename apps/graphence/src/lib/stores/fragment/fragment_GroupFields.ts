export const fragment_GroupFields = /* GraphQL */ `fragment GroupFields on Group {
    id
    name
    description
    path
    deep
    parentId
    parent {
      id
      name
      description
    }
    subGroups {
      id
      name
      description
    }
    users {
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
  }`;

export const fragment_GroupNamedFields = /* GraphQL */ `fragment GroupNamedFields on Group {
    id
    name
    description
  }`;