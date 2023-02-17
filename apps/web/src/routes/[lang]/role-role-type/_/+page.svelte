<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleRoleTypeCreateForm from '~/lib/components/objects/role-role-type/RoleRoleTypeCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '~/lib/utils';
	import { Mutation_roleRoleTypeStore } from '$houdini';
	import type { MutationTypeRoleRoleTypeArgs, RoleRoleType } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: node = data.node as MutationTypeRoleRoleTypeArgs;
	$: errors = data.errors as Record<number, Errors>;

	const Mutation_roleRoleType = new Mutation_roleRoleTypeStore();

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
		to(`./${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<RoleRoleTypeCreateForm {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
