<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { GraphQLError } from '@graphace/commons/types';
	import LL from '$i18n/i18n-svelte';
	import { nanoid } from 'nanoid';

	const accountId = nanoid();
	const passwordId = nanoid();
	let login: string | undefined = undefined;
	let password: string | undefined = undefined;

	const dispatch = createEventDispatcher<{
		login: {
			login: string | undefined;
			password: string | undefined;
			then: (token: string) => void;
			catch: (errors: GraphQLError[]) => void;
		};
	}>();
</script>

<div class="hero min-h-[calc(100vh-4rem)] bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<div class="font-title inline-flex text-5xl font-bold">
				<span>Graph</span>
				<span class="uppercase text-[#E535AB]">ACE</span>
			</div>
			<p class="py-6">{$LL.web.login.detail()}</p>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<div class="form-control">
					<label for={accountId} class="label">
						<span class="label-text">{$LL.web.login.account()}</span>
					</label>
					<input
						id={accountId}
						type="text"
						placeholder={$LL.web.login.account()}
						class="input input-bordered"
						bind:value={login}
					/>
				</div>
				<div class="form-control">
					<label for={passwordId} class="label">
						<span class="label-text">{$LL.web.login.password()}</span>
					</label>
					<input
						id={passwordId}
						type="password"
						placeholder={$LL.web.login.password()}
						class="input input-bordered"
						bind:value={password}
					/>
					<div class="label">
						<a href={null} class="label-text-alt link link-hover">{$LL.web.login.forgot()}</a>
					</div>
				</div>
				<div class="form-control mt-6">
					<button
						class="btn btn-primary"
						on:click={(e) => {
							e.preventDefault();
							dispatch('login', {
								login,
								password,
								then: (token) => {},
								catch: (errors) => {}
							});
						}}
					>
						{$LL.web.login.login()}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
