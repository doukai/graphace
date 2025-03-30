<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema } from '@graphace/commons';
	import { Field, Directive, buildArguments, createConnectionField } from '@graphace/graphql';
	import { Card, CardBody, Pagination, modal, toast } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import GroupQuery from '~/lib/components/objects/group/Group.svelte';
	import GroupAgg from '~/lib/components/objects/group/GroupAgg.svelte';
	import GroupGrid from '~/lib/components/objects/group/GroupGrid.svelte';
	import GroupAggGrid from '~/lib/components/objects/group/GroupAggGrid.svelte';
	import type { QueryGroupConnectionArgs, Group, GroupConnection } from '~/lib/types/schema';
	import { buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;

	$: query_groupConnection_Store = data.query_groupConnection_Store as OperationStore<GroupConnection>;
	$: nodes = $query_groupConnection_Store.response.data?.groupConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_groupConnection_Store.response.data?.groupConnection?.totalCount || 0;
	const mutation_groupList_Store = data.mutation_groupList_Store as OperationStore<Group[]>;

	let fields: Field[] = data.fields || [];
	let queryFields: Field[] = data.fields || [];
	let args: QueryGroupConnectionArgs = data.args || {};
	let directives: Directive[] | undefined = data.directives;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined) => {
		errors = {};
		args.first = pageSize;
		args.offset = (to || pageNumber - 1) * pageSize;
		query_groupConnection_Store
			.fetch({
				fields: [
					createConnectionField({
						name: 'groupConnection',
						args: buildArguments(args),
						fields:
							data.type === 'mutation'
								? queryFields
								: [...(args?.groupBy?.map((name) => new Field({ name })) || []), ...fields],
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
		{#if data.type === 'mutation'}
			<GroupQuery
				bind:fields
				bind:queryFields
				bind:args
				{showHeader}
				{showOptionButton}
				{showFilterButton}
				isFetching={$query_groupConnection_Store.isFetching}
				class="h-screen"
				on:query={(e) => query()}
				let:fields
				let:queryFields
				let:args
				let:getFieldName
				let:query
				let:buildArguments
			>
				<GroupGrid
					value={nodes}
					{fields}
					{errors}
					{queryFields}
					{args}
					{getFieldName}
					{query}
					{buildArguments}
					on:mutation={(e) => {
						validate('Mutation_groupList_Arguments', e.detail.args, $locale)
							.then((data) => {
								errors = {};
								mutation_groupList_Store
									.fetch({
										fields: [
											new Field({
												name: 'groupList',
												fields: e.detail.fields,
												args: e.detail.args,
												directives: e.detail.directives
											})
										]
									})
									.then((result) => {
										if (result.errors) {
											console.error(result.errors);
											errors = buildGraphQLErrors(result.errors);
											const globalError = buildGlobalGraphQLErrorMessage(result.errors);
											if (globalError) {
												modal.open({
													title: $LL.graphence.message.requestFailed(),
													description: globalError,
													confirm: () => {
														query();
														return true;
													}
												});
											}
										} else {
											toast.success($LL.graphence.message.requestSuccess());
											query();
										}
									});
							})
							.catch((validErrors) => {
								errors = validErrors.list?.iterms;
							});
					}}
					on:exportQuery={(e) => {
						query_groupConnection_Store
							.fetch({
								fields: [
									createConnectionField({
										name: 'groupConnection',
										fields: e.detail.fields,
										args: e.detail.args,
										directives: e.detail.directives
									})
								]
							})
							.then((result) => {
								if (result.errors) {
									console.error(result.errors);
									toast.error($LL.graphence.message.requestFailed());
								} else if (e.detail.then) {
									e.detail.then(result?.data?.groupConnection?.edges?.map((edge) => edge?.node));
								}
							});
					}}
				/>
			</GroupQuery>
		{:else}
			<GroupAgg
				bind:fields
				bind:args
				{showHeader}
				{showOptionButton}
				{showFilterButton}
				isFetching={$query_groupConnection_Store.isFetching}
				class="h-screen"
				on:query={(e) => query()}
				let:fields
				let:args
				let:getFieldName
				let:getGrouByName
			>
				<GroupAggGrid value={nodes} {fields} {args} {getFieldName} {getGrouByName} />
			</GroupAgg>
		{/if}
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