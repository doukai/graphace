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
				}
			}
		},
		Permission: {
			name: '权限',
			fields: {
				name: {
					name: '名称',
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
				description: {
					name: '描述',
				},
				roles: {
					name: '角色',
				},
				realm: {
					name: '租户',
				}
			}
		},
		Policy: {
			name: '策略',
			fields: {
				ptype: {
					name: '类型',
				},
				v0: {
					name: '参数0',
				},
				v1: {
					name: '参数1',
				},
				v2: {
					name: '参数2',
				},
				v3: {
					name: '参数3',
				},
				v4: {
					name: '参数4',
				},
				v5: {
					name: '参数5',
				}
			}
		},
		Realm: {
			name: '租户',
			fields: {
				name: {
					name: '租户名',
				},
				description: {
					name: '描述',
				}
			}
		},
		Role: {
			name: '角色',
			fields: {
				name: {
					name: '角色名',
				},
				description: {
					name: '描述',
				},
				users: {
					name: '用户',
				},
				composites: {
					name: '组合',
				},
				groups: {
					name: '组织',
				},
				permissions: {
					name: '权限',
				},
				realm: {
					name: '租户',
				}
			}
		},
		User: {
			name: '用户',
			fields: {
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
				email: {
					name: '邮箱',
				},
				avatar: {
					name: '头像',
				},
				phones: {
					name: '手机号',
				},
				disable: {
					name: '禁用',
				},
				groups: {
					name: '组织',
				},
				roles: {
					name: '角色',
				},
				realm: {
					name: '租户',
				}
			}
		}
	},
	enums: {
		PermissionType: {
			name: '权限类型',
			values: {
				READ: {
					name: '读',
				},
				WRITE: {
					name: '写',
				}
			}
		}
	}
}

export default zh;