<script lang="ts">
	import { LoginForm } from '~/lib/components/login';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<LoginForm errors={form?.errors} errorCodes={form?.errorCodes} />
