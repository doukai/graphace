<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { FormItem } from '@graphace/ui';
	import UserSelect from './UserSelect.svelte';
	import type { UserInput } from '$houdini';

	export let value: UserInput | (UserInput | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	
	let selected: UserInput | (UserInput | null | undefined)[] | null | undefined = undefined;
	selected = value;

	if (Array.isArray(value)) {
		value = value.map((item) => ({ where: { id: { val: item?.id } } }));
	} else if (value) {
		value = { where: { id: { val: value.id } } };
	}
</script>

<FormItem {label} let:id>
	<UserSelect
		{id}
		{name}
		{list}
		{disabled}
		{readonly}
		{placeholder}
		{errors}
		bind:value={selected}
		on:change={(e) => {
			if (Array.isArray(e.detail.value)) {
				value = e.detail.value.map((item) => ({ where: { id: { val: item?.id } } }));
			} else if (e.detail.value && !Array.isArray(e.detail.value)) {
				value = { where: { id: { val: e.detail.value.id } } };
			} else {
				value = undefined;
			}
		}}
	/>
</FormItem>
