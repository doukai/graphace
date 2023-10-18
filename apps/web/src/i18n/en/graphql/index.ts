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
		Conditional: {
			name: 'Conditional',
			values: {
				AND: {
					name: 'AND',
				},
				OR: {
					name: 'OR',
				}
			}
		},
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
		Operator: {
			name: 'Operator',
			values: {
				EQ: {
					name: 'EQ',
				},
				NEQ: {
					name: 'NEQ',
				},
				LK: {
					name: 'LK',
				},
				NLK: {
					name: 'NLK',
				},
				GT: {
					name: 'GT',
				},
				NLTE: {
					name: 'NLTE',
				},
				GTE: {
					name: 'GTE',
				},
				NLT: {
					name: 'NLT',
				},
				LT: {
					name: 'LT',
				},
				NGTE: {
					name: 'NGTE',
				},
				LTE: {
					name: 'LTE',
				},
				NGT: {
					name: 'NGT',
				},
				NIL: {
					name: 'NIL',
				},
				NNIL: {
					name: 'NNIL',
				},
				IN: {
					name: 'IN',
				},
				NIN: {
					name: 'NIN',
				},
				BT: {
					name: 'BT',
				},
				NBT: {
					name: 'NBT',
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
		},
		Protocol: {
			name: 'Protocol',
			values: {
				LOCAL: {
					name: 'LOCAL',
				},
				GRPC: {
					name: 'GRPC',
				},
				HTTP: {
					name: 'HTTP',
				},
				RSOCKET: {
					name: 'RSOCKET',
				}
			}
		},
		Sort: {
			name: 'Sort',
			values: {
				ASC: {
					name: 'ASC',
				},
				DESC: {
					name: 'DESC',
				}
			}
		}
	}
}

export default en;