<script lang="ts">
	import { Field, Directive, buildArguments, createConnectionField } from '@graphace/graphql';
	import { Card, CardBody, Pagination, toast } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import FileAgg from '~/lib/components/objects/file/FileAgg.svelte';
	import FileBar from '~/lib/components/objects/file/FileBar.svelte';
	import FileLine from '~/lib/components/objects/file/FileLine.svelte';
	import FilePie from '~/lib/components/objects/file/FilePie.svelte';
	import FileAggTable from '~/lib/components/objects/file/FileAggTable.svelte';
	import type { QueryFileConnectionArgs, FileConnection } from '~/lib/types/schema';
	import { LL } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: query_fileConnection_Store = data.query_fileConnection_Store as OperationStore<FileConnection>;
	$: nodes = $query_fileConnection_Store.response.data?.fileConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_fileConnection_Store.response.data?.fileConnection?.totalCount || 0;

	let fields: Field[] = data.fields || [];
	let args: QueryFileConnectionArgs = data.args || {};
	let directives: Directive[] | undefined = data.directives;
	let pageNumber: number = 1;
	let pageSize: number = 10;

	const components: Record<string, any> = {
		bar: FileBar,
		line: FileLine,
		pie: FilePie,
		table: FileAggTable
	};

	$: component = components[data.type];

	const query = (to?: number | undefined) => {
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_fileConnection_Store
			.fetch({
				fields: [
					createConnectionField({
						name: 'fileConnection',
						args: buildArguments(args),
						fields: [...(args?.groupBy?.map((name) => new Field({ name })) || []), ...fields],
						directives
					})
				]
			})
			.then((result) => {
				if (result.errors) {
					console.error(result.errors);
					toast.error($LL.graphence.message.requestFailed());
				}
			});
	};
</script>

<Card>
	<CardBody>
		<FileAgg
			bind:fields
			bind:args
			{showHeader}
			{showOptionButton}
			{showFilterButton}
			class="md:h-screen"
			isFetching={$query_fileConnection_Store.isFetching}
			on:query={(e) => query()}
			let:fields
			let:args
			let:getFieldName
			let:getGrouByName
		>
			<svelte:component
				this={component}
				value={nodes}
				{fields}
				{args}
				{getFieldName}
				{getGrouByName}
			/>
		</FileAgg>
		{#if showFooter}
			<div class="divider" />
			<Pagination
				bind:pageSize
				bind:pageNumber
				{totalCount}
				on:pageChange={(e) => query()}
				on:sizeChange={(e) => query(1)}
			/>
		{/if}
	</CardBody>
</Card>