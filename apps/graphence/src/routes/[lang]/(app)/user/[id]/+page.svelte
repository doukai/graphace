<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import type { Query_user_Store } from '~/lib/stores/query/query_user_store';
	import type { Mutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { MutationUserArgs, UserInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_user_Store = data.query_user_Store as Query_user_Store;
	$: node = $query_user_Store.response.data?.user;
	$: mutation_user_Store = data.mutation_user_Store as Mutation_user_Store;

	let value: UserInput = {};
	let errors: Record<string, Errors> = {};

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const mutation = (args: MutationUserArgs) => {
		validate('Mutation_user_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_user_Store.fetch(args).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors, data);
						const globalError = buildGlobalGraphQLErrorMessage(result.errors);
						if (globalError) {
							modal.open({
								title: $LL.graphence.message.requestFailed(),
								description: globalError
							});
						}
					} else {
						toast.success($LL.graphence.message.requestSuccess());
						ot();
					}
				});
			})
			.catch((validErrors) => {
				console.error(validErrors);
				errors = validErrors;
			});
	};
</script>

<Card class="max-h-full max-w-full">
	<CardBody class="overflow-y-auto pt-0">
		<Breadcrumbs>
			<li>
				<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/user`)}>
					<span class="badge badge-outline">{$LL.graphql.objects.User.name()}</span>
				</a>
			</li>
			<li>
				<span class="badge badge-neutral">
					{value?.id != null
						? $LL.graphence.path.edit({ name: $LL.graphql.objects.User.name() })
						: $LL.graphence.path.create({ name: $LL.graphql.objects.User.name() })}
				</span>
			</li>
		</Breadcrumbs>
		<UserForm
			showSaveButton={auth('User::*::WRITE')}
			showRemoveButton={auth('User::isDeprecated::WRITE')}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_user_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_user_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					mutation(e.detail.value);
				}
			}}
			on:remove={(e) => {
				if (e.detail.value) {
					modal.open({
						title: $LL.graphence.components.modal.removeModalTitle(),
						confirm: () => {
							mutation({
								where: { id: { val: e.detail.value?.id } },
								isDeprecated: true
							});
							return true;
						}
					});
				}
			}}
			on:goto={(e) => to(`/${$locale}/user/${e.detail.path}`)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
