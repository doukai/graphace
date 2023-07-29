<script lang="ts">
	import { init } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import Iconify from '@iconify/svelte';
	import { locale } from '~/i18n/i18n-svelte';
	import pages from '~/lib/data/pages.json';
</script>

{#each pages as { name, icon, items }}
	<li class="menu-title flex flex-row gap-4">
		<span class="text-base-content"><Iconify class="w-5 h-5" {icon} /></span>
		<span>{name}</span>
	</li>
	{#each items as { name, href }}
		<li>
			<a
				href={null}
				on:click={(e) => {
					e.preventDefault();
					init(`/${$locale}${href}`);
				}}
				class={$page.url.pathname === `/${$locale}${href}` ||
				$page.url.pathname.startsWith(`/${$locale}${href}/`)
					? 'active'
					: ''}
			>
				<span>{name}</span>
				<!-- <span class="badge badge-sm font-mono lowercase"></span> -->
			</a>
		</li>
	{/each}
{/each}
