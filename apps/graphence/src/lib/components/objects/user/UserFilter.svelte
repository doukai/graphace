<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { PermissionsStore } from '@graphace/commons';
	import { z_index } from '@graphace/ui'; 
	import { StringFilter, BooleanFilter } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import UserSelectFilter from '~/lib/components/objects/user/UserSelectFilter.svelte';
	import GroupSelectFilter from '~/lib/components/objects/group/GroupSelectFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import RealmSelectFilter from '~/lib/components/objects/realm/RealmSelectFilter.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { UserExpression } from '~/lib/types/schema';

	export let value: UserExpression | null | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');

	const z_class8 = z_index.top(8);
	
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	if (value === null || value === undefined || Object.keys(value).length === 0) {
		value = {
			id: undefined,
			name: undefined,
			description: undefined,
			lastName: undefined,
			login: undefined,
			email: undefined,
			phones: undefined,
			disable: undefined,
			groups: { id: undefined },
			roles: { id: undefined },
			realm: { id: undefined }
		}
	}

	const filter = (): void => {
		dispatch('filter', {});
		$open = false;
	};

	const clear = (): void => {
		value = {
			id: undefined,
			name: undefined,
			description: undefined,
			lastName: undefined,
			login: undefined,
			email: undefined,
			phones: undefined,
			disable: undefined,
			groups: { id: undefined },
			roles: { id: undefined },
			realm: { id: undefined }
		};
		dispatch('filter', {});
		$open = false;
	};

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});
</script>

<slot trigger={$trigger} />

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 {z_class8}" />
	<div class="p-1 rounded-xl bg-base-200 shadow {z_class8}" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="space-y-1 max-h-60 overflow-y-auto">
			{#if permissions.auth('User::id::*')}
			<UserSelectFilter
				label={$LL.graphql.objects.User.name()}
				name="id"
				bind:value={value.id}
				className="md:input-sm"
				selectClassName="md:select-sm w-full"
				containerClassName="md:min-h-8"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::name::*')}
			<StringFilter
				label={$LL.graphql.objects.User.fields.name.name()}
				name="name"
				bind:value={value.name}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::description::*')}
			<StringFilter
				label={$LL.graphql.objects.User.fields.description.name()}
				name="description"
				bind:value={value.description}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::lastName::*')}
			<StringFilter
				label={$LL.graphql.objects.User.fields.lastName.name()}
				name="lastName"
				bind:value={value.lastName}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::login::*')}
			<StringFilter
				label={$LL.graphql.objects.User.fields.login.name()}
				name="login"
				bind:value={value.login}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::email::*')}
			<StringFilter
				label={$LL.graphql.objects.User.fields.email.name()}
				name="email"
				bind:value={value.email}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::phones::*')}
			<StringFilter
				label={$LL.graphql.objects.User.fields.phones.name()}
				name="phones"
				bind:value={value.phones}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::disable::*')}
			<BooleanFilter
				label={$LL.graphql.objects.User.fields.disable.name()}
				name="disable"
				bind:value={value.disable}
				className="md:toggle-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::groups::*')}
			<GroupSelectFilter
				label={$LL.graphql.objects.User.fields.groups.name()}
				name="groups"
				bind:value={value.groups.id}
				className="md:input-sm"
				containerClassName="md:min-h-8"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::roles::*')}
			<RoleSelectFilter
				label={$LL.graphql.objects.User.fields.roles.name()}
				name="roles"
				bind:value={value.roles.id}
				className="md:input-sm"
				containerClassName="md:min-h-8"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::realm::*')}
			<RealmSelectFilter
				label={$LL.graphql.objects.User.fields.realm.name()}
				name="realm"
				bind:value={value.realm.id}
				className="md:input-sm"
				containerClassName="md:min-h-8"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
		</div>
		<div class="flex justify-center space-x-1 pt-1">
			<div class="tooltip" data-tip={$LL.ui_graphql.table.th.filter()}>
				<button class="btn btn-square btn-primary md:btn-sm" on:click={(e) => filter()}>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.ui_graphql.table.th.cancel()}>
				<button class="btn btn-square btn-outline btn-error md:btn-sm" on:click={(e) => clear()}>
					<Icon src={XMark} class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>
{/if}