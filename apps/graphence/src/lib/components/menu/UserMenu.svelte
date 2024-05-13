<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { jwt } from '@graphace/commons';

	import Avatar from 'svelte-boring-avatars';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { locale } from '$i18n/i18n-svelte';

	const LL = getContext('LL') as Readable<TranslationFunctions>;

	let size = 40;
	let square = false;
	let colors = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'];
</script>

<div class="dropdown dropdown-end">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label tabindex="0" class="btn btn-ghost btn-circle avatar">
		<div class="w-10 rounded-full">
			<!-- svelte-ignore a11y-missing-attribute -->
			<Avatar name={$jwt.full_name} {size} {square} {colors} variant="beam" />
		</div>
	</label>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		tabindex="0"
		class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
	>
		<li><a href={undefined}>{$LL.graphence.components.userMenu.profile()}</a></li>
		<li><a href={undefined}>{$LL.graphence.components.userMenu.settings()}</a></li>
		<div class="divider mt-0 mb-0" />
		<li><a href={`/${$locale}/logout`}>{$LL.graphence.components.userMenu.logout()}</a></li>
	</ul>
</div>
