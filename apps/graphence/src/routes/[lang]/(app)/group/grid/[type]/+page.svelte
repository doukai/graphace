<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { Card } from '@graphace/ui';
	import GroupGrid from '~/lib/components/objects/group/GroupGrid.svelte';
	import GroupAggGrid from '~/lib/components/objects/group/GroupAggGrid.svelte';
	import type { GroupConnectionQueryStore } from '~/lib/stores/group/groupQueryStore';
	import type { GroupListMutationStore } from '~/lib/stores/group/groupMutationStore';
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

	const GroupConnectionQuery = data.GroupConnectionQuery as GroupConnectionQueryStore;
	const GroupListMutation = data.GroupListMutation as GroupListMutationStore;

	const components: Record<string, any> = {
		mutation: GroupGrid,
		agg: GroupAggGrid
	};

	const component = components[data.type];
</script>

<Card>
	<svelte:component
		this={component}
		isFetching={$GroupConnectionQuery.isFetching}
		connection={$GroupConnectionQuery.response.data?.groupConnection}
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
			GroupConnectionQuery.fetch(e.detail.fields, e.detail.queryArguments);
		}}
		on:mutation={(e) => {
			validate('Mutation_groupList_Arguments', e.detail.mutationArguments, $locale)
				.then((data) => {
					errors = {};
					GroupListMutation.fetch(e.detail.fields, e.detail.mutationArguments).then((response) => {
						if (response?.errors) {
							e.detail.catch(response.errors);
						} else {
							e.detail.then(response?.data?.groupList);
						}
					});
				})
				.catch((validErrors) => {
					errors = validErrors.list.iterms;
				});
		}}
	/>
</Card>
