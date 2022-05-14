<script lang="ts">
	export let title: string;
</script>

<div class="navbar bg-base-100 shadow-xl rounded-box">
	<div class="navbar-start">
		<div class="hidden sm:flex">
			<a class="btn btn-ghost normal-case text-xl" href={null} on:click>{title}</a>
		</div>
	</div>
	<div class="hidden sm:navbar-center" />
	<div class="navbar-center sm:navbar-end space-x-1">
		<slot />
	</div>
	<div class="navbar-end sm:hidden" />
</div>
