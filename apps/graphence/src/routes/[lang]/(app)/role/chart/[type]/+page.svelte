<script lang="ts">
	import { page } from '$app/stores';
	import { createConnectionField } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import RoleBar from '~/lib/components/objects/role/RoleBar.svelte';
	import RoleLine from '~/lib/components/objects/role/RoleLine.svelte';
	import RolePie from '~/lib/components/objects/role/RolePie.svelte';
	import type { RoleConnection } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
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

	const RoleConnectionQuery = data.RoleConnectionQuery as OperationStore<RoleConnection>;

	const components: Record<string, any> = {
		bar: RoleBar,
		line: RoleLine,
		pie: RolePie
	};

	$: component = components[data.type];
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
		on:query={(e) =>
			RoleConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'roleConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			})}
	/>
</Card>
