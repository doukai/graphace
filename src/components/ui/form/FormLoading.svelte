<div class="animate-pulse max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
	<form class="space-y-8 divide-y divide-gray-200">
		<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
			<div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
				<div>
					<div class="h-8 w-28 bg-slate-200" />
					<div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
						<div
							class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
						>
							{#each { length: 10 } as _}
								<div class="h-6 w-24 bg-slate-200" />
								<div class="mt-1 sm:mt-0 sm:col-span-2">
									<div class="h-6 w-48 bg-slate-200" />
								</div>
							{/each}
						</div>
					</div>
				</div>
				<div class="pt-5">
					<div class="flex justify-end">
						<div class="ml-3 h-8 w-20 bg-slate-200 rounded" />
						<div class="ml-3 h-8 w-20 bg-slate-200 rounded" />
					</div>
				</div>
			</div>
		</div>
	</form>
</div>
