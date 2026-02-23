import type { TabInfo } from '@graphace/ui';
import type { Option } from '@graphace/ui-graphql';
import type {
	RealmInput,
	QueryRealmListArgs
} from '~/lib/types/schema';
import { LL } from '$i18n/i18n-svelte';
import { permissions } from '~/utils';
const { auth } = permissions;

export const realmTabs: TabInfo[] | undefined = undefined;

export const realmTab: string | undefined = undefined;

export const realmTabChange = async (tab: any, args: QueryRealmListArgs) => {
	return new Promise(
		(
			resolve: (data: QueryRealmListArgs) => void,
			reject: (errors: any) => void
		) => {
			resolve(args);
		}
	);
}

export type RealmFields = {
	name: Option<RealmInput, QueryRealmListArgs>;
	description: Option<RealmInput, QueryRealmListArgs>;
};

export const realmFields: RealmFields = {
	name: {
		readonly: (value?: RealmInput | undefined) => {
			return !auth('Realm::name::WRITE');
		},
		disabled: (value?: RealmInput | undefined) => {
			return !auth('Realm::name::WRITE');
		},
		hidden: (value?: RealmInput | undefined) => {
			return !auth('Realm::name::READ');
		},
		hiddenCol: (args: QueryRealmListArgs, tab: any) => {
			return !auth('Realm::name::READ');
		},
		required: (value?: RealmInput | undefined) => {
			return true;
		},
		validate: async (value: RealmInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: RealmInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: RealmInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: RealmInput | undefined) => {
			return {};
		}
	},
	description: {
		readonly: (value?: RealmInput | undefined) => {
			return !auth('Realm::description::WRITE');
		},
		disabled: (value?: RealmInput | undefined) => {
			return !auth('Realm::description::WRITE');
		},
		hidden: (value?: RealmInput | undefined) => {
			return !auth('Realm::description::READ');
		},
		hiddenCol: (args: QueryRealmListArgs, tab: any) => {
			return !auth('Realm::description::READ');
		},
		required: (value?: RealmInput | undefined) => {
			return false;
		},
		validate: async (value: RealmInput) => {
			return [];
		},
		onChange: async (fieldValue: string | null | undefined, value?: RealmInput | null | undefined) => {
			return new Promise(
				(
					resolve: (data: RealmInput | null | undefined) => void,
					reject: (errors: any) => void
				) => {
					resolve(value);
				}
			);
		},
		props: (value?: RealmInput | undefined) => {
			return {};
		}
	}
};