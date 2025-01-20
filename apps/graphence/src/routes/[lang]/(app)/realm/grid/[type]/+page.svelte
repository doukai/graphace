<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { createConnectionField, Field } from '@graphace/graphql';
	import { Card, urlName } from '@graphace/ui';
	import type { OperationStore } from '@graphace/ui-graphql';
	import RealmGrid from '~/lib/components/objects/realm/RealmGrid.svelte';
	import RealmAggGrid from '~/lib/components/objects/realm/RealmAggGrid.svelte';
	import type { Realm, RealmConnection } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { buildGraphQLErrors, validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Realm.name());
	let connection: RealmConnection | null | undefined = {};
	let errors: Record<number, Errors> = {};

	$: fields = data.fields;
	$: queryArguments = data.queryArguments;
	$: showHeader = data.showHeader;
	$: showFooter = data.showFooter;
	$: showOptionButton = data.showOptionButton;
	$: showFilterButton = data.fields;
	$: showBookmarkButton = data.showBookmarkButton;

	const RealmConnectionQuery = data.RealmConnectionQuery as OperationStore<RealmConnection>;
	const RealmListMutation = data.RealmListMutation as OperationStore<Realm[]>;

	const components: Record<string, any> = {
		mutation: RealmGrid,
		agg: RealmAggGrid
	};

	$: component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$RealmConnectionQuery.isFetching}
		{connection}
		{fields}
		{errors}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => {
			errors = {};
			RealmConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'realmConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			}).then((response) => {
				connection = response?.data?.realmConnection;
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.realmConnection);
				}
			});
		}}
		on:exportQuery={(e) => {
			RealmConnectionQuery.fetch({
				fields: [
					createConnectionField({
						name: 'realmConnection',
						fields: e.detail.fields,
						arguments: e.detail.queryArguments,
						directives: e.detail.directives
					})
				]
			}).then((response) => {
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.realmConnection);
				}
			});
		}}
		on:mutation={(e) => {
			validate('Mutation_realmList_Arguments', e.detail.mutationArguments, $locale)
				.then((data) => {
					errors = {};
					RealmListMutation.fetch({
						fields: [
							new Field({
								name: 'realmList',
								fields: e.detail.fields,
								arguments: e.detail.mutationArguments,
								directives: e.detail.directives
							})
						]
					}).then((response) => {
						if (response?.errors) {
							errors = buildGraphQLErrors(response.errors).list?.iterms || {};
							e.detail.catch(response.errors);
						} else {
							e.detail.then(response?.data?.realmList);
						}
					});
				})
				.catch((validErrors) => {
					errors = validErrors.list?.iterms;
				});
		}}
	/>
</Card>
