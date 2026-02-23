export const fragment_GroupRoleRelationFields = /* GraphQL */ `fragment GroupRoleRelationFields on GroupRoleRelation {
    id
    roleRef
    role {
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