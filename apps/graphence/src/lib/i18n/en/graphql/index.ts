import type { BaseTranslation } from '../../i18n-types';

const en: BaseTranslation = {
	objects: {
		Current: {
			name: 'Current',
			fields: {
				id: {
					name: 'id',
				},
				name: {
					name: 'name',
				},
				lastName: {
					name: 'lastName',
				},
				login: {
					name: 'login',
				},
				realmId: {
					name: 'realmId',
				},
				groups: {
					name: 'groups',
				},
				roles: {
					name: 'roles',
				}
			}
		},
		Group: {
			name: 'Group',
			fields: {
				id: {
					name: 'id',
				},
				name: {
					name: 'name',
				},
				description: {
					name: 'description',
				},
				path: {
					name: 'path',
				},
				deep: {
					name: 'deep',
				},
				parentId: {
					name: 'parentId',
				},
				parent: {
					name: 'parent',
				},
				subGroups: {
					name: 'subGroups',
				},
				users: {
					name: 'users',
				},
				roles: {
					name: 'roles',
				},
				realm: {
					name: 'realm',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				groupUserRelation: {
					name: 'groupUserRelation',
				},
				groupRoleRelation: {
					name: 'groupRoleRelation',
				},
				subGroupsAggregate: {
					name: 'subGroupsAggregate',
				},
				subGroupsConnection: {
					name: 'subGroupsConnection',
				},
				usersAggregate: {
					name: 'usersAggregate',
				},
				usersConnection: {
					name: 'usersConnection',
				},
				rolesAggregate: {
					name: 'rolesAggregate',
				},
				rolesConnection: {
					name: 'rolesConnection',
				},
				groupUserRelationAggregate: {
					name: 'groupUserRelationAggregate',
				},
				groupUserRelationConnection: {
					name: 'groupUserRelationConnection',
				},
				groupRoleRelationAggregate: {
					name: 'groupRoleRelationAggregate',
				},
				groupRoleRelationConnection: {
					name: 'groupRoleRelationConnection',
				},
				idCount: {
					name: 'idCount',
				},
				idMax: {
					name: 'idMax',
				},
				idMin: {
					name: 'idMin',
				},
				nameCount: {
					name: 'nameCount',
				},
				nameMax: {
					name: 'nameMax',
				},
				nameMin: {
					name: 'nameMin',
				},
				descriptionCount: {
					name: 'descriptionCount',
				},
				descriptionMax: {
					name: 'descriptionMax',
				},
				descriptionMin: {
					name: 'descriptionMin',
				},
				pathCount: {
					name: 'pathCount',
				},
				pathMax: {
					name: 'pathMax',
				},
				pathMin: {
					name: 'pathMin',
				},
				parentIdCount: {
					name: 'parentIdCount',
				},
				parentIdMax: {
					name: 'parentIdMax',
				},
				parentIdMin: {
					name: 'parentIdMin',
				},
				deepCount: {
					name: 'deepCount',
				},
				deepSum: {
					name: 'deepSum',
				},
				deepAvg: {
					name: 'deepAvg',
				},
				deepMax: {
					name: 'deepMax',
				},
				deepMin: {
					name: 'deepMin',
				},
				syncGroupPolicy: {
					name: 'syncGroupPolicy',
				}
			}
		},
		GroupRoleRelation: {
			name: 'GroupRoleRelation',
			fields: {
				id: {
					name: 'id',
				},
				roleRef: {
					name: 'roleRef',
				},
				role: {
					name: 'role',
				},
				groupRef: {
					name: 'groupRef',
				},
				group: {
					name: 'group',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				idCount: {
					name: 'idCount',
				},
				idMax: {
					name: 'idMax',
				},
				idMin: {
					name: 'idMin',
				},
				roleRefCount: {
					name: 'roleRefCount',
				},
				roleRefMax: {
					name: 'roleRefMax',
				},
				roleRefMin: {
					name: 'roleRefMin',
				},
				groupRefCount: {
					name: 'groupRefCount',
				},
				groupRefMax: {
					name: 'groupRefMax',
				},
				groupRefMin: {
					name: 'groupRefMin',
				}
			}
		},
		GroupUserRelation: {
			name: 'GroupUserRelation',
			fields: {
				id: {
					name: 'id',
				},
				userRef: {
					name: 'userRef',
				},
				user: {
					name: 'user',
				},
				groupRef: {
					name: 'groupRef',
				},
				group: {
					name: 'group',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				idCount: {
					name: 'idCount',
				},
				idMax: {
					name: 'idMax',
				},
				idMin: {
					name: 'idMin',
				},
				userRefCount: {
					name: 'userRefCount',
				},
				userRefMax: {
					name: 'userRefMax',
				},
				userRefMin: {
					name: 'userRefMin',
				},
				groupRefCount: {
					name: 'groupRefCount',
				},
				groupRefMax: {
					name: 'groupRefMax',
				},
				groupRefMin: {
					name: 'groupRefMin',
				}
			}
		},
		Permission: {
			name: 'Permission',
			fields: {
				name: {
					name: 'name',
				},
				description: {
					name: 'description',
				},
				field: {
					name: 'field',
				},
				type: {
					name: 'type',
				},
				permissionType: {
					name: 'permissionType',
				},
				roles: {
					name: 'roles',
				},
				realm: {
					name: 'realm',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				permissionRoleRelation: {
					name: 'permissionRoleRelation',
				},
				rolesAggregate: {
					name: 'rolesAggregate',
				},
				rolesConnection: {
					name: 'rolesConnection',
				},
				permissionRoleRelationAggregate: {
					name: 'permissionRoleRelationAggregate',
				},
				permissionRoleRelationConnection: {
					name: 'permissionRoleRelationConnection',
				},
				nameCount: {
					name: 'nameCount',
				},
				nameMax: {
					name: 'nameMax',
				},
				nameMin: {
					name: 'nameMin',
				},
				descriptionCount: {
					name: 'descriptionCount',
				},
				descriptionMax: {
					name: 'descriptionMax',
				},
				descriptionMin: {
					name: 'descriptionMin',
				},
				fieldCount: {
					name: 'fieldCount',
				},
				fieldMax: {
					name: 'fieldMax',
				},
				fieldMin: {
					name: 'fieldMin',
				},
				typeCount: {
					name: 'typeCount',
				},
				typeMax: {
					name: 'typeMax',
				},
				typeMin: {
					name: 'typeMin',
				},
				permissionTypeCount: {
					name: 'permissionTypeCount',
				},
				permissionTypeMax: {
					name: 'permissionTypeMax',
				},
				permissionTypeMin: {
					name: 'permissionTypeMin',
				},
				syncPermissionPolicy: {
					name: 'syncPermissionPolicy',
				}
			}
		},
		PermissionRoleRelation: {
			name: 'PermissionRoleRelation',
			fields: {
				id: {
					name: 'id',
				},
				roleRef: {
					name: 'roleRef',
				},
				role: {
					name: 'role',
				},
				permissionRef: {
					name: 'permissionRef',
				},
				permission: {
					name: 'permission',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				idCount: {
					name: 'idCount',
				},
				idMax: {
					name: 'idMax',
				},
				idMin: {
					name: 'idMin',
				},
				roleRefCount: {
					name: 'roleRefCount',
				},
				roleRefMax: {
					name: 'roleRefMax',
				},
				roleRefMin: {
					name: 'roleRefMin',
				},
				permissionRefCount: {
					name: 'permissionRefCount',
				},
				permissionRefMax: {
					name: 'permissionRefMax',
				},
				permissionRefMin: {
					name: 'permissionRefMin',
				}
			}
		},
		Policy: {
			name: 'Policy',
			fields: {
				id: {
					name: 'id',
				},
				policy: {
					name: 'policy',
				},
				v0: {
					name: 'v0',
				},
				v1: {
					name: 'v1',
				},
				v2: {
					name: 'v2',
				},
				v3: {
					name: 'v3',
				},
				v4: {
					name: 'v4',
				},
				v5: {
					name: 'v5',
				}
			}
		},
		Realm: {
			name: 'Realm',
			fields: {
				id: {
					name: 'id',
				},
				name: {
					name: 'name',
				},
				description: {
					name: 'description',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				idCount: {
					name: 'idCount',
				},
				idMax: {
					name: 'idMax',
				},
				idMin: {
					name: 'idMin',
				},
				nameCount: {
					name: 'nameCount',
				},
				nameMax: {
					name: 'nameMax',
				},
				nameMin: {
					name: 'nameMin',
				},
				descriptionCount: {
					name: 'descriptionCount',
				},
				descriptionMax: {
					name: 'descriptionMax',
				},
				descriptionMin: {
					name: 'descriptionMin',
				}
			}
		},
		Role: {
			name: 'Role',
			fields: {
				id: {
					name: 'id',
				},
				name: {
					name: 'name',
				},
				description: {
					name: 'description',
				},
				users: {
					name: 'users',
				},
				groups: {
					name: 'groups',
				},
				composites: {
					name: 'composites',
				},
				permissions: {
					name: 'permissions',
				},
				realm: {
					name: 'realm',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				roleUserRelation: {
					name: 'roleUserRelation',
				},
				groupRoleRelation: {
					name: 'groupRoleRelation',
				},
				roleCompositeRelation: {
					name: 'roleCompositeRelation',
				},
				permissionRoleRelation: {
					name: 'permissionRoleRelation',
				},
				usersAggregate: {
					name: 'usersAggregate',
				},
				usersConnection: {
					name: 'usersConnection',
				},
				groupsAggregate: {
					name: 'groupsAggregate',
				},
				groupsConnection: {
					name: 'groupsConnection',
				},
				compositesAggregate: {
					name: 'compositesAggregate',
				},
				compositesConnection: {
					name: 'compositesConnection',
				},
				permissionsAggregate: {
					name: 'permissionsAggregate',
				},
				permissionsConnection: {
					name: 'permissionsConnection',
				},
				roleUserRelationAggregate: {
					name: 'roleUserRelationAggregate',
				},
				roleUserRelationConnection: {
					name: 'roleUserRelationConnection',
				},
				groupRoleRelationAggregate: {
					name: 'groupRoleRelationAggregate',
				},
				groupRoleRelationConnection: {
					name: 'groupRoleRelationConnection',
				},
				roleCompositeRelationAggregate: {
					name: 'roleCompositeRelationAggregate',
				},
				roleCompositeRelationConnection: {
					name: 'roleCompositeRelationConnection',
				},
				permissionRoleRelationAggregate: {
					name: 'permissionRoleRelationAggregate',
				},
				permissionRoleRelationConnection: {
					name: 'permissionRoleRelationConnection',
				},
				idCount: {
					name: 'idCount',
				},
				idMax: {
					name: 'idMax',
				},
				idMin: {
					name: 'idMin',
				},
				nameCount: {
					name: 'nameCount',
				},
				nameMax: {
					name: 'nameMax',
				},
				nameMin: {
					name: 'nameMin',
				},
				descriptionCount: {
					name: 'descriptionCount',
				},
				descriptionMax: {
					name: 'descriptionMax',
				},
				descriptionMin: {
					name: 'descriptionMin',
				},
				syncRolePolicy: {
					name: 'syncRolePolicy',
				}
			}
		},
		RoleCompositeRelation: {
			name: 'RoleCompositeRelation',
			fields: {
				id: {
					name: 'id',
				},
				roleRef: {
					name: 'roleRef',
				},
				role: {
					name: 'role',
				},
				compositeRef: {
					name: 'compositeRef',
				},
				composite: {
					name: 'composite',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				idCount: {
					name: 'idCount',
				},
				idMax: {
					name: 'idMax',
				},
				idMin: {
					name: 'idMin',
				},
				roleRefCount: {
					name: 'roleRefCount',
				},
				roleRefMax: {
					name: 'roleRefMax',
				},
				roleRefMin: {
					name: 'roleRefMin',
				},
				compositeRefCount: {
					name: 'compositeRefCount',
				},
				compositeRefMax: {
					name: 'compositeRefMax',
				},
				compositeRefMin: {
					name: 'compositeRefMin',
				}
			}
		},
		RoleUserRelation: {
			name: 'RoleUserRelation',
			fields: {
				id: {
					name: 'id',
				},
				userRef: {
					name: 'userRef',
				},
				user: {
					name: 'user',
				},
				roleRef: {
					name: 'roleRef',
				},
				role: {
					name: 'role',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				idCount: {
					name: 'idCount',
				},
				idMax: {
					name: 'idMax',
				},
				idMin: {
					name: 'idMin',
				},
				userRefCount: {
					name: 'userRefCount',
				},
				userRefMax: {
					name: 'userRefMax',
				},
				userRefMin: {
					name: 'userRefMin',
				},
				roleRefCount: {
					name: 'roleRefCount',
				},
				roleRefMax: {
					name: 'roleRefMax',
				},
				roleRefMin: {
					name: 'roleRefMin',
				}
			}
		},
		User: {
			name: 'User',
			fields: {
				id: {
					name: 'id',
				},
				name: {
					name: 'name',
				},
				description: {
					name: 'description',
				},
				lastName: {
					name: 'lastName',
				},
				login: {
					name: 'login',
				},
				salt: {
					name: 'salt',
				},
				hash: {
					name: 'hash',
				},
				email: {
					name: 'email',
				},
				phones: {
					name: 'phones',
				},
				disable: {
					name: 'disable',
				},
				groups: {
					name: 'groups',
				},
				roles: {
					name: 'roles',
				},
				realm: {
					name: 'realm',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				userPhonesRelation: {
					name: 'userPhonesRelation',
				},
				groupUserRelation: {
					name: 'groupUserRelation',
				},
				roleUserRelation: {
					name: 'roleUserRelation',
				},
				groupsAggregate: {
					name: 'groupsAggregate',
				},
				groupsConnection: {
					name: 'groupsConnection',
				},
				rolesAggregate: {
					name: 'rolesAggregate',
				},
				rolesConnection: {
					name: 'rolesConnection',
				},
				userPhonesRelationAggregate: {
					name: 'userPhonesRelationAggregate',
				},
				userPhonesRelationConnection: {
					name: 'userPhonesRelationConnection',
				},
				groupUserRelationAggregate: {
					name: 'groupUserRelationAggregate',
				},
				groupUserRelationConnection: {
					name: 'groupUserRelationConnection',
				},
				roleUserRelationAggregate: {
					name: 'roleUserRelationAggregate',
				},
				roleUserRelationConnection: {
					name: 'roleUserRelationConnection',
				},
				idCount: {
					name: 'idCount',
				},
				idMax: {
					name: 'idMax',
				},
				idMin: {
					name: 'idMin',
				},
				nameCount: {
					name: 'nameCount',
				},
				nameMax: {
					name: 'nameMax',
				},
				nameMin: {
					name: 'nameMin',
				},
				descriptionCount: {
					name: 'descriptionCount',
				},
				descriptionMax: {
					name: 'descriptionMax',
				},
				descriptionMin: {
					name: 'descriptionMin',
				},
				lastNameCount: {
					name: 'lastNameCount',
				},
				lastNameMax: {
					name: 'lastNameMax',
				},
				lastNameMin: {
					name: 'lastNameMin',
				},
				loginCount: {
					name: 'loginCount',
				},
				loginMax: {
					name: 'loginMax',
				},
				loginMin: {
					name: 'loginMin',
				},
				saltCount: {
					name: 'saltCount',
				},
				saltMax: {
					name: 'saltMax',
				},
				saltMin: {
					name: 'saltMin',
				},
				hashCount: {
					name: 'hashCount',
				},
				hashMax: {
					name: 'hashMax',
				},
				hashMin: {
					name: 'hashMin',
				},
				emailCount: {
					name: 'emailCount',
				},
				emailMax: {
					name: 'emailMax',
				},
				emailMin: {
					name: 'emailMin',
				},
				syncUserPolicy: {
					name: 'syncUserPolicy',
				}
			}
		},
		UserPhonesRelation: {
			name: 'UserPhonesRelation',
			fields: {
				id: {
					name: 'id',
				},
				userRef: {
					name: 'userRef',
				},
				user: {
					name: 'user',
				},
				phonesRef: {
					name: 'phonesRef',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				idCount: {
					name: 'idCount',
				},
				idMax: {
					name: 'idMax',
				},
				idMin: {
					name: 'idMin',
				},
				userRefCount: {
					name: 'userRefCount',
				},
				userRefMax: {
					name: 'userRefMax',
				},
				userRefMin: {
					name: 'userRefMin',
				},
				phonesRefCount: {
					name: 'phonesRefCount',
				},
				phonesRefMax: {
					name: 'phonesRefMax',
				},
				phonesRefMin: {
					name: 'phonesRefMin',
				}
			}
		}
	},
	enums: {
		PermissionType: {
			name: 'PermissionType',
			values: {
				READ: {
					name: 'READ',
				},
				WRITE: {
					name: 'WRITE',
				}
			}
		}
	}
}

export default en;