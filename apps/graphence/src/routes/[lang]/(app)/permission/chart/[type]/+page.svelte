<script lang="ts">
	import { Field, Directive, buildArguments, createConnectionField } from '@graphace/graphql';
	import { Card, CardBody, Pagination, toast } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import PermissionAgg from '~/lib/components/objects/permission/PermissionAgg.svelte';
	import PermissionBar from '~/lib/components/objects/permission/PermissionBar.svelte';
	import PermissionLine from '~/lib/components/objects/permission/PermissionLine.svelte';
	import PermissionPie from '~/lib/components/objects/permission/PermissionPie.svelte';
	import PermissionAggTable from '~/lib/components/objects/permission/PermissionAggTable.svelte';
	import type { QueryPermissionConnectionArgs, PermissionConnection } from '~/lib/types/schema';
	import { LL } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: query_permissionConnection_Store = data.query_permissionConnection_Store as OperationStore<PermissionConnection>;
	$: nodes = $query_permissionConnection_Store.response.data?.permissionConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_permissionConnection_Store.response.data?.permissionConnection?.totalCount || 0;

	let fields: Field[] = data.fields || [];
	let args: QueryPermissionConnectionArgs = data.args || {};
	let directives: Directive[] | undefined = data.directives;
	let pageNumber: number = 1;
	let pageSize: number = 10;

	const components: Record<string, any> = {
		bar: PermissionBar,
		line: PermissionLine,
		pie: PermissionPie,
		table: PermissionAggTable
	};

	$: component = components[data.type];

	const query = (to?: number | undefined) => {
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_permissionConnection_Store
			.fetch({
				fields: [
					createConnectionField({
						name: 'permissionConnection',
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
		<PermissionAgg
			bind:fields
			bind:args
			{showHeader}
			{showOptionButton}
			{showFilterButton}
			class="md:h-screen"
			isFetching={$query_permissionConnection_Store.isFetching}
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
		</PermissionAgg>
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