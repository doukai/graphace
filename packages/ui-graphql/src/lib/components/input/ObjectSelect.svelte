<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import type { Errors } from '@graphace/commons';
	import { Combobox, type Option } from '@graphace/ui';

	export let list: boolean | undefined = false;
	export let id: string | null = null;
	export let name: string;
	export let disabled = false;
	export let readonly = false;
	export let placeholder: string | null | undefined = undefined;
	export let loading: boolean = false;
	export let options: Option[] = [];
	export let value: Option | Option[] | null | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let className: string = '';
	export let containerClassName: string = '';
	export let tagClassName: string = '';
	export let menuClassName: string = '';
	
	const LL = getContext<Readable<TranslationFunctions>>('LL');
</script>

<div class="form-control w-full">
	{#if readonly}
		<input
			type="text"
			{id}
			{name}
			{placeholder}
			class="input input-bordered {className}"
			value={Array.isArray(value) ? value.map((item) => item?.label).join(', ') : value}
			readonly
		/>
	{:else}
		<Combobox
			{name}
			{placeholder}
			{disabled}
			{loading}
			multiple={list}
			{className}
			{containerClassName}
			{tagClassName}
			{menuClassName}
			bind:value
			bind:options
			on:search
			on:change
			on:update
		/>
	{/if}
	{#if errors?.errors}
		<label for={id} class="label">
			{#each errors.errors as error}
				<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
			{/each}
		</label>
	{/if}
</div>
