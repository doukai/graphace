import type { TabInfo } from '@graphace/ui';
import type { Option } from '@graphace/ui-graphql';
import { userFields, type UserFields } from '~/lib/components/objects/user/UserOption';
import { groupFields, type GroupFields } from '~/lib/components/objects/group/GroupOption';
import { permissionFields, type PermissionFields } from '~/lib/components/objects/permission/PermissionOption';
import { realmFields, type RealmFields } from '~/lib/components/objects/realm/RealmOption';
import type {
	RoleInput,
	QueryRoleListArgs,
	UserInput,
	GroupInput,
	PermissionInput,
	RealmInput
} from '~/lib/types/schema';
import { LL } from '$i18n/i18n-svelte';
import { permissions } from '~/utils';
const { auth } = permissions;

export const roleTabs: TabInfo[] | undefined = undefined;

export const roleTab: string | undefined = undefined;

export const roleTabChange = async (tab: any, args: QueryRoleListArgs) => {
	return new Promise(
		(
			resolve: (data: QueryRoleListArgs) => void,
			reject: (errors: any) => void
		) => {
			resolve(args);
		}
	);
}

export type RoleFields = {
	name: Option<RoleInput, QueryRoleListArgs>;
	description: Option<RoleInput, QueryRoleListArgs>;
	users: Option<RoleInput, QueryRoleListArgs> & { fields?: () => UserFields };
	groups: Option<RoleInput, QueryRoleListArgs> & { fields?: () => GroupFields };
	composites: Option<RoleInput, QueryRoleListArgs> & { fields?: () => RoleFields };
	permissions: Option<RoleInput, QueryRoleListArgs> & { fields?: () => PermissionFields };
	realm: Option<RoleInput, QueryRoleListArgs> & { fields?: () => RealmFields };
};

export const roleFields: RoleFields = {
	name: {
		readonly: (value?: RoleInput | undefined) => {
			return !auth('Role::name::WRITE');
		},
		disabled: (value?: RoleInput | undefined) => {
			return !auth('Role::name::WRITE');
		},
		hidden: (value?: RoleInput | undefined) => {
			return !auth('Role::name::READ');
		},
		hiddenCol: (args: QueryRoleListArgs, tab: any) => {
			return !auth('Role::name::READ');
		},
		required: (value?: RoleInput | undefined) => {
			return true;
		},
		validate: async (value: RoleInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: RoleInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: RoleInput | undefined) => {
			return {};
		}
	},
	description: {
		readonly: (value?: RoleInput | undefined) => {
			return !auth('Role::description::WRITE');
		},
		disabled: (value?: RoleInput | undefined) => {
			return !auth('Role::description::WRITE');
		},
		hidden: (value?: RoleInput | undefined) => {
			return !auth('Role::description::READ');
		},
		hiddenCol: (args: QueryRoleListArgs, tab: any) => {
			return !auth('Role::description::READ');
		},
		required: (value?: RoleInput | undefined) => {
			return false;
		},
		validate: async (value: RoleInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: RoleInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: RoleInput | undefined) => {
			return {};
		}
	},
	users: {
		readonly: (value?: RoleInput | undefined) => {
			return !auth('Role::users::WRITE');
		},
		disabled: (value?: RoleInput | undefined) => {
			return !auth('Role::users::WRITE');
		},
		hidden: (value?: RoleInput | undefined) => {
			return !auth('Role::users::READ');
		},
		hiddenCol: (args: QueryRoleListArgs, tab: any) => {
			return !auth('Role::users::READ');
		},
		required: (value?: RoleInput | undefined) => {
			return false;
		},
		validate: async (value: RoleInput) => {
			return [];
		},
		onChange: async (fieldValue: (UserInput | null | undefined)[] | null | undefined, value?: RoleInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: RoleInput | undefined) => {
			return {};
		},
		fields: () => userFields
	},
	groups: {
		readonly: (value?: RoleInput | undefined) => {
			return !auth('Role::groups::WRITE');
		},
		disabled: (value?: RoleInput | undefined) => {
			return !auth('Role::groups::WRITE');
		},
		hidden: (value?: RoleInput | undefined) => {
			return !auth('Role::groups::READ');
		},
		hiddenCol: (args: QueryRoleListArgs, tab: any) => {
			return !auth('Role::groups::READ');
		},
		required: (value?: RoleInput | undefined) => {
			return false;
		},
		validate: async (value: RoleInput) => {
			return [];
		},
		onChange: async (fieldValue: (GroupInput | null | undefined)[] | null | undefined, value?: RoleInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: RoleInput | undefined) => {
			return {};
		},
		fields: () => groupFields
	},
	composites: {
		readonly: (value?: RoleInput | undefined) => {
			return !auth('Role::composites::WRITE');
		},
		disabled: (value?: RoleInput | undefined) => {
			return !auth('Role::composites::WRITE');
		},
		hidden: (value?: RoleInput | undefined) => {
			return !auth('Role::composites::READ');
		},
		hiddenCol: (args: QueryRoleListArgs, tab: any) => {
			return !auth('Role::composites::READ');
		},
		required: (value?: RoleInput | undefined) => {
			return false;
		},
		validate: async (value: RoleInput) => {
			return [];
		},
		onChange: async (fieldValue: (RoleInput | null | undefined)[] | null | undefined, value?: RoleInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: RoleInput | undefined) => {
			return {};
		},
		fields: () => roleFields
	},
	permissions: {
		readonly: (value?: RoleInput | undefined) => {
			return !auth('Role::permissions::WRITE');
		},
		disabled: (value?: RoleInput | undefined) => {
			return !auth('Role::permissions::WRITE');
		},
		hidden: (value?: RoleInput | undefined) => {
			return !auth('Role::permissions::READ');
		},
		hiddenCol: (args: QueryRoleListArgs, tab: any) => {
			return !auth('Role::permissions::READ');
		},
		required: (value?: RoleInput | undefined) => {
			return false;
		},
		validate: async (value: RoleInput) => {
			return [];
		},
		onChange: async (fieldValue: (PermissionInput | null | undefined)[] | null | undefined, value?: RoleInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: RoleInput | undefined) => {
			return {};
		},
		fields: () => permissionFields
	},
	realm: {
		readonly: (value?: RoleInput | undefined) => {
			return !auth('Role::realm::WRITE');
		},
		disabled: (value?: RoleInput | undefined) => {
			return !auth('Role::realm::WRITE');
		},
		hidden: (value?: RoleInput | undefined) => {
			return !auth('Role::realm::READ');
		},
		hiddenCol: (args: QueryRoleListArgs, tab: any) => {
			return !auth('Role::realm::READ');
		},
		required: (value?: RoleInput | undefined) => {
			return false;
		},
		validate: async (value: RoleInput) => {
			return [];
		},
		onChange: async (fieldValue: RealmInput | null | undefined, value?: RoleInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: RoleInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: RoleInput | undefined) => {
			return {};
		},
		fields: () => realmFields
	}
};