<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { Card } from '@graphace/ui';
	import FileGrid from '~/lib/components/objects/file/FileGrid.svelte';
	import FileAggGrid from '~/lib/components/objects/file/FileAggGrid.svelte';
	import type { FileConnectionQueryStore } from '~/lib/stores/file/fileQueryStore';
	import type { FileListMutationStore } from '~/lib/stores/file/fileMutationStore';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	let errors: Record<number, Errors> = {};

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
	const FileListMutation = data.FileListMutation as FileListMutationStore;

	const components: Record<string, any> = {
		mutation: FileGrid,
		agg: FileAggGrid
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
		on:query={(e) => {
			errors = {};
			FileConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments);
		}}
		on:mutation={(e) => {
			validate('Mutation_fileList_Arguments', e.detail.mutationArguments, $locale)
				.then((data) => {
					errors = {};
					FileListMutation.fetch(e.detail.fields, e.detail.mutationArguments).then((response) => {
						if (response?.errors) {
							e.detail.catch(response.errors);
						} else {
							e.detail.then(response?.data?.fileList);
						}
					});
				})
				.catch((validErrors) => {
					errors = validErrors.list.iterms;
				});
		}}
	/>
</Card>
