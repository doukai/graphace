<div class="hero text-base-content mx-auto">
	<div class="hero-content text-center">
		<div class="w-full max-w-md">
			<h2 class="mb-2 mt-20 text-[clamp(2rem,8vw,5rem)] font-black md:text-6xl">Quick Start</h2>
			<p class="mx-auto mt-5 w-full max-w-lg text-left">1. Import i18n translations:</p>
			<div class="mx-auto my-2 w-full max-w-md">
				<div class="mockup-code mx-auto w-full max-w-xs text-left shadow-lg sm:max-w-none">
					<pre data-prefix="$"><code>pnpm run i18n:import</code></pre>
				</div>
			</div>

			<p class="mx-auto mt-5 w-full max-w-lg text-left">2. Set graphql server environments:</p>
			<div class="my-2 w-full max-w-4xl">
				<div
					class="mockup-code mx-auto w-full max-w-xs text-left text-sm shadow-lg sm:max-w-none"
				>
<pre><code><span class="text-neutral-content text-opacity-40">// .env</span>
  PUBLIC_GRAPHQL_URL=http://localhost:8080/graphql
  AUTH_SCHEME=Basic
  AUTH_TOKEN=root:root</code></pre>
				</div>
			</div>

			<p class="mx-auto mt-5 w-full max-w-lg text-left">3. Generate componetns and start:</p>
			<div class="mx-auto my-2 w-full max-w-md">
				<div class="mockup-code mx-auto w-full max-w-xs text-left shadow-lg sm:max-w-none">
					<pre data-prefix="$"><code>pnpm run graphql:codegen</code></pre>
					<pre data-prefix="$"><code>pnpm run dev</code></pre>
				</div>
			</div>
		</div>
	</div>
</div>
