<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import type { Query_user_Store } from '~/lib/stores/query/query_user_store';
	import type { Mutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
	import type { GraphQLError } from '@graphace/graphql';
	import type { UserInput, MutationUserArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: query_user_Store = data.query_user_Store as Query_user_Store;
	$: node = $query_user_Store.response.data?.user;
	$: urlName($page.url, node?.name || '');
	$: mutation_user_Store = data.mutation_user_Store as Mutation_user_Store;
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationUserArgs;
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_user_Arguments', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				mutation_user_Store.fetch(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.user);
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
	<UserForm
		showBackButton={$canBack}
		{node}
		{errors}
		isFetching={$query_user_Store.isFetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
</Card>
