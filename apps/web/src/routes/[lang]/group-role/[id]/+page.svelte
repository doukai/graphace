<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import GroupRoleForm from '~/lib/components/objects/group-role/GroupRoleForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Query_groupRoleStore, Mutation_groupRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeGroupRoleArgs, GroupRole } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_groupRole = data.Query_groupRole as Query_groupRoleStore;
	$: node = $Query_groupRole.data?.groupRole;
	const Mutation_groupRole = new Mutation_groupRoleStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupRoleArgs;
			update?: boolean;
			then: (data: GroupRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('GroupRole', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_groupRole.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.groupRole);
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

<GroupRoleForm
	{node}
	{errors}
	isFetching={$Query_groupRole.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
