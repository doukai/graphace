<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	export let cols: number;
</script>

<tr>
	<td colspan={cols}>
		<div class="flex justify-center">
			<span class="badge badge-ghost">{$LL.ui.table.empty()}</span>
		</div>
	</td>
</tr>
