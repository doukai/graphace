import type { NamespaceGraphqlTranslation } from '../../i18n-types'

const zh: NamespaceGraphqlTranslation = {
	objects: {
		CurrentUser: {
			name: '当前用户',
			fields: {
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
					name: 'realmId',
				},
				groups: {
					name: '组织',
				},
				roles: {
					name: '角色',
				}
			}
		},
		Group: {
			name: '组织',
			fields: {
				id: {
					name: 'id',
				},
				name: {
					name: '组织名',
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
				parentId: {
					name: 'parentId',
				},
				userGroup: {
					name: 'userGroup',
				},
				groupRole: {
					name: 'groupRole',
				}
			}
		},
		GroupRole: {
			name: 'GroupRole',
			fields: {
				id: {
					name: 'id',
				},
				groupId: {
					name: 'groupId',
				},
				from: {
					name: 'from',
				},
				roleId: {
					name: 'roleId',
				},
				to: {
					name: 'to',
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
				}
			}
		},
		Permission: {
			name: '权限',
			fields: {
				id: {
					name: 'id',
				},
				name: {
					name: '名称',
				},
				ofTypeName: {
					name: 'ofTypeName',
				},
				description: {
					name: '说明',
				},
				level: {
					name: '权限级别',
				},
				role: {
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
				roleId: {
					name: 'roleId',
				}
			}
		},
		Realm: {
			name: '租户',
			fields: {
				id: {
					name: 'id',
				},
				name: {
					name: '租户名',
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
				}
			}
		},
		Role: {
			name: '角色',
			fields: {
				id: {
					name: 'id',
				},
				name: {
					name: '角色名',
				},
				description: {
					name: '说明',
				},
				users: {
					name: 'users',
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
				userRole: {
					name: 'userRole',
				},
				roleComposite: {
					name: 'roleComposite',
				}
			}
		},
		RoleComposite: {
			name: 'RoleComposite',
			fields: {
				id: {
					name: 'id',
				},
				roleId: {
					name: 'roleId',
				},
				from: {
					name: 'from',
				},
				compositeId: {
					name: 'compositeId',
				},
				to: {
					name: 'to',
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
				}
			}
		},
		User: {
			name: '用户',
			fields: {
				id: {
					name: 'id',
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
				password: {
					name: '密码',
				},
				email: {
					name: '邮箱',
				},
				disable: {
					name: '状态',
				},
				groups: {
					name: '组织',
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
				userGroup: {
					name: 'userGroup',
				},
				userRole: {
					name: 'userRole',
				}
			}
		},
		UserGroup: {
			name: 'UserGroup',
			fields: {
				id: {
					name: 'id',
				},
				userId: {
					name: 'userId',
				},
				from: {
					name: 'from',
				},
				groupId: {
					name: 'groupId',
				},
				to: {
					name: 'to',
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
				}
			}
		},
		UserRole: {
			name: 'UserRole',
			fields: {
				id: {
					name: 'id',
				},
				userId: {
					name: 'userId',
				},
				from: {
					name: 'from',
				},
				roleId: {
					name: 'roleId',
				},
				to: {
					name: 'to',
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
				}
			}
		}
	},
	enums: {
		Conditional: {
			name: 'Conditional',
			values: {
				AND: {
					name: 'AND',
				},
				OR: {
					name: 'OR',
				}
			}
		},
		Function: {
			name: 'Function',
			values: {
				COUNT: {
					name: 'COUNT',
				},
				MAX: {
					name: 'MAX',
				},
				MIN: {
					name: 'MIN',
				},
				SUM: {
					name: 'SUM',
				},
				AVG: {
					name: 'AVG',
				}
			}
		},
		Operator: {
			name: 'Operator',
			values: {
				EQ: {
					name: 'EQ',
				},
				NEQ: {
					name: 'NEQ',
				},
				LK: {
					name: 'LK',
				},
				NLK: {
					name: 'NLK',
				},
				GT: {
					name: 'GT',
				},
				NLTE: {
					name: 'NLTE',
				},
				GTE: {
					name: 'GTE',
				},
				NLT: {
					name: 'NLT',
				},
				LT: {
					name: 'LT',
				},
				NGTE: {
					name: 'NGTE',
				},
				LTE: {
					name: 'LTE',
				},
				NGT: {
					name: 'NGT',
				},
				NIL: {
					name: 'NIL',
				},
				NNIL: {
					name: 'NNIL',
				},
				IN: {
					name: 'IN',
				},
				NIN: {
					name: 'NIN',
				},
				BT: {
					name: 'BT',
				},
				NBT: {
					name: 'NBT',
				}
			}
		},
		PermissionLevel: {
			name: '权限级别',
			values: {
				READ: {
					name: '只读',
				},
				WRITE: {
					name: '读写',
				}
			}
		},
		Protocol: {
			name: 'Protocol',
			values: {
				LOCAL: {
					name: 'LOCAL',
				},
				GRPC: {
					name: 'GRPC',
				},
				HTTP: {
					name: 'HTTP',
				},
				RSOCKET: {
					name: 'RSOCKET',
				}
			}
		},
		Sort: {
			name: 'Sort',
			values: {
				ASC: {
					name: 'ASC',
				},
				DESC: {
					name: 'DESC',
				}
			}
		}
	}
}

export default zh;