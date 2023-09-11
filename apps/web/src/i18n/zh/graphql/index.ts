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
				path: {
					name: '路径',
				},
				deep: {
					name: '层级',
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
					name: '说明',
				},
				roles: {
					name: '角色',
				},
				realm: {
					name: '租户',
				}
			}
		},
		Realm: {
			name: '租户',
			fields: {
				name: {
					name: '租户名',
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
					name: '说明',
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
				lastName: {
					name: '姓氏',
				},
				login: {
					name: '账号',
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
					name: '只读',
				},
				WRITE: {
					name: '读写',
				}
			}
		}
	}
}

export default zh;