<script lang="ts">
	import { ot, to, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserRoleConnectionTable from '~/lib/components/objects/user-role/UserRoleConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeUserRoleArgs, QueryTypeUserRoleConnectionArgs, UserRole } from '~/lib/types/schema';
	import { Query_user_userRoleStore, Mutation_userRoleStore, Mutation_user_userRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	urlName($page.url, 'userRole');
	$: id = data.id as string;
	$: Query_user_userRole = data.Query_user_userRole as Query_user_userRoleStore;
	$: user = $Query_user_userRole.data?.user;
	$: nodes = $Query_user_userRole.data?.user?.userRoleConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_user_userRole.data?.user?.userRoleConnection?.totalCount || 0;
	const Mutation_userRole = new Mutation_userRoleStore();
	const Mutation_user_userRole = new Mutation_user_userRoleStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserRoleConnectionArgs;
			then: (data: (UserRole | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_user_userRole.fetch({
			variables: { user_id: { val: user?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.user?.userRoleConnection?.edges?.map((edge) => edge?.node));
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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypeUserRoleArgs[];
			update?: boolean;
			then: (data: UserRole[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('User', { userRole: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_user_userRole.mutate({
					user_id: id,
					user_userRole: event.detail.args,
					update: true,
					mergeToList: ['userRole']
				})
					.then((result) => {
						event.detail.then(undefined);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.roles.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../user-role/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./userRole/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../user-role/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./userRole/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<UserRoleConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_user_userRole.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
