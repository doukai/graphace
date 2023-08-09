<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import RoleSelectConnectionTable from '~/lib/components/objects/role/RoleSelectConnectionTable.svelte';
	import type { Role, QueryTypeRoleConnectionArgs, MutationTypeRoleArgs } from '~/lib/types/schema';
	import { Query_roleConnectionStore, Mutation_roleStore, Mutation_role_compositesStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.composites.name(), PageType.SELECT);
	$: id = data.id as string;
	$: Query_roleConnection = data.Query_roleConnection as Query_roleConnectionStore;
	$: nodes = $Query_roleConnection.data?.roleConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_roleConnection.data?.roleConnection?.totalCount || 0;
	const Mutation_role = new Mutation_roleStore();
	const Mutation_role_composites = new Mutation_role_compositesStore();
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
		validate('Role', { composites: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_role_composites.mutate({
						role_id: id,
						role_composites: event.detail.selected,
						update: true,
						mergeToList: ['composites']
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
				errors = validErrors.composites.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<RoleSelectConnectionTable
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
