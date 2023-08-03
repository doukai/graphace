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
				realmId: {
					name: 'realmId',
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
				id: {
					name: 'id',
				},
				name: {
					name: 'name',
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
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				parentId: {
					name: 'parentId',
				},
				userGroup: {
					name: 'userGroup',
				},
				groupRole: {
					name: 'groupRole',
				}
			}
		},
		Permission: {
			name: 'Permission',
			fields: {
				id: {
					name: 'id',
				},
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
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				roleId: {
					name: 'roleId',
				}
			}
		},
		Realm: {
			name: 'Realm',
			fields: {
				id: {
					name: 'id',
				},
				name: {
					name: 'name',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				}
			}
		},
		Role: {
			name: 'Role',
			fields: {
				id: {
					name: 'id',
				},
				name: {
					name: 'name',
				},
				description: {
					name: 'description',
				},
				users: {
					name: 'users',
				},
				permissions: {
					name: 'permissions',
				},
				realm: {
					name: 'realm',
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				userRole: {
					name: 'userRole',
				},
				roleComposite: {
					name: 'roleComposite',
				}
			}
		},
		User: {
			name: 'User',
			fields: {
				id: {
					name: 'id',
				},
				name: {
					name: 'name',
				},
				lastName: {
					name: 'lastName',
				},
				login: {
					name: 'login',
				},
				password: {
					name: 'password',
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
				},
				isDeprecated: {
					name: 'isDeprecated',
				},
				version: {
					name: 'version',
				},
				realmId: {
					name: 'realmId',
				},
				createUserId: {
					name: 'createUserId',
				},
				createTime: {
					name: 'createTime',
				},
				updateUserId: {
					name: 'updateUserId',
				},
				updateTime: {
					name: 'updateTime',
				},
				createGroupId: {
					name: 'createGroupId',
				},
				userGroup: {
					name: 'userGroup',
				},
				userRole: {
					name: 'userRole',
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
		Function: {
			name: 'Function',
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