import type { NamespaceGraphqlTranslation } from '../../i18n-types';

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
				}
			}
		},
		Group: {
			name: '组',
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
				}
			}
		},
		Policy: {
			name: 'Policy',
			fields: {
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
				name: {
					name: '名称',
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