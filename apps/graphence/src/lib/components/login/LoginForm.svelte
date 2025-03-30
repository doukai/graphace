<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { nanoid } from 'nanoid';
	import type { Errors } from '@graphace/commons';
	import type { NamespaceErrorsTranslation, TranslationFunctions } from '$i18n/i18n-types';

	export let errors: Record<string, Errors> = {};
	export let authErrorCodes: number[] = [];
	export let logining: boolean = false;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	$: authErrorMessageKeys = authErrorCodes.map(
		(code) => ('' + code) as keyof NamespaceErrorsTranslation['code']
	);

	const accountId = nanoid();
	const passwordId = nanoid();
</script>

<div class="hero min-h-[calc(100vh-6rem)] bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<div class="font-title inline-flex text-5xl font-bold">
				<span>Graph</span>
				<span class="uppercase text-[#E535AB]">ACE</span>
			</div>
			<p class="py-6">{$LL.graphence.login.detail()}</p>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<form
					method="POST"
					on:submit={(e) => {
						logining = true;
					}}
				>
					<div class="form-control">
						<label for={accountId} class="label">
							<span class="label-text">{$LL.graphence.login.account()}</span>
						</label>
						<input
							id={accountId}
							name="login"
							type="text"
							placeholder={$LL.graphence.login.account()}
							class="input input-bordered {errors.login?.errors ? 'input-error' : ''}"
						/>
						{#if errors.login?.errors}
							<label for={accountId} class="label">
								{#each errors.login?.errors as error}
									<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
								{/each}
							</label>
						{/if}
					</div>
					<div class="form-control">
						<label for={passwordId} class="label">
							<span class="label-text">{$LL.graphence.login.password()}</span>
						</label>
						<input
							id={passwordId}
							name="password"
							type="password"
							placeholder={$LL.graphence.login.password()}
							class="input input-bordered {errors.password?.errors ? 'input-error' : ''}"
						/>
						{#if errors.password?.errors}
							<label for={passwordId} class="label">
								{#each errors.password?.errors as error}
									<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
								{/each}
							</label>
						{/if}
						<div class="label">
							<a href={null} class="label-text-alt link link-hover"
								>{$LL.graphence.login.forgot()}</a
							>
						</div>
						{#each authErrorMessageKeys as messageKey}
							<p class="text-error text-center text-sm font-semibold">
								{$LL.errors.code[messageKey]()}
							</p>
						{/each}
					</div>
					<div class="form-control mt-6">
						<button class="btn btn-primary" disabled={logining}>
							{#if logining}
								<span class="loading loading-spinner" />
							{/if}
							{$LL.graphence.login.login()}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
