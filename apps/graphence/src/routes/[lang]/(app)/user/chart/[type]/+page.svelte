<script lang="ts">
	import { Field, Directive, buildArguments, createConnectionField } from '@graphace/graphql';
	import { Card, CardBody, Pagination, toast } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import UserAgg from '~/lib/components/objects/user/UserAgg.svelte';
	import UserBar from '~/lib/components/objects/user/UserBar.svelte';
	import UserLine from '~/lib/components/objects/user/UserLine.svelte';
	import UserPie from '~/lib/components/objects/user/UserPie.svelte';
	import UserAggTable from '~/lib/components/objects/user/UserAggTable.svelte';
	import type { QueryUserConnectionArgs, UserConnection } from '~/lib/types/schema';
	import { LL } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: query_userConnection_Store = data.query_userConnection_Store as OperationStore<UserConnection>;
	$: nodes = $query_userConnection_Store.response.data?.userConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_userConnection_Store.response.data?.userConnection?.totalCount || 0;

	let fields: Field[] = data.fields || [];
	let args: QueryUserConnectionArgs = data.args || {};
	let directives: Directive[] | undefined = data.directives;
	let pageNumber: number = 1;
	let pageSize: number = 10;

	const components: Record<string, any> = {
		bar: UserBar,
		line: UserLine,
		pie: UserPie,
		table: UserAggTable
	};

	$: component = components[data.type];

	const query = (to?: number | undefined) => {
		args.first = pageSize;
		args.offset = (to || pageNumber - 1) * pageSize;
		query_userConnection_Store
			.fetch({
				fields: [
					createConnectionField({
						name: 'userConnection',
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
		<UserAgg
			bind:fields
			bind:args
			{showHeader}
			{showOptionButton}
			{showFilterButton}
			class="h-screen"
			isFetching={$query_userConnection_Store.isFetching}
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
		</UserAgg>
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