<script lang="ts">
	import { Card } from '@graphace/ui';
	import RoleAggGrid from '~/lib/components/objects/role/RoleAggGrid.svelte';
	import type { RoleAggStore } from '~/lib/stores/role/roleAggStore';
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

	const RoleAgg = data.RoleAgg as RoleAggStore;

	const components: Record<string, any> = {
		agg: RoleAggGrid
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$RoleAgg.isFetching}
		connection={$RoleAgg.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => RoleAgg.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
