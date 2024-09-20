import type { NamespaceGraphqlTranslation } from '../../i18n-types';

const zh: NamespaceGraphqlTranslation = {
	objects: {
		CurrentUser: {
			name: '当前用户',
			fields: {
				id: {
					name: 'ID',
				},
				name: {
					name: '姓名',
				},
				lastName: {
					name: '姓氏',
				},
				login: {
					name: '账号',
				},
				realmId: {
					name: '租户ID',
				},
				groups: {
					name: '组',
				},
				roles: {
					name: '角色',
				}
			}
		},
		File: {
			name: '文件',
			fields: {
				id: {
					name: 'ID',
				},
				name: {
					name: '文件名',
				},
				contentType: {
					name: '类型',
				},
				content: {
					name: '内容',
				},
				url: {
					name: 'URL',
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
				contentTypeCount: {
					name: 'contentTypeCount',
				},
				contentTypeMax: {
					name: 'contentTypeMax',
				},
				contentTypeMin: {
					name: 'contentTypeMin',
				},
				contentCount: {
					name: 'contentCount',
				},
				contentMax: {
					name: 'contentMax',
				},
				contentMin: {
					name: 'contentMin',
				},
				urlCount: {
					name: 'urlCount',
				},
				urlMax: {
					name: 'urlMax',
				},
				urlMin: {
					name: 'urlMin',
				}
			}
		},
		Group: {
			name: '组',
			fields: {
				id: {
					name: 'ID',
				},
				name: {
					name: '名称',
				},
				description: {
					name: '描述',
				},
				path: {
					name: '路径',
				},
				deep: {
					name: '层级',
				},
				parentId: {
					name: '上级ID',
				},
				parent: {
					name: '上级',
				},
				subGroups: {
					name: '下级',
				},
				users: {
					name: '用户',
				},
				roles: {
					name: '角色',
				},
				realm: {
					name: '租户',
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
		Permission: {
			name: '权限',
			fields: {
				name: {
					name: '名称',
				},
				description: {
					name: '描述',
				},
				field: {
					name: '字段',
				},
				type: {
					name: '实体',
				},
				permissionType: {
					name: '权限类型',
				},
				roles: {
					name: '角色',
				},
				realm: {
					name: '租户',
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
				syncPermissionPolicy: {
					name: 'syncPermissionPolicy',
				}
			}
		},
		Policy: {
			name: 'Policy',
			fields: {
				id: {
					name: 'id',
				},
				ptype: {
					name: 'ptype',
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
			name: '租户',
			fields: {
				id: {
					name: 'ID',
				},
				name: {
					name: '名称',
				},
				description: {
					name: '描述',
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
			name: '角色',
			fields: {
				id: {
					name: 'ID',
				},
				name: {
					name: '名称',
				},
				description: {
					name: '描述',
				},
				users: {
					name: '用户',
				},
				groups: {
					name: '组',
				},
				composites: {
					name: '组合',
				},
				permissions: {
					name: '权限',
				},
				realm: {
					name: '租户',
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
		User: {
			name: '用户',
			fields: {
				id: {
					name: 'ID',
				},
				name: {
					name: '姓名',
				},
				description: {
					name: '描述',
				},
				lastName: {
					name: '姓氏',
				},
				login: {
					name: '账号',
				},
				salt: {
					name: '盐',
				},
				hash: {
					name: '哈希',
				},
				email: {
					name: '邮箱',
				},
				files: {
					name: '文件',
				},
				phones: {
					name: '手机号',
				},
				disable: {
					name: '禁用',
				},
				groups: {
					name: '组',
				},
				roles: {
					name: '角色',
				},
				realm: {
					name: '租户',
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
				fileUserRelation: {
					name: 'fileUserRelation',
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
		}
	},
	enums: {
		PermissionType: {
			name: '权限类型',
			values: {
				READ: {
					name: '读取',
				},
				WRITE: {
					name: '写入',
				}
			}
		}
	}
}

export default zh;