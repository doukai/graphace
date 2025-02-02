<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { nanoid } from 'nanoid';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError, GlobalGraphQLErrorMessageFunction } from '@graphace/graphql';
	import { Form, messageBoxs, notifications } from '@graphace/ui';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { UserInput } from '~/lib/types/schema';

	export let errors: Record<string, Errors> = {};
	export let showBackButton: boolean = true;

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const buildGlobalGraphQLErrorMessage = getContext<GlobalGraphQLErrorMessageFunction>(
		'buildGlobalGraphQLErrorMessage'
	);

	const dispatch = createEventDispatcher<{
		mutation: {
			args: { password: string; newPassword: string };
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		back: {};
	}>();

	const passwordId = nanoid();
	const newPasswordId = nanoid();
	const repeatNewPasswordId = nanoid();

	let password: string;
	let newPassword: string;
	let repeatNewPassword: string;

	const save = (): void => {
		if (newPassword !== repeatNewPassword) {
			errors = {
				newPassword: {
					errors: [{ message: $LL.graphence.components.resetPassword.inconsistent() }]
				},
				repeatNewPassword: {
					errors: [{ message: $LL.graphence.components.resetPassword.inconsistent() }]
				}
			};
			return;
		}
		dispatch('mutation', {
			args: { password, newPassword },
			then: (data) => {
				notifications.success($LL.graphence.message.saveSuccess());
				dispatch('back', {});
			},
			catch: (graphQLErrors) => {
				console.error(graphQLErrors);
				const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
				if (globalError) {
					messageBoxs.open({
						title: $LL.graphence.message.saveFailed(),
						content: globalError,
						buttonName: $LL.ui.button.back(),
						buttonType: 'neutral',
						confirm: () => {
							dispatch('back', {});
							return true;
						}
					});
				}
			}
		});
	};
</script>

<Form
	title={$LL.graphence.components.userMenu.password()}
	showRemoveButton={false}
	{showBackButton}
	on:save={(e) => save()}
	on:back
>
	<div class="form-control">
		<label for={passwordId} class="label">
			<span class="label-text">{$LL.graphence.components.resetPassword.password()}</span>
		</label>
		<input
			id={passwordId}
			name="password"
			type="password"
			placeholder={$LL.graphence.components.resetPassword.password()}
			bind:value={password}
			class="input input-bordered {errors.password?.errors ? 'input-error' : ''}"
		/>
		{#if errors.password?.errors}
			<label for={passwordId} class="label">
				{#each errors.password?.errors as error}
					<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
				{/each}
			</label>
		{/if}
	</div>
	<div class="form-control">
		<label for={newPasswordId} class="label">
			<span class="label-text">{$LL.graphence.components.resetPassword.newPassword()}</span>
		</label>
		<input
			id={newPasswordId}
			name="newPassword"
			type="password"
			placeholder={$LL.graphence.components.resetPassword.newPassword()}
			bind:value={newPassword}
			class="input input-bordered {errors.newPassword?.errors ? 'input-error' : ''}"
		/>
		{#if errors.newPassword?.errors}
			<label for={newPasswordId} class="label">
				{#each errors.newPassword?.errors as error}
					<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
				{/each}
			</label>
		{/if}
	</div>
	<div class="form-control">
		<label for={repeatNewPasswordId} class="label">
			<span class="label-text">{$LL.graphence.components.resetPassword.repeatNewPassword()}</span>
		</label>
		<input
			id={repeatNewPasswordId}
			name="repeatNewPassword"
			type="password"
			placeholder={$LL.graphence.components.resetPassword.repeatNewPassword()}
			bind:value={repeatNewPassword}
			class="input input-bordered {errors.repeatNewPassword?.errors ? 'input-error' : ''}"
		/>
		{#if errors.repeatNewPassword?.errors}
			<label for={repeatNewPasswordId} class="label">
				{#each errors.repeatNewPassword?.errors as error}
					<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
				{/each}
			</label>
		{/if}
	</div>
</Form>
