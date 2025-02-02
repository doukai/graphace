<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import ResetPasswordForm from '~/lib/components/settings/ResetPasswordForm.svelte';
	import type { GraphQLError } from '@graphace/graphql';
	import type { UserInput } from '~/lib/types/schema';
	import type { Mutation_currentUserResetPassword_Store } from '~/lib/stores/mutation/mutation_currentUserResetPassword_store';
	import type { PageData } from './$types';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphence.components.userMenu.password());
	$: mutation_currentUserResetPassword =
		data.mutation_currentUserResetPassword_Store as Mutation_currentUserResetPassword_Store;
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
				mutation_currentUserResetPassword.fetch(event.detail.args).then((result) => {
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
