<script lang="ts">
	import { Card } from '@graphace/ui';
	import RoleAggGrid from '~/lib/components/objects/role/RoleAggGrid.svelte';
	import type { RoleQueryStore } from '~/lib/stores/role/roleQueryStore';
	import type { PageData } from './$houdini';

	export let data: PageData;

	const {
		fields,
		queryArguments,
		showHeader,
		showFooter,
		showOptionButton,
		showFilterButton,
		showBookmarkButton
	} = data;

	const RoleQuery = data.RoleQuery as RoleQueryStore;

	const components: Record<string, any> = {
		agg: RoleAggGrid
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$RoleQuery.isFetching}
		connection={$RoleQuery.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => RoleQuery.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
