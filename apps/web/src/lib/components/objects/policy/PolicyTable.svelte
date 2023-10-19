<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Policy } from '~/lib/types/schema';

	export let nodes: (Policy | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		fetch: {
			then: (data: (Policy | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		back: {};
	}>();

	export const query = () => {
		dispatch('fetch', {
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.requestFailed());
			}
		});
	};
</script>

<TableHead
	title={$LL.graphql.objects.Policy.name()}
	showSearchInput={false}
	showCreateButton={false}
	showRemoveButton={false}
	showUnbindButton={false}
	showSaveButton={false}
	showGotoSelectButton={false}
	{showBackButton}
	on:back
/>
<div class="divider" />
<Table>
	<thead>
		<tr class="z-20">
			<th>{$LL.graphql.objects.Policy.fields.ptype.name()}</th>
			<th>{$LL.graphql.objects.Policy.fields.v0.name()}</th>
			<th>{$LL.graphql.objects.Policy.fields.v1.name()}</th>
			<th>{$LL.graphql.objects.Policy.fields.v2.name()}</th>
			<th>{$LL.graphql.objects.Policy.fields.v3.name()}</th>
			<th>{$LL.graphql.objects.Policy.fields.v4.name()}</th>
			<th>{$LL.graphql.objects.Policy.fields.v5.name()}</th>
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={10} cols={6} />
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node}
					<tr class="hover">
						<td>{node?.ptype}</td>
						<td>{node?.v0}</td>
						<td>{node?.v1}</td>
						<td>{node?.v2}</td>
						<td>{node?.v3}</td>
						<td>{node?.v4}</td>
						<td>{node?.v5}</td>
					</tr>
				{/each}
			{:else}
				<TableEmpty cols={6} />
			{/if}
		</tbody>
	{/if}
</Table>
