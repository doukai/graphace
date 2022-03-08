<script lang="ts">
	export let href: string;
	export let color: string = 'indigo';
</script>

<a {href} class="text-{color}-600 hover:text-{color}-900" on:click>
	<slot />
</a>
