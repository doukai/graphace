<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { type Errors, type JsonSchema, updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack, PageType } from '@graphace/ui';
	import GroupSelectConnectionTable from '~/lib/components/objects/group/GroupSelectConnectionTable.svelte';
	import type { Query_groupConnection_Store } from '~/lib/stores/query/query_groupConnection_store';
	import type { Mutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import type { GroupInput, QueryGroupConnectionArgs, MutationGroupArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { locale } from '$i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

	$: urlName($page.url, $LL.graphql.objects.Group.fields.parent.name(), PageType.SELECT);
	$: errors = data.errors as Record<number, Errors>;
	$: query_groupConnection_Store = data.query_groupConnection_Store as Query_groupConnection_Store;
	$: nodes = $query_groupConnection_Store.response.data?.groupConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_groupConnection_Store.response.data?.groupConnection?.totalCount || 0;
	$: mutation_group_Store = data.mutation_group_Store as Mutation_group_Store;

	const fetch = (
		event: CustomEvent<{
			args: QueryGroupConnectionArgs;
			then: (data: (GroupInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		query_groupConnection_Store.fetch(event.detail.args)
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
				mutation_group_Store.fetch(event.detail.args)
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
			selected: GroupInput | null | undefined | (GroupInput | null | undefined)[];
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
		isFetching={$query_groupConnection_Store.isFetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:select={select}
		on:back={back}
	/>
</Card>
