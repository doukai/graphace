<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import type { Query_group_Store } from '~/lib/stores/query/query_group_store';
	import type { Mutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import type { GraphQLError } from '@graphace/graphql';
	import type { GroupInput, MutationGroupArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: query_group_Store = data.query_group_Store as Query_group_Store;
	$: node = $query_group_Store.response.data?.group;
	$: urlName($page.url, node?.name || '');
	$: mutation_group_Store = data.mutation_group_Store as Mutation_group_Store;
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationGroupArgs;
			then: (data: GroupInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_group_Arguments', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				mutation_group_Store.fetch(event.detail.args)
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
		to(`./${event.detail.path}`);
	};
</script>

<Card>
	<GroupForm
		showBackButton={$canBack}
		{node}
		{errors}
		isFetching={$query_group_Store.isFetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
</Card>
