<script lang="ts">
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack, PageType } from '@graphace/ui';
	import GroupCreateForm from '~/lib/components/objects/group/GroupCreateForm.svelte';
	import type { GroupInput, MutationGroupArgs } from '~/lib/types/schema';
	import { Mutation_groupStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Group.name(), PageType.CREATE);
	$: node = data.node as MutationGroupArgs;
	$: errors = data.errors as Record<number, Errors>;

	const Mutation_group = new Mutation_groupStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationGroupArgs;
			then: (data: GroupInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_group_Arguments', event.detail.args, $locale)
			.then((data) => {
				Mutation_group.mutate(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.group);
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
	<GroupCreateForm
		showRemoveButton={false}
		showBackButton={$canBack}
		{node}
		{errors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
</Card>
