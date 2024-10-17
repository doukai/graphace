<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { Card } from '@graphace/ui';
	import RealmGrid from '~/lib/components/objects/realm/RealmGrid.svelte';
	import RealmAggGrid from '~/lib/components/objects/realm/RealmAggGrid.svelte';
	import type { RealmConnectionQueryStore } from '~/lib/stores/realm/realmQueryStore';
	import type { RealmListMutationStore } from '~/lib/stores/realm/realmMutationStore';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	let errors: Record<number, Errors> = {};

	const {
		fields,
		queryArguments,
		showHeader,
		showFooter,
		showOptionButton,
		showFilterButton,
		showBookmarkButton
	} = data;

	const RealmConnectionQuery = data.RealmConnectionQuery as RealmConnectionQueryStore;
	const RealmListMutation = data.RealmListMutation as RealmListMutationStore;

	const components: Record<string, any> = {
		mutation: RealmGrid,
		agg: RealmAggGrid
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$RealmConnectionQuery.isFetching}
		connection={$RealmConnectionQuery.response.data?.realmConnection}
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
			RealmConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments);
		}}
		on:mutation={(e) => {
			validate('Mutation_realmList_Arguments', e.detail.mutationArguments, $locale)
				.then((data) => {
					errors = {};
					RealmListMutation.fetch(e.detail.fields, e.detail.mutationArguments).then((response) => {
						if (response?.errors) {
							e.detail.catch(response.errors);
						} else {
							e.detail.then(response?.data?.realmList);
						}
					});
				})
				.catch((validErrors) => {
					errors = validErrors.list.iterms;
				});
		}}
	/>
</Card>
