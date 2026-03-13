export type Directive = {
    name: string;
    args?: Record<string, Record<string, any>> | undefined;
}