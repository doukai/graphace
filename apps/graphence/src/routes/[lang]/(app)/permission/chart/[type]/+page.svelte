<script lang="ts">
	import { page } from '$app/stores';
	import { createConnectionField } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import PermissionAgg from '~/lib/components/objects/permission/PermissionAgg.svelte';
	import PermissionBar from '~/lib/components/objects/permission/PermissionBar.svelte';
	import PermissionLine from '~/lib/components/objects/permission/PermissionLine.svelte';
	import PermissionPie from '~/lib/components/objects/permission/PermissionPie.svelte';
	import PermissionAggTable from '~/lib/components/objects/permission/PermissionAggTable.svelte';
	import type { PermissionConnection } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Permission.name());

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	$: permissionConnectionQuery = data.permissionConnectionQuery as OperationStore<PermissionConnection>;
	$: connection = $permissionConnectionQuery.response?.data?.permissionConnection || {};
	$: totalCount = connection?.totalCount || 0;

	const components: Record<string, any> = {
		bar: PermissionBar,
		line: PermissionLine,
		pie: PermissionPie,
		table: PermissionAggTable
	};

	$: component = components[data.type];
</script>

<Card>
	<PermissionAgg
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		isFetching={$permissionConnectionQuery.isFetching}
		{totalCount}
		className="p-0 md:h-screen"
		on:query={(e) =>
			permissionConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'permissionConnection',
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
	</PermissionAgg>
</Card>
