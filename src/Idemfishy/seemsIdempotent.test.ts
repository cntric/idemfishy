import { seemsIdempotent } from "./seemsIdempotent";
import {withPrecision} from "tulleries";

export const CheckOrderTestSuiteA = ()=>{

    describe("Basic functionality", ()=>{

        test("Detects probable idempotence", ()=>{

            const func = (a : number)=>0;

            const generator = () : [number]=>[
                Math.random() * Number.MAX_SAFE_INTEGER
            ]

            const i = Math.floor(Math.random() * 900) + 100;
            
            const isDeterministic = Array(i).fill(null).reduce((last)=>{

                return last && seemsIdempotent({
                    func : func, 
                    argGenerator : generator,
                    width : Math.floor(Math.random() * 100) + 10,
                    depth : Math.floor(Math.random() * 100) + 10,
                    toleranceFunc: withPrecision()
                })

            }, true)

            expect(isDeterministic).toBe(true);
   
        })

        test("Detects non-idempotence", ()=>{

            const func = (a : number, b : number)=>a+b;

            const generator = () : [number, number]=>[
                Math.random() * Number.MAX_SAFE_INTEGER,
                Math.random() * Number.MAX_SAFE_INTEGER
            ]

            const i = Math.floor(Math.random() * 900) + 100;
            
            const isDeterministic = Array(i).fill(null).reduce((last)=>{

                return last && seemsIdempotent({
                    func : func, 
                    argGenerator : generator,
                    width : Math.floor(Math.random() * 100) + 10,
                    depth : Math.floor(Math.random() * 100) + 10,
                    toleranceFunc : withPrecision()
                })

            }, true)

            expect(isDeterministic).toBe(false);

        })

        test("Autogenerates width, depth, and tolerance", ()=>{

            const func = (a : number, b : number)=>a+b;

            const generator = () : [number, number]=>[
                Math.random() * Number.MAX_SAFE_INTEGER,
                Math.random() * Number.MAX_SAFE_INTEGER
            ]

            const i = Math.floor(Math.random() * 900) + 100;
            
            const isDeterministic = Array(i).fill(null).reduce((last)=>{

                return last && seemsIdempotent({
                    func : func, 
                    argGenerator : generator
                })

            }, true)

            expect(isDeterministic).toBe(false);
        })

    })

}; CheckOrderTestSuiteA();