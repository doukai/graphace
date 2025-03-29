export const buildArguments = <T>(args: any): T => <T>Object.fromEntries(
    Object.entries(args)
        .map(([k, v]: [string, any]) => {
            if (Array.isArray(v)) {
                const args = v.map(item => typeof item === 'object' ? buildArguments(item) : item).filter(item => item !== undefined);
                if (args && args.length > 0) {
                    return [k, args];
                }
                return [k, undefined];
            } else if (typeof v === 'object') {
                const args = buildArguments(v);
                if (args && Object.values(args).filter(arg => arg !== undefined).length > 0) {
                    return [k, args];
                }
                return [k, undefined];
            }
            return [k, v];
        })
        .filter(([_, v]) => v !== undefined)
);

export const hasArguments = (args: any): boolean => args && Object.values(args).some(
    (v: any) =>
        v &&
        (v.val ||
            (v.arr && v.arr.length > 0) ||
            v.opr === 'NIL' ||
            v.opr === 'NNIL' ||
            typeof v === 'object' && Object.values(v).some((v: any) => hasArguments(v)))
);