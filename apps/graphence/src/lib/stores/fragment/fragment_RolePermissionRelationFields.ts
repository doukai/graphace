export const fragment_RolePermissionRelationFields = /* GraphQL */ `fragment RolePermissionRelationFields on RolePermissionRelation {
    id
    roleRef
    role {
      id
      name
      description
    }
    permissionRef
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
  }`;