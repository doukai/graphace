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
				}
			}
		},
		GroupRoleRelation: {
			name: 'GroupRoleRelation',
			fields: {
				roleRef: {
					name: 'roleRef',
				},
				role: {
					name: 'role',
				},
				groupRef: {
					name: 'groupRef',
				},
				group: {
					name: 'group',
				}
			}
		},
		GroupUserRelation: {
			name: 'GroupUserRelation',
			fields: {
				userRef: {
					name: 'userRef',
				},
				user: {
					name: 'user',
				},
				groupRef: {
					name: 'groupRef',
				},
				group: {
					name: 'group',
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
				}
			}
		},
		PermissionRoleRelation: {
			name: 'PermissionRoleRelation',
			fields: {
				roleRef: {
					name: 'roleRef',
				},
				role: {
					name: 'role',
				},
				permissionRef: {
					name: 'permissionRef',
				},
				permission: {
					name: 'permission',
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
		RoleCompositeRelation: {
			name: 'RoleCompositeRelation',
			fields: {
				roleRef: {
					name: 'roleRef',
				},
				role: {
					name: 'role',
				},
				compositeRef: {
					name: 'compositeRef',
				},
				composite: {
					name: 'composite',
				}
			}
		},
		RoleUserRelation: {
			name: 'RoleUserRelation',
			fields: {
				userRef: {
					name: 'userRef',
				},
				user: {
					name: 'user',
				},
				roleRef: {
					name: 'roleRef',
				},
				role: {
					name: 'role',
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
		},
		UserPhonesRelation: {
			name: 'UserPhonesRelation',
			fields: {
				userRef: {
					name: 'userRef',
				},
				user: {
					name: 'user',
				},
				phonesRef: {
					name: 'phonesRef',
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