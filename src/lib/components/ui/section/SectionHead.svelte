<script lang="ts">
	export let title: string;
</script>

<div class="navbar bg-base-100 shadow-xl rounded-box">
	<div class="navbar-start">
		<a class="btn btn-ghost hidden sm:flex normal-case text-xl" href={null} on:click>{title}</a>
	</div>
	<div class="navbar-end space-x-3">
		<slot />
	</div>
</div>
