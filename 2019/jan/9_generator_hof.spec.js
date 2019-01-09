// generator or iterator 를 다루는 추상화로 고차 함수들 작성
const should = require('should');

const map = function* (f, iter) {
    for (const x of iter) yield f(x);
};

const filter = function* (f, iter) {
    for (const x of iter) if (f(x)) yield x;
};

const reduce = function (f, init, coll) {
    if (arguments.length == 2) {
        coll = init[Symbol.iterator]();
        init = coll.next().value;
    }
    let acc = init;
    for (const x of coll) acc = f(acc, x);
    return acc;
};

// tests

// map test

describe('Map test', () => {
    const arr = [1, 2, 3, 4, 5];
    const add1 = a => a + 1;

    it('result should have symbol iterator', () => {
        should(map(add1, arr)).properties([Symbol.iterator]);
    });

    it('result should added1', () => {
        should([...map(add1, arr)]).deepEqual([2, 3, 4, 5, 6]);
    });

    it('result should lazily evaluated', () => {
        let i = 0;
        const id_SE = (a) => {
            i += 1;
            return a;
        };

        const result = map(id_SE, arr);
        should(i).equal(0);
        const flatted = [...result];
        should(i).equal(5);
    });
});

describe('Filter test', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const isEven = n => n % 2 === 0;

    it('result should have symbol iterator', () => {
        should(filter(isEven, arr)).properties([Symbol.iterator]);
    });

    it('result should remained with even', () => {
        should([...filter(isEven, arr)]).deepEqual([2, 4, 6, 8, 10]);
    });

    it('result should lazily evaluated', () => {
        let i = 0;
        const id_SE = (a) => {
            i += 1;
            return a;
        };

        const result = filter(id_SE, arr);
        should(i).equal(0);
        const flatted = [...result];
        should(i).equal(10);
    });
});

describe('Reduce test', () => {
    const arr = [1, 2, 3, 4, 5];
    const add = (a, b) => a + b;

    it('result should equal to 15', () => {
        should(reduce(add, arr)).equal(15);
        should(reduce(add, 0, arr)).equal(15);
    });

    it('should accept iterator', () => {
        const gen = function* () {
            yield* [1, 2, 3, 4, 5];
        };

        should(reduce(add, gen())).equal(15);
        should(reduce(add, 0, gen())).equal(15);
    });
});
