<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { StringFilter, IntFilter } from '@graphace/ui-graphql';
	import GroupSelectFilter from '~/lib/components/objects/group/GroupSelectFilter.svelte';
	import UserSelectFilter from '~/lib/components/objects/user/UserSelectFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { GroupExpression } from '~/lib/types/schema';

	export let value: GroupExpression | null | undefined = undefined;
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
			path: undefined,
			deep: undefined,
			parentId: undefined,
			parent: { id: undefined },
			subGroups: { id: undefined },
			users: { id: undefined },
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
			path: undefined,
			deep: undefined,
			parentId: undefined,
			parent: { id: undefined },
			subGroups: { id: undefined },
			users: { id: undefined },
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
			<span>{$LL.graphql.objects.Group.name()}</span>
			<GroupSelectFilter
				name="id"
				bind:value={value.id}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Group.fields.name.name()}</span>
			<StringFilter
				name="name"
				bind:value={value.name}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Group.fields.description.name()}</span>
			<StringFilter
				name="description"
				bind:value={value.description}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Group.fields.path.name()}</span>
			<StringFilter
				name="path"
				bind:value={value.path}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Group.fields.deep.name()}</span>
			<IntFilter
				name="deep"
				bind:value={value.deep}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Group.fields.parentId.name()}</span>
			<StringFilter
				name="parentId"
				bind:value={value.parentId}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Group.fields.parent.name()}</span>
			<GroupSelectFilter
				name="parent"
				bind:value={value.parent.id}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Group.fields.subGroups.name()}</span>
			<GroupSelectFilter
				name="subGroups"
				bind:value={value.subGroups.id}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Group.fields.users.name()}</span>
			<UserSelectFilter
				name="users"
				bind:value={value.users.id}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Group.fields.roles.name()}</span>
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