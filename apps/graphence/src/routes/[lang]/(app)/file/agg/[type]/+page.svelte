<script lang="ts">
	import { page } from '$app/stores';
	import { Card, urlName } from '@graphace/ui';
	import FileBar from '~/lib/components/objects/file/FileBar.svelte';
	import FileLine from '~/lib/components/objects/file/FileLine.svelte';
	import FilePie from '~/lib/components/objects/file/FilePie.svelte';
	import FileAggTable from '~/lib/components/objects/file/FileAggTable.svelte';
	import type { FileConnectionQueryStore } from '~/lib/stores/file/fileQueryStore';
	import type { PageData } from './$houdini';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.File.name());

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	const FileConnectionQuery = data.FileConnectionQuery as FileConnectionQueryStore;

	const components: Record<string, any> = {
		bar: FileBar,
		line: FileLine,
		pie: FilePie,
		table: FileAggTable
	};

	$: component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$FileConnectionQuery.isFetching}
		connection={$FileConnectionQuery.response.data?.fileConnection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => FileConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
