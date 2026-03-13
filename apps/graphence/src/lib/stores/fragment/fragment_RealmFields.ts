export const fragment_RealmFields = /* GraphQL */ `fragment RealmFields on Realm {
    id
    name
    description
    isDeprecated
    version
    realmId
    createUserId
    createTime
    updateUserId
    updateTime
    createGroupId
  }`;

export const fragment_RealmNamedFields = /* GraphQL */ `fragment RealmNamedFields on Realm {
    id
    name
    description
  }`;