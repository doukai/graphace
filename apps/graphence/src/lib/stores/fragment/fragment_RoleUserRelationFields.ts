export const fragment_RoleUserRelationFields = /* GraphQL */ `fragment RoleUserRelationFields on RoleUserRelation {
    id
    userRef
    user {
      id
      name
      description
    }
    roleRef
    role {
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