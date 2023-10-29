<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Card } from '@graphace/ui';
	import RoleCreateForm from '~/lib/components/objects/role/RoleCreateForm.svelte';
	import { Mutation_group_rolesStore } from '$houdini';
	import type { MutationRoleArgs, Role } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Group.fields.roles.name(), PageType.CREATE);
	$: node = data.node as MutationRoleArgs;
	$: id = data.id as string;
	$: errors = data.errors as Record<string, Errors>;

	const Mutation_group_roles = new Mutation_group_rolesStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationRoleArgs;
			then: (data: Role | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Group', { id: id, roles: [event.detail.args] }, $locale)
			.then((data) => {
				errors = {};
				Mutation_group_roles.mutate({
					group_id: id,
					group_roles: [event.detail.args],
					mergeToList: ['roles']
				})
					.then((result) => {
						event.detail.then(undefined);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.roles.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../role/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<Card>
	<RoleCreateForm showBackButton={$canBack} {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
</Card>
