<script lang="ts">
	import { Card } from '@graphace/ui';
	import RoleGrid from '~/lib/components/objects/role/RoleGrid.svelte';
	import RoleAggGrid from '~/lib/components/objects/role/RoleAggGrid.svelte';
	import type { RoleQueryStore } from '~/lib/stores/role/roleQueryStore';
	import type { RoleListMutationStore } from '~/lib/stores/role/roleMutationStore';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';
	import type { Errors } from '@graphace/commons';

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

	const RoleQuery = data.RoleQuery as RoleQueryStore;
	const RoleListMutation = data.RoleListMutation as RoleListMutationStore;

	const components: Record<string, any> = {
		mutation: RoleGrid,
		agg: RoleAggGrid
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$RoleQuery.isFetching}
		connection={$RoleQuery.connection}
		{errors}
		{fields}
		{queryArguments}
		{showHeader}
		{showFooter}
		{showOptionButton}
		{showFilterButton}
		{showBookmarkButton}
		on:query={(e) => {
			errors = {};
			RoleQuery.fetch(e.detail.fields, e.detail.queryArguments);
		}}
		on:mutation={(e) => {
			validate('Mutation_roleList_Arguments', e.detail.mutationArguments, $locale)
				.then((data) => {
					errors = {};
					RoleListMutation.fetch(e.detail.fields, e.detail.mutationArguments).then((response) => {
						if (response?.errors) {
							e.detail.catch(response.errors);
						} else {
							e.detail.then(response?.data?.roleList);
						}
					});
				})
				.catch((validErrors) => {
					errors = validErrors.list.iterms;
				});
		}}
	/>
</Card>
