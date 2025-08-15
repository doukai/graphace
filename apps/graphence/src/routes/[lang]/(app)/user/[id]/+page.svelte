<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import UserForm from '~/lib/components/objects/user/UserForm.svelte';
	import type { Query_user_Store } from '~/lib/stores/query/query_user_store';
	import type { Mutation_user_Store } from '~/lib/stores/mutation/mutation_user_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { MutationUserArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_user_Store = data.query_user_Store as Query_user_Store;
	$: node = $query_user_Store.response.data?.user;
	$: mutation_user_Store = data.mutation_user_Store as Mutation_user_Store;

	let value = {};
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
						errors = buildGraphQLErrors(result.errors);
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

<Card>
	<CardBody>
		<UserForm
			showSaveButton={auth('User::*::WRITE')}
			showRemoveButton={auth('User::isDeprecated::WRITE')}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_user_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_user_Store.isFetching}
			fields={{
				name: {
					readonly: !auth('User::name::WRITE'),
					disabled: !auth('User::name::WRITE'),
					hidden: !auth('User::name::READ')
				},
				description: {
					readonly: !auth('User::description::WRITE'),
					disabled: !auth('User::description::WRITE'),
					hidden: !auth('User::description::READ')
				},
				lastName: {
					readonly: !auth('User::lastName::WRITE'),
					disabled: !auth('User::lastName::WRITE'),
					hidden: !auth('User::lastName::READ')
				},
				login: {
					readonly: !auth('User::login::WRITE'),
					disabled: !auth('User::login::WRITE'),
					hidden: !auth('User::login::READ')
				},
				email: {
					readonly: !auth('User::email::WRITE'),
					disabled: !auth('User::email::WRITE'),
					hidden: !auth('User::email::READ')
				},
				phones: {
					readonly: !auth('User::phones::WRITE'),
					disabled: !auth('User::phones::WRITE'),
					hidden: !auth('User::phones::READ')
				},
				disable: {
					readonly: !auth('User::disable::WRITE'),
					disabled: !auth('User::disable::WRITE'),
					hidden: !auth('User::disable::READ')
				},
				groups: {
					readonly: !auth('User::groups::WRITE'),
					disabled: !auth('User::groups::WRITE'),
					hidden: !auth('User::groups::READ')
				},
				roles: {
					readonly: !auth('User::roles::WRITE'),
					disabled: !auth('User::roles::WRITE'),
					hidden: !auth('User::roles::READ')
				},
				realm: {
					readonly: !auth('User::realm::WRITE'),
					disabled: !auth('User::realm::WRITE'),
					hidden: !auth('User::realm::READ')
				}
			}}
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
			on:goto={(e) => to(`/${$locale}/user/${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
