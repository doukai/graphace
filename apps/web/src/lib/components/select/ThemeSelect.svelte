<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Swatch, ChevronDown, Check } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';

	onMount(() => {
		themeChange(false);
	});
	
	export let dropdownClasses = '';
	export let btnClasses = 'btn-ghost';
	export let contentClasses = 'mt-16';
	let themes = [
		{
			name: $LL.web.components.themeSelect.themes.light,
			id: 'light'
		},
		{
			name: $LL.web.components.themeSelect.themes.dark,
			id: 'dark'
		},
		{
			name: $LL.web.components.themeSelect.themes.cupcake,
			id: 'cupcake'
		},
		{
			name: $LL.web.components.themeSelect.themes.bumblebee,
			id: 'bumblebee'
		},
		{
			name: $LL.web.components.themeSelect.themes.emerald,
			id: 'emerald'
		},
		{
			name: $LL.web.components.themeSelect.themes.corporate,
			id: 'corporate'
		},
		{
			name: $LL.web.components.themeSelect.themes.synthwave,
			id: 'synthwave'
		},
		{
			name: $LL.web.components.themeSelect.themes.retro,
			id: 'retro'
		},
		{
			name: $LL.web.components.themeSelect.themes.cyberpunk,
			id: 'cyberpunk'
		},
		{
			name: $LL.web.components.themeSelect.themes.valentine,
			id: 'valentine'
		},
		{
			name: $LL.web.components.themeSelect.themes.halloween,
			id: 'halloween'
		},
		{
			name: $LL.web.components.themeSelect.themes.garden,
			id: 'garden'
		},
		{
			name: $LL.web.components.themeSelect.themes.forest,
			id: 'forest'
		},
		{
			name: $LL.web.components.themeSelect.themes.aqua,
			id: 'aqua'
		},
		{
			name: $LL.web.components.themeSelect.themes.lofi,
			id: 'lofi'
		},
		{
			name: $LL.web.components.themeSelect.themes.pastel,
			id: 'pastel'
		},
		{
			name: $LL.web.components.themeSelect.themes.fantasy,
			id: 'fantasy'
		},
		{
			name: $LL.web.components.themeSelect.themes.wireframe,
			id: 'wireframe'
		},
		{
			name: $LL.web.components.themeSelect.themes.black,
			id: 'black'
		},
		{
			name: $LL.web.components.themeSelect.themes.luxury,
			id: 'luxury'
		},
		{
			name: $LL.web.components.themeSelect.themes.dracula,
			id: 'dracula'
		},
		{
			name: $LL.web.components.themeSelect.themes.cmyk,
			id: 'cmyk'
		},
		{
			name: $LL.web.components.themeSelect.themes.autumn,
			id: 'autumn'
		},
		{
			name: $LL.web.components.themeSelect.themes.business,
			id: 'business'
		},
		{
			name: $LL.web.components.themeSelect.themes.acid,
			id: 'acid'
		},
		{
			name: $LL.web.components.themeSelect.themes.lemonade,
			id: 'lemonade'
		},
		{
			name: $LL.web.components.themeSelect.themes.night,
			id: 'night'
		},
		{
			name: $LL.web.components.themeSelect.themes.coffee,
			id: 'coffee'
		},
		{
			name: $LL.web.components.themeSelect.themes.winter,
			id: 'winter'
		}
	];
</script>

<div title="Change Theme" class={`dropdown dropdown-end ${dropdownClasses}`}>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div tabindex="0" class={`btn normal-case ${btnClasses}`}>
		<Icon src={Swatch} class="h-5 w-5 stroke-current" />
		<span class="hidden font-normal md:inline">{$LL.web.components.themeSelect.btn()}</span>
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
