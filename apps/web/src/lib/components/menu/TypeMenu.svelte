<script lang="ts">
	import { to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { locale } from '~/i18n/i18n-svelte';
</script>
	<li>
		<a
			href={null}
			on:click={(e) => {
				e.preventDefault();
				to(`/${$locale}/organization`);
			}}
			class={$page.url.pathname === `/${$locale}/organization` || $page.url.pathname.startsWith(`/${$locale}/organization/`) ? 'active' : ''}
		>
			<Icon icon="file-icons:graphql" />
			Organization
		</a>
	</li>
	<li>
		<a
			href={null}
			on:click={(e) => {
				e.preventDefault();
				to(`/${$locale}/role`);
			}}
			class={$page.url.pathname === `/${$locale}/role` || $page.url.pathname.startsWith(`/${$locale}/role/`) ? 'active' : ''}
		>
			<Icon icon="file-icons:graphql" />
			Role
		</a>
	</li>
	<li>
		<a
			href={null}
			on:click={(e) => {
				e.preventDefault();
				to(`/${$locale}/role-role-type`);
			}}
			class={$page.url.pathname === `/${$locale}/role-role-type` || $page.url.pathname.startsWith(`/${$locale}/role-role-type/`) ? 'active' : ''}
		>
			<Icon icon="file-icons:graphql" />
			RoleRoleType
		</a>
	</li>
	<li>
		<a
			href={null}
			on:click={(e) => {
				e.preventDefault();
				to(`/${$locale}/user`);
			}}
			class={$page.url.pathname === `/${$locale}/user` || $page.url.pathname.startsWith(`/${$locale}/user/`) ? 'active' : ''}
		>
			<Icon icon="file-icons:graphql" />
			User
		</a>
	</li>
	<li>
		<a
			href={null}
			on:click={(e) => {
				e.preventDefault();
				to(`/${$locale}/user-phones`);
			}}
			class={$page.url.pathname === `/${$locale}/user-phones` || $page.url.pathname.startsWith(`/${$locale}/user-phones/`) ? 'active' : ''}
		>
			<Icon icon="file-icons:graphql" />
			UserPhones
		</a>
	</li>
	<li>
		<a
			href={null}
			on:click={(e) => {
				e.preventDefault();
				to(`/${$locale}/user-profile`);
			}}
			class={$page.url.pathname === `/${$locale}/user-profile` || $page.url.pathname.startsWith(`/${$locale}/user-profile/`) ? 'active' : ''}
		>
			<Icon icon="file-icons:graphql" />
			UserProfile
		</a>
	</li>
	<li>
		<a
			href={null}
			on:click={(e) => {
				e.preventDefault();
				to(`/${$locale}/user-role`);
			}}
			class={$page.url.pathname === `/${$locale}/user-role` || $page.url.pathname.startsWith(`/${$locale}/user-role/`) ? 'active' : ''}
		>
			<Icon icon="file-icons:graphql" />
			UserRole
		</a>
	</li>
	<li>
		<a
			href={null}
			on:click={(e) => {
				e.preventDefault();
				to(`/${$locale}/user-test1`);
			}}
			class={$page.url.pathname === `/${$locale}/user-test1` || $page.url.pathname.startsWith(`/${$locale}/user-test1/`) ? 'active' : ''}
		>
			<Icon icon="file-icons:graphql" />
			UserTest1
		</a>
	</li>
	<li>
		<a
			href={null}
			on:click={(e) => {
				e.preventDefault();
				to(`/${$locale}/user-test2`);
			}}
			class={$page.url.pathname === `/${$locale}/user-test2` || $page.url.pathname.startsWith(`/${$locale}/user-test2/`) ? 'active' : ''}
		>
			<Icon icon="file-icons:graphql" />
			UserTest2
		</a>
	</li>
