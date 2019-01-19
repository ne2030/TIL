const assert = require('assert');
const {
    map, L, take, pipe, go, flat
} = require('fxjs2');

const curry = f => (...args) => (args.length === 1 ? b => f(args[0], b) : f(...args));

const array = n => Array(n).fill(1);

const matrixCreator = (w, h) => map(() => array(h), array(w));

// const mat = matrixCreator(3, 3);

// assert.deepEqual(mat, [[1, 1, 1], [1, 1, 1], [1, 1, 1]]);

const crossMap = function (f1, a1, a2) {
    if (arguments.length === 1) return (x1, x2) => crossMap(f1, x1, x2);
    const iter = a2[Symbol.iterator]();
    const result = [];
    for (const x of a1) {
        result.push(f1(x, iter.next().value));
    }
    return result;
};

assert.deepEqual(crossMap((a, b) => a + b, [1, 2, 3], [2, 3, 4]), [3, 5, 7]);

const multiply = (x, y) => x * y;
const add = (a, b) => a + b;
const val = k => o => o[k];
const box = v => [v];

const Matrix = {};

Matrix.checkFormat = (m1, m2) => m1.length === m2.length && m1[0].length === m2[0].length;
Matrix.multiply = (m1, m2) => {
    if (!Matrix.checkFormat(m1, m2)) return [];
    return crossMap(crossMap(multiply), m1, m2);
};
Matrix.add = (m1, m2) => {
    if (!Matrix.checkFormat(m1, m2)) return [];
    return crossMap(crossMap(add), m1, m2);
};

Matrix.getCol = curry((n, mat) => go(mat, L.map(val(n - 1)), L.map(box), take(Infinity)));

module.exports = Matrix;
