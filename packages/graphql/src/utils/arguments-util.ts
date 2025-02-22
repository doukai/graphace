export const buildArguments = <T>(args: any): T => <T>Object.fromEntries(
    Object.entries(args)
        .filter(
            ([_, v]: [string, any]) =>
                v &&
                (v.val ||
                    (v.arr && v.arr.length > 0) ||
                    v.opr === 'NIL' ||
                    v.opr === 'NNIL' ||
                    Object.values(v).some(
                        (v: any) =>
                            v && (v.val || (v.arr && v.arr.length > 0) || v.opr == 'NIL' || v.opr === 'NNIL')
                    ))
        )
        .map(([k, v]: [string, any]) => {
            if (v && (v.val || (v.arr && v.arr.length > 0) || v.opr === 'NIL' || v.opr === 'NNIL')) {
                return [k, v];
            } else if (v) {
                return [
                    k,
                    Object.fromEntries(
                        Object.entries(v).filter(
                            ([_, v]: [string, any]) =>
                                v &&
                                (v.val || (v.arr && v.arr.length > 0) || v.opr === 'NIL' || v.opr === 'NNIL')
                        )
                    )
                ];
            }
            return [k, v];
        })
);

export const hasArguments = (args: any): boolean => Object.values(args).some(
    (v: any) =>
        v &&
        (v.val ||
            (v.arr && v.arr.length > 0) ||
            v.opr == 'NIL' ||
            v.opr === 'NNIL' ||
            Object.values(v).some(
                (v: any) =>
                    v && (v.val || (v.arr && v.arr.length > 0) || v.opr == 'NIL' || v.opr === 'NNIL')
            ))
);