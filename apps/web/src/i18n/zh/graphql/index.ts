import type { NamespaceGraphqlTranslation } from '../../i18n-types'

const zh: NamespaceGraphqlTranslation = {
	objects: {
		Api: {
			name: '接口',
			fields: {
				name: {
					name: '名称',
				},
				description: {
					name: '说明',
				},
				type: {
					name: '类型',
				},
				role: {
					name: '角色',
				},
				realm: {
					name: '租户',
				}
			}
		},
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
		Menu: {
			name: '菜单',
			fields: {
				name: {
					name: '名称',
				},
				type: {
					name: '类型',
				},
				path: {
					name: '路径',
				},
				icon: {
					name: '图标',
				},
				folder: {
					name: '集合',
				},
				description: {
					name: '说明',
				},
				role: {
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
				description: {
					name: '说明',
				},
				type: {
					name: '类型',
				},
				level: {
					name: '权限级别',
				},
				role: {
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
				permissions: {
					name: '权限',
				},
				apis: {
					name: '接口',
				},
				menus: {
					name: '菜单',
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
		ApiType: {
			name: '接口类型',
			values: {
				QUERY: {
					name: '查询',
				},
				MUTATION: {
					name: '变更',
				},
				SUBSCRIPTION: {
					name: '订阅',
				}
			}
		},
		MenuType: {
			name: '菜单类型',
			values: {
				FOLDER: {
					name: '集合',
				},
				PAGE: {
					name: '菜单',
				}
			}
		},
		PermissionLevel: {
			name: '权限等级',
			values: {
				USER: {
					name: '自己',
				},
				GROUP: {
					name: '组织',
				},
				SUB_GROUP: {
					name: '下级组织',
				},
				REALM: {
					name: '租户',
				},
				ALL: {
					name: '全部',
				}
			}
		},
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