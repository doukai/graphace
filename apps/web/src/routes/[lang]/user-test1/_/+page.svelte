<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserTest1CreateForm from '~/lib/components/objects/user-test1/UserTest1CreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '~/lib/utils';
	import { Mutation_userTest1Store } from '$houdini';
	import type { MutationTypeUserTest1Args, UserTest1 } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: node = data.node as MutationTypeUserTest1Args;
	$: errors = data.errors as Record<number, Errors>;

	const Mutation_userTest1 = new Mutation_userTest1Store();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserTest1Args;
			update?: boolean;
			then: (data: UserTest1 | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('UserTest1', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				Mutation_userTest1.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.userTest1);
					})
					.catch((errors) => {
						event.detail.catch(errors);
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

<UserTest1CreateForm {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
