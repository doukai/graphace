export const buildArguments = <T>(args: T): T | undefined => {
    if (Array.isArray(args)) {
        return <T>args.map(arg => buildArguments(arg)).filter(arg => arg != null);
    } else if (args != null && typeof args === 'object') {
        if ('opr' in args && args.opr &&
            !(
                'val' in args && args.val != null ||
                'arr' in args && Array.isArray(args.arr) ||
                args.opr === 'NIL' ||
                args.opr === 'NNIL'
            )
        ) {
            return undefined;
        } else if ('opr' in args && args.opr &&
            !(args.opr === 'IN' ||
                args.opr === 'NIN' ||
                args.opr === 'BT' ||
                args.opr === 'NBT') &&
            'arr' in args && Array.isArray(args.arr)
        ) {
            if ('val' in args && args.val != null) {
                return { ...args, arr: undefined };
            }
            return undefined;
        } else if ('opr' in args && args.opr &&
            (args.opr === 'IN' ||
                args.opr === 'NIN' ||
                args.opr === 'BT' ||
                args.opr === 'NBT') &&
            'val' in args && args.val != null
        ) {
            if ('arr' in args && Array.isArray(args.arr)) {
                return { ...args, val: undefined };
            }
            return undefined;
        } else if ('opr' in args && args.opr && (args.opr === 'LK' || args.opr === 'NLK') &&
            'val' in args && args.val
        ) {
            return { ...args, val: `%${args.val}%` };
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

export const hasArguments = (args: unknown): boolean => typeof args === 'object' && args != null &&
    (
        'val' in args && args.val != null ||
        'arr' in args && Array.isArray(args.arr) ||
        'opr' in args && args.opr === 'NIL' ||
        'opr' in args && args.opr === 'NNIL' ||
        Object.values(args).some((v) => hasArguments(v))
    );

export const hasAsc = (orderBy: unknown): boolean => orderBy === 'ASC' ||
    typeof orderBy === 'object' && orderBy != null && Object.values(orderBy).some((v) => hasAsc(v));

export const hasDesc = (orderBy: unknown): boolean => orderBy === 'DESC' ||
    typeof orderBy === 'object' && orderBy != null && Object.values(orderBy).some((v) => hasDesc(v));