<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Swatch, ChevronDown, Check } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	export let dropdownClasses = '';
	export let btnClasses = 'btn-ghost';
	export let contentClasses = 'mt-16';
	let themes = [
		{
			name: $LL.components.ThemeSelect.themes.light,
			id: 'light'
		},
		{
			name: $LL.components.ThemeSelect.themes.dark,
			id: 'dark'
		},
		{
			name: $LL.components.ThemeSelect.themes.cupcake,
			id: 'cupcake'
		},
		{
			name: $LL.components.ThemeSelect.themes.bumblebee,
			id: 'bumblebee'
		},
		{
			name: $LL.components.ThemeSelect.themes.emerald,
			id: 'emerald'
		},
		{
			name: $LL.components.ThemeSelect.themes.corporate,
			id: 'corporate'
		},
		{
			name: $LL.components.ThemeSelect.themes.synthwave,
			id: 'synthwave'
		},
		{
			name: $LL.components.ThemeSelect.themes.retro,
			id: 'retro'
		},
		{
			name: $LL.components.ThemeSelect.themes.cyberpunk,
			id: 'cyberpunk'
		},
		{
			name: $LL.components.ThemeSelect.themes.valentine,
			id: 'valentine'
		},
		{
			name: $LL.components.ThemeSelect.themes.halloween,
			id: 'halloween'
		},
		{
			name: $LL.components.ThemeSelect.themes.garden,
			id: 'garden'
		},
		{
			name: $LL.components.ThemeSelect.themes.forest,
			id: 'forest'
		},
		{
			name: $LL.components.ThemeSelect.themes.aqua,
			id: 'aqua'
		},
		{
			name: $LL.components.ThemeSelect.themes.lofi,
			id: 'lofi'
		},
		{
			name: $LL.components.ThemeSelect.themes.pastel,
			id: 'pastel'
		},
		{
			name: $LL.components.ThemeSelect.themes.fantasy,
			id: 'fantasy'
		},
		{
			name: $LL.components.ThemeSelect.themes.wireframe,
			id: 'wireframe'
		},
		{
			name: $LL.components.ThemeSelect.themes.black,
			id: 'black'
		},
		{
			name: $LL.components.ThemeSelect.themes.luxury,
			id: 'luxury'
		},
		{
			name: $LL.components.ThemeSelect.themes.dracula,
			id: 'dracula'
		},
		{
			name: $LL.components.ThemeSelect.themes.cmyk,
			id: 'cmyk'
		},
		{
			name: $LL.components.ThemeSelect.themes.autumn,
			id: 'autumn'
		},
		{
			name: $LL.components.ThemeSelect.themes.business,
			id: 'business'
		},
		{
			name: $LL.components.ThemeSelect.themes.acid,
			id: 'acid'
		},
		{
			name: $LL.components.ThemeSelect.themes.lemonade,
			id: 'lemonade'
		},
		{
			name: $LL.components.ThemeSelect.themes.night,
			id: 'night'
		},
		{
			name: $LL.components.ThemeSelect.themes.coffee,
			id: 'coffee'
		},
		{
			name: $LL.components.ThemeSelect.themes.winter,
			id: 'winter'
		}
	];

	onMount(() => {
		themeChange(false);
	});
</script>

<div title="Change Theme" class={`dropdown dropdown-end ${dropdownClasses}`}>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div tabindex="0" class={`btn normal-case ${btnClasses}`}>
		<Icon src={Swatch} class="h-5 w-5 stroke-current" />
		<span class="hidden font-normal md:inline">{$LL.components.ThemeSelect.btn()}</span>
		<Icon src={ChevronDown} class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" />
	</div>
	<div
		class={`dropdown-content bg-base-200 text-base-content rounded-box top-px h-[70vh] max-h-96 w-56 overflow-y-auto shadow ${contentClasses}`}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="grid grid-cols-1 gap-3 p-3" tabindex="0">
			{#each themes as theme}
				<button
					class="outline-base-content overflow-hidden rounded-lg text-left"
					data-set-theme={theme.id}
					data-act-class="[&_svg]:visible"
				>
					<div
						data-theme={theme.id}
						class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
					>
						<div class="grid grid-cols-5 grid-rows-3">
							<div class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
								<Icon src={Check} class="invisible h-3 w-3 shrink-0" />
								<div class="flex-grow text-sm">
									{theme.name()}
								</div>
								<div class="flex h-full flex-shrink-0 flex-wrap gap-1">
									<div class="bg-primary w-2 rounded" />
									<div class="bg-secondary w-2 rounded" />
									<div class="bg-accent w-2 rounded" />
									<div class="bg-neutral w-2 rounded" />
								</div>
							</div>
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>
