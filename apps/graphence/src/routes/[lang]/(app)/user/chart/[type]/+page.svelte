<script lang="ts">
	import { createConnectionField, Directive, Field } from '@graphace/graphql';
	import { Card, CardBody, Pagination, toast } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import UserAgg from '~/lib/components/objects/user/UserAgg.svelte';
	import UserBar from '~/lib/components/objects/user/UserBar.svelte';
	// import UserLine from '~/lib/components/objects/user/UserLine.svelte';
	// import UserPie from '~/lib/components/objects/user/UserPie.svelte';
	// import UserAggTable from '~/lib/components/objects/user/UserAggTable.svelte';
	import type { QueryUserListArgs, UserConnection } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: fields = data.fields;
	$: args = data.args;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	$: query_userConnection_Store = data.query_userConnection_Store as OperationStore<UserConnection>;
	$: nodes = $query_userConnection_Store.response.data?.userConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_userConnection_Store.response.data?.userConnection?.totalCount || 0;
	let pageNumber: number = 1;
	let pageSize: number = 10;

	const components: Record<string, any> = {
		bar: UserBar
		// line: UserLine,
		// pie: UserPie,
		// table: UserAggTable
	};

	$: component = components[data.type];

	const query = (params: {
		fields: Field[];
		args: QueryUserListArgs;
		directives?: Directive[];
	}) => {
		query_userConnection_Store.fetch(params).then((result) => {
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
			{fields}
			{args}
			{showHeader}
			{showOptionButton}
			{showFilterButton}
			{showBookmarkButton}
			isFetching={$query_userConnection_Store.isFetching}
			on:query={(e) =>
				query_userConnection_Store.fetch({
					fields: [
						createConnectionField({
							name: 'userConnection',
							fields: e.detail.fields,
							arguments: e.detail.args,
							directives: e.detail.directives
						})
					]
				})}
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
				on:pageChange={(e) => query({ first: pageSize, offset: (pageNumber - 1) * pageSize })}
				on:sizeChange={(e) => query({ first: pageSize, offset: 0 })}
			/>
		{/if}
	</CardBody>
</Card>
