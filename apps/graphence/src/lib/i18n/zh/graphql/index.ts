import type { NamespaceGraphqlTranslation } from '../../i18n-types';

const zh: NamespaceGraphqlTranslation = {
	objects: {
		User: {
			name: '用户',
			fields: {
			}
		},
		Role: {
			name: '角色',
			fields: {
				composites: {
					name: '组合',
				}
			}
		},
		Group: {
			name: '组',
			fields: {
				parent: {
					name: '上级',
				},
				subGroups: {
					name: '下级',
				}
			}
		},
		Realm: {
			name: '租户',
			fields: {
			}
		},
		Permission: {
			name: '权限',
			fields: {
			}
		},
		UserPhonesRelation: {
			name: '用户 手机号 关系',
			fields: {
			}
		},
		GroupUserRelation: {
			name: '用户 组 关系',
			fields: {
			}
		},
		RoleUserRelation: {
			name: '用户 角色 关系',
			fields: {
			}
		},
		GroupRoleRelation: {
			name: '角色 组 关系',
			fields: {
			}
		},
		RoleCompositeRelation: {
			name: '角色 角色 关系',
			fields: {
			}
		},
		RolePermissionRelation: {
			name: '角色 权限 关系',
			fields: {
			}
		},
		File: {
			name: '文件',
			fields: {
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