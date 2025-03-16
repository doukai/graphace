<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { StringFilter } from '@graphace/ui-graphql';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import UserSelectFilter from '~/lib/components/objects/user/UserSelectFilter.svelte';
	import GroupSelectFilter from '~/lib/components/objects/group/GroupSelectFilter.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { RoleExpression } from '~/lib/types/schema';

	export let value: RoleExpression | null | undefined = undefined;
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
			users: { id: undefined },
			groups: { id: undefined },
			composites: { id: undefined },
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
			users: { id: undefined },
			groups: { id: undefined },
			composites: { id: undefined },
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
			<span>{$LL.graphql.objects.Role.name()}</span>
			<RoleSelectFilter
				name="id"
				bind:value={value.id}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Role.fields.name.name()}</span>
			<StringFilter
				name="name"
				bind:value={value.name}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Role.fields.description.name()}</span>
			<StringFilter
				name="description"
				bind:value={value.description}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Role.fields.users.name()}</span>
			<UserSelectFilter
				name="users"
				bind:value={value.users.id}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Role.fields.groups.name()}</span>
			<GroupSelectFilter
				name="groups"
				bind:value={value.groups.id}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Role.fields.composites.name()}</span>
			<RoleSelectFilter
				name="composites"
				bind:value={value.composites.id}
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