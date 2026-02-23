export const fragment_GroupUserRelationFields = /* GraphQL */ `fragment GroupUserRelationFields on GroupUserRelation {
    id
    userRef
    user {
      id
      name
      description
    }
    groupRef
    group {
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