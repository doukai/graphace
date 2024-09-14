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
				subGroupsAggregate: {
					name: 'subGroupsAggregate',
				},
				usersAggregate: {
					name: 'usersAggregate',
				},
				rolesAggregate: {
					name: 'rolesAggregate',
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
				rolesAggregate: {
					name: 'rolesAggregate',
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
				usersAggregate: {
					name: 'usersAggregate',
				},
				groupsAggregate: {
					name: 'groupsAggregate',
				},
				compositesAggregate: {
					name: 'compositesAggregate',
				},
				permissionsAggregate: {
					name: 'permissionsAggregate',
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
				},
				groupsAggregate: {
					name: 'groupsAggregate',
				},
				rolesAggregate: {
					name: 'rolesAggregate',
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