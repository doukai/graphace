<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import RoleSelectConnectionTable from '~/lib/components/objects/role/RoleSelectConnectionTable.svelte';
	import type { Role, QueryTypeRoleConnectionArgs, MutationTypeRoleArgs } from '~/lib/types/schema';
	import { Query_roleConnectionStore, Mutation_roleStore, Mutation_api_roleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Api.fields.role.name(), PageType.SELECT);
	$: id = data.id as string;
	$: Query_roleConnection = data.Query_roleConnection as Query_roleConnectionStore;
	$: nodes = $Query_roleConnection.data?.roleConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_roleConnection.data?.roleConnection?.totalCount || 0;
	const Mutation_role = new Mutation_roleStore();
	const Mutation_api_role = new Mutation_api_roleStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleConnectionArgs;
			then: (data: (Role | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_roleConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('Role', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_role.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.role);
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
			selected: MutationTypeRoleArgs | null | undefined | (MutationTypeRoleArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Api', { role: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (!Array.isArray(event.detail.selected)) {
					Mutation_api_role.mutate({
						api_id: id,
						api_role: event.detail.selected,
						update: true
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
				errors = validErrors.role.iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<RoleSelectConnectionTable
	multipleSelect={false}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_roleConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
