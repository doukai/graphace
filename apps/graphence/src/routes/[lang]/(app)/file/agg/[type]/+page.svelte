<script lang="ts">
	import { Card } from '@graphace/ui';
	import FileBar from '~/lib/components/objects/file/FileBar.svelte';
	import FileLine from '~/lib/components/objects/file/FileLine.svelte';
	import FilePie from '~/lib/components/objects/file/FilePie.svelte';
	import FileAggTable from '~/lib/components/objects/file/FileAggTable.svelte';
	import type { FileConnectionQueryStore } from '~/lib/stores/file/fileQueryStore';
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

	const FileConnectionQuery = data.FileConnectionQuery as FileConnectionQueryStore;

	const components: Record<string, any> = {
		bar: FileBar,
		line: FileLine,
		pie: FilePie,
		table: FileAggTable
	};

	const component = components[data.type];
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
