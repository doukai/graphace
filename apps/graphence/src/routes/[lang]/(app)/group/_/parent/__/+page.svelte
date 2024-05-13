<script lang="ts">
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack, PageType } from '@graphace/ui';
	import GroupSelectConnectionTable from '~/lib/components/objects/group/GroupSelectConnectionTable.svelte';
	import type { GroupInput, QueryGroupConnectionArgs, MutationGroupArgs } from '~/lib/types/schema';
	import { Query_groupConnectionStore, Mutation_groupStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '~/lib/utils';
	import { locale } from '$i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Group.fields.parent.name(), PageType.SELECT);
	$: errors = data.errors as Record<number, Errors>;
	$: Query_groupConnection = data.Query_groupConnection as Query_groupConnectionStore;
	$: nodes = $Query_groupConnection.data?.groupConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_groupConnection.data?.groupConnection?.totalCount || 0;
	const Mutation_group = new Mutation_groupStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryGroupConnectionArgs;
			then: (data: (GroupInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_groupConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				if (result.errors) {
					event.detail.catch(result.errors);
				} else {
					event.detail.then(result.data?.groupConnection?.edges?.map((edge) => edge?.node));
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationGroupArgs;
			then: (data: GroupInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validate('Mutation_group_Arguments', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_group.mutate(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.group);
						}
					});
			})
			.catch((validErrors) => {
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};

	const select = (
		event: CustomEvent<{
			selected: MutationGroupArgs | null | undefined | (MutationGroupArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		if (!Array.isArray(event.detail.selected)) {
			ot({
				node: updateNodeParam($page.url, event.detail.selected),
				errors: updateErrorsParam($page.url, errors)
			});
		}
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
	};
</script>

<Card>
	<GroupSelectConnectionTable
		multipleSelect={false}
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		isFetching={$Query_groupConnection.fetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:select={select}
		on:back={back}
	/>
</Card>
