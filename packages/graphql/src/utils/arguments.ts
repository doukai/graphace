export const buildArguments = <T>(args: any): T | undefined => {
    if (Array.isArray(args)) {
        const arr = args.map(arg => buildArguments(arg)).filter(arg => arg !== undefined);
        if (arr && arr.length > 0) {
            return <T>arr;
        }
        return undefined;
    } else if (typeof args === 'object') {
        if (args.opr &&
            !(args.val !== null && args.val !== undefined ||
                (args.arr && args.arr.length > 0) ||
                args.opr === 'NIL' ||
                args.opr === 'NNIL')) {
            return undefined;
        } else {
            const obj = Object.fromEntries(
                Object.entries(args)
                    .map(([k, v]: [string, any]) => [k, buildArguments(v)])
                    .filter(([_, v]) => v !== undefined)
            )
            if (obj && Object.values(obj).length > 0) {
                return obj;
            }
            return undefined;
        }
    } else {
        return args;
    }
};

export const hasArguments = (args: any): boolean => args && Object.values(args).some(
    (v: any) =>
        v &&
        (v.val !== null && v.val !== undefined ||
            (v.arr && v.arr.length > 0) ||
            v.opr === 'NIL' ||
            v.opr === 'NNIL' ||
            typeof v === 'object' && Object.values(v).some((v: any) => hasArguments(v)))
);