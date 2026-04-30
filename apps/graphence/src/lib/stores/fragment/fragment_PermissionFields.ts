export const fragment_PermissionFields = /* GraphQL */ `fragment PermissionFields on Permission {
    id
    name
    description
    field
    type
    permissionType
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
    syncPermissionPolicy
  }`;