<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import UserTest1Form from '~/lib/components/objects/user-test1/UserTest1Form.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Query_userTest1Store, Mutation_userTest1Store } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeUserTest1Args, UserTest1 } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_userTest1 = data.Query_userTest1 as Query_userTest1Store;
	$: node = $Query_userTest1.data?.userTest1;
	const Mutation_userTest1 = new Mutation_userTest1Store();
	let errors: Record<string, Error> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest1Args;
			update?: boolean;
			then: (data: UserTest1 | null | undefined) => void;
			catch: (error: Error) => void;
		}>
	) => {
		validate('UserTest1', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_userTest1.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.userTest1);
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

<UserTest1Form
	{node}
	{errors}
	isFetching={$Query_userTest1.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
