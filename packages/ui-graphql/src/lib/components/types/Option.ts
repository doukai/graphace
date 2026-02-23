export type Option<T, R> = {
    readonly?: ((value?: T | undefined) => boolean) | undefined;
    disabled?: ((value?: T | undefined) => boolean) | undefined;
    hidden?: ((value?: T | undefined) => boolean | undefined);
    hiddenCol?: ((args: R, tab: any) => boolean | undefined);
    required?: ((value?: T | undefined) => boolean) | undefined;
    validate?: ((value: T) => Promise<string[]>) | undefined;
    onChange?: ((fieldValue: any, value?: T | null | undefined) => Promise<T | null | undefined>) | undefined;
    props?: ((value?: T | undefined) => Record<string, Record<string, any>>) | undefined;
}