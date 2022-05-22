<script lang="ts">
	import { ObjectEditButton } from '$lib/components/graphql/introspection';
	import type { __Type, __Field } from '$lib/types';
	export let __parentType: __Type;
	export let __field: __Field;
	export let id: string;
	export let value: object;
</script>

<td>
	<ObjectEditButton {__parentType} {__field} {id} bind:value className="btn-xs btn-ghost" />
</td>
