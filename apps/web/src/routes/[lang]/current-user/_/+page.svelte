<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import CurrentUserCreateForm from '~/lib/components/objects/current-user/CurrentUserCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Mutation_currentUserStore } from '$houdini';
	import type { MutationTypeCurrentUserArgs, CurrentUser } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: node = data.node as MutationTypeCurrentUserArgs;
	$: errors = data.errors as Record<number, Errors>;

	const Mutation_currentUser = new Mutation_currentUserStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeCurrentUserArgs;
			update?: boolean;
			then: (data: CurrentUser | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('CurrentUser', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				Mutation_currentUser.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.currentUser);
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

<CurrentUserCreateForm {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
