import type { TabInfo } from '@graphace/ui';
import type { Option } from '@graphace/ui-graphql';
import { roleFields, type RoleFields } from '~/lib/components/objects/role/RoleOption';
import { realmFields, type RealmFields } from '~/lib/components/objects/realm/RealmOption';
import type {
	PermissionInput,
	QueryPermissionListArgs,
	RoleInput,
	RealmInput,
	PermissionType
} from '~/lib/types/schema';
import type { TranslationFunctions } from '$i18n/i18n-types';
import { permissions } from '~/utils';
const { auth } = permissions;

export const permissionTabs: (($LL: TranslationFunctions, args?: QueryPermissionListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const permissionTab: ((args?: QueryPermissionListArgs | undefined) => string | undefined) | undefined = undefined;

export const permissionTabChange = async (tab: any, args: QueryPermissionListArgs) => {
	return new Promise(
		(
			resolve: (data: QueryPermissionListArgs) => void,
			reject: (errors: any) => void
		) => {
			resolve(args);
		}
	);
}

export type PermissionFields = {
	name?: Option<PermissionInput, QueryPermissionListArgs> | undefined;
	description?: Option<PermissionInput, QueryPermissionListArgs> | undefined;
	field?: Option<PermissionInput, QueryPermissionListArgs> | undefined;
	type?: Option<PermissionInput, QueryPermissionListArgs> | undefined;
	permissionType?: Option<PermissionInput, QueryPermissionListArgs> | undefined;
	roles?: Option<PermissionInput, QueryPermissionListArgs> & { fields?: () => RoleFields } | undefined;
	realm?: Option<PermissionInput, QueryPermissionListArgs> & { fields?: () => RealmFields } | undefined;
};

export const permissionFields: PermissionFields = {
	name: {
		readonly: (value?: PermissionInput | undefined) => {
			return !auth('Permission::name::WRITE');
		},
		disabled: (value?: PermissionInput | undefined) => {
			return !auth('Permission::name::WRITE');
		},
		hidden: (value?: PermissionInput | undefined) => {
			return !auth('Permission::name::READ');
		},
		hiddenCol: (args: QueryPermissionListArgs, tab: any) => {
			return !auth('Permission::name::READ');
		},
		required: (value?: PermissionInput | undefined) => {
			return true;
		},
		validate: async (value: PermissionInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: PermissionInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: PermissionInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: PermissionInput | undefined) => {
			return {};
		}
	},
	description: {
		readonly: (value?: PermissionInput | undefined) => {
			return !auth('Permission::description::WRITE');
		},
		disabled: (value?: PermissionInput | undefined) => {
			return !auth('Permission::description::WRITE');
		},
		hidden: (value?: PermissionInput | undefined) => {
			return !auth('Permission::description::READ');
		},
		hiddenCol: (args: QueryPermissionListArgs, tab: any) => {
			return !auth('Permission::description::READ');
		},
		required: (value?: PermissionInput | undefined) => {
			return false;
		},
		validate: async (value: PermissionInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: PermissionInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: PermissionInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: PermissionInput | undefined) => {
			return {};
		}
	},
	field: {
		readonly: (value?: PermissionInput | undefined) => {
			return !auth('Permission::field::WRITE');
		},
		disabled: (value?: PermissionInput | undefined) => {
			return !auth('Permission::field::WRITE');
		},
		hidden: (value?: PermissionInput | undefined) => {
			return !auth('Permission::field::READ');
		},
		hiddenCol: (args: QueryPermissionListArgs, tab: any) => {
			return !auth('Permission::field::READ');
		},
		required: (value?: PermissionInput | undefined) => {
			return true;
		},
		validate: async (value: PermissionInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: PermissionInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: PermissionInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: PermissionInput | undefined) => {
			return {};
		}
	},
	type: {
		readonly: (value?: PermissionInput | undefined) => {
			return !auth('Permission::type::WRITE');
		},
		disabled: (value?: PermissionInput | undefined) => {
			return !auth('Permission::type::WRITE');
		},
		hidden: (value?: PermissionInput | undefined) => {
			return !auth('Permission::type::READ');
		},
		hiddenCol: (args: QueryPermissionListArgs, tab: any) => {
			return !auth('Permission::type::READ');
		},
		required: (value?: PermissionInput | undefined) => {
			return true;
		},
		validate: async (value: PermissionInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: PermissionInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: PermissionInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: PermissionInput | undefined) => {
			return {};
		}
	},
	permissionType: {
		readonly: (value?: PermissionInput | undefined) => {
			return !auth('Permission::permissionType::WRITE');
		},
		disabled: (value?: PermissionInput | undefined) => {
			return !auth('Permission::permissionType::WRITE');
		},
		hidden: (value?: PermissionInput | undefined) => {
			return !auth('Permission::permissionType::READ');
		},
		hiddenCol: (args: QueryPermissionListArgs, tab: any) => {
			return !auth('Permission::permissionType::READ');
		},
		required: (value?: PermissionInput | undefined) => {
			return true;
		},
		validate: async (value: PermissionInput) => {
			return [];
		},
		onChange: async (fieldValue: PermissionType | null | undefined, value?: PermissionInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: PermissionInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: PermissionInput | undefined) => {
			return {};
		}
	},
	roles: {
		readonly: (value?: PermissionInput | undefined) => {
			return !auth('Permission::roles::WRITE');
		},
		disabled: (value?: PermissionInput | undefined) => {
			return !auth('Permission::roles::WRITE');
		},
		hidden: (value?: PermissionInput | undefined) => {
			return !auth('Permission::roles::READ');
		},
		hiddenCol: (args: QueryPermissionListArgs, tab: any) => {
			return !auth('Permission::roles::READ');
		},
		required: (value?: PermissionInput | undefined) => {
			return false;
		},
		validate: async (value: PermissionInput) => {
			return [];
		},
		onChange: async (fieldValue: (RoleInput | null | undefined)[] | null | undefined, value?: PermissionInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: PermissionInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: PermissionInput | undefined) => {
			return {};
		},
		fields: () => roleFields
	},
	realm: {
		readonly: (value?: PermissionInput | undefined) => {
			return !auth('Permission::realm::WRITE');
		},
		disabled: (value?: PermissionInput | undefined) => {
			return !auth('Permission::realm::WRITE');
		},
		hidden: (value?: PermissionInput | undefined) => {
			return !auth('Permission::realm::READ');
		},
		hiddenCol: (args: QueryPermissionListArgs, tab: any) => {
			return !auth('Permission::realm::READ');
		},
		required: (value?: PermissionInput | undefined) => {
			return false;
		},
		validate: async (value: PermissionInput) => {
			return [];
		},
		onChange: async (fieldValue: RealmInput | null | undefined, value?: PermissionInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: PermissionInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: PermissionInput | undefined) => {
			return {};
		},
		fields: () => realmFields
	}
};