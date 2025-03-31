<script lang="ts">
	import { Field, Directive, buildArguments, createConnectionField } from '@graphace/graphql';
	import { Card, CardBody, Pagination, toast } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import RealmAgg from '~/lib/components/objects/realm/RealmAgg.svelte';
	import RealmBar from '~/lib/components/objects/realm/RealmBar.svelte';
	import RealmLine from '~/lib/components/objects/realm/RealmLine.svelte';
	import RealmPie from '~/lib/components/objects/realm/RealmPie.svelte';
	import RealmAggTable from '~/lib/components/objects/realm/RealmAggTable.svelte';
	import type { QueryRealmConnectionArgs, RealmConnection } from '~/lib/types/schema';
	import { LL } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: query_realmConnection_Store = data.query_realmConnection_Store as OperationStore<RealmConnection>;
	$: nodes = $query_realmConnection_Store.response.data?.realmConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_realmConnection_Store.response.data?.realmConnection?.totalCount || 0;

	let fields: Field[] = data.fields || [];
	let args: QueryRealmConnectionArgs = data.args || {};
	let directives: Directive[] | undefined = data.directives;
	let pageNumber: number = 1;
	let pageSize: number = 10;

	const components: Record<string, any> = {
		bar: RealmBar,
		line: RealmLine,
		pie: RealmPie,
		table: RealmAggTable
	};

	$: component = components[data.type];

	const query = (to?: number | undefined) => {
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_realmConnection_Store
			.fetch({
				fields: [
					createConnectionField({
						name: 'realmConnection',
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
		<RealmAgg
			bind:fields
			bind:args
			{showHeader}
			{showOptionButton}
			{showFilterButton}
			class="md:h-screen"
			isFetching={$query_realmConnection_Store.isFetching}
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
		</RealmAgg>
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