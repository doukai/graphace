export const buildArguments = <T>(args: T): T | undefined => {
    if (Array.isArray(args)) {
        const arr = args.map(arg => buildArguments(arg)).filter(arg => arg != null);
        if (arr.length) {
            return <T>arr;
        }
        return undefined;
    } else if (args != null && typeof args === 'object') {
        if ('opr' in args && args.opr &&
            !(
                'val' in args && args.val != null ||
                'arr' in args && Array.isArray(args.arr) && args.arr.length ||
                args.opr === 'NIL' ||
                args.opr === 'NNIL'
            )
        ) {
            return undefined;
        } else {
            const obj = Object.fromEntries(
                Object.entries(args)
                    .map(([k, v]) => [k, buildArguments(v)])
                    .filter(([_, v]) => v !== undefined)
            )
            if (Object.keys(obj).length) {
                return obj;
            }
            return undefined;
        }
    }
    return args;
};

export const hasArguments = (args: unknown): boolean => args != null &&
    Object.values(args)
        .some(
            (v) =>
                v &&
                (typeof v === 'object' &&
                    (
                        'val' in v && v.val != null ||
                        'arr' in v && Array.isArray(v.arr) && v.arr.length ||
                        'opr' in v && v.opr === 'NIL' ||
                        'opr' in v && v.opr === 'NNIL' ||
                        Object.values(v).some((v) => hasArguments(v))
                    )
                )
        );