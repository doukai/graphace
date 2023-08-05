import type { BaseTranslation } from '../../i18n-types';

const en: BaseTranslation = {
	objects: {
		Api: {
			name: 'Api',
			fields: {
				name: {
					name: 'name',
				},
				description: {
					name: 'description',
				},
				type: {
					name: 'type',
				},
				role: {
					name: 'role',
				},
				realm: {
					name: 'realm',
				}
			}
		},
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
		Menu: {
			name: 'Menu',
			fields: {
				name: {
					name: 'name',
				},
				type: {
					name: 'type',
				},
				path: {
					name: 'path',
				},
				icon: {
					name: 'icon',
				},
				folder: {
					name: 'folder',
				},
				description: {
					name: 'description',
				},
				role: {
					name: 'role',
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
				description: {
					name: 'description',
				},
				type: {
					name: 'type',
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
				apis: {
					name: 'apis',
				},
				menus: {
					name: 'menus',
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
		ApiType: {
			name: 'ApiType',
			values: {
				QUERY: {
					name: 'QUERY',
				},
				MUTATION: {
					name: 'MUTATION',
				},
				SUBSCRIPTION: {
					name: 'SUBSCRIPTION',
				}
			}
		},
		MenuType: {
			name: 'MenuType',
			values: {
				FOLDER: {
					name: 'FOLDER',
				},
				PAGE: {
					name: 'PAGE',
				}
			}
		},
		PermissionLevel: {
			name: 'PermissionLevel',
			values: {
				USER: {
					name: 'USER',
				},
				GROUP: {
					name: 'GROUP',
				},
				SUB_GROUP: {
					name: 'SUB_GROUP',
				},
				REALM: {
					name: 'REALM',
				},
				ALL: {
					name: 'ALL',
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