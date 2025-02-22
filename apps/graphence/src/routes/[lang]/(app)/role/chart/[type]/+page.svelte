<script lang="ts">
	import { page } from '$app/stores';
	import { createConnectionField } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import RoleAgg from '~/lib/components/objects/role/RoleAgg.svelte';
	import RoleBar from '~/lib/components/objects/role/RoleBar.svelte';
	import RoleLine from '~/lib/components/objects/role/RoleLine.svelte';
	import RolePie from '~/lib/components/objects/role/RolePie.svelte';
	import RoleAggTable from '~/lib/components/objects/role/RoleAggTable.svelte';
	import type { RoleConnection } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.name());

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	$: roleConnectionQuery = data.roleConnectionQuery as OperationStore<RoleConnection>;
	$: connection = $roleConnectionQuery.response?.data?.roleConnection || {};
	$: totalCount = connection?.totalCount || 0;

	const components: Record<string, any> = {
		bar: RoleBar,
		line: RoleLine,
		pie: RolePie,
		table: RoleAggTable
	};

	$: component = components[data.type];
</script>

<Card>
	<RoleAgg
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		isFetching={$roleConnectionQuery.isFetching}
		{totalCount}
		className="p-0 md:h-screen"
		on:query={(e) =>
			roleConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'roleConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			})}
		let:fields
		let:queryArguments
		let:getFieldName
		let:getGrouByName
	>
		<svelte:component
			this={component}
			{connection}
			{fields}
			{queryArguments}
			{getFieldName}
			{getGrouByName}
		/>
	</RoleAgg>
</Card>
