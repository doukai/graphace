<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { FormItem } from '@graphace/ui';
	import RoleSelect from './RoleSelect.svelte';
	import type { RoleInput } from '$houdini';

	export let value: RoleInput | (RoleInput | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<FormItem {label} let:id>
	<RoleSelect {id} {name} {list} {disabled} {readonly} {placeholder} {errors} bind:value />
</FormItem>
