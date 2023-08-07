<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons/types';
	import RoleMenuSelectConnectionTable from '~/lib/components/objects/role-menu/RoleMenuSelectConnectionTable.svelte';
	import type { RoleMenu, QueryTypeRoleMenuConnectionArgs, MutationTypeRoleMenuArgs } from '~/lib/types/schema';
	import { Query_roleMenuConnectionStore, Mutation_roleMenuStore, Mutation_role_roleMenuStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.roleMenu.name(), PageType.SELECT);
	$: id = data.id as string;
	$: Query_roleMenuConnection = data.Query_roleMenuConnection as Query_roleMenuConnectionStore;
	$: nodes = $Query_roleMenuConnection.data?.roleMenuConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_roleMenuConnection.data?.roleMenuConnection?.totalCount || 0;
	const Mutation_roleMenu = new Mutation_roleMenuStore();
	const Mutation_role_roleMenu = new Mutation_role_roleMenuStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleMenuConnectionArgs;
			then: (data: (RoleMenu | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_roleMenuConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleMenuConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleMenuArgs;
			update?: boolean;
			then: (data: RoleMenu | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('RoleMenu', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_roleMenu.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.roleMenu);
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
			selected: MutationTypeRoleMenuArgs | null | undefined | (MutationTypeRoleMenuArgs | null | undefined)[];
			then: () => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Role', { roleMenu: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_role_roleMenu.mutate({
						role_id: id,
						role_roleMenu: event.detail.selected,
						update: true,
						mergeToList: ['roleMenu']
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
				errors = validErrors.roleMenu.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<RoleMenuSelectConnectionTable
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_roleMenuConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
