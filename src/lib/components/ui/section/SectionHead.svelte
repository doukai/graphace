<script lang="ts">
	export let title: string;
	export let onClick: Function;
</script>

<div class="navbar bg-base-100 shadow-xl rounded-box">
	<div class="navbar-start">
		<a class="btn btn-ghost normal-case text-xl" href={null} on:click={onClick()}>{title}</a>
	</div>
	<div class="navbar-end">
		<slot />
	</div>
</div>
