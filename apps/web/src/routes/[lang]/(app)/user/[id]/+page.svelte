<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import type { GraphQLError } from '@graphace/graphql';
	import { Query_userStore, Mutation_userStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationUserArgs, User } from '~/lib/types/schema';
	import { validate } from '~/lib/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_user = data.Query_user as Query_userStore;
	$: node = $Query_user.data?.user;
	$: urlName($page.url, node?.name || '');
	const Mutation_user = new Mutation_userStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationUserArgs;
			then: (data: User | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_user_Arguments', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				Mutation_user.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.user);
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
		to(`./${event.detail.path}`);
	};
</script>

<Card>
	<UserForm
		showBackButton={$canBack}
		{node}
		{errors}
		isFetching={$Query_user.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
</Card>
