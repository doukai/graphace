<div class="hero text-base-content mx-auto">
	<div class="hero-content text-center">
		<div class="w-full max-w-md">
			<h2 class="mb-2 mt-2 text-[clamp(2rem,8vw,5rem)] font-black md:text-3xl">
				Welcome to <a href="https://graphoenix.org/"><u>Graphoenix</u></a>
			</h2>
			<p class="mx-auto mt-5 w-full max-w-lg text-left">set environments:</p>
			<div class="my-2 w-full max-w-4xl">
				<div class="mockup-code mx-auto w-full max-w-xs text-left text-sm shadow-lg sm:max-w-none">
					<pre><code><span class="text-neutral-content text-opacity-40">// .env</span></code></pre>
					<pre><code>PUBLIC_GRAPHQL_URL=http://localhost:8080/graphql</code></pre>
					<pre><code>AUTH_SCHEME=Basic</code></pre>
					<pre><code>AUTH_TOKEN=root:root</code></pre>
				</div>
			</div>

			<p class="mx-auto mt-5 w-full max-w-lg text-left">startup:</p>
			<div class="mx-auto my-2 w-full max-w-md">
				<div class="mockup-code mx-auto w-full max-w-xs text-left shadow-lg sm:max-w-none">
					<pre data-prefix="$"><code>pnpm run dev</code></pre>
				</div>
			</div>

			<p class="mx-auto mt-5 w-full max-w-lg text-left">generate components:</p>
			<div class="mx-auto my-2 w-full max-w-md">
				<div class="mockup-code mx-auto w-full max-w-xs text-left shadow-lg sm:max-w-none">
					<pre data-prefix="$"><code>pnpm run graphql:codegen</code></pre>
				</div>
			</div>

			<p class="mx-auto mt-5 w-full max-w-lg text-left">build app or package components:</p>
			<div class="mx-auto my-2 w-full max-w-md">
				<div class="mockup-code mx-auto w-full max-w-xs text-left shadow-lg sm:max-w-none">
					<pre data-prefix="$"><code>pnpm run build</code></pre>
					<pre data-prefix="$"><code>pnpm run build:package</code></pre>
				</div>
			</div>
		</div>
	</div>
</div>
