<script lang="ts">
	export let title: string;
</script>

<div class="navbar bg-base-100 shadow-xl rounded-box">
	<div class="hidden md:flex md:navbar-start">
		<a class="btn btn-ghost normal-case text-xl" href={null} on:click>{title}</a>
	</div>
	<div class="flex md:navbar-end space-x-1">
		<slot />
	</div>
</div>
