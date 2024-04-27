<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { tippy } from '@graphace/ui';
	import type { ObjectOption } from 'svelte-multiselect';
	import RealmSelect from './RealmSelect.svelte';
	import type { RealmInput } from '$houdini';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Minus } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';

	export let value: RealmInput | (RealmInput | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';

	let selected: ObjectOption[] = [];
	let content: HTMLElement;
	let tippyElement: any;
	const dispatch = createEventDispatcher<{
		save: {};
	}>();

	let mutation = (): void => {
		dispatch('save', {});
		tippyElement._tippy.hide();
	};

	let clean = (): void => {
		if (Array.isArray(value)) {
			value = [];
		} else {
			value = null;
		}
		selected = [];
		dispatch('save', {});
		tippyElement._tippy.hide();
	};
</script>

<div class="hidden">
	<div class="flex items-start space-x-1" bind:this={content}>
		<RealmSelect {name} {list} {disabled} {readonly} {placeholder} bind:value bind:selected />
		{#if !readonly && !disabled}
			<div class="tooltip" data-tip={$LL.uiGraphql.table.td.save()}>
				<button class="btn btn-square btn-primary" on:click|preventDefault={(e) => mutation()}>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.uiGraphql.table.td.clear()}>
				<button
					class="btn btn-square btn-outline btn-error"
					on:click|preventDefault={(e) => clean()}
				>
					<Icon src={XMark} class="h-5 w-5" />
				</button>
			</div>
		{/if}
	</div>
</div>

<td>
	<div
		class={errors ? 'tooltip tooltip-open tooltip-error hover:z-30' : ''}
		data-tip={errors?.errors?.map((error) => error.message).join(', ')}
	>
		<a
			class="group link inline-flex"
			href={null}
			use:tippy={{
				content,
				placement: 'bottom',
				interactive: true,
				arrow: true,
				trigger: 'click',
				interactiveBorder: 30,
				theme: 'daisy',
				maxWidth: 'none',
				appendTo: () => document.body
			}}
			bind:this={tippyElement}
		>
			{#if list}
				{#if selected && selected.length > 0}
					{#if selected && selected.length > 3}
						{selected
							.map((item) => item?.label)
							.slice(0, 3)
							.join(',')
							.concat('...')}
					{:else}
						{selected.map((item) => item?.label).join(',')}
					{/if}
				{:else}
					<Icon src={Minus} class="h-5 w-5" />
				{/if}
			{:else if selected[0]}
				{selected[0].label}
			{:else}
				<Icon src={Minus} class="h-5 w-5" />
			{/if}
		</a>
	</div>
</td>
