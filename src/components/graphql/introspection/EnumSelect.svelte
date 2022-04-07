<script lang="ts">
	import { gql } from 'graphql-request';
	import { client } from '$lib/GraphqlClient';
	import type { __Type } from '$lib/types/__Type';
	import Select from '@components/ui/input/Select.svelte';
	export let value: any;
	export let enumName: string;

	const graphql = gql`
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
	const queryData = client.request<Response>(graphql, { enumName });
</script>

{#await queryData}
	<div class="animate-pulse max-w-lg w-full sm:max-w-xs rounded-md" />
{:then response}
	<Select bind:value>
		{#each response.__type.enumValues as enumValue}
			<option value={enumValue.name}>{enumValue.name}</option>
		{/each}
	</Select>
{/await}
