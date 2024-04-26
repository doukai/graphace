<script lang="ts">
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack, PageType } from '@graphace/ui';
	import PermissionCreateForm from '~/lib/components/objects/permission/PermissionCreateForm.svelte';
	import { Mutation_role_permissionsStore } from '$houdini';
	import type { PermissionInput, MutationPermissionArgs } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.permissions.name(), PageType.CREATE);
	$: node = data.node as MutationPermissionArgs;
	$: id = data.id as string;
	$: errors = data.errors as Record<string, Errors>;

	const Mutation_role_permissions = new Mutation_role_permissionsStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationPermissionArgs;
			then: (data: PermissionInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_role_Arguments', { id: id, permissions: [event.detail.args] }, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_permissions.mutate({
					role_id: id,
					role_permissions: [event.detail.args]
				})
					.then((result) => {
						event.detail.then(undefined);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.permissions.iterms[0].iterms;
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

<Card>
	<PermissionCreateForm showBackButton={$canBack} {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
</Card>
