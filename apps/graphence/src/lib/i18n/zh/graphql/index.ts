import type { NamespaceGraphqlTranslation } from '../../i18n-types';

const zh: NamespaceGraphqlTranslation = {
	objects: {
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
					name: '已移除',
				},
				version: {
					name: '版本',
				},
				realmId: {
					name: '域',
				},
				createUserId: {
					name: '创建者',
				},
				createTime: {
					name: '创建时间',
				},
				updateUserId: {
					name: '更新者',
				},
				updateTime: {
					name: '更新时间',
				},
				createGroupId: {
					name: '创建组',
				},
				userPhonesRelation: {
					name: '用户 手机号 关系',
				},
				groupUserRelation: {
					name: '用户 组 关系',
				},
				roleUserRelation: {
					name: '用户 角色 关系',
				},
				groupsAggregate: {
					name: '组 统计字段',
				},
				groupsConnection: {
					name: '组 连接',
				},
				rolesAggregate: {
					name: '角色 统计字段',
				},
				rolesConnection: {
					name: '角色 连接',
				},
				userPhonesRelationAggregate: {
					name: '用户 手机号 关系 统计字段',
				},
				userPhonesRelationConnection: {
					name: '用户 手机号 关系 连接',
				},
				groupUserRelationAggregate: {
					name: '用户 组 关系 统计字段',
				},
				groupUserRelationConnection: {
					name: '用户 组 关系 连接',
				},
				roleUserRelationAggregate: {
					name: '用户 角色 关系 统计字段',
				},
				roleUserRelationConnection: {
					name: '用户 角色 关系 连接',
				},
				idCount: {
					name: '用户 数量',
				},
				idMax: {
					name: 'ID 最大值',
				},
				idMin: {
					name: 'ID 最小值',
				},
				nameCount: {
					name: '姓名 数量',
				},
				nameMax: {
					name: '姓名 最大值',
				},
				nameMin: {
					name: '姓名 最小值',
				},
				descriptionCount: {
					name: '描述 数量',
				},
				descriptionMax: {
					name: '描述 最大值',
				},
				descriptionMin: {
					name: '描述 最小值',
				},
				lastNameCount: {
					name: '姓氏 数量',
				},
				lastNameMax: {
					name: '姓氏 最大值',
				},
				lastNameMin: {
					name: '姓氏 最小值',
				},
				loginCount: {
					name: '账号 数量',
				},
				loginMax: {
					name: '账号 最大值',
				},
				loginMin: {
					name: '账号 最小值',
				},
				saltCount: {
					name: '盐 数量',
				},
				saltMax: {
					name: '盐 最大值',
				},
				saltMin: {
					name: '盐 最小值',
				},
				hashCount: {
					name: '哈希 数量',
				},
				hashMax: {
					name: '哈希 最大值',
				},
				hashMin: {
					name: '哈希 最小值',
				},
				emailCount: {
					name: '邮箱 数量',
				},
				emailMax: {
					name: '邮箱 最大值',
				},
				emailMin: {
					name: '邮箱 最小值',
				},
				syncUserPolicy: {
					name: 'syncUserPolicy',
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
					name: '已移除',
				},
				version: {
					name: '版本',
				},
				realmId: {
					name: '域',
				},
				createUserId: {
					name: '创建者',
				},
				createTime: {
					name: '创建时间',
				},
				updateUserId: {
					name: '更新者',
				},
				updateTime: {
					name: '更新时间',
				},
				createGroupId: {
					name: '创建组',
				},
				roleUserRelation: {
					name: '用户 角色 关系',
				},
				groupRoleRelation: {
					name: '角色 组 关系',
				},
				roleCompositeRelation: {
					name: '角色 角色 关系',
				},
				rolePermissionRelation: {
					name: '角色 权限 关系',
				},
				usersAggregate: {
					name: '用户 统计字段',
				},
				usersConnection: {
					name: '用户 连接',
				},
				groupsAggregate: {
					name: '组 统计字段',
				},
				groupsConnection: {
					name: '组 连接',
				},
				compositesAggregate: {
					name: '组合 统计字段',
				},
				compositesConnection: {
					name: '组合 连接',
				},
				permissionsAggregate: {
					name: '权限 统计字段',
				},
				permissionsConnection: {
					name: '权限 连接',
				},
				roleUserRelationAggregate: {
					name: '用户 角色 关系 统计字段',
				},
				roleUserRelationConnection: {
					name: '用户 角色 关系 连接',
				},
				groupRoleRelationAggregate: {
					name: '角色 组 关系 统计字段',
				},
				groupRoleRelationConnection: {
					name: '角色 组 关系 连接',
				},
				roleCompositeRelationAggregate: {
					name: '角色 角色 关系 统计字段',
				},
				roleCompositeRelationConnection: {
					name: '角色 角色 关系 连接',
				},
				rolePermissionRelationAggregate: {
					name: '角色 权限 关系 统计字段',
				},
				rolePermissionRelationConnection: {
					name: '角色 权限 关系 连接',
				},
				idCount: {
					name: '角色 数量',
				},
				idMax: {
					name: 'ID 最大值',
				},
				idMin: {
					name: 'ID 最小值',
				},
				nameCount: {
					name: '名称 数量',
				},
				nameMax: {
					name: '名称 最大值',
				},
				nameMin: {
					name: '名称 最小值',
				},
				descriptionCount: {
					name: '描述 数量',
				},
				descriptionMax: {
					name: '描述 最大值',
				},
				descriptionMin: {
					name: '描述 最小值',
				},
				syncRolePolicy: {
					name: 'syncRolePolicy',
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
					name: '已移除',
				},
				version: {
					name: '版本',
				},
				realmId: {
					name: '域',
				},
				createUserId: {
					name: '创建者',
				},
				createTime: {
					name: '创建时间',
				},
				updateUserId: {
					name: '更新者',
				},
				updateTime: {
					name: '更新时间',
				},
				createGroupId: {
					name: '创建组',
				},
				groupUserRelation: {
					name: '用户 组 关系',
				},
				groupRoleRelation: {
					name: '角色 组 关系',
				},
				subGroupsAggregate: {
					name: '下级 统计字段',
				},
				subGroupsConnection: {
					name: '下级 连接',
				},
				usersAggregate: {
					name: '用户 统计字段',
				},
				usersConnection: {
					name: '用户 连接',
				},
				rolesAggregate: {
					name: '角色 统计字段',
				},
				rolesConnection: {
					name: '角色 连接',
				},
				groupUserRelationAggregate: {
					name: '用户 组 关系 统计字段',
				},
				groupUserRelationConnection: {
					name: '用户 组 关系 连接',
				},
				groupRoleRelationAggregate: {
					name: '角色 组 关系 统计字段',
				},
				groupRoleRelationConnection: {
					name: '角色 组 关系 连接',
				},
				idCount: {
					name: '组 数量',
				},
				idMax: {
					name: 'ID 最大值',
				},
				idMin: {
					name: 'ID 最小值',
				},
				nameCount: {
					name: '名称 数量',
				},
				nameMax: {
					name: '名称 最大值',
				},
				nameMin: {
					name: '名称 最小值',
				},
				descriptionCount: {
					name: '描述 数量',
				},
				descriptionMax: {
					name: '描述 最大值',
				},
				descriptionMin: {
					name: '描述 最小值',
				},
				pathCount: {
					name: '路径 数量',
				},
				pathMax: {
					name: '路径 最大值',
				},
				pathMin: {
					name: '路径 最小值',
				},
				parentIdCount: {
					name: '上级ID 数量',
				},
				parentIdMax: {
					name: '上级ID 最大值',
				},
				parentIdMin: {
					name: '上级ID 最小值',
				},
				deepCount: {
					name: '层级 数量',
				},
				deepSum: {
					name: '层级 合计',
				},
				deepAvg: {
					name: '层级 平均值',
				},
				deepMax: {
					name: '层级 最大值',
				},
				deepMin: {
					name: '层级 最小值',
				},
				syncGroupPolicy: {
					name: 'syncGroupPolicy',
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
					name: '已移除',
				},
				version: {
					name: '版本',
				},
				realmId: {
					name: '域',
				},
				createUserId: {
					name: '创建者',
				},
				createTime: {
					name: '创建时间',
				},
				updateUserId: {
					name: '更新者',
				},
				updateTime: {
					name: '更新时间',
				},
				createGroupId: {
					name: '创建组',
				},
				idCount: {
					name: '租户 数量',
				},
				idMax: {
					name: 'ID 最大值',
				},
				idMin: {
					name: 'ID 最小值',
				},
				nameCount: {
					name: '名称 数量',
				},
				nameMax: {
					name: '名称 最大值',
				},
				nameMin: {
					name: '名称 最小值',
				},
				descriptionCount: {
					name: '描述 数量',
				},
				descriptionMax: {
					name: '描述 最大值',
				},
				descriptionMin: {
					name: '描述 最小值',
				}
			}
		},
		Permission: {
			name: '权限',
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
					name: '已移除',
				},
				version: {
					name: '版本',
				},
				realmId: {
					name: '域',
				},
				createUserId: {
					name: '创建者',
				},
				createTime: {
					name: '创建时间',
				},
				updateUserId: {
					name: '更新者',
				},
				updateTime: {
					name: '更新时间',
				},
				createGroupId: {
					name: '创建组',
				},
				rolePermissionRelation: {
					name: '角色 权限 关系',
				},
				rolesAggregate: {
					name: '角色 统计字段',
				},
				rolesConnection: {
					name: '角色 连接',
				},
				rolePermissionRelationAggregate: {
					name: '角色 权限 关系 统计字段',
				},
				rolePermissionRelationConnection: {
					name: '角色 权限 关系 连接',
				},
				idCount: {
					name: '权限 数量',
				},
				idMax: {
					name: 'ID 最大值',
				},
				idMin: {
					name: 'ID 最小值',
				},
				nameCount: {
					name: '名称 数量',
				},
				nameMax: {
					name: '名称 最大值',
				},
				nameMin: {
					name: '名称 最小值',
				},
				descriptionCount: {
					name: '描述 数量',
				},
				descriptionMax: {
					name: '描述 最大值',
				},
				descriptionMin: {
					name: '描述 最小值',
				},
				fieldCount: {
					name: '字段 数量',
				},
				fieldMax: {
					name: '字段 最大值',
				},
				fieldMin: {
					name: '字段 最小值',
				},
				typeCount: {
					name: '实体 数量',
				},
				typeMax: {
					name: '实体 最大值',
				},
				typeMin: {
					name: '实体 最小值',
				},
				permissionTypeCount: {
					name: '权限类型 数量',
				},
				permissionTypeMax: {
					name: '权限类型 最大值',
				},
				permissionTypeMin: {
					name: '权限类型 最小值',
				},
				syncPermissionPolicy: {
					name: 'syncPermissionPolicy',
				}
			}
		},
		UserPhonesRelation: {
			name: '用户 手机号 关系',
			fields: {
				id: {
					name: 'ID',
				},
				userRef: {
					name: '用户 引用',
				},
				user: {
					name: '用户',
				},
				phonesRef: {
					name: '手机号 引用',
				},
				isDeprecated: {
					name: '已移除',
				},
				version: {
					name: '版本',
				},
				realmId: {
					name: '域',
				},
				createUserId: {
					name: '创建者',
				},
				createTime: {
					name: '创建时间',
				},
				updateUserId: {
					name: '更新者',
				},
				updateTime: {
					name: '更新时间',
				},
				createGroupId: {
					name: '创建组',
				},
				idCount: {
					name: '用户 手机号 关系 数量',
				},
				idMax: {
					name: 'ID 最大值',
				},
				idMin: {
					name: 'ID 最小值',
				},
				userRefCount: {
					name: '用户 引用 数量',
				},
				userRefMax: {
					name: '用户 引用 最大值',
				},
				userRefMin: {
					name: '用户 引用 最小值',
				},
				phonesRefCount: {
					name: '手机号 引用 数量',
				},
				phonesRefMax: {
					name: '手机号 引用 最大值',
				},
				phonesRefMin: {
					name: '手机号 引用 最小值',
				}
			}
		},
		GroupUserRelation: {
			name: '用户 组 关系',
			fields: {
				id: {
					name: 'ID',
				},
				userRef: {
					name: '用户 引用',
				},
				user: {
					name: '用户',
				},
				groupRef: {
					name: '组 引用',
				},
				group: {
					name: '组',
				},
				isDeprecated: {
					name: '已移除',
				},
				version: {
					name: '版本',
				},
				realmId: {
					name: '域',
				},
				createUserId: {
					name: '创建者',
				},
				createTime: {
					name: '创建时间',
				},
				updateUserId: {
					name: '更新者',
				},
				updateTime: {
					name: '更新时间',
				},
				createGroupId: {
					name: '创建组',
				},
				idCount: {
					name: '用户 组 关系 数量',
				},
				idMax: {
					name: 'ID 最大值',
				},
				idMin: {
					name: 'ID 最小值',
				},
				userRefCount: {
					name: '用户 引用 数量',
				},
				userRefMax: {
					name: '用户 引用 最大值',
				},
				userRefMin: {
					name: '用户 引用 最小值',
				},
				groupRefCount: {
					name: '组 引用 数量',
				},
				groupRefMax: {
					name: '组 引用 最大值',
				},
				groupRefMin: {
					name: '组 引用 最小值',
				}
			}
		},
		RoleUserRelation: {
			name: '用户 角色 关系',
			fields: {
				id: {
					name: 'ID',
				},
				userRef: {
					name: '用户 引用',
				},
				user: {
					name: '用户',
				},
				roleRef: {
					name: '角色 引用',
				},
				role: {
					name: '角色',
				},
				isDeprecated: {
					name: '已移除',
				},
				version: {
					name: '版本',
				},
				realmId: {
					name: '域',
				},
				createUserId: {
					name: '创建者',
				},
				createTime: {
					name: '创建时间',
				},
				updateUserId: {
					name: '更新者',
				},
				updateTime: {
					name: '更新时间',
				},
				createGroupId: {
					name: '创建组',
				},
				idCount: {
					name: '用户 角色 关系 数量',
				},
				idMax: {
					name: 'ID 最大值',
				},
				idMin: {
					name: 'ID 最小值',
				},
				userRefCount: {
					name: '用户 引用 数量',
				},
				userRefMax: {
					name: '用户 引用 最大值',
				},
				userRefMin: {
					name: '用户 引用 最小值',
				},
				roleRefCount: {
					name: '角色 引用 数量',
				},
				roleRefMax: {
					name: '角色 引用 最大值',
				},
				roleRefMin: {
					name: '角色 引用 最小值',
				}
			}
		},
		GroupRoleRelation: {
			name: '角色 组 关系',
			fields: {
				id: {
					name: 'ID',
				},
				roleRef: {
					name: '角色 引用',
				},
				role: {
					name: '角色',
				},
				groupRef: {
					name: '组 引用',
				},
				group: {
					name: '组',
				},
				isDeprecated: {
					name: '已移除',
				},
				version: {
					name: '版本',
				},
				realmId: {
					name: '域',
				},
				createUserId: {
					name: '创建者',
				},
				createTime: {
					name: '创建时间',
				},
				updateUserId: {
					name: '更新者',
				},
				updateTime: {
					name: '更新时间',
				},
				createGroupId: {
					name: '创建组',
				},
				idCount: {
					name: '角色 组 关系 数量',
				},
				idMax: {
					name: 'ID 最大值',
				},
				idMin: {
					name: 'ID 最小值',
				},
				roleRefCount: {
					name: '角色 引用 数量',
				},
				roleRefMax: {
					name: '角色 引用 最大值',
				},
				roleRefMin: {
					name: '角色 引用 最小值',
				},
				groupRefCount: {
					name: '组 引用 数量',
				},
				groupRefMax: {
					name: '组 引用 最大值',
				},
				groupRefMin: {
					name: '组 引用 最小值',
				}
			}
		},
		RoleCompositeRelation: {
			name: '角色 角色 关系',
			fields: {
				id: {
					name: 'ID',
				},
				roleRef: {
					name: '角色 引用',
				},
				role: {
					name: '角色',
				},
				compositeRef: {
					name: '角色 引用',
				},
				composite: {
					name: '角色',
				},
				isDeprecated: {
					name: '已移除',
				},
				version: {
					name: '版本',
				},
				realmId: {
					name: '域',
				},
				createUserId: {
					name: '创建者',
				},
				createTime: {
					name: '创建时间',
				},
				updateUserId: {
					name: '更新者',
				},
				updateTime: {
					name: '更新时间',
				},
				createGroupId: {
					name: '创建组',
				},
				idCount: {
					name: '角色 角色 关系 数量',
				},
				idMax: {
					name: 'ID 最大值',
				},
				idMin: {
					name: 'ID 最小值',
				},
				roleRefCount: {
					name: '角色 引用 数量',
				},
				roleRefMax: {
					name: '角色 引用 最大值',
				},
				roleRefMin: {
					name: '角色 引用 最小值',
				},
				compositeRefCount: {
					name: '角色 引用 数量',
				},
				compositeRefMax: {
					name: '角色 引用 最大值',
				},
				compositeRefMin: {
					name: '角色 引用 最小值',
				}
			}
		},
		RolePermissionRelation: {
			name: '角色 权限 关系',
			fields: {
				id: {
					name: 'ID',
				},
				roleRef: {
					name: '角色 引用',
				},
				role: {
					name: '角色',
				},
				permissionRef: {
					name: '权限 引用',
				},
				permission: {
					name: '权限',
				},
				isDeprecated: {
					name: '已移除',
				},
				version: {
					name: '版本',
				},
				realmId: {
					name: '域',
				},
				createUserId: {
					name: '创建者',
				},
				createTime: {
					name: '创建时间',
				},
				updateUserId: {
					name: '更新者',
				},
				updateTime: {
					name: '更新时间',
				},
				createGroupId: {
					name: '创建组',
				},
				idCount: {
					name: '角色 权限 关系 数量',
				},
				idMax: {
					name: 'ID 最大值',
				},
				idMin: {
					name: 'ID 最小值',
				},
				roleRefCount: {
					name: '角色 引用 数量',
				},
				roleRefMax: {
					name: '角色 引用 最大值',
				},
				roleRefMin: {
					name: '角色 引用 最小值',
				},
				permissionRefCount: {
					name: '权限 引用 数量',
				},
				permissionRefMax: {
					name: '权限 引用 最大值',
				},
				permissionRefMin: {
					name: '权限 引用 最小值',
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
				},
				ANY: {
					name: '全部',
				}
			}
		}
	}
}

export default zh;