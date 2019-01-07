// codewars
// https://www.codewars.com/kata/53c29a6abb5187180d000b65/train/javascript

// function factorialSeq() {...} // 1, 1, 2, 6, 24, ...
// function fibonacciSeq() {...} // 1, 1, 2, 3, 5, 8, 13, ...
// function rangeSeq(start, step) {...} // rangeSeq(1, 2)  -> 1, 3, 5, 7, ...
// function primeSeq() {...} // 2, 3, 5, 7, 11, 13, ...
// partialSumSeq(1, 3, 7, 2, 0) {...} // 1, 4, 11, 13, 13, end


function generator(sequencer, ...rest) {
    return {
        next: sequencer(...rest)
    }
}

function dummySeq() {
    return function () {
        return "dummy";
    };
}

function factorialSeq() {
    let i = 0;
    let memo = 1;
    let isFirst = true;
    return () => {
        if (isFirst) return isFirst = false, 1;
        return i += 1, memo *= i;
    }
}

function fibonacciSeq() {
    let x = 0;
    let y = 0;
    return () => {
        if (x == 0) return ++x;
        if (y == 0) return ++y;
        [x, y] = [y, x + y]
        return y;
    }
}

function rangeSeq(start, step) {
    let prev = start - step;
    return () => prev += step
}

const last = coll => coll[coll.length - 1];
const find = (f, coll) => coll.find(f)
const divide = a => b => a % b === 0
const negate = a => !a;
const filter = (f, coll) => coll.filter(f)
const isNone = coll => coll.length === 0;

function primeSeq() {
    const primes = [2];
    const isPrime = (n, coll) => isNone(filter(divide(n), coll));
    let isFirst = true;
    return () => {
        if (isFirst) return isFirst = false, 2;
        let start = last(primes);
        while (start++) {
            if (isPrime(start, primes)) return primes.push(start), start;
        }
    }
}

function partialSumSeq(...ns) {
    let acc = 0;
    let i = 0;
    let end = ns.length;
    return () => {
        if (i >= end) throw new Error('err')
        return acc += ns[i++]
    }
}

// const seq = generator(rangeSeq, 1, 2)
const seq = generator(partialSumSeq, 1, 3, 7, 2, 0)

console.log(
    seq.next(),
    seq.next(),
    seq.next(),
    seq.next(),
    seq.next(),
    seq.next(),
    seq.next(),
    seq.next(),
    seq.next(),
    seq.next(),

);
