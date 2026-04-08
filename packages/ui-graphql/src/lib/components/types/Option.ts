export type Option<L, V, R, F, A, P, S> = {
    readonly?: ((value?: V | undefined, fieldArg?: A) => boolean) | undefined;
    disabled?: ((value?: V | undefined, fieldArg?: A) => boolean) | undefined;
    hidden?: ((value?: V | undefined, tab?: string | undefined, fieldArg?: A) => boolean | undefined) | undefined;
    hiddenCol?: ((args: R, tab?: string | undefined, fieldArg?: A) => boolean | undefined) | undefined;
    hiddenFilter?: ((args: R, fieldArg?: A) => boolean | undefined) | undefined;
    required?: ((value?: V | undefined) => boolean) | undefined;
    validate?: (($LL: L, value: V) => Promise<string[]>) | undefined;
    onChange?: (($LL: L, fieldValue: F, value?: V | null | undefined, fieldArg?: A) => Promise<V | null | undefined>) | undefined;
    props?: (($LL: L, value?: V | undefined, fieldArg?: A) => P) | undefined;
    toString?: (($LL: L, value?: V | null | undefined, fieldArg?: A) => string) | undefined;
    toFields?: ((fieldArg?: A) => S) | undefined;
    toRecord?: (($LL: L, fields: S, title: string, value?: V | null | undefined, fieldArg?: A) => Record<string, string | null | undefined>) | undefined;
    fromRecord?: (($LL: L, fields: S | undefined, title: string, record?: Record<string, string | null | undefined>, fieldArg?: A) => F) | undefined;
    title?: (($LL: L, fieldArg?: A) => string) | undefined;
    fields?: ((value?: V | null | undefined, fieldArg?: A) => S) | undefined;
};