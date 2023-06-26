<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Swatch } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	export let dropdownClasses = '';
	export let btnClasses = 'btn-ghost';
	export let contentClasses = 'mt-16';
	const themes = [
		{
			name: '🌝  light',
			id: 'light'
		},
		{
			name: '🌚  dark',
			id: 'dark'
		},
		{
			name: '🧁  cupcake',
			id: 'cupcake'
		},
		{
			name: '🐝  bumblebee',
			id: 'bumblebee'
		},
		{
			name: '✳️  Emerald',
			id: 'emerald'
		},
		{
			name: '🏢  Corporate',
			id: 'corporate'
		},
		{
			name: '🌃  synthwave',
			id: 'synthwave'
		},
		{
			name: '👴  retro',
			id: 'retro'
		},
		{
			name: '🤖  cyberpunk',
			id: 'cyberpunk'
		},
		{
			name: '🌸  valentine',
			id: 'valentine'
		},
		{
			name: '🎃  halloween',
			id: 'halloween'
		},
		{
			name: '🌷  garden',
			id: 'garden'
		},
		{
			name: '🌲  forest',
			id: 'forest'
		},
		{
			name: '🐟  aqua',
			id: 'aqua'
		},
		{
			name: '👓  lofi',
			id: 'lofi'
		},
		{
			name: '🖍  pastel',
			id: 'pastel'
		},
		{
			name: '🧚‍♀️  fantasy',
			id: 'fantasy'
		},
		{
			name: '📝  Wireframe',
			id: 'wireframe'
		},
		{
			name: '🏴  black',
			id: 'black'
		},
		{
			name: '💎  luxury',
			id: 'luxury'
		},
		{
			name: '🧛‍♂️  dracula',
			id: 'dracula'
		},
		{
			name: '🖨  CMYK',
			id: 'cmyk'
		},
		{
			name: '🍁  Autumn',
			id: 'autumn'
		},
		{
			name: '💼  Business',
			id: 'business'
		},
		{
			name: '💊  Acid',
			id: 'acid'
		},
		{
			name: '🍋  Lemonade',
			id: 'lemonade'
		},
		{
			name: '🌙  Night',
			id: 'night'
		},
		{
			name: '☕️  Coffee',
			id: 'coffee'
		},
		{
			name: '❄️  Winter',
			id: 'winter'
		}
	];

	onMount(() => {
		themeChange(false);
	});
</script>


<div title="Change Theme" class={`dropdown dropdown-end ${dropdownClasses}`}>
	<div tabindex="0" class={`btn normal-case ${btnClasses}`}>
	  <svg
		width="20"
		height="20"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		class="h-5 w-5 stroke-current">
		<path
		  stroke-linecap="round"
		  stroke-linejoin="round"
		  stroke-width="2"
		  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
	  </svg>
	  <span class="hidden font-normal md:inline">{$t("change-theme-btn")}</span>
	  <svg
		width="12px"
		height="12px"
		class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 2048 2048">
		<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
	  </svg>
	</div>
	<div
	  class={`dropdown-content bg-base-200 text-base-content rounded-box top-px h-[70vh] max-h-96 w-56 overflow-y-auto shadow ${contentClasses}`}>
	  <div class="grid grid-cols-1 gap-3 p-3" tabindex="0">
		{#each themes as theme}
		  <button
			class="outline-base-content overflow-hidden rounded-lg text-left"
			data-set-theme={theme.id}
			data-act-class="[&_svg]:visible">
			<div
			  data-theme={theme.id}
			  class="bg-base-100 text-base-content w-full cursor-pointer font-sans">
			  <div class="grid grid-cols-5 grid-rows-3">
				<div class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
				  <svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="invisible h-3 w-3 shrink-0">
					<path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
				  </svg>
				  <div class="flex-grow text-sm">
					{theme.id}
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



<!-- <div class="form-control">
	<label class="input-group">
		<span><Icon src={Swatch} solid class="h-6 w-6" /></span>
		<select class="select select-bordered" data-choose-theme>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
			<option value="cupcake">Cupcake</option>
			<option value="bumblebee">Bumblebee</option>
			<option value="emerald">Emerald</option>
			<option value="corporate">Corporate</option>
			<option value="synthwave">Synthwave</option>
			<option value="retro">Retro</option>
			<option value="cyberpunk">Cyberpunk</option>
			<option value="valentine">Valentine</option>
			<option value="halloween">Halloween</option>
			<option value="garden">Garden</option>
			<option value="forest">Forest</option>
			<option value="aqua">Aqua</option>
			<option value="lofi">Lofi</option>
			<option value="pastel">Pastel</option>
			<option value="fantasy">Fantasy</option>
			<option value="wireframe">Wireframe</option>
			<option value="black">Black</option>
			<option value="luxury">Luxury</option>
			<option value="dracula">Dracula</option>
			<option value="cmyk">Cmyk</option>
			<option value="autumn">Autumn</option>
			<option value="business">Business</option>
			<option value="acid">Acid</option>
			<option value="lemonade">Lemonade</option>
			<option value="night">Night</option>
			<option value="coffee">Coffee</option>
			<option value="winter">Winter</option>
		</select>
	</label>
</div> -->
