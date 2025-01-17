<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { Card, urlName } from '@graphace/ui';
	import RealmGrid from '~/lib/components/objects/realm/RealmGrid.svelte';
	import RealmAggGrid from '~/lib/components/objects/realm/RealmAggGrid.svelte';
	import type { RealmConnectionQueryStore } from '~/lib/stores/realm/realmQueryStore';
	import type { RealmListMutationStore } from '~/lib/stores/realm/realmMutationStore';
	import type { RealmConnection } from '~/lib/types/schema';
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

	const RealmConnectionQuery = data.RealmConnectionQuery as RealmConnectionQueryStore;
	const RealmListMutation = data.RealmListMutation as RealmListMutationStore;

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
			RealmConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments).then((response) => {
				connection = response?.data?.realmConnection;
				if (e.detail.catch && response?.errors) {
					e.detail.catch(response.errors);
				} else if (e.detail.then) {
					e.detail.then(response?.data?.realmConnection);
				}
			});
		}}
		on:exportQuery={(e) => {
			RealmConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments).then((response) => {
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
					RealmListMutation.fetch(
						e.detail.fields,
						e.detail.mutationArguments,
						e.detail.directives
					)
					.then((response) => {
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
