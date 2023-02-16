<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import UserTest2Form from '~/lib/components/objects/user-test2/UserTest2Form.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_userTest2Store, Mutation_userTest2Store } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserTest2Args, UserTest2 } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_userTest2 = data.Query_userTest2 as Query_userTest2Store;
	$: node = $Query_userTest2.data?.userTest2;
	const Mutation_userTest2 = new Mutation_userTest2Store();
	let errors: Record<string, Error> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest2Args;
			update?: boolean;
			then: (data: UserTest2 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		validate('UserTest2', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_userTest2.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.userTest2);
					})
					.catch((error) => {
						event.detail.catch(error);
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

<UserTest2Form
	{node}
	{errors}
	isFetching={$Query_userTest2.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
