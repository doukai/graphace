import type { BaseTranslation } from '../../i18n-types';

const en: BaseTranslation = {
	objects: {
		CurrentUser: {
			name: 'CurrentUser',
			fields: {
				name: {
					name: 'name',
				},
				lastName: {
					name: 'lastName',
				},
				login: {
					name: 'login',
				},
				groups: {
					name: 'groups',
				},
				roles: {
					name: 'roles',
				}
			}
		},
		File: {
			name: 'File',
			fields: {
				name: {
					name: 'name',
				},
				contentType: {
					name: 'contentType',
				},
				content: {
					name: 'content',
				},
				url: {
					name: 'url',
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
			name: 'Group',
			fields: {
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
			name: 'Permission',
			fields: {
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
			name: 'Realm',
			fields: {
				name: {
					name: 'name',
				},
				description: {
					name: 'description',
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
			name: 'Role',
			fields: {
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
			name: 'User',
			fields: {
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
				email: {
					name: 'email',
				},
				files: {
					name: 'files',
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
			name: 'PermissionType',
			values: {
				READ: {
					name: 'READ',
				},
				WRITE: {
					name: 'WRITE',
				}
			}
		}
	}
}

export default en;