<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema } from '@graphace/commons';
	import { Field, Directive, buildArguments, createConnectionField } from '@graphace/graphql';
	import { Card, CardBody, Pagination, modal, toast } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import UserQuery from '~/lib/components/objects/user/User.svelte';
	import UserAgg from '~/lib/components/objects/user/UserAgg.svelte';
	import UserGrid from '~/lib/components/objects/user/UserGrid.svelte';
	import UserAggGrid from '~/lib/components/objects/user/UserAggGrid.svelte';
	import type { QueryUserConnectionArgs, User, UserConnection } from '~/lib/types/schema';
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

	$: query_userConnection_Store = data.query_userConnection_Store as OperationStore<UserConnection>;
	$: nodes = $query_userConnection_Store.response.data?.userConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_userConnection_Store.response.data?.userConnection?.totalCount || 0;
	const mutation_userList_Store = data.mutation_userList_Store as OperationStore<User[]>;

	let fields: Field[] = data.fields || [];
	let queryFields: Field[] = data.fields || [];
	let args: QueryUserConnectionArgs = data.args || {};
	let directives: Directive[] | undefined = data.directives;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined) => {
		errors = {};
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_userConnection_Store
			.fetch({
				fields: [
					createConnectionField({
						name: 'userConnection',
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

	const fetch = (params: {
		fields: Field[];
		args: QueryUserConnectionArgs;
		directives?: Directive[];
	}) => {
		return query_userConnection_Store.fetch({
			fields: [
				createConnectionField({
					name: 'userConnection',
					args: buildArguments(params.args),
					fields: params.fields,
					directives: params.directives
				})
			]
		});
	};
</script>

<Card>
	<CardBody>
		{#if data.type === 'mutation'}
			<UserQuery
				bind:fields
				bind:queryFields
				bind:args
				{showHeader}
				{showOptionButton}
				{showFilterButton}
				isFetching={$query_userConnection_Store.isFetching}
				class="md:h-screen"
				on:query={(e) => query()}
				let:fields
				let:queryFields
				let:args
				let:getFieldName
				let:query
				let:buildArguments
			>
				<UserGrid
					value={nodes}
					{fields}
					{errors}
					{queryFields}
					{args}
					{getFieldName}
					{query}
					{buildArguments}
					isMutating={$mutation_userList_Store.isFetching}
					on:mutation={(e) => {
						validate('Mutation_userList_Arguments', e.detail.args, $locale)
							.then((data) => {
								errors = {};
								mutation_userList_Store
									.fetch({
										fields: [
											new Field({
												name: 'userList',
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
						fetch({
							fields: e.detail.fields,
							args: e.detail.args,
							directives: e.detail.directives
						}).then((result) => {
								if (result.errors) {
									console.error(result.errors);
									toast.error($LL.graphence.message.requestFailed());
								} else if (e.detail.then) {
									e.detail.then(result?.data?.userConnection?.edges?.map((edge) => edge?.node));
								}
							});
					}}
				/>
			</UserQuery>
		{:else}
			<UserAgg
				bind:fields
				bind:args
				{showHeader}
				{showOptionButton}
				{showFilterButton}
				isFetching={$query_userConnection_Store.isFetching}
				class="md:h-screen"
				on:query={(e) => query()}
				let:fields
				let:args
				let:getFieldName
				let:getGrouByName
			>
				<UserAggGrid value={nodes} {fields} {args} {getFieldName} {getGrouByName} />
			</UserAgg>
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