<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { FormItem } from '@graphace/ui';
	import RealmSelect from './RealmSelect.svelte';
	import type { RealmInput } from '$houdini';

	export let value: RealmInput | (RealmInput | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<FormItem {label} let:id>
	<RealmSelect {id} {name} {list} {disabled} {readonly} {placeholder} {errors} bind:value />
</FormItem>
