<script lang="ts">
	import { Card } from '@graphace/ui';
	import RoleBar from '~/lib/components/objects/role/RoleBar.svelte';
	import RoleLine from '~/lib/components/objects/role/RoleLine.svelte';
	import RolePie from '~/lib/components/objects/role/RolePie.svelte';
	import RoleAggTable from '~/lib/components/objects/role/RoleAggTable.svelte';
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
		bar: RoleBar,
		line: RoleLine,
		pie: RolePie,
		table: RoleAggTable
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
