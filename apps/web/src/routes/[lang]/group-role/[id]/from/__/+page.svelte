<script lang="ts">
	import { ot, to, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons/types';
	import GroupSelectConnectionTable from '~/lib/components/objects/group/GroupSelectConnectionTable.svelte';
	import type { Group, QueryTypeGroupConnectionArgs, MutationTypeGroupArgs } from '~/lib/types/schema';
	import { Query_groupConnectionStore, Mutation_groupStore, Mutation_groupRole_fromStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.web.path.select());
	$: id = data.id as string;
	$: Query_groupConnection = data.Query_groupConnection as Query_groupConnectionStore;
	$: nodes = $Query_groupConnection.data?.groupConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_groupConnection.data?.groupConnection?.totalCount || 0;
	const Mutation_group = new Mutation_groupStore();
	const Mutation_groupRole_from = new Mutation_groupRole_fromStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeGroupConnectionArgs;
			then: (data: (Group | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_groupConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.groupConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
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
					})
					.catch((errors) => {
						event.detail.catch(errors);
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
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('GroupRole', { from: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (!Array.isArray(event.detail.selected)) {
					Mutation_groupRole_from.mutate({
						groupRole_id: id,
						groupRole_from: event.detail.selected,
						update: true
					})
						.then((result) => {
							event.detail.then();
						})
						.catch((errors) => {
							event.detail.catch(errors);
						});
				}
			})
			.catch((validErrors) => {
				errors = validErrors.from.iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<GroupSelectConnectionTable
	multipleSelect={false}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_groupConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
