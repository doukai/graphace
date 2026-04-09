import type { BaseTranslation } from '../../i18n-types';

const en: BaseTranslation = {
	objects: {
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
				nameCount: {
					name: 'nameCount',
				},
				descriptionCount: {
					name: 'descriptionCount',
				},
				lastNameCount: {
					name: 'lastNameCount',
				},
				loginCount: {
					name: 'loginCount',
				},
				saltCount: {
					name: 'saltCount',
				},
				hashCount: {
					name: 'hashCount',
				},
				emailCount: {
					name: 'emailCount',
				},
				disableCount: {
					name: 'disableCount',
				},
				createTimeYear: {
					name: 'createTimeYear',
				},
				createTimeMonth: {
					name: 'createTimeMonth',
				},
				createTimeDay: {
					name: 'createTimeDay',
				},
				createTimeWeek: {
					name: 'createTimeWeek',
				},
				createTimeQuarter: {
					name: 'createTimeQuarter',
				},
				updateTimeYear: {
					name: 'updateTimeYear',
				},
				updateTimeMonth: {
					name: 'updateTimeMonth',
				},
				updateTimeDay: {
					name: 'updateTimeDay',
				},
				updateTimeWeek: {
					name: 'updateTimeWeek',
				},
				updateTimeQuarter: {
					name: 'updateTimeQuarter',
				},
				syncUserPolicy: {
					name: 'syncUserPolicy',
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
				rolePermissionRelation: {
					name: 'rolePermissionRelation',
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
				rolePermissionRelationAggregate: {
					name: 'rolePermissionRelationAggregate',
				},
				rolePermissionRelationConnection: {
					name: 'rolePermissionRelationConnection',
				},
				idCount: {
					name: 'idCount',
				},
				nameCount: {
					name: 'nameCount',
				},
				descriptionCount: {
					name: 'descriptionCount',
				},
				createTimeYear: {
					name: 'createTimeYear',
				},
				createTimeMonth: {
					name: 'createTimeMonth',
				},
				createTimeDay: {
					name: 'createTimeDay',
				},
				createTimeWeek: {
					name: 'createTimeWeek',
				},
				createTimeQuarter: {
					name: 'createTimeQuarter',
				},
				updateTimeYear: {
					name: 'updateTimeYear',
				},
				updateTimeMonth: {
					name: 'updateTimeMonth',
				},
				updateTimeDay: {
					name: 'updateTimeDay',
				},
				updateTimeWeek: {
					name: 'updateTimeWeek',
				},
				updateTimeQuarter: {
					name: 'updateTimeQuarter',
				},
				syncRolePolicy: {
					name: 'syncRolePolicy',
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
				nameCount: {
					name: 'nameCount',
				},
				descriptionCount: {
					name: 'descriptionCount',
				},
				pathCount: {
					name: 'pathCount',
				},
				deepCount: {
					name: 'deepCount',
				},
				parentIdCount: {
					name: 'parentIdCount',
				},
				deepMax: {
					name: 'deepMax',
				},
				deepMin: {
					name: 'deepMin',
				},
				deepSum: {
					name: 'deepSum',
				},
				deepAvg: {
					name: 'deepAvg',
				},
				createTimeYear: {
					name: 'createTimeYear',
				},
				createTimeMonth: {
					name: 'createTimeMonth',
				},
				createTimeDay: {
					name: 'createTimeDay',
				},
				createTimeWeek: {
					name: 'createTimeWeek',
				},
				createTimeQuarter: {
					name: 'createTimeQuarter',
				},
				updateTimeYear: {
					name: 'updateTimeYear',
				},
				updateTimeMonth: {
					name: 'updateTimeMonth',
				},
				updateTimeDay: {
					name: 'updateTimeDay',
				},
				updateTimeWeek: {
					name: 'updateTimeWeek',
				},
				updateTimeQuarter: {
					name: 'updateTimeQuarter',
				},
				syncGroupPolicy: {
					name: 'syncGroupPolicy',
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
				nameCount: {
					name: 'nameCount',
				},
				descriptionCount: {
					name: 'descriptionCount',
				},
				createTimeYear: {
					name: 'createTimeYear',
				},
				createTimeMonth: {
					name: 'createTimeMonth',
				},
				createTimeDay: {
					name: 'createTimeDay',
				},
				createTimeWeek: {
					name: 'createTimeWeek',
				},
				createTimeQuarter: {
					name: 'createTimeQuarter',
				},
				updateTimeYear: {
					name: 'updateTimeYear',
				},
				updateTimeMonth: {
					name: 'updateTimeMonth',
				},
				updateTimeDay: {
					name: 'updateTimeDay',
				},
				updateTimeWeek: {
					name: 'updateTimeWeek',
				},
				updateTimeQuarter: {
					name: 'updateTimeQuarter',
				}
			}
		},
		Permission: {
			name: 'Permission',
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
				rolePermissionRelation: {
					name: 'rolePermissionRelation',
				},
				rolesAggregate: {
					name: 'rolesAggregate',
				},
				rolesConnection: {
					name: 'rolesConnection',
				},
				rolePermissionRelationAggregate: {
					name: 'rolePermissionRelationAggregate',
				},
				rolePermissionRelationConnection: {
					name: 'rolePermissionRelationConnection',
				},
				idCount: {
					name: 'idCount',
				},
				nameCount: {
					name: 'nameCount',
				},
				descriptionCount: {
					name: 'descriptionCount',
				},
				fieldCount: {
					name: 'fieldCount',
				},
				typeCount: {
					name: 'typeCount',
				},
				permissionTypeCount: {
					name: 'permissionTypeCount',
				},
				createTimeYear: {
					name: 'createTimeYear',
				},
				createTimeMonth: {
					name: 'createTimeMonth',
				},
				createTimeDay: {
					name: 'createTimeDay',
				},
				createTimeWeek: {
					name: 'createTimeWeek',
				},
				createTimeQuarter: {
					name: 'createTimeQuarter',
				},
				updateTimeYear: {
					name: 'updateTimeYear',
				},
				updateTimeMonth: {
					name: 'updateTimeMonth',
				},
				updateTimeDay: {
					name: 'updateTimeDay',
				},
				updateTimeWeek: {
					name: 'updateTimeWeek',
				},
				updateTimeQuarter: {
					name: 'updateTimeQuarter',
				},
				syncPermissionPolicy: {
					name: 'syncPermissionPolicy',
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
				userRefCount: {
					name: 'userRefCount',
				},
				phonesRefCount: {
					name: 'phonesRefCount',
				},
				createTimeYear: {
					name: 'createTimeYear',
				},
				createTimeMonth: {
					name: 'createTimeMonth',
				},
				createTimeDay: {
					name: 'createTimeDay',
				},
				createTimeWeek: {
					name: 'createTimeWeek',
				},
				createTimeQuarter: {
					name: 'createTimeQuarter',
				},
				updateTimeYear: {
					name: 'updateTimeYear',
				},
				updateTimeMonth: {
					name: 'updateTimeMonth',
				},
				updateTimeDay: {
					name: 'updateTimeDay',
				},
				updateTimeWeek: {
					name: 'updateTimeWeek',
				},
				updateTimeQuarter: {
					name: 'updateTimeQuarter',
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
				userRefCount: {
					name: 'userRefCount',
				},
				groupRefCount: {
					name: 'groupRefCount',
				},
				createTimeYear: {
					name: 'createTimeYear',
				},
				createTimeMonth: {
					name: 'createTimeMonth',
				},
				createTimeDay: {
					name: 'createTimeDay',
				},
				createTimeWeek: {
					name: 'createTimeWeek',
				},
				createTimeQuarter: {
					name: 'createTimeQuarter',
				},
				updateTimeYear: {
					name: 'updateTimeYear',
				},
				updateTimeMonth: {
					name: 'updateTimeMonth',
				},
				updateTimeDay: {
					name: 'updateTimeDay',
				},
				updateTimeWeek: {
					name: 'updateTimeWeek',
				},
				updateTimeQuarter: {
					name: 'updateTimeQuarter',
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
				userRefCount: {
					name: 'userRefCount',
				},
				roleRefCount: {
					name: 'roleRefCount',
				},
				createTimeYear: {
					name: 'createTimeYear',
				},
				createTimeMonth: {
					name: 'createTimeMonth',
				},
				createTimeDay: {
					name: 'createTimeDay',
				},
				createTimeWeek: {
					name: 'createTimeWeek',
				},
				createTimeQuarter: {
					name: 'createTimeQuarter',
				},
				updateTimeYear: {
					name: 'updateTimeYear',
				},
				updateTimeMonth: {
					name: 'updateTimeMonth',
				},
				updateTimeDay: {
					name: 'updateTimeDay',
				},
				updateTimeWeek: {
					name: 'updateTimeWeek',
				},
				updateTimeQuarter: {
					name: 'updateTimeQuarter',
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
				roleRefCount: {
					name: 'roleRefCount',
				},
				groupRefCount: {
					name: 'groupRefCount',
				},
				createTimeYear: {
					name: 'createTimeYear',
				},
				createTimeMonth: {
					name: 'createTimeMonth',
				},
				createTimeDay: {
					name: 'createTimeDay',
				},
				createTimeWeek: {
					name: 'createTimeWeek',
				},
				createTimeQuarter: {
					name: 'createTimeQuarter',
				},
				updateTimeYear: {
					name: 'updateTimeYear',
				},
				updateTimeMonth: {
					name: 'updateTimeMonth',
				},
				updateTimeDay: {
					name: 'updateTimeDay',
				},
				updateTimeWeek: {
					name: 'updateTimeWeek',
				},
				updateTimeQuarter: {
					name: 'updateTimeQuarter',
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
				roleRefCount: {
					name: 'roleRefCount',
				},
				compositeRefCount: {
					name: 'compositeRefCount',
				},
				createTimeYear: {
					name: 'createTimeYear',
				},
				createTimeMonth: {
					name: 'createTimeMonth',
				},
				createTimeDay: {
					name: 'createTimeDay',
				},
				createTimeWeek: {
					name: 'createTimeWeek',
				},
				createTimeQuarter: {
					name: 'createTimeQuarter',
				},
				updateTimeYear: {
					name: 'updateTimeYear',
				},
				updateTimeMonth: {
					name: 'updateTimeMonth',
				},
				updateTimeDay: {
					name: 'updateTimeDay',
				},
				updateTimeWeek: {
					name: 'updateTimeWeek',
				},
				updateTimeQuarter: {
					name: 'updateTimeQuarter',
				}
			}
		},
		RolePermissionRelation: {
			name: 'RolePermissionRelation',
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
				roleRefCount: {
					name: 'roleRefCount',
				},
				permissionRefCount: {
					name: 'permissionRefCount',
				},
				createTimeYear: {
					name: 'createTimeYear',
				},
				createTimeMonth: {
					name: 'createTimeMonth',
				},
				createTimeDay: {
					name: 'createTimeDay',
				},
				createTimeWeek: {
					name: 'createTimeWeek',
				},
				createTimeQuarter: {
					name: 'createTimeQuarter',
				},
				updateTimeYear: {
					name: 'updateTimeYear',
				},
				updateTimeMonth: {
					name: 'updateTimeMonth',
				},
				updateTimeDay: {
					name: 'updateTimeDay',
				},
				updateTimeWeek: {
					name: 'updateTimeWeek',
				},
				updateTimeQuarter: {
					name: 'updateTimeQuarter',
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
				},
				ANY: {
					name: 'ANY',
				}
			}
		}
	}
}

export default en;