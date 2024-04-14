<script lang="ts">
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons';
	import type { GraphQLError, __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack, PageType } from '@graphace/ui';
	import GroupCreateForm from '~/lib/components/objects/group/GroupCreateForm.svelte';
	import { Mutation_group_subGroupsStore } from '$houdini';
	import type { MutationGroupArgs, Group } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Group.fields.subGroups.name(), PageType.CREATE);
	$: node = data.node as MutationGroupArgs;
	$: id = data.id as string;
	$: errors = data.errors as Record<string, Errors>;

	const Mutation_group_subGroups = new Mutation_group_subGroupsStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationGroupArgs;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_group_Arguments', { id: id, subGroups: [event.detail.args] }, $locale)
			.then((data) => {
				errors = {};
				Mutation_group_subGroups.mutate({
					group_id: id,
					group_subGroups: [event.detail.args]
				})
					.then((result) => {
						event.detail.then(undefined);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.subGroups.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../group/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<Card>
	<GroupCreateForm showBackButton={$canBack} {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
</Card>
