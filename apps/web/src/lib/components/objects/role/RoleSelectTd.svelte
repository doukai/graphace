<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { tippy } from '@graphace/ui';
	import RoleSelect from './RoleSelect.svelte';
	import type { RoleInput } from '$houdini';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Minus } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';

	export let value: RoleInput | (RoleInput | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';

	let _value = value;
	let content: HTMLElement;
	let tippyElement: any;
	const dispatch = createEventDispatcher<{
		save: {};
	}>();

	let mutation = (): void => {
		if (Array.isArray(value) && Array.isArray(_value)) {
			value = [
				...value,
				..._value
					.filter(
						(_item) =>
							!Array.isArray(value) ||
							!value.map((item) => item?.where?.id?.val).includes(_item?.where?.id?.val)
					)
					.map((_item) => ({ where: _item?.where, isDeprecated: true }))
			];
		}
		dispatch('save', {});
		tippyElement._tippy.hide();
	};

	let clean = (): void => {
		if (Array.isArray(value) && Array.isArray(_value)) {
			value = [];
		} else {
			value = null;
		}
		dispatch('save', {});
		tippyElement._tippy.hide();
	};
</script>

<div class="hidden">
	<div class="flex items-start space-x-1" bind:this={content}>
		<RoleSelect {name} {list} {disabled} {readonly} {placeholder} bind:value />
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
			{#if Array.isArray(_value) || (list && (_value === null || _value === undefined))}
				{#if _value && _value.length > 0}
					{#if _value && _value.length > 3}
						{_value
							.filter((item) => item)
							.map((item) => item?.name)
							.slice(0, 3)
							.join(',')
							.concat('...')}
					{:else}
						{_value
							.filter((item) => item)
							.map((item) => item?.name)
							.join(',')}
					{/if}
				{:else}
					<Icon src={Minus} class="h-5 w-5" />
				{/if}
			{:else if _value}
				{_value?.name}
			{:else}
				<Icon src={Minus} class="h-5 w-5" />
			{/if}
		</a>
	</div>
</td>
