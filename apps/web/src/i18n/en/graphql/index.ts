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
		Group: {
			name: 'Group',
			fields: {
				name: {
					name: 'name',
				},
				path: {
					name: 'path',
				},
				deep: {
					name: 'deep',
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
				}
			}
		},
		Permission: {
			name: 'Permission',
			fields: {
				name: {
					name: 'name',
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
				description: {
					name: 'description',
				},
				roles: {
					name: 'roles',
				},
				realm: {
					name: 'realm',
				}
			}
		},
		Realm: {
			name: 'Realm',
			fields: {
				name: {
					name: 'name',
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
				}
			}
		},
		User: {
			name: 'User',
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
				email: {
					name: 'email',
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
				}
			}
		}
	},
	enums: {
		Func: {
			name: 'Func',
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