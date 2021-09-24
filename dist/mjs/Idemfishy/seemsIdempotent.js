const _seemsIdempotent = (kwargs) => {
    return Array(kwargs.width).fill(null).reduce((last) => {
        const args = kwargs.argGenerator();
        const falseSymbol = Symbol();
        const first = kwargs.func(...args);
        return last && Array(kwargs.depth).fill(null).reduce((last) => {
            const { lastValue, flag } = last;
            const currentValue = kwargs.func(lastValue);
            return {
                lastValue: currentValue,
                flag: lastValue === currentValue
            };
        }, {
            lastValue: kwargs.func(...args),
            flag: true
        }).flag;
    }, true); // start with the assumption that it is idempotent
};
/**
 *
 * @param kwargs Keyword arguments containing the
 * @returns
 */
export const seemsIdempotent = (kwargs) => {
    return _seemsIdempotent({
        ...kwargs,
        width: kwargs.width ? kwargs.width : 100,
        depth: kwargs.depth ? kwargs.depth : 100,
        toleranceFunc: kwargs.toleranceFunc ? kwargs.toleranceFunc :
            (a, b) => a === b
    });
};
