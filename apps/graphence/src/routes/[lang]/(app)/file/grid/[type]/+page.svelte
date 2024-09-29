<script lang="ts">
	import { Card } from '@graphace/ui';
	import FileAggGrid from '~/lib/components/objects/file/FileAggGrid.svelte';
	import type { FileQueryStore } from '~/lib/stores/file/fileQueryStore';
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

	const FileQuery = data.FileQuery as FileQueryStore;

	const components: Record<string, any> = {
		agg: FileAggGrid
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$FileQuery.isFetching}
		connection={$FileQuery.connection}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => FileQuery.fetch(e.detail.fields, e.detail.queryArguments)}
	/>
</Card>
