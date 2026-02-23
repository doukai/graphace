import type { TabInfo } from '@graphace/ui';
import type { Option } from '@graphace/ui-graphql';
import { userFields, type UserFields } from '~/lib/components/objects/user/UserOption';
import { roleFields, type RoleFields } from '~/lib/components/objects/role/RoleOption';
import { realmFields, type RealmFields } from '~/lib/components/objects/realm/RealmOption';
import type {
	GroupInput,
	QueryGroupListArgs,
	UserInput,
	RoleInput,
	RealmInput
} from '~/lib/types/schema';
import { LL } from '$i18n/i18n-svelte';
import { permissions } from '~/utils';
const { auth } = permissions;

export const groupTabs: TabInfo[] | undefined = undefined;

export const groupTab: string | undefined = undefined;

export const groupTabChange = async (tab: any, args: QueryGroupListArgs) => {
	return new Promise(
		(
			resolve: (data: QueryGroupListArgs) => void,
			reject: (errors: any) => void
		) => {
			resolve(args);
		}
	);
}

export type GroupFields = {
	name: Option<GroupInput, QueryGroupListArgs>;
	description: Option<GroupInput, QueryGroupListArgs>;
	path: Option<GroupInput, QueryGroupListArgs>;
	deep: Option<GroupInput, QueryGroupListArgs>;
	parentId: Option<GroupInput, QueryGroupListArgs>;
	parent: Option<GroupInput, QueryGroupListArgs> & { fields?: () => GroupFields };
	subGroups: Option<GroupInput, QueryGroupListArgs> & { fields?: () => GroupFields };
	users: Option<GroupInput, QueryGroupListArgs> & { fields?: () => UserFields };
	roles: Option<GroupInput, QueryGroupListArgs> & { fields?: () => RoleFields };
	realm: Option<GroupInput, QueryGroupListArgs> & { fields?: () => RealmFields };
};

export const groupFields: GroupFields = {
	name: {
		readonly: (value?: GroupInput | undefined) => {
			return !auth('Group::name::WRITE');
		},
		disabled: (value?: GroupInput | undefined) => {
			return !auth('Group::name::WRITE');
		},
		hidden: (value?: GroupInput | undefined) => {
			return !auth('Group::name::READ');
		},
		hiddenCol: (args: QueryGroupListArgs, tab: any) => {
			return !auth('Group::name::READ');
		},
		required: (value?: GroupInput | undefined) => {
			return true;
		},
		validate: async (value: GroupInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: GroupInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: GroupInput | undefined) => {
			return {};
		}
	},
	description: {
		readonly: (value?: GroupInput | undefined) => {
			return !auth('Group::description::WRITE');
		},
		disabled: (value?: GroupInput | undefined) => {
			return !auth('Group::description::WRITE');
		},
		hidden: (value?: GroupInput | undefined) => {
			return !auth('Group::description::READ');
		},
		hiddenCol: (args: QueryGroupListArgs, tab: any) => {
			return !auth('Group::description::READ');
		},
		required: (value?: GroupInput | undefined) => {
			return false;
		},
		validate: async (value: GroupInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: GroupInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: GroupInput | undefined) => {
			return {};
		}
	},
	path: {
		readonly: (value?: GroupInput | undefined) => {
			return !auth('Group::path::WRITE');
		},
		disabled: (value?: GroupInput | undefined) => {
			return !auth('Group::path::WRITE');
		},
		hidden: (value?: GroupInput | undefined) => {
			return !auth('Group::path::READ');
		},
		hiddenCol: (args: QueryGroupListArgs, tab: any) => {
			return !auth('Group::path::READ');
		},
		required: (value?: GroupInput | undefined) => {
			return false;
		},
		validate: async (value: GroupInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: GroupInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: GroupInput | undefined) => {
			return {};
		}
	},
	deep: {
		readonly: (value?: GroupInput | undefined) => {
			return !auth('Group::deep::WRITE');
		},
		disabled: (value?: GroupInput | undefined) => {
			return !auth('Group::deep::WRITE');
		},
		hidden: (value?: GroupInput | undefined) => {
			return !auth('Group::deep::READ');
		},
		hiddenCol: (args: QueryGroupListArgs, tab: any) => {
			return !auth('Group::deep::READ');
		},
		required: (value?: GroupInput | undefined) => {
			return false;
		},
		validate: async (value: GroupInput) => {
			return [];
		},
		onChange: async (fieldValue: number | null | undefined, value?: GroupInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: GroupInput | undefined) => {
			return {};
		}
	},
	parentId: {
		readonly: (value?: GroupInput | undefined) => {
			return !auth('Group::parentId::WRITE');
		},
		disabled: (value?: GroupInput | undefined) => {
			return !auth('Group::parentId::WRITE');
		},
		hidden: (value?: GroupInput | undefined) => {
			return !auth('Group::parentId::READ');
		},
		hiddenCol: (args: QueryGroupListArgs, tab: any) => {
			return !auth('Group::parentId::READ');
		},
		required: (value?: GroupInput | undefined) => {
			return false;
		},
		validate: async (value: GroupInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: GroupInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: GroupInput | undefined) => {
			return {};
		}
	},
	parent: {
		readonly: (value?: GroupInput | undefined) => {
			return !auth('Group::parent::WRITE');
		},
		disabled: (value?: GroupInput | undefined) => {
			return !auth('Group::parent::WRITE');
		},
		hidden: (value?: GroupInput | undefined) => {
			return !auth('Group::parent::READ');
		},
		hiddenCol: (args: QueryGroupListArgs, tab: any) => {
			return !auth('Group::parent::READ');
		},
		required: (value?: GroupInput | undefined) => {
			return false;
		},
		validate: async (value: GroupInput) => {
			return [];
		},
		onChange: async (fieldValue: GroupInput | null | undefined, value?: GroupInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: GroupInput | undefined) => {
			return {};
		},
		fields: () => groupFields
	},
	subGroups: {
		readonly: (value?: GroupInput | undefined) => {
			return !auth('Group::subGroups::WRITE');
		},
		disabled: (value?: GroupInput | undefined) => {
			return !auth('Group::subGroups::WRITE');
		},
		hidden: (value?: GroupInput | undefined) => {
			return !auth('Group::subGroups::READ');
		},
		hiddenCol: (args: QueryGroupListArgs, tab: any) => {
			return !auth('Group::subGroups::READ');
		},
		required: (value?: GroupInput | undefined) => {
			return false;
		},
		validate: async (value: GroupInput) => {
			return [];
		},
		onChange: async (fieldValue: (GroupInput | null | undefined)[] | null | undefined, value?: GroupInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: GroupInput | undefined) => {
			return {};
		},
		fields: () => groupFields
	},
	users: {
		readonly: (value?: GroupInput | undefined) => {
			return !auth('Group::users::WRITE');
		},
		disabled: (value?: GroupInput | undefined) => {
			return !auth('Group::users::WRITE');
		},
		hidden: (value?: GroupInput | undefined) => {
			return !auth('Group::users::READ');
		},
		hiddenCol: (args: QueryGroupListArgs, tab: any) => {
			return !auth('Group::users::READ');
		},
		required: (value?: GroupInput | undefined) => {
			return false;
		},
		validate: async (value: GroupInput) => {
			return [];
		},
		onChange: async (fieldValue: (UserInput | null | undefined)[] | null | undefined, value?: GroupInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: GroupInput | undefined) => {
			return {};
		},
		fields: () => userFields
	},
	roles: {
		readonly: (value?: GroupInput | undefined) => {
			return !auth('Group::roles::WRITE');
		},
		disabled: (value?: GroupInput | undefined) => {
			return !auth('Group::roles::WRITE');
		},
		hidden: (value?: GroupInput | undefined) => {
			return !auth('Group::roles::READ');
		},
		hiddenCol: (args: QueryGroupListArgs, tab: any) => {
			return !auth('Group::roles::READ');
		},
		required: (value?: GroupInput | undefined) => {
			return false;
		},
		validate: async (value: GroupInput) => {
			return [];
		},
		onChange: async (fieldValue: (RoleInput | null | undefined)[] | null | undefined, value?: GroupInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: GroupInput | undefined) => {
			return {};
		},
		fields: () => roleFields
	},
	realm: {
		readonly: (value?: GroupInput | undefined) => {
			return !auth('Group::realm::WRITE');
		},
		disabled: (value?: GroupInput | undefined) => {
			return !auth('Group::realm::WRITE');
		},
		hidden: (value?: GroupInput | undefined) => {
			return !auth('Group::realm::READ');
		},
		hiddenCol: (args: QueryGroupListArgs, tab: any) => {
			return !auth('Group::realm::READ');
		},
		required: (value?: GroupInput | undefined) => {
			return false;
		},
		validate: async (value: GroupInput) => {
			return [];
		},
		onChange: async (fieldValue: RealmInput | null | undefined, value?: GroupInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: GroupInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: GroupInput | undefined) => {
			return {};
		},
		fields: () => realmFields
	}
};