<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import type { Errors } from '@graphace/commons/types';
	import UserRoleConnectionTable from '~/lib/components/objects/user-role/UserRoleConnectionTable.svelte';
	import type { UserRole, QueryTypeUserRoleConnectionArgs, MutationTypeUserRoleArgs } from '~/lib/types/schema';
	import { Query_userRoleConnectionStore, Mutation_userRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_userRoleConnection = data.Query_userRoleConnection as Query_userRoleConnectionStore;
	$: nodes = $Query_userRoleConnection.data?.userRoleConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_userRoleConnection.data?.userRoleConnection?.totalCount || 0;
	const Mutation_userRole = new Mutation_userRoleStore();
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

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`./user-role/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./user-role/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./user-role/${event.detail.path}`);
	};
</script>
<UserRoleConnectionTable
	showSaveButton={false}
	showBackButton={false}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_userRoleConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
