<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import { EnumInput } from '@graphace/ui-graphql/components/input';
	import LL from '$i18n/i18n-svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';

	$: enums = [
		{ name: $LL.graphql.enums.ApiType.values.QUERY.name(), value: 'QUERY' },
		{ name: $LL.graphql.enums.ApiType.values.MUTATION.name(), value: 'MUTATION' },
		{ name: $LL.graphql.enums.ApiType.values.SUBSCRIPTION.name(), value: 'SUBSCRIPTION' }
	];
</script>

<EnumInput bind:value {list} {enums} {name} {errors} {readonly} {disabled} {placeholder} />
