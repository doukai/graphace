<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { Form, FormControl, Label } from '@graphace/ui';
	import { StringFilter } from '@graphace/ui-graphql';
	import RealmSelectFilter from '~/lib/components/objects/realm/RealmSelectFilter.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { RealmExpression } from '~/lib/types/schema';

	export let value: RealmExpression | null | undefined = undefined;
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
			description: undefined
		}
	}

	const filter = (): void => {
		dispatch('filter', {});
		$open = false;
	};

	const clear = (): void => {
		value = {
			name: undefined,
			description: undefined
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
				<Label {id} text={$LL.graphql.objects.Realm.name()} />
				<div class="grid grid-cols-2 gap-1">
					<RealmSelectFilter {id} name="id" bind:value={value.id} />
				</div>
				<Label {id} text={$LL.graphql.objects.Realm.fields.name.name()} />
				<div class="grid grid-cols-2 gap-1">
					<StringFilter {id} name="name" bind:value={value.name} />
				</div>
				<Label {id} text={$LL.graphql.objects.Realm.fields.description.name()} />
				<div class="grid grid-cols-2 gap-1">
					<StringFilter {id} name="description" bind:value={value.description} />
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