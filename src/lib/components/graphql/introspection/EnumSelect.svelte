<script lang="ts">
	import { gql } from 'graphql-request';
	import { client } from '$lib/graphql/GraphqlClient';
	import type { __Type } from '$lib/types/__Type';
	import Select from '$lib/components/ui/input/Select.svelte';
	export let name: string;
	export let value: string | number | boolean | null;
	export let enumName: string;
	export let className: string = '';

	const graphql: string = gql`
		query ($enumName: ID) {
			__type(name: { val: $enumName }) {
				name
				description
				enumValues {
					name
					description
				}
			}
		}
	`;

	type Response = { __type: __Type };
	const queryData: Promise<Response> = client.request<Response>(graphql, { enumName });
</script>

{#await queryData}
	<div class="animate-pulse max-w-lg w-full sm:max-w-xs rounded-md" />
{:then response}
	<Select {name} {className} bind:value>
		{#each response.__type.enumValues as enumValue}
			<option value={enumValue.name}>{enumValue.name}</option>
		{/each}
	</Select>
{/await}
