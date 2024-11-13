<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import ResetPasswordForm from '~/lib/components/settings/ResetPasswordForm.svelte';
	import type { GraphQLError } from '@graphace/graphql';
	import type { UserInput } from '~/lib/types/schema';
	import { Mutation_currentUserResetPasswordStore } from '$houdini';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';

	$: urlName($page.url, $LL.graphence.components.userMenu.password());
	const Mutation_currentUserResetPassword = new Mutation_currentUserResetPasswordStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: { password: string; newPassword: string };
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_currentUserResetPassword_Arguments', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				Mutation_currentUserResetPassword.mutate(event.detail.args).then((result) => {
					if (result.errors) {
						event.detail.catch(result.errors);
					} else {
						event.detail.then(result?.data?.currentUserResetPassword);
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
</script>

<Card>
	<ResetPasswordForm showBackButton={$canBack} {errors} on:mutation={mutation} on:back={back} />
</Card>
