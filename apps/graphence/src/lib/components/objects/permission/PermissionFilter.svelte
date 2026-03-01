<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { Form, FormControl, Label } from '@graphace/ui';
	import { StringFilter } from '@graphace/ui-graphql';
	import PermissionTypeFilter from '~/lib/components/enums/permission-type/PermissionTypeFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import type { PermissionExpression } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: PermissionExpression | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number = 0;
	let className: string | undefined = undefined;
	export { className as class };
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const contextClass = getContext<string>('ui.popover-content') || '';
	
	const dispatch = createEventDispatcher<{
		filter: { value?: PermissionExpression | null | undefined };
	}>();

	let _value: PermissionExpression = {
		id: undefined,
		name: undefined,
		description: undefined,
		field: undefined,
		type: undefined,
		permissionType: undefined,
		roles: { id: undefined },
	}

	const filter = (): void => {
		value = _value;
		dispatch('filter', { value });
		$open = false;
	};

	const clear = (): void => {
		_value = {
			id: undefined,
			name: undefined,
			description: undefined,
			field: undefined,
			type: undefined,
			permissionType: undefined,
			roles: { id: undefined },
		};
		value = _value;
		dispatch('filter', { value });
		$open = false;
	};

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true,
		onOpenChange: ({ curr, next }) => {
			if (curr !== next && next) {
				_value = { ..._value, ...value };
			}
			return next;
		}
	});
</script>

<slot trigger={$trigger} />

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[{zIndex + 5}]" />
	<div class="p-1 z-[{zIndex + 5}] {contextClass} {className}" use:melt={$content}>
		<div use:melt={$arrow} />
		<Form class="max-h-60 overflow-y-auto">
			<FormControl let:id>
				<Label {id} text={$LL.graphql.objects.Permission.fields.name.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<StringFilter {id} name="name" bind:value={_value.name} />
				</div>
				<Label {id} text={$LL.graphql.objects.Permission.fields.description.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<StringFilter {id} name="description" bind:value={_value.description} />
				</div>
				<Label {id} text={$LL.graphql.objects.Permission.fields.field.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<StringFilter {id} name="field" bind:value={_value.field} />
				</div>
				<Label {id} text={$LL.graphql.objects.Permission.fields.type.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<StringFilter {id} name="type" bind:value={_value.type} />
				</div>
				<Label {id} text={$LL.graphql.objects.Permission.fields.permissionType.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<PermissionTypeFilter {id} name="permissionType" bind:value={_value.permissionType} />
				</div>
				{#if _value?.roles?.id}
					<Label {id} text={$LL.graphql.objects.Permission.fields.roles.name()} />
					<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
						<RoleSelectFilter {id} name="roles" bind:value={_value.roles.id} />
					</div>
				{/if}
			</FormControl>
		</Form>
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