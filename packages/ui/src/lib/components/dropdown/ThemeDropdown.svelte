<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { type Readable, type Writable } from 'svelte/store';
	import { themeChange } from 'theme-change';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Swatch, ChevronDown, Check } from '@steeze-ui/heroicons';
	import Dropdown from './Dropdown.svelte';
	import DropdownContent from './DropdownContent.svelte';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	export let themes = [
		{
			name: $LL.ui.themeSelect.themes.light,
			id: 'light'
		},
		{
			name: $LL.ui.themeSelect.themes.dark,
			id: 'dark'
		},
		{
			name: $LL.ui.themeSelect.themes.cupcake,
			id: 'cupcake'
		},
		{
			name: $LL.ui.themeSelect.themes.bumblebee,
			id: 'bumblebee'
		},
		{
			name: $LL.ui.themeSelect.themes.emerald,
			id: 'emerald'
		},
		{
			name: $LL.ui.themeSelect.themes.corporate,
			id: 'corporate'
		},
		{
			name: $LL.ui.themeSelect.themes.synthwave,
			id: 'synthwave'
		},
		{
			name: $LL.ui.themeSelect.themes.retro,
			id: 'retro'
		},
		{
			name: $LL.ui.themeSelect.themes.cyberpunk,
			id: 'cyberpunk'
		},
		{
			name: $LL.ui.themeSelect.themes.valentine,
			id: 'valentine'
		},
		{
			name: $LL.ui.themeSelect.themes.halloween,
			id: 'halloween'
		},
		{
			name: $LL.ui.themeSelect.themes.garden,
			id: 'garden'
		},
		{
			name: $LL.ui.themeSelect.themes.forest,
			id: 'forest'
		},
		{
			name: $LL.ui.themeSelect.themes.aqua,
			id: 'aqua'
		},
		{
			name: $LL.ui.themeSelect.themes.lofi,
			id: 'lofi'
		},
		{
			name: $LL.ui.themeSelect.themes.pastel,
			id: 'pastel'
		},
		{
			name: $LL.ui.themeSelect.themes.fantasy,
			id: 'fantasy'
		},
		{
			name: $LL.ui.themeSelect.themes.wireframe,
			id: 'wireframe'
		},
		{
			name: $LL.ui.themeSelect.themes.black,
			id: 'black'
		},
		{
			name: $LL.ui.themeSelect.themes.luxury,
			id: 'luxury'
		},
		{
			name: $LL.ui.themeSelect.themes.dracula,
			id: 'dracula'
		},
		{
			name: $LL.ui.themeSelect.themes.cmyk,
			id: 'cmyk'
		},
		{
			name: $LL.ui.themeSelect.themes.autumn,
			id: 'autumn'
		},
		{
			name: $LL.ui.themeSelect.themes.business,
			id: 'business'
		},
		{
			name: $LL.ui.themeSelect.themes.acid,
			id: 'acid'
		},
		{
			name: $LL.ui.themeSelect.themes.lemonade,
			id: 'lemonade'
		},
		{
			name: $LL.ui.themeSelect.themes.night,
			id: 'night'
		},
		{
			name: $LL.ui.themeSelect.themes.coffee,
			id: 'coffee'
		},
		{
			name: $LL.ui.themeSelect.themes.winter,
			id: 'winter'
		}
	];

	const themeStore = getContext<Writable<string | undefined>>('theme');

	onMount(() => {
		themeChange(false);
	});
</script>

<Dropdown class="dropdown-end">
	<DropdownContent class="overflow-y-auto">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div tabindex="0" class="btn btn-ghost normal-case">
			<Icon src={Swatch} class="h-5 w-5 stroke-current" />
			<span class="hidden font-normal md:inline">{$LL.ui.themeSelect.btn()}</span>
			<Icon src={ChevronDown} class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block" />
		</div>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div tabindex="0" class="grid grid-cols-1 gap-3 p-3">
			{#each themes as theme}
				<button
					class="outline-base-content overflow-hidden rounded-lg text-left"
					data-set-theme={theme.id}
					data-act-class="[&_svg]:visible"
					on:click={(e) => themeStore.set(theme.id)}
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
	</DropdownContent>
</Dropdown>
