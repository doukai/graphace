<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserRoleCreateForm from '~/lib/components/objects/user-role/UserRoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type {
		MutationTypeUserRoleArgs,
		UserRole
	} from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam, getNodeParam, getErrorsParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: node = data.node as MutationTypeUserRoleArgs;
	$: errors = data.errors as Record<string, Errors>;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserRoleArgs;
			update?: boolean;
			then: (data: UserRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		ot({
			node: updateNodeParam($page.url, event.detail.args),
			errors: updateErrorsParam($page.url, errors)
		});
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../user-role/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<UserRoleCreateForm {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />