<script lang="ts">
	import { LoginForm } from '~/lib/components/login';
	import type { PageData } from './$houdini';

	export let data: PageData;

	$: ({ Login } = data);
</script>

<LoginForm />
