<script lang="ts">
	import { Field, Directive, buildArguments, createConnectionField } from '@graphace/graphql';
	import { Card, CardBody, Pagination, toast } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import RoleAgg from '~/lib/components/objects/role/RoleAgg.svelte';
	import RoleBar from '~/lib/components/objects/role/RoleBar.svelte';
	import RoleLine from '~/lib/components/objects/role/RoleLine.svelte';
	import RolePie from '~/lib/components/objects/role/RolePie.svelte';
	import RoleAggTable from '~/lib/components/objects/role/RoleAggTable.svelte';
	import type { QueryRoleConnectionArgs, RoleConnection } from '~/lib/types/schema';
	import { LL } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: query_roleConnection_Store = data.query_roleConnection_Store as OperationStore<RoleConnection>;
	$: nodes = $query_roleConnection_Store.response.data?.roleConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_roleConnection_Store.response.data?.roleConnection?.totalCount || 0;

	let fields: Field[] = data.fields || [];
	let args: QueryRoleConnectionArgs = data.args || {};
	let directives: Directive[] | undefined = data.directives;
	let pageNumber: number = 1;
	let pageSize: number = 10;

	const components: Record<string, any> = {
		bar: RoleBar,
		line: RoleLine,
		pie: RolePie,
		table: RoleAggTable
	};

	$: component = components[data.type];

	const query = (to?: number | undefined) => {
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_roleConnection_Store
			.fetch({
				fields: [
					createConnectionField({
						name: 'roleConnection',
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
		<RoleAgg
			bind:fields
			bind:args
			{showHeader}
			{showOptionButton}
			{showFilterButton}
			class="md:h-screen"
			isFetching={$query_roleConnection_Store.isFetching}
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
		</RoleAgg>
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