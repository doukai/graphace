import type { TabInfo } from '@graphace/ui';
import type { Option } from '@graphace/ui-graphql';
import { groupFields, type GroupFields } from '~/lib/components/objects/group/GroupOption';
import { roleFields, type RoleFields } from '~/lib/components/objects/role/RoleOption';
import { realmFields, type RealmFields } from '~/lib/components/objects/realm/RealmOption';
import type {
	UserInput,
	QueryUserListArgs,
	GroupInput,
	RoleInput,
	RealmInput
} from '~/lib/types/schema';
import type { TranslationFunctions } from '$i18n/i18n-types';
import { permissions } from '~/utils';
const { auth } = permissions;

export const userTabs: (($LL: TranslationFunctions, args?: QueryUserListArgs | undefined) => TabInfo[] | undefined) | undefined = undefined;

export const userTab: ((args?: QueryUserListArgs | undefined) => string | undefined) | undefined = undefined;

export const userTabChange = async (tab: any, args: QueryUserListArgs) => {
	return new Promise(
		(
			resolve: (data: QueryUserListArgs) => void,
			reject: (errors: any) => void
		) => {
			resolve(args);
		}
	);
}

export type UserFields = {
	name?: Option<UserInput, QueryUserListArgs> | undefined;
	description?: Option<UserInput, QueryUserListArgs> | undefined;
	lastName?: Option<UserInput, QueryUserListArgs> | undefined;
	login?: Option<UserInput, QueryUserListArgs> | undefined;
	email?: Option<UserInput, QueryUserListArgs> | undefined;
	phones?: Option<UserInput, QueryUserListArgs> | undefined;
	disable?: Option<UserInput, QueryUserListArgs> | undefined;
	groups?: Option<UserInput, QueryUserListArgs> & { fields?: () => GroupFields } | undefined;
	roles?: Option<UserInput, QueryUserListArgs> & { fields?: () => RoleFields } | undefined;
	realm?: Option<UserInput, QueryUserListArgs> & { fields?: () => RealmFields } | undefined;
};

export const userFields: UserFields = {
	name: {
		readonly: (value?: UserInput | undefined) => {
			return !auth('User::name::WRITE');
		},
		disabled: (value?: UserInput | undefined) => {
			return !auth('User::name::WRITE');
		},
		hidden: (value?: UserInput | undefined) => {
			return !auth('User::name::READ');
		},
		hiddenCol: (args: QueryUserListArgs, tab: any) => {
			return !auth('User::name::READ');
		},
		required: (value?: UserInput | undefined) => {
			return true;
		},
		validate: async (value: UserInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: UserInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: UserInput | undefined) => {
			return {};
		}
	},
	description: {
		readonly: (value?: UserInput | undefined) => {
			return !auth('User::description::WRITE');
		},
		disabled: (value?: UserInput | undefined) => {
			return !auth('User::description::WRITE');
		},
		hidden: (value?: UserInput | undefined) => {
			return !auth('User::description::READ');
		},
		hiddenCol: (args: QueryUserListArgs, tab: any) => {
			return !auth('User::description::READ');
		},
		required: (value?: UserInput | undefined) => {
			return false;
		},
		validate: async (value: UserInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: UserInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: UserInput | undefined) => {
			return {};
		}
	},
	lastName: {
		readonly: (value?: UserInput | undefined) => {
			return !auth('User::lastName::WRITE');
		},
		disabled: (value?: UserInput | undefined) => {
			return !auth('User::lastName::WRITE');
		},
		hidden: (value?: UserInput | undefined) => {
			return !auth('User::lastName::READ');
		},
		hiddenCol: (args: QueryUserListArgs, tab: any) => {
			return !auth('User::lastName::READ');
		},
		required: (value?: UserInput | undefined) => {
			return false;
		},
		validate: async (value: UserInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: UserInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: UserInput | undefined) => {
			return {};
		}
	},
	login: {
		readonly: (value?: UserInput | undefined) => {
			return !auth('User::login::WRITE');
		},
		disabled: (value?: UserInput | undefined) => {
			return !auth('User::login::WRITE');
		},
		hidden: (value?: UserInput | undefined) => {
			return !auth('User::login::READ');
		},
		hiddenCol: (args: QueryUserListArgs, tab: any) => {
			return !auth('User::login::READ');
		},
		required: (value?: UserInput | undefined) => {
			return true;
		},
		validate: async (value: UserInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: UserInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: UserInput | undefined) => {
			return {};
		}
	},
	email: {
		readonly: (value?: UserInput | undefined) => {
			return !auth('User::email::WRITE');
		},
		disabled: (value?: UserInput | undefined) => {
			return !auth('User::email::WRITE');
		},
		hidden: (value?: UserInput | undefined) => {
			return !auth('User::email::READ');
		},
		hiddenCol: (args: QueryUserListArgs, tab: any) => {
			return !auth('User::email::READ');
		},
		required: (value?: UserInput | undefined) => {
			return false;
		},
		validate: async (value: UserInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: UserInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: UserInput | undefined) => {
			return {};
		}
	},
	phones: {
		readonly: (value?: UserInput | undefined) => {
			return !auth('User::phones::WRITE');
		},
		disabled: (value?: UserInput | undefined) => {
			return !auth('User::phones::WRITE');
		},
		hidden: (value?: UserInput | undefined) => {
			return !auth('User::phones::READ');
		},
		hiddenCol: (args: QueryUserListArgs, tab: any) => {
			return !auth('User::phones::READ');
		},
		required: (value?: UserInput | undefined) => {
			return false;
		},
		validate: async (value: UserInput) => {
			return [];
		},
		onChange: async (fieldValue: (string | null | undefined)[] | null | undefined, value?: UserInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: UserInput | undefined) => {
			return {};
		}
	},
	disable: {
		readonly: (value?: UserInput | undefined) => {
			return !auth('User::disable::WRITE');
		},
		disabled: (value?: UserInput | undefined) => {
			return !auth('User::disable::WRITE');
		},
		hidden: (value?: UserInput | undefined) => {
			return !auth('User::disable::READ');
		},
		hiddenCol: (args: QueryUserListArgs, tab: any) => {
			return !auth('User::disable::READ');
		},
		required: (value?: UserInput | undefined) => {
			return false;
		},
		validate: async (value: UserInput) => {
			return [];
		},
		onChange: async (fieldValue: boolean | null | undefined, value?: UserInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: UserInput | undefined) => {
			return {};
		}
	},
	groups: {
		readonly: (value?: UserInput | undefined) => {
			return !auth('User::groups::WRITE');
		},
		disabled: (value?: UserInput | undefined) => {
			return !auth('User::groups::WRITE');
		},
		hidden: (value?: UserInput | undefined) => {
			return !auth('User::groups::READ');
		},
		hiddenCol: (args: QueryUserListArgs, tab: any) => {
			return !auth('User::groups::READ');
		},
		required: (value?: UserInput | undefined) => {
			return false;
		},
		validate: async (value: UserInput) => {
			return [];
		},
		onChange: async (fieldValue: (GroupInput | null | undefined)[] | null | undefined, value?: UserInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: UserInput | undefined) => {
			return {};
		},
		fields: () => groupFields
	},
	roles: {
		readonly: (value?: UserInput | undefined) => {
			return !auth('User::roles::WRITE');
		},
		disabled: (value?: UserInput | undefined) => {
			return !auth('User::roles::WRITE');
		},
		hidden: (value?: UserInput | undefined) => {
			return !auth('User::roles::READ');
		},
		hiddenCol: (args: QueryUserListArgs, tab: any) => {
			return !auth('User::roles::READ');
		},
		required: (value?: UserInput | undefined) => {
			return false;
		},
		validate: async (value: UserInput) => {
			return [];
		},
		onChange: async (fieldValue: (RoleInput | null | undefined)[] | null | undefined, value?: UserInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: UserInput | undefined) => {
			return {};
		},
		fields: () => roleFields
	},
	realm: {
		readonly: (value?: UserInput | undefined) => {
			return !auth('User::realm::WRITE');
		},
		disabled: (value?: UserInput | undefined) => {
			return !auth('User::realm::WRITE');
		},
		hidden: (value?: UserInput | undefined) => {
			return !auth('User::realm::READ');
		},
		hiddenCol: (args: QueryUserListArgs, tab: any) => {
			return !auth('User::realm::READ');
		},
		required: (value?: UserInput | undefined) => {
			return false;
		},
		validate: async (value: UserInput) => {
			return [];
		},
		onChange: async (fieldValue: RealmInput | null | undefined, value?: UserInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: UserInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: UserInput | undefined) => {
			return {};
		},
		fields: () => realmFields
	}
};