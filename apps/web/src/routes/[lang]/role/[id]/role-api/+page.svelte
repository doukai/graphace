<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleApiConnectionTable from '~/lib/components/objects/role-api/RoleApiConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeRoleApiArgs, QueryTypeRoleApiConnectionArgs, RoleApi } from '~/lib/types/schema';
	import { Query_role_roleApiStore, Mutation_roleApiStore, Mutation_role_roleApiStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.roleApi.name());
	$: id = data.id as string;
	$: Query_role_roleApi = data.Query_role_roleApi as Query_role_roleApiStore;
	$: role = $Query_role_roleApi.data?.role;
	$: nodes = $Query_role_roleApi.data?.role?.roleApiConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_role_roleApi.data?.role?.roleApiConnection?.totalCount || 0;
	const Mutation_roleApi = new Mutation_roleApiStore();
	const Mutation_role_roleApi = new Mutation_role_roleApiStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleApiConnectionArgs;
			then: (data: (RoleApi | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_role_roleApi.fetch({
			variables: { role_id: { val: role?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.role?.roleApiConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleApiArgs;
			update?: boolean;
			then: (data: RoleApi | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('RoleApi', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_roleApi.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.roleApi);
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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypeRoleApiArgs[];
			update?: boolean;
			then: (data: RoleApi[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Role', { roleApi: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_roleApi.mutate({
					role_id: id,
					role_roleApi: event.detail.args,
					update: true,
					mergeToList: ['roleApi']
				})
					.then((result) => {
						event.detail.then(undefined);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.roleApi.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../role-api/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./role-api/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../role-api/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./role-api/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<RoleApiConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_role_roleApi.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
