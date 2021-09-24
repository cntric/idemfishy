export interface ArgGeneratorI<T extends any[]> {
    () : T
}

export interface ToleranceFuncI<R extends any>{
    (a : R, b : R) : boolean
}

export interface _isLikelyIdempotentKwargsI<F extends (...args : any[])=>any> {
    /**The function to be checked. */
    func : F,
    /**A function that will generate args for the function being checked. */
    argGenerator : ArgGeneratorI<Parameters<F>>,
    /**The explore width of the the idempotence check. (How many new sets of args will be passed.) */
    width : number,
    /**The explore depth of the the idempotence check. (How many times a function and a set of args will be checked.) */
    depth : number,
    toleranceFunc : ToleranceFuncI<ReturnType<F>>
}

const _seemsIdempotent= <F extends (...args : any[])=>any>(
    kwargs :_isLikelyIdempotentKwargsI<F>
) : boolean =>{

    return Array(kwargs.width).fill(null).reduce((last)=>{

        const args = kwargs.argGenerator();

        const falseSymbol = Symbol();
        const first = kwargs.func(...args)

        return last && Array(kwargs.depth).fill(null).reduce<
            {
                lastValue : ReturnType<F>,
                flag : boolean
            }
        >((last)=>{

            const {
                lastValue,
                flag
            } = last;

            const currentValue = kwargs.func(lastValue)

            return {
                lastValue : currentValue,
                flag : lastValue === currentValue
            }

        }, {
            lastValue : kwargs.func(...args),
            flag : true
        }).flag


    }, true) // start with the assumption that it is idempotent

}

export interface isLikelyIdempotentKwargsI<F extends (...args : any[])=>any> {
    /**The function to be checked. */
    func : F,
    /**A function that will generate args for the function being checked. */
    argGenerator : ArgGeneratorI<Parameters<F>>,
    /**The explore width of the the idempotence check. (How many new sets of args will be passed.) */
    width? : number,
    /**The explore depth of the the idempotence check. (How many times a function and a set of args will be checked.) */
    depth? : number,
    toleranceFunc? : ToleranceFuncI<ReturnType<F>>
}

/**
 * 
 * @param kwargs Keyword arguments containing the 
 * @returns 
 */
export const seemsIdempotent = <F extends (...args : any[])=>any>(
    kwargs : isLikelyIdempotentKwargsI<F>
) : boolean =>{

    return _seemsIdempotent({
        ...kwargs,
        width : kwargs.width ? kwargs.width : 100,
        depth : kwargs.depth ? kwargs.depth : 100,
        toleranceFunc : kwargs.toleranceFunc ? kwargs.toleranceFunc :
                            (a : ReturnType<F>, b : ReturnType<F>)=>a === b
    })

}