<script lang="ts" context="module">
	export type Option = {
		label: string | null | undefined;
		value?: string | null | undefined;
		node?: any | null | undefined;
		parent?: Option | null | undefined;
		options?: Option[] | null | undefined;
		disabled?: boolean | undefined;
		hidden?: boolean | undefined;
	};
</script>

<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createCombobox, createTagsInput, melt, type Tag } from '@melt-ui/svelte';
	import { Check, ChevronUp, ChevronDown, XMark } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import { Loading, Empty } from '~';
	import { nanoid } from 'nanoid';

	export let options: Option[] | null | undefined = [];
	export let value: Option | Option[] | null | undefined = undefined;
	export let multiple: boolean = false;
	export let id: string | undefined = nanoid();
	export let name: string | undefined = undefined;
	export let placeholder: string = '';
	export let disabled = false;
	export let readonly = false;
	export let editable = false;
	export let unique = true;
	export let addOnPaste = true;
	export let errors: Errors | undefined = undefined;
	export let separator: string = '-';
	export let loading: boolean = false;
	export let getOptionId: (option: Option) => string = (option: Option) => {
		if (option.parent?.value) {
			return option.parent.value + separator + (option.value ?? '');
		}
		return option.value ?? '';
	};
	export let getOptionLabel: (option: Option) => string = (option: Option) => {
		if (option.parent?.label) {
			return option.parent.label + separator + (option.label ?? '');
		}
		return option.label ?? '';
	};
	export let zIndex: number | undefined = 0;
	let className: string = '';
	export { className as class };

	const contextClass = getContext<string>('ui.combobox') || '';

	const dispatch = createEventDispatcher<{
		search: { searchValue: string | null | undefined };
		update: { option: Option };
		change: { value: Option | Option[]; original?: Option | Option[] };
	}>();

	const {
		elements: { menu, input, option, label, group, groupLabel },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox<Option, boolean>({
		defaultSelected: Array.isArray(value)
			? value.map((item) => ({
					value: item,
					label: item.label
			  }))
			: value
			? { value: value, label: value.label }
			: undefined,
		multiple: multiple,
		disabled: disabled || readonly,
		onSelectedChange: ({ curr, next }) => {
			value = Array.isArray(next) ? next.map((item) => item.value) : next?.value;
			const original = Array.isArray(curr) ? curr.map((item) => item.value) : curr?.value;
			dispatch('change', { value, original });
			$inputValue = '';
			return next;
		}
	});

	const {
		elements: { root, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		disabled: disabled || readonly,
		editable: editable,
		placeholder: placeholder,
		unique: unique,
		addOnPaste: addOnPaste,
		update: async (tag: Tag) => {
			dispatch('update', { option: { value: tag.id, label: tag.value } });
			return tag;
		},
		remove: async (tag: Tag) => {
			$selected = Array.isArray($selected)
				? $selected.filter((item) => getOptionId(item.value) !== tag.id)
				: undefined;
			return false;
		}
	});

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 450);
	};

	$: $tags = Array.isArray(value)
		? value.map((item) => ({ id: getOptionId(item), value: getOptionLabel(item) }))
		: value
		? [{ id: getOptionId(value), value: getOptionLabel(value) }]
		: [];

	// 从 class 中解析出尺寸档位，下拉菜单据此同步尺寸（菜单是 .combobox 的兄弟节点，拿不到祖先 class）
	$: comboboxSizeClass = (className || '')
		.split(/\s+/)
		.find(
			(c) =>
				c === 'combobox-xs' || c === 'combobox-sm' || c === 'combobox-md' || c === 'combobox-lg'
		);
	$: comboboxMenuSizeClass =
		comboboxSizeClass === 'combobox-xs'
			? 'combobox-menu-xs'
			: comboboxSizeClass === 'combobox-sm'
			? 'combobox-menu-sm'
			: comboboxSizeClass === 'combobox-lg'
			? 'combobox-menu-lg'
			: 'combobox-menu-md';

	$: if (!$open) {
		$inputValue = '';
	}

	// 打字驱动增量搜索：直接读取 $inputValue 使其成为响应式依赖，每次变化都重置防抖
	$: if ($open && $touchedInput) {
		const term = $inputValue;
		debounce(() => {
			dispatch('search', { searchValue: term });
		});
	}
</script>

<div data-element="combobox" data-part="root" class={contextClass}>
	<div
		data-part="input"
		use:melt={$root}
		use:melt={$input}
		data-readonly={readonly || undefined}
		class="combobox {className}{errors?.errors ||
		(errors?.iterms && Object.keys(errors?.iterms).length > 0)
			? ' combobox-invalid'
			: ''} combobox-bordered"
	>
		<div class="flex flex-wrap items-center gap-1 min-w-0">
			{#each $tags as t, index}
				<div
					data-part="tag"
					use:melt={$tag(t)}
					class="badge flex items-center px-2 max-w-full [word-break:break-word] data-[disabled]:hover:cursor-default data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0{errors
						?.iterms?.[index]
						? ' combobox-tag-error'
						: ''}"
				>
					<span data-part="text" class="flex items-center min-w-0 max-w-full truncate">
						{t.value}
					</span>
					<button
						data-part="delete"
						use:melt={$deleteTrigger(t)}
						disabled={disabled || readonly}
						class="flex items-center h-full enabled:hover:bg-black/10"
					>
						<Icon src={XMark} class="size-3" />
					</button>
				</div>
				<div
					data-part="edit"
					use:melt={$edit(t)}
					class="badge flex items-center px-2 overflow-hidden [word-break:break-word] data-[invalid-edit]:focus:text-error"
				>
					{t.value}
				</div>
			{/each}
			{#if !disabled && !readonly && (multiple || value == null)}
				<input
					data-part="search"
					{id}
					bind:value={$inputValue}
					type="text"
					class="min-w-5 shrink grow basis-0 data-[invalid]:text-error"
					on:focus={() => {
						if (!$touchedInput) {
							debounce(() => {
								dispatch('search', { searchValue: undefined });
							});
						}
					}}
					{name}
					{placeholder}
					{disabled}
					{readonly}
				/>
			{/if}
		</div>
		<div data-part="icon" class="w-4 flex items-center justify-center z-[{zIndex + 9}]">
			{#if $open && !disabled && !readonly}
				<Icon src={ChevronUp} data-part="icon-up" class="size-4" />
			{:else}
				<Icon src={ChevronDown} data-part="icon-down" class="size-4" />
			{/if}
		</div>
	</div>
</div>
{#if $open && !disabled && !readonly}
	<ul
		data-part="menu"
		class="menu combobox-menu {comboboxMenuSizeClass} z-[{zIndex + 9}] mt-1"
		use:melt={$menu}
		transition:fade={{ duration: 100 }}
	>
		{#if loading}
			<li data-part="loading">
				<Loading />
			</li>
		{:else if options}
			{#each options.filter((option) => !option.hidden) as op}
				{#if op.options}
					<div data-part="group" use:melt={$group(op.value)}>
						<div
							data-part="group-label"
							class="py-1 px-4 font-semibold capitalize text-neutral"
							use:melt={$groupLabel(op.label)}
						>
							{op.label}
						</div>
						{#each op.options?.filter((option) => !option.hidden) as children}
							<li
								data-part="option"
								use:melt={$option({
									value: { ...children, parent: op },
									label: children.label
								})}
							>
								<!-- svelte-ignore a11y-missing-attribute -->
								<a data-part="option-link" class="flex truncate">
									{#if $isSelected({ ...children, parent: op })}
										<Icon data-part="icon-selected" src={Check} class="size-4" />
									{:else}
										<div class="size-4" />
									{/if}
									{children.label}
								</a>
							</li>
						{:else}
							<li>
								<Empty />
							</li>
						{/each}
					</div>
				{:else}
					<li
						data-part="option"
						use:melt={$option({
							value: op,
							label: op.label
						})}
					>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a data-part="option-link" class="flex truncate">
							{#if $isSelected(op)}
								<Icon data-part="icon-selected" src={Check} class="size-4" />
							{:else}
								<div class="size-4" />
							{/if}
							{op.label}
						</a>
					</li>
				{/if}
			{:else}
				<li data-part="empty">
					<Empty />
				</li>
			{/each}
		{/if}
	</ul>
{/if}
{#if errors?.errors}
	<label data-part="label" for={id} class="label">
		{#each errors.errors as error}
			<span data-part="label-text-alt" class="label-text-alt">
				<p data-part="label-text" class="text-error">{error.message}</p>
			</span>
		{/each}
	</label>
{/if}

<style>
	/* =========================================================================
	   Combobox 组件样式（自包含，随组件 import 自动注入）
	   - 全部使用 :global() 以暴露 combobox-* 公开 class API 并避免被 Svelte 裁剪
	   - 采用 DaisyUI 主题变量（--bc/--b1/--b2/--p…），自动跟随主题
	   - 状态分支由 melt-ui 的 data-attribute 驱动
	   ========================================================================= */

	/* —— 基础（默认对齐 DaisyUI input md，但用 min-height 以支持多选 chip 换行）—— */
	:global(.combobox) {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.25rem;
		min-height: 3rem;
		padding: 0.375rem 1rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		cursor: text;
		border: 1px solid hsl(var(--bc) / 0);
		background-color: hsl(var(--b1) / 1);
		border-radius: var(--rounded-btn, 0.5rem);
	}
	/* 聚焦（下拉打开时搜索框获焦，focus-within 同时充当 open 视觉反馈） */
	:global(.combobox:focus-within) {
		outline: 2px solid hsl(var(--bc) / 0.2);
		outline-offset: 2px;
	}
	/* 禁用 —— melt 在容器上写入 data-disabled；用 :not([data-readonly]) 把「变灰」限定为真 disabled，
	   readonly 虽同样进入 melt 的 disabled（以拦截键盘删 chip 等编辑），但外观保持正常 */
	:global(.combobox[data-disabled]:not([data-readonly])) {
		cursor: not-allowed;
		border-color: hsl(var(--b2) / 1);
		background-color: hsl(var(--b2) / 1);
		color: hsl(var(--bc) / 0.4);
	}
	/* 禁用时 chip 一并变暗，避免满色 chip 浮在灰底上的不一致 */
	:global(.combobox[data-disabled]:not([data-readonly]) [data-part='tag']) {
		opacity: 0.5;
	}
	/* 校验失败 —— melt tags-input 写入 data-invalid / data-invalid-edit */
	:global(.combobox[data-invalid]) {
		border-color: hsl(var(--er) / 1);
	}
	:global(.combobox[data-invalid]:focus-within),
	:global(.combobox[data-invalid-edit]:focus-within) {
		outline-color: hsl(var(--er) / 1);
	}

	/* —— variant —— */
	:global(.combobox-bordered) {
		border-color: hsl(var(--bc) / 0.2);
	}
	:global(.combobox-ghost) {
		background-color: hsl(var(--bc) / 0.05);
	}
	:global(.combobox-ghost:focus-within) {
		background-color: hsl(var(--b1) / 1);
	}
	:global(.combobox-primary) {
		border-color: hsl(var(--p) / 1);
	}
	:global(.combobox-primary:focus-within) {
		outline-color: hsl(var(--p) / 1);
	}
	:global(.combobox-secondary) {
		border-color: hsl(var(--s) / 1);
	}
	:global(.combobox-secondary:focus-within) {
		outline-color: hsl(var(--s) / 1);
	}
	:global(.combobox-accent) {
		border-color: hsl(var(--a) / 1);
	}
	:global(.combobox-accent:focus-within) {
		outline-color: hsl(var(--a) / 1);
	}
	:global(.combobox-info) {
		border-color: hsl(var(--in) / 1);
	}
	:global(.combobox-info:focus-within) {
		outline-color: hsl(var(--in) / 1);
	}
	:global(.combobox-success) {
		border-color: hsl(var(--su) / 1);
	}
	:global(.combobox-success:focus-within) {
		outline-color: hsl(var(--su) / 1);
	}
	:global(.combobox-warning) {
		border-color: hsl(var(--wa) / 1);
	}
	:global(.combobox-warning:focus-within) {
		outline-color: hsl(var(--wa) / 1);
	}
	:global(.combobox-error) {
		border-color: hsl(var(--er) / 1);
	}
	:global(.combobox-error:focus-within) {
		outline-color: hsl(var(--er) / 1);
	}
	/* 校验错误「状态」（由 errors prop 驱动）：仅红边框，保留尺寸/variant，不整体染红 chip */
	:global(.combobox.combobox-invalid) {
		border-color: hsl(var(--er) / 1);
	}
	:global(.combobox.combobox-invalid:focus-within) {
		outline-color: hsl(var(--er) / 1);
	}

	/* —— size（min-height + padding + font-size，对齐 DaisyUI input 各档）—— */
	:global(.combobox-xs) {
		min-height: 1.5rem;
		padding: 0.0625rem 0.5rem;
		font-size: 0.75rem;
		gap: 0.125rem;
	}
	:global(.combobox-sm) {
		min-height: 2rem;
		padding: 0.125rem 0.75rem;
		font-size: 0.875rem;
	}
	:global(.combobox-md) {
		min-height: 3rem;
		padding: 0.375rem 1rem;
		font-size: 0.875rem;
	}
	:global(.combobox-lg) {
		min-height: 4rem;
		padding: 0.5rem 1.5rem;
		font-size: 1.125rem;
	}
	/* chip 基础（md）：固定高度 + 裁剪内部背景，避免文字把中段撑高、与两端不一致；
	   颜色默认 neutral，并由下方 variant 规则覆盖。
	   data-part='edit' 是 editable 模式下 melt 用来替换 tag 的可编辑元素，外观与 tag 完全对齐 */
	:global(.combobox [data-part='tag']),
	:global(.combobox [data-part='edit']) {
		height: 1.25rem;
		padding-top: 0;
		padding-bottom: 0;
		overflow: hidden;
		border-color: transparent;
		background-color: hsl(var(--n) / 1);
		color: hsl(var(--nc) / 1);
	}
	/* chip 内部文本/分隔与删除按钮撑满 chip 高度并居中 */
	:global(.combobox [data-part='tag'] [data-part='text']),
	:global(.combobox [data-part='tag'] [data-part='delete']) {
		height: 100%;
	}
	/* text 与删除按钮间的分隔线：用 currentColor 混合，保证各 variant 下都可见 */
	:global(.combobox [data-part='tag'] [data-part='text']) {
		border-right: 1px solid color-mix(in srgb, currentColor 25%, transparent);
	}
	/* chip 随尺寸缩放（tag 与 edit 同步） */
	:global(.combobox-xs [data-part='tag']),
	:global(.combobox-xs [data-part='edit']),
	:global(.combobox-sm [data-part='tag']),
	:global(.combobox-sm [data-part='edit']) {
		height: 1rem;
		font-size: 0.75rem;
	}
	:global(.combobox-lg [data-part='tag']),
	:global(.combobox-lg [data-part='edit']) {
		height: 1.75rem;
		font-size: 1rem;
	}

	/* —— chip 颜色跟随 variant（与 combobox-* 同色系，tag 与 edit 同步）—— */
	:global(.combobox-primary [data-part='tag']),
	:global(.combobox-primary [data-part='edit']) {
		background-color: hsl(var(--p) / 1);
		color: hsl(var(--pc) / 1);
	}
	:global(.combobox-secondary [data-part='tag']),
	:global(.combobox-secondary [data-part='edit']) {
		background-color: hsl(var(--s) / 1);
		color: hsl(var(--sc) / 1);
	}
	:global(.combobox-accent [data-part='tag']),
	:global(.combobox-accent [data-part='edit']) {
		background-color: hsl(var(--a) / 1);
		color: hsl(var(--ac) / 1);
	}
	:global(.combobox-info [data-part='tag']),
	:global(.combobox-info [data-part='edit']) {
		background-color: hsl(var(--in) / 1);
		color: hsl(var(--inc) / 1);
	}
	:global(.combobox-success [data-part='tag']),
	:global(.combobox-success [data-part='edit']) {
		background-color: hsl(var(--su) / 1);
		color: hsl(var(--suc) / 1);
	}
	:global(.combobox-warning [data-part='tag']),
	:global(.combobox-warning [data-part='edit']) {
		background-color: hsl(var(--wa) / 1);
		color: hsl(var(--wac) / 1);
	}
	:global(.combobox-error [data-part='tag']),
	:global(.combobox-error [data-part='edit']) {
		background-color: hsl(var(--er) / 1);
		color: hsl(var(--erc) / 1);
	}
	/* 单个 chip 校验失败（优先级高于 variant，始终红色） */
	:global(.combobox [data-part='tag'].combobox-tag-error) {
		background-color: hsl(var(--er) / 1);
		color: hsl(var(--erc) / 1);
	}
	/* chip 处于选中/编辑态（melt 写入 data-selected） */
	:global(.combobox [data-part='tag'][data-selected]) {
		filter: brightness(0.9);
	}

	/* —— 搜索输入：完全自包含（不再依赖 DaisyUI .input），透明背景 + 字号跟随尺寸 —— */
	:global(.combobox [data-part='search']) {
		padding: 0;
		border: none;
		border-radius: 0;
		outline: none;
		background-color: transparent;
		color: hsl(var(--bc) / 1);
		font-size: inherit;
		line-height: inherit;
		height: auto;
	}
	:global(.combobox [data-part='search']:focus) {
		outline: none;
		box-shadow: none;
		background-color: transparent;
	}
	/* placeholder 与 DaisyUI input 一致（不再依赖 .input 的浏览器默认灰） */
	:global(.combobox [data-part='search']::placeholder) {
		color: hsl(var(--bc) / 0.4);
	}

	/* —— 右侧箭头图标：跟随尺寸缩放（与 chip / 搜索字号 / 菜单一致）—— */
	:global(.combobox-xs [data-part='icon']),
	:global(.combobox-sm [data-part='icon']) {
		width: 0.875rem;
	}
	:global(.combobox-xs [data-part='icon'] svg),
	:global(.combobox-sm [data-part='icon'] svg) {
		width: 0.875rem;
		height: 0.875rem;
	}
	:global(.combobox-lg [data-part='icon']) {
		width: 1.25rem;
	}
	:global(.combobox-lg [data-part='icon'] svg) {
		width: 1.25rem;
		height: 1.25rem;
	}

	/* —— 下拉菜单（保留 DaisyUI .menu 基类，叠加 combobox 专属）—— */
	:global(.combobox-menu) {
		width: 100%;
		max-height: 20rem;
		flex-wrap: nowrap;
		overflow-y: auto;
		background-color: hsl(var(--b1) / 1);
		border-radius: var(--rounded-box, 0.5rem);
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
	}
	/* 键盘/指针高亮 —— melt 在 <li> 上写入 data-highlighted */
	:global(.combobox-menu li[data-highlighted] > a) {
		background-color: hsl(var(--bc) / 0.1);
	}
	/* 已选 —— melt data-selected */
	:global(.combobox-menu li[data-selected] > a) {
		font-weight: 600;
	}
	/* 禁用选项 —— melt data-disabled */
	:global(.combobox-menu li[data-disabled]) {
		opacity: 0.5;
		pointer-events: none;
	}

	/* —— 下拉菜单尺寸跟随 combobox 尺寸（字号 + 选项 padding，对齐各档 input）—— */
	:global(.combobox-menu-xs) {
		font-size: 0.75rem;
	}
	:global(.combobox-menu-xs li > a) {
		padding: 0.2rem 0.5rem;
	}
	:global(.combobox-menu-sm) {
		font-size: 0.8125rem;
	}
	:global(.combobox-menu-sm li > a) {
		padding: 0.3rem 0.75rem;
	}
	:global(.combobox-menu-md) {
		font-size: 0.875rem;
	}
	:global(.combobox-menu-md li > a) {
		padding: 0.5rem 1rem;
	}
	:global(.combobox-menu-lg) {
		font-size: 1.125rem;
	}
	:global(.combobox-menu-lg li > a) {
		padding: 0.75rem 1.5rem;
	}
	/* 选项左侧勾选图标/占位随尺寸缩放，与文字基线对齐 */
	:global(.combobox-menu-xs li > a > :first-child),
	:global(.combobox-menu-sm li > a > :first-child) {
		width: 0.875rem;
		height: 0.875rem;
	}
	:global(.combobox-menu-lg li > a > :first-child) {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
