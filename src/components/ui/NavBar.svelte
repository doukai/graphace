<script>
	import { isOpen } from '$lib/stores/menu';
</script>

<div class="navbar sticky top-0 z-10 bg-base-100">
	<div class="navbar-start">
		<button class="btn btn-square btn-ghost" on:click={(e) => isOpen.update((isOpen) => !isOpen)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-5 h-5 stroke-current"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
	</div>
	<div class="navbar-center" />
	<div class="navbar-end">
		<select class="select select-ghost" data-choose-theme>
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
	</div>
</div>
