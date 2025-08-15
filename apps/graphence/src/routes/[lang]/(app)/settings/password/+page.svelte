<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import type { Mutation_currentUserResetPassword_Store } from '~/lib/stores/mutation/mutation_currentUserResetPassword_store';
	import ResetPasswordForm from '~/lib/components/settings/ResetPasswordForm.svelte';
	import { validator, buildGlobalGraphQLErrorMessage, buildGraphQLErrors } from '~/utils';
	import { LL } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;

	$: mutation_currentUserResetPassword =
		data.mutation_currentUserResetPassword_Store as Mutation_currentUserResetPassword_Store;
	let errors: Record<string, Errors> = {};

	const mutation = (args: { password: string; newPassword: string }) => {
		validate('Mutation_currentUserResetPassword_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_currentUserResetPassword.fetch(args).then((result) => {
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
				errors = validErrors;
			});
	};
</script>

<Card>
	<CardBody>
		<ResetPasswordForm
			showBackButton={$canBack}
			{errors}
			on:save={(e) => {
				if (e.detail.password && e.detail.newPassword) {
					mutation({ password: e.detail.password, newPassword: e.detail.newPassword });
				}
			}}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
