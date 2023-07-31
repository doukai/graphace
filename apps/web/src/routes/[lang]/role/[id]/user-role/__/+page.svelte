<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons/types';
	import UserRoleSelectConnectionTable from '~/lib/components/objects/user-role/UserRoleSelectConnectionTable.svelte';
	import type { UserRole, QueryTypeUserRoleConnectionArgs, MutationTypeUserRoleArgs } from '~/lib/types/schema';
	import { Query_userRoleConnectionStore, Mutation_userRoleStore, Mutation_role_userRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, 'userRole', PageType.SELECT);
	$: id = data.id as string;
	$: Query_userRoleConnection = data.Query_userRoleConnection as Query_userRoleConnectionStore;
	$: nodes = $Query_userRoleConnection.data?.userRoleConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_userRoleConnection.data?.userRoleConnection?.totalCount || 0;
	const Mutation_userRole = new Mutation_userRoleStore();
	const Mutation_role_userRole = new Mutation_role_userRoleStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserRoleConnectionArgs;
			then: (data: (UserRole | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_userRoleConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.userRoleConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserRoleArgs;
			update?: boolean;
			then: (data: UserRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('UserRole', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_userRole.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.userRole);
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
			selected: MutationTypeUserRoleArgs | null | undefined | (MutationTypeUserRoleArgs | null | undefined)[];
			then: () => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Role', { userRole: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_role_userRole.mutate({
						role_id: id,
						role_userRole: event.detail.selected,
						update: true,
						mergeToList: ['userRole']
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
				errors = validErrors.userRole.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<UserRoleSelectConnectionTable
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_userRoleConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
