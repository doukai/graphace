<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import Avatar from 'svelte-boring-avatars';
	import { jwt } from '@graphace/commons';
	import { init, Dropdown, DropdownContent } from '@graphace/ui';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { locale } from '$i18n/i18n-svelte';

	export let zIndex: number | undefined = 0;
	let className: string | undefined = 'mt-2 max-h-96 w-56 overflow-y-auto';
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	let size = 40;
	let square = false;
	let colors = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'];
</script>

{#if $jwt}
	<Dropdown class="dropdown-end">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label tabindex="0" class="btn btn-ghost btn-circle avatar">
			<div class="w-10 rounded-full">
				<!-- svelte-ignore a11y-missing-attribute -->
				<Avatar name={$jwt?.full_name} {size} {square} {colors} variant="beam" />
			</div>
		</label>
		<DropdownContent {zIndex} class={className}>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="menu menu-sm">
				<li>
					<a
						href={null}
						on:click|preventDefault={(e) => {
							init(`/${$locale}/settings/account`, $LL.graphence.components.userMenu.profile());
						}}
					>
						{$LL.graphence.components.userMenu.profile()}
					</a>
				</li>
				<li>
					<a
						href={null}
						on:click|preventDefault={(e) => {
							init(`/${$locale}/settings/password`, $LL.graphence.components.userMenu.password());
						}}
					>
						{$LL.graphence.components.userMenu.password()}
					</a>
				</li>
				<div class="divider my-0" />
				<li><a href={`/${$locale}/logout`}>{$LL.graphence.components.userMenu.logout()}</a></li>
			</ul>
		</DropdownContent>
	</Dropdown>
{:else}
	<a class="btn btn-ghost" href={`/${$locale}/login`}>{$LL.graphence.login.login()}</a>
{/if}
