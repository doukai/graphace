<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { IDFilter, StringFilter } from '@graphace/ui-graphql';
	import PermissionTypeFilter from '~/lib/components/enums/permission-type/PermissionTypeFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { PermissionExpression } from '~/lib/types/schema';

	export let value: PermissionExpression | null | undefined = undefined;
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
			field: undefined,
			type: undefined,
			permissionType: undefined,
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
			field: undefined,
			type: undefined,
			permissionType: undefined,
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
			<span>{$LL.graphql.objects.Permission.fields.name.name()}</span>
			<IDFilter
				name="name"
				bind:value={value.name}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Permission.fields.description.name()}</span>
			<StringFilter
				name="description"
				bind:value={value.description}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Permission.fields.field.name()}</span>
			<StringFilter
				name="field"
				bind:value={value.field}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Permission.fields.type.name()}</span>
			<StringFilter
				name="type"
				bind:value={value.type}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Permission.fields.permissionType.name()}</span>
			<PermissionTypeFilter
				name="permissionType"
				bind:value={value.permissionType}
			/>
			<div class="divider m-0 md:hidden" />
			<span>{$LL.graphql.objects.Permission.fields.roles.name()}</span>
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