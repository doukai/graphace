export const fragment_UserPhonesRelationFields = /* GraphQL */ `fragment UserPhonesRelationFields on UserPhonesRelation {
    id
    userRef
    user {
      id
      name
      description
    }
    phonesRef
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
  }`;