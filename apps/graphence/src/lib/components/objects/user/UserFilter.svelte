<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { StringFilter, BooleanFilter } from '@graphace/ui-graphql';
	import UserSelectFilter from '~/lib/components/objects/user/UserSelectFilter.svelte';
	import GroupSelectFilter from '~/lib/components/objects/group/GroupSelectFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { UserExpression } from '~/lib/types/schema';

	export let value: UserExpression | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number = 0;
	let className: string | undefined = undefined;
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	if (value === null || value === undefined || Object.keys(value).length === 0) {
		value = {
			name: undefined,
			description: undefined,
			lastName: undefined,
			login: undefined,
			email: undefined,
			phones: undefined,
			disable: undefined,
			groups: { id: undefined },
			roles: { id: undefined },
		}
	}

	const filter = (): void => {
		dispatch('filter', {});
		$open = false;
	};

	const clear = (): void => {
		value = {
			name: undefined,
			description: undefined,
			lastName: undefined,
			login: undefined,
			email: undefined,
			phones: undefined,
			disable: undefined,
			groups: { id: undefined },
			roles: { id: undefined },
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
	<div use:melt={$overlay} class="fixed inset-0 z-[{zIndex + 5}]" />
	<div class="z-[{zIndex + 5}] {className}" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="space-y-1 max-h-60 overflow-y-auto">
			<span>{$LL.graphql.objects.User.name()}</span>
			<UserSelectFilter
				name="id"
				bind:value={value.id}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.User.fields.name.name()}</span>
			<StringFilter
				name="name"
				bind:value={value.name}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.User.fields.description.name()}</span>
			<StringFilter
				name="description"
				bind:value={value.description}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.User.fields.lastName.name()}</span>
			<StringFilter
				name="lastName"
				bind:value={value.lastName}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.User.fields.login.name()}</span>
			<StringFilter
				name="login"
				bind:value={value.login}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.User.fields.email.name()}</span>
			<StringFilter
				name="email"
				bind:value={value.email}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.User.fields.phones.name()}</span>
			<StringFilter
				name="phones"
				bind:value={value.phones}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.User.fields.disable.name()}</span>
			<BooleanFilter
				name="disable"
				bind:value={value.disable}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.User.fields.groups.name()}</span>
			<GroupSelectFilter
				name="groups"
				bind:value={value.groups.id}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.User.fields.roles.name()}</span>
			<RoleSelectFilter
				name="roles"
				bind:value={value.roles.id}
			/>
			<div class="divider m-0 md:hidden" />
		</div>
		<div class="flex justify-center space-x-1 pt-1">
			<div class="tooltip" data-tip={$LL.ui_graphql.table.th.filter()}>
				<button
					{disabled}
					class="btn btn-square btn-primary"
					on:click|preventDefault={(e) => filter()}
				>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.ui_graphql.table.th.cancel()}>
				<button
					{disabled}
					class="btn btn-square btn-outline btn-error"
					on:click|preventDefault={(e) => clear()}
				>
					<Icon src={XMark} class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>
{/if}