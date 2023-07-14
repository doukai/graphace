<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupRoleCreateForm from '~/lib/components/objects/group-role/GroupRoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Mutation_groupRoleStore } from '$houdini';
	import type { MutationTypeGroupRoleArgs, GroupRole } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: node = data.node as MutationTypeGroupRoleArgs;
	$: errors = data.errors as Record<number, Errors>;

	const Mutation_groupRole = new Mutation_groupRoleStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupRoleArgs;
			update?: boolean;
			skipNullArguments?: boolean;
			then: (data: GroupRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('GroupRole', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				Mutation_groupRole.mutate({ ...event.detail.args, update: event.detail.update, skipNullArguments: event.detail.skipNullArguments })
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
		to(`./${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<GroupRoleCreateForm {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
