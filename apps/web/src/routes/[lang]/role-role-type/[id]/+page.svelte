<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import RoleRoleTypeForm from '~/lib/components/objects/role-role-type/RoleRoleTypeForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Query_roleRoleTypeStore, Mutation_roleRoleTypeStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeRoleRoleTypeArgs, RoleRoleType } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_roleRoleType = data.Query_roleRoleType as Query_roleRoleTypeStore;
	$: node = $Query_roleRoleType.data?.roleRoleType;
	const Mutation_roleRoleType = new Mutation_roleRoleTypeStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleRoleTypeArgs;
			update?: boolean;
			then: (data: RoleRoleType | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('RoleRoleType', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_roleRoleType.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.roleRoleType);
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

<RoleRoleTypeForm
	{node}
	{errors}
	isFetching={$Query_roleRoleType.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
