<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Form, FormControl, Label } from '@graphace/ui';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let errors: Record<string, Errors> = {};
	export let showBackButton: boolean = true;
	let className: string | undefined =
		'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2';

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		save: { password: string; newPassword: string };
		back: {};
	}>();

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
		dispatch('save', { password, newPassword });
	};
</script>

<div class="flex justify-end md:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{$LL.graphence.components.userMenu.password()}
	</span>
	<Buttons showSaveButton={true} {showBackButton} on:save={(e) => save()} on:back />
</div>
<div class="divider" />
<Form class={className}>
	<FormControl let:id>
		<Label {id} text={$LL.graphence.components.resetPassword.password()} />
		<input
			{id}
			name="password"
			type="password"
			placeholder={$LL.graphence.components.resetPassword.password()}
			bind:value={password}
			class="input input-bordered {errors.password?.errors ? 'input-error' : ''}"
		/>
		{#if errors.password?.errors}
			<label for={id} class="label">
				{#each errors.password?.errors as error}
					<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
				{/each}
			</label>
		{/if}
	</FormControl>
	<FormControl let:id>
		<Label {id} text={$LL.graphence.components.resetPassword.newPassword()} />
		<input
			{id}
			name="newPassword"
			type="password"
			placeholder={$LL.graphence.components.resetPassword.newPassword()}
			bind:value={newPassword}
			class="input input-bordered {errors.newPassword?.errors ? 'input-error' : ''}"
		/>
		{#if errors.newPassword?.errors}
			<label for={id} class="label">
				{#each errors.newPassword?.errors as error}
					<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
				{/each}
			</label>
		{/if}
	</FormControl>
	<FormControl let:id>
		<Label {id} text={$LL.graphence.components.resetPassword.repeatNewPassword()} />
		<input
			{id}
			name="repeatNewPassword"
			type="password"
			placeholder={$LL.graphence.components.resetPassword.repeatNewPassword()}
			bind:value={repeatNewPassword}
			class="input input-bordered {errors.repeatNewPassword?.errors ? 'input-error' : ''}"
		/>
		{#if errors.repeatNewPassword?.errors}
			<label for={id} class="label">
				{#each errors.repeatNewPassword?.errors as error}
					<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
				{/each}
			</label>
		{/if}
	</FormControl>
</Form>
