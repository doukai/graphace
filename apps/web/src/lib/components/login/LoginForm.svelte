<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import type { NamespaceWebTranslation } from '$i18n/i18n-types';
	import type { Errors } from '@graphace/commons/types';
	import { nanoid } from 'nanoid';
	import logo from '$lib/assets/logo.png';

	export let errors: Record<string, Errors> = {};
	export let authErrorCodes: number[] = [];
	export let logining: boolean = false;

	$: authErrorMessageKeys = authErrorCodes.map(
		(code) => ('' + code) as keyof NamespaceWebTranslation['errors']
	);

	const accountId = nanoid();
	const passwordId = nanoid();
</script>

<div
	class="hero min-h-[calc(100vh-4rem)] bg-base-200"
	style="background-image: url(../../../../static/login.webp);"
>
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<div class="font-title inline-flex text-5xl font-bold">
				<span class="uppercase text-info">G</span>
				<span class="uppercase text-info">Top</span>
			</div>
			<p class="py-6 text-info text-xl">{$LL.web.login.detail()}</p>
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
							<span class="label-text">{$LL.web.login.account()}</span>
						</label>
						<input
							id={accountId}
							name="login"
							type="text"
							placeholder={$LL.web.login.account()}
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
							<span class="label-text">{$LL.web.login.password()}</span>
						</label>
						<input
							id={passwordId}
							name="password"
							type="password"
							placeholder={$LL.web.login.password()}
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
							<a href={null} class="label-text-alt link link-hover">{$LL.web.login.forgot()}</a>
						</div>
						{#each authErrorMessageKeys as messageKey}
							<p class="text-error text-center text-sm font-semibold">
								{$LL.web.errors[messageKey]()}
							</p>
						{/each}
					</div>
					<div class="form-control mt-6">
						<button class="btn btn-primary" disabled={logining}>
							{#if logining}
								<span class="loading loading-spinner" />
							{/if}
							{$LL.web.login.login()}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
