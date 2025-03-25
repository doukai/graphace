<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { Form, FormControl, Label } from '@graphace/ui';
	import { StringFilter, IntFilter } from '@graphace/ui-graphql';
	import GroupSelectFilter from '~/lib/components/objects/group/GroupSelectFilter.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { GroupExpression } from '~/lib/types/schema';

	export let value: GroupExpression | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number = 0;
	let className: string | undefined = undefined;
	export { className as class };

	const contextClass = getContext<string>('ui.popover-content') || '';
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
	<div class="z-[{zIndex + 5}] {className} {contextClass}" use:melt={$content}>
		<div use:melt={$arrow} />
		<Form class="max-h-60 overflow-y-auto">
			<FormControl let:id>
				<Label {id} text={$LL.graphql.objects.Group.name()} />
				<div class="grid grid-cols-2 gap-1">
					<GroupSelectFilter {id} name="id" bind:value={value.id} />
				</div>
				<Label {id} text={$LL.graphql.objects.Group.fields.name.name()} />
				<div class="grid grid-cols-2 gap-1">
					<StringFilter {id} name="name" bind:value={value.name} />
				</div>
				<Label {id} text={$LL.graphql.objects.Group.fields.description.name()} />
				<div class="grid grid-cols-2 gap-1">
					<StringFilter {id} name="description" bind:value={value.description} />
				</div>
				<Label {id} text={$LL.graphql.objects.Group.fields.path.name()} />
				<div class="grid grid-cols-2 gap-1">
					<StringFilter {id} name="path" bind:value={value.path} />
				</div>
				<Label {id} text={$LL.graphql.objects.Group.fields.deep.name()} />
				<div class="grid grid-cols-2 gap-1">
					<IntFilter {id} name="deep" bind:value={value.deep} />
				</div>
				<Label {id} text={$LL.graphql.objects.Group.fields.parentId.name()} />
				<div class="grid grid-cols-2 gap-1">
					<StringFilter {id} name="parentId" bind:value={value.parentId} />
				</div>
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