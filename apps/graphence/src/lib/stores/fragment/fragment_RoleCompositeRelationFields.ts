export const fragment_RoleCompositeRelationFields = /* GraphQL */ `fragment RoleCompositeRelationFields on RoleCompositeRelation {
    id
    roleRef
    role {
      id
      name
      description
    }
    compositeRef
    composite {
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