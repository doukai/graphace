<script lang="ts">
	import { ot, to, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserRoleForm from '~/lib/components/objects/user-role/UserRoleForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Query_userRoleStore, Mutation_userRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserRoleArgs, UserRole } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_userRole = data.Query_userRole as Query_userRoleStore;
	$: node = $Query_userRole.data?.userRole;
	$: urlName($page.url, node?.name || '');
	const Mutation_userRole = new Mutation_userRoleStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserRoleArgs;
			update?: boolean;
			then: (data: UserRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('UserRole', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_userRole.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.userRole);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./${event.detail.path}`);
	};
</script>

<UserRoleForm
	{node}
	{errors}
	isFetching={$Query_userRole.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
