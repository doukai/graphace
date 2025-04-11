<script lang="ts">
	import { getContext } from 'svelte';
	import type { Errors, JsonSchema } from '@graphace/commons';
	import { Field, Directive, buildArguments, createConnectionField } from '@graphace/graphql';
	import { Card, CardBody, Pagination, modal, toast } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import RealmQuery from '~/lib/components/objects/realm/Realm.svelte';
	import RealmAgg from '~/lib/components/objects/realm/RealmAgg.svelte';
	import RealmGrid from '~/lib/components/objects/realm/RealmGrid.svelte';
	import RealmAggGrid from '~/lib/components/objects/realm/RealmAggGrid.svelte';
	import type { QueryRealmConnectionArgs, Realm, RealmConnection } from '~/lib/types/schema';
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

	$: query_realmConnection_Store = data.query_realmConnection_Store as OperationStore<RealmConnection>;
	$: nodes = $query_realmConnection_Store.response.data?.realmConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_realmConnection_Store.response.data?.realmConnection?.totalCount || 0;
	const mutation_realmList_Store = data.mutation_realmList_Store as OperationStore<Realm[]>;

	let fields: Field[] = data.fields || [];
	let queryFields: Field[] = data.fields || [];
	let args: QueryRealmConnectionArgs = data.args || {};
	let directives: Directive[] | undefined = data.directives;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let errors: Record<number, Errors> = {};

	const query = (to?: number | undefined) => {
		errors = {};
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_realmConnection_Store
			.fetch({
				fields: [
					createConnectionField({
						name: 'realmConnection',
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
		args: QueryRealmConnectionArgs;
		directives?: Directive[];
	}) => {
		return query_realmConnection_Store.fetch({
			fields: [
				createConnectionField({
					name: 'realmConnection',
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
			<RealmQuery
				bind:fields
				bind:queryFields
				bind:args
				{showHeader}
				{showOptionButton}
				{showFilterButton}
				isFetching={$query_realmConnection_Store.isFetching}
				class="md:h-screen"
				on:query={(e) => query()}
				let:fields
				let:queryFields
				let:args
				let:getFieldName
				let:query
				let:buildArguments
			>
				<RealmGrid
					value={nodes}
					{fields}
					{errors}
					{queryFields}
					{args}
					{getFieldName}
					{query}
					{buildArguments}
					isMutating={$mutation_realmList_Store.isFetching}
					on:mutation={(e) => {
						validate('Mutation_realmList_Arguments', e.detail.args, $locale)
							.then((data) => {
								errors = {};
								mutation_realmList_Store
									.fetch({
										fields: [
											new Field({
												name: 'realmList',
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
									e.detail.then(result?.data?.realmConnection?.edges?.map((edge) => edge?.node));
								}
							});
					}}
				/>
			</RealmQuery>
		{:else}
			<RealmAgg
				bind:fields
				bind:args
				{showHeader}
				{showOptionButton}
				{showFilterButton}
				isFetching={$query_realmConnection_Store.isFetching}
				class="md:h-screen"
				on:query={(e) => query()}
				let:fields
				let:args
				let:getFieldName
				let:getGrouByName
			>
				<RealmAggGrid value={nodes} {fields} {args} {getFieldName} {getGrouByName} />
			</RealmAgg>
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