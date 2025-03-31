<script lang="ts">
	import { Field, Directive, buildArguments, createConnectionField } from '@graphace/graphql';
	import { Card, CardBody, Pagination, toast } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import GroupAgg from '~/lib/components/objects/group/GroupAgg.svelte';
	import GroupBar from '~/lib/components/objects/group/GroupBar.svelte';
	import GroupLine from '~/lib/components/objects/group/GroupLine.svelte';
	import GroupPie from '~/lib/components/objects/group/GroupPie.svelte';
	import GroupAggTable from '~/lib/components/objects/group/GroupAggTable.svelte';
	import type { QueryGroupConnectionArgs, GroupConnection } from '~/lib/types/schema';
	import { LL } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: query_groupConnection_Store = data.query_groupConnection_Store as OperationStore<GroupConnection>;
	$: nodes = $query_groupConnection_Store.response.data?.groupConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_groupConnection_Store.response.data?.groupConnection?.totalCount || 0;

	let fields: Field[] = data.fields || [];
	let args: QueryGroupConnectionArgs = data.args || {};
	let directives: Directive[] | undefined = data.directives;
	let pageNumber: number = 1;
	let pageSize: number = 10;

	const components: Record<string, any> = {
		bar: GroupBar,
		line: GroupLine,
		pie: GroupPie,
		table: GroupAggTable
	};

	$: component = components[data.type];

	const query = (to?: number | undefined) => {
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_groupConnection_Store
			.fetch({
				fields: [
					createConnectionField({
						name: 'groupConnection',
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
		<GroupAgg
			bind:fields
			bind:args
			{showHeader}
			{showOptionButton}
			{showFilterButton}
			class="md:h-screen"
			isFetching={$query_groupConnection_Store.isFetching}
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
		</GroupAgg>
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