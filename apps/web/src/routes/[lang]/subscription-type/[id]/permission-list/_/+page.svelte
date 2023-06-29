<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import PermissionCreateForm from '~/lib/components/objects/permission/PermissionCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Mutation_subscriptionType_permissionListStore } from '$houdini';
	import type { MutationTypePermissionArgs, Permission } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: node = data.node as MutationTypePermissionArgs;
	$:  = data. as string;
	$: errors = data.errors as Record<string, Errors>;

	const Mutation_subscriptionType_permissionList = new Mutation_subscriptionType_permissionListStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypePermissionArgs;
			update?: boolean;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Permission', event.detail.args, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_subscriptionType_permissionList.mutate({
					subscriptionType_id: ,
					subscriptionType_permissionList: [event.detail.args],
					update: true,
					mergeToList: ['permissionList']
				})
					.then((result) => {
						event.detail.then(null);
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

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../permission/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<PermissionCreateForm {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
