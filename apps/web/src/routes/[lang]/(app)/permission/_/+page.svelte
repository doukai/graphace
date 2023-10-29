<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Card } from '@graphace/ui';
	import PermissionCreateForm from '~/lib/components/objects/permission/PermissionCreateForm.svelte';
	import { Mutation_permissionStore } from '$houdini';
	import type { MutationPermissionArgs, Permission } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Permission.name(), PageType.CREATE);
	$: node = data.node as MutationPermissionArgs;
	$: errors = data.errors as Record<number, Errors>;

	const Mutation_permission = new Mutation_permissionStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationPermissionArgs;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Permission', event.detail.args, $locale)
			.then((data) => {
				Mutation_permission.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.permission);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
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

<Card>
	<PermissionCreateForm showRemoveButton={false} showBackButton={$canBack} {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
</Card>
