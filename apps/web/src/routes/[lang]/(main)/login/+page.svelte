<script lang="ts">
	import { LoginForm } from '~/lib/components/login';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<LoginForm errors={form?.errors} />
