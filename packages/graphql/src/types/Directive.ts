export type Directive = {
    name: string;
    args?: Record<string, unknown> | undefined;
}

export function include(params?: { if?: boolean | string | undefined } | undefined): Directive {
    return {
        name: 'include',
        args: { ...params }
    }
}

export function skip(params?: { if?: boolean | string | undefined } | undefined): Directive {
    return {
        name: 'skip',
        args: { ...params }
    }
}

export function format(params?: { value?: string | undefined; locale?: string | undefined; } | undefined): Directive {
    return {
        name: 'format',
        args: { ...params }
    }
}

export function merge(): Directive {
    return {
        name: 'merge'
    }
}

export function uniqueMerge(): Directive {
    return {
        name: 'uniqueMerge'
    }
}