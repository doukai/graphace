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
				ofTypeName: {
					name: 'ofTypeName',
				},
				description: {
					name: 'description',
				},
				level: {
					name: 'level',
				},
				role: {
					name: 'role',
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
		PermissionLevel: {
			name: 'PermissionLevel',
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