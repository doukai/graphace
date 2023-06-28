<script lang="ts">
	import { to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import Iconify from '@iconify/svelte';
	import { locale } from '~/i18n/i18n-svelte';
</script>

<li class="menu-title flex flex-row gap-4">
	<span class="text-base-content"><Iconify class="w-5 h-5" icon="logos:graphql" /></span>
	<span>Test</span>
</li>
<li>
	<a
		href={null}
		on:click={(e) => {
			e.preventDefault();
			to(`/${$locale}/current-user`);
		}}
		class={$page.url.pathname === `/${$locale}/current-user` ||
		$page.url.pathname.startsWith(`/${$locale}/current-user/`)
			? 'active'
			: ''}
	>
		<span>
			<Iconify icon="file-icons:graphql" />
		</span>
		<span> CurrentUser </span>
		<span class="badge badge-sm font-mono lowercase"> test </span>
	</a>
</li>
<li>
	<a
		href={null}
		on:click={(e) => {
			e.preventDefault();
			to(`/${$locale}/group`);
		}}
		class={$page.url.pathname === `/${$locale}/group` ||
		$page.url.pathname.startsWith(`/${$locale}/group/`)
			? 'active'
			: ''}
	>
		<Iconify icon="file-icons:graphql" />
		Group
	</a>
</li>
<li>
	<a
		href={null}
		on:click={(e) => {
			e.preventDefault();
			to(`/${$locale}/group-role`);
		}}
		class={$page.url.pathname === `/${$locale}/group-role` ||
		$page.url.pathname.startsWith(`/${$locale}/group-role/`)
			? 'active'
			: ''}
	>
		<Iconify icon="file-icons:graphql" />
		GroupRole
	</a>
</li>
<li>
	<a
		href={null}
		on:click={(e) => {
			e.preventDefault();
			to(`/${$locale}/permission`);
		}}
		class={$page.url.pathname === `/${$locale}/permission` ||
		$page.url.pathname.startsWith(`/${$locale}/permission/`)
			? 'active'
			: ''}
	>
		<Iconify icon="file-icons:graphql" />
		Permission
	</a>
</li>
<li>
	<a
		href={null}
		on:click={(e) => {
			e.preventDefault();
			to(`/${$locale}/realm`);
		}}
		class={$page.url.pathname === `/${$locale}/realm` ||
		$page.url.pathname.startsWith(`/${$locale}/realm/`)
			? 'active'
			: ''}
	>
		<Iconify icon="file-icons:graphql" />
		Realm
	</a>
</li>
<li>
	<a
		href={null}
		on:click={(e) => {
			e.preventDefault();
			to(`/${$locale}/role`);
		}}
		class={$page.url.pathname === `/${$locale}/role` ||
		$page.url.pathname.startsWith(`/${$locale}/role/`)
			? 'active'
			: ''}
	>
		<Iconify icon="file-icons:graphql" />
		Role
	</a>
</li>
<li>
	<a
		href={null}
		on:click={(e) => {
			e.preventDefault();
			to(`/${$locale}/role-composite`);
		}}
		class={$page.url.pathname === `/${$locale}/role-composite` ||
		$page.url.pathname.startsWith(`/${$locale}/role-composite/`)
			? 'active'
			: ''}
	>
		<Iconify icon="file-icons:graphql" />
		RoleComposite
	</a>
</li>
<li>
	<a
		href={null}
		on:click={(e) => {
			e.preventDefault();
			to(`/${$locale}/user`);
		}}
		class={$page.url.pathname === `/${$locale}/user` ||
		$page.url.pathname.startsWith(`/${$locale}/user/`)
			? 'active'
			: ''}
	>
		<Iconify icon="file-icons:graphql" />
		User
	</a>
</li>
<li>
	<a
		href={null}
		on:click={(e) => {
			e.preventDefault();
			to(`/${$locale}/user-group`);
		}}
		class={$page.url.pathname === `/${$locale}/user-group` ||
		$page.url.pathname.startsWith(`/${$locale}/user-group/`)
			? 'active'
			: ''}
	>
		<Iconify icon="file-icons:graphql" />
		UserGroup
	</a>
</li>
<li>
	<a
		href={null}
		on:click={(e) => {
			e.preventDefault();
			to(`/${$locale}/user-role`);
		}}
		class={$page.url.pathname === `/${$locale}/user-role` ||
		$page.url.pathname.startsWith(`/${$locale}/user-role/`)
			? 'active'
			: ''}
	>
		<Iconify icon="file-icons:graphql" />
		UserRole
	</a>
</li>
