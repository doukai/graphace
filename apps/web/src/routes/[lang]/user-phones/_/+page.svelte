<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserPhonesCreateForm from '~/lib/components/objects/user-phones/UserPhonesCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '~/lib/utils';
	import { Mutation_userPhonesStore } from '$houdini';
	import type { MutationTypeUserPhonesArgs, UserPhones } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: node = data.node as MutationTypeUserPhonesArgs;
	$: errors = data.errors as Record<number, Errors>;

	const Mutation_userPhones = new Mutation_userPhonesStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserPhonesArgs;
			update?: boolean;
			then: (data: UserPhones | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('UserPhones', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				Mutation_userPhones.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.userPhones);
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

<UserPhonesCreateForm {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
