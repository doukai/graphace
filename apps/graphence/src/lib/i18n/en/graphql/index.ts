import type { BaseTranslation } from '../../i18n-types';

const en: BaseTranslation = {
	objects: {
		User: {
			name: 'User',
			fields: {
			}
		},
		Role: {
			name: 'Role',
			fields: {
				composites: {
					name: 'composites',
				}
			}
		},
		Group: {
			name: 'Group',
			fields: {
				parent: {
					name: 'parent',
				},
				subGroups: {
					name: 'subGroups',
				}
			}
		},
		Realm: {
			name: 'Realm',
			fields: {
			}
		},
		Permission: {
			name: 'Permission',
			fields: {
			}
		},
		UserPhonesRelation: {
			name: 'UserPhonesRelation',
			fields: {
			}
		},
		GroupUserRelation: {
			name: 'GroupUserRelation',
			fields: {
			}
		},
		RoleUserRelation: {
			name: 'RoleUserRelation',
			fields: {
			}
		},
		GroupRoleRelation: {
			name: 'GroupRoleRelation',
			fields: {
			}
		},
		RoleCompositeRelation: {
			name: 'RoleCompositeRelation',
			fields: {
			}
		},
		RolePermissionRelation: {
			name: 'RolePermissionRelation',
			fields: {
			}
		},
		File: {
			name: 'File',
			fields: {
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
				},
				ANY: {
					name: 'ANY',
				}
			}
		}
	}
}

export default en;