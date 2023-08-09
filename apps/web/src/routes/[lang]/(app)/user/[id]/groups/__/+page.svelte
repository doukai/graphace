<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import GroupSelectConnectionTable from '~/lib/components/objects/group/GroupSelectConnectionTable.svelte';
	import type { Group, QueryTypeGroupConnectionArgs, MutationTypeGroupArgs } from '~/lib/types/schema';
	import { Query_groupConnectionStore, Mutation_groupStore, Mutation_user_groupsStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.User.fields.groups.name(), PageType.SELECT);
	$: id = data.id as string;
	$: Query_groupConnection = data.Query_groupConnection as Query_groupConnectionStore;
	$: nodes = $Query_groupConnection.data?.groupConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_groupConnection.data?.groupConnection?.totalCount || 0;
	const Mutation_group = new Mutation_groupStore();
	const Mutation_user_groups = new Mutation_user_groupsStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeGroupConnectionArgs;
			then: (data: (Group | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_groupConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.groupConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('Group', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_group.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.group);
						if (result.errors) {
							event.detail.catch(result.errors);
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
			selected: MutationTypeGroupArgs | null | undefined | (MutationTypeGroupArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('User', { groups: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_user_groups.mutate({
						user_id: id,
						user_groups: event.detail.selected,
						update: true,
						mergeToList: ['groups']
					})
						.then((result) => {
							event.detail.then();
							if (result.errors) {
								event.detail.catch(result.errors);
							}
						});
				}
			})
			.catch((validErrors) => {
				errors = validErrors.groups.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<GroupSelectConnectionTable
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
