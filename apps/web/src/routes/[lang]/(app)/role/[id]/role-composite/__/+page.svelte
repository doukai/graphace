<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import RoleCompositeSelectConnectionTable from '~/lib/components/objects/role-composite/RoleCompositeSelectConnectionTable.svelte';
	import type { RoleComposite, QueryTypeRoleCompositeConnectionArgs, MutationTypeRoleCompositeArgs } from '~/lib/types/schema';
	import { Query_roleCompositeConnectionStore, Mutation_roleCompositeStore, Mutation_role_roleCompositeStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.roleComposite.name(), PageType.SELECT);
	$: id = data.id as string;
	$: Query_roleCompositeConnection = data.Query_roleCompositeConnection as Query_roleCompositeConnectionStore;
	$: nodes = $Query_roleCompositeConnection.data?.roleCompositeConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_roleCompositeConnection.data?.roleCompositeConnection?.totalCount || 0;
	const Mutation_roleComposite = new Mutation_roleCompositeStore();
	const Mutation_role_roleComposite = new Mutation_role_roleCompositeStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleCompositeConnectionArgs;
			then: (data: (RoleComposite | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_roleCompositeConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleCompositeConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleCompositeArgs;
			update?: boolean;
			then: (data: RoleComposite | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validateMutation('RoleComposite', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_roleComposite.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.roleComposite);
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
			selected: MutationTypeRoleCompositeArgs | null | undefined | (MutationTypeRoleCompositeArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Role', { roleComposite: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_role_roleComposite.mutate({
						role_id: id,
						role_roleComposite: event.detail.selected,
						update: true,
						mergeToList: ['roleComposite']
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
				errors = validErrors.roleComposite.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<RoleCompositeSelectConnectionTable
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_roleCompositeConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
