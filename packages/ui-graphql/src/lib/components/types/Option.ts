export type Option<L, V, R, F, A, P> = {
    readonly?: ((value?: V | undefined, fieldArg?: A) => boolean) | undefined;
    disabled?: ((value?: V | undefined, fieldArg?: A) => boolean) | undefined;
    hidden?: ((value?: V | undefined, fieldArg?: A) => boolean | undefined);
    hiddenCol?: ((args: R, tab?: string | undefined, fieldArg?: A) => boolean | undefined);
    required?: ((value?: V | undefined) => boolean) | undefined;
    validate?: (($LL: L, value: V) => Promise<string[]>) | undefined;
    onChange?: (($LL: L, fieldValue: F, value?: V | null | undefined, fieldArg?: A) => Promise<V | null | undefined>) | undefined;
    props?: (($LL: L, value?: V | undefined, fieldArg?: A) => P) | undefined;
};