export const buildArgs = (args: Record<string, unknown> | undefined) => {
    if (!args) {
        return '';
    }

    const entries = Object.entries(args).filter(([, value]) => value !== undefined);
    if (entries.length === 0) {
        return '';
    }

    return `(${entries.map(([arg, value]) => `${arg}: ${buildArg(value)}`).join(', ')})`;
}

export const buildArg = (arg: unknown): string => {
    if (arg === null) {
        return 'null';
    } else if (Array.isArray(arg)) {
        return `[${arg.filter((value) => value !== undefined).map(value => buildArg(value)).join(' ')}]`;
    } else if (typeof arg === 'object') {
        return `{ ${Object.entries(arg).filter(([, value]) => value !== undefined).map(([arg, value]) => `${arg}: ${buildArg(value)}`).join(' ')} }`;
    } else if (typeof arg === 'string' && arg.startsWith('$')) {
        return arg;
    }
    return JSON.stringify(arg);
}