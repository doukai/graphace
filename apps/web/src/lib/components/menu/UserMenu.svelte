<script lang="ts">
	import { locale } from '~/i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';
</script>

<div class="dropdown dropdown-end">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label tabindex="0" class="btn btn-ghost btn-circle avatar">
		<div class="w-10 rounded-full">
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
		</div>
	</label>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		tabindex="0"
		class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
	>
		<li><a>{$LL.web.components.userMenu.profile()}</a></li>
		<li><a>{$LL.web.components.userMenu.settings()}</a></li>
		<div class="divider mt-0 mb-0" />
		<li><a href={`/${$locale}/logout`}>{$LL.web.components.userMenu.logout()}</a></li>
	</ul>
</div>
