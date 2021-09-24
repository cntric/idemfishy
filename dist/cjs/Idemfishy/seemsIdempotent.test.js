"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckOrderTestSuiteA = void 0;
const seemsIdempotent_1 = require("./seemsIdempotent");
const tulleries_1 = require("tulleries");
const CheckOrderTestSuiteA = () => {
    describe("Basic functionality", () => {
        test("Detects probable idempotence", () => {
            const func = (a) => 0;
            const generator = () => [
                Math.random() * Number.MAX_SAFE_INTEGER
            ];
            const i = Math.floor(Math.random() * 900) + 100;
            const isDeterministic = Array(i).fill(null).reduce((last) => {
                return last && (0, seemsIdempotent_1.seemsIdempotent)({
                    func: func,
                    argGenerator: generator,
                    width: Math.floor(Math.random() * 100) + 10,
                    depth: Math.floor(Math.random() * 100) + 10,
                    toleranceFunc: (0, tulleries_1.withPrecision)()
                });
            }, true);
            expect(isDeterministic).toBe(true);
        });
        test("Detects non-idempotence", () => {
            const func = (a, b) => a + b;
            const generator = () => [
                Math.random() * Number.MAX_SAFE_INTEGER,
                Math.random() * Number.MAX_SAFE_INTEGER
            ];
            const i = Math.floor(Math.random() * 900) + 100;
            const isDeterministic = Array(i).fill(null).reduce((last) => {
                return last && (0, seemsIdempotent_1.seemsIdempotent)({
                    func: func,
                    argGenerator: generator,
                    width: Math.floor(Math.random() * 100) + 10,
                    depth: Math.floor(Math.random() * 100) + 10,
                    toleranceFunc: (0, tulleries_1.withPrecision)()
                });
            }, true);
            expect(isDeterministic).toBe(false);
        });
        test("Autogenerates width, depth, and tolerance", () => {
            const func = (a, b) => a + b;
            const generator = () => [
                Math.random() * Number.MAX_SAFE_INTEGER,
                Math.random() * Number.MAX_SAFE_INTEGER
            ];
            const i = Math.floor(Math.random() * 900) + 100;
            const isDeterministic = Array(i).fill(null).reduce((last) => {
                return last && (0, seemsIdempotent_1.seemsIdempotent)({
                    func: func,
                    argGenerator: generator
                });
            }, true);
            expect(isDeterministic).toBe(false);
        });
    });
};
exports.CheckOrderTestSuiteA = CheckOrderTestSuiteA;
(0, exports.CheckOrderTestSuiteA)();
