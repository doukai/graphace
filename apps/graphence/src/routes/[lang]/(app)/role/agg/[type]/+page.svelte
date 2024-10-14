<script lang="ts">
	import { Card } from '@graphace/ui';
	import RoleBar from '~/lib/components/objects/role/RoleBar.svelte';
	import RoleLine from '~/lib/components/objects/role/RoleLine.svelte';
	import RolePie from '~/lib/components/objects/role/RolePie.svelte';
	import RoleAggTable from '~/lib/components/objects/role/RoleAggTable.svelte';
	import type { RoleConnectionQueryStore } from '~/lib/stores/role/roleQueryStore';
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

	const RoleConnectionQuery = data.RoleConnectionQuery as RoleConnectionQueryStore;

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
		isFetching={$RoleConnectionQuery.isFetching}
		connection={$RoleConnectionQuery.response.data?.roleConnection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => RoleConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
