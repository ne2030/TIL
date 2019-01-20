const assert = require('assert');

// In number theory and combinatorics, a partition of a positive integer n, also called an integer partition,
// is a way of writing n as a sum of positive integers. Two sums that differ only in the order of their
// summands are considered the same partition. If order matters, the sum becomes a composition.
// For example, 4 can be partitioned in five distinct ways:

// all 1 => 1
// 2 = a + b == r
// n - 2 // 2 H r-2

// r - 1 C r-2
// n : n H r - n == r - 1 C r - n

const factorial = (n, to = 1) => {
    let result = 1;
    while (n >= to) {
        result *= n;
        n -= 1;
    }
    return result;
};

const combination = (n, r) => factorial(n, n - r + 1) / factorial(r);

assert.equal(factorial(4), 24);
assert.equal(factorial(5, 2), 120);
assert.equal(combination(5, 2), 10);
assert.equal(combination(3, 2), 3);
assert.equal(combination(4, 2), 6);

// (r - 1)! / (r - n)! * (n - 1)!
// (r - 1) (r - 2) ... (r - (r - n) + 1) / (r - n)!

const last = xs => xs[xs.length - 1];
const head = xs => xs[0];
const fromLast = (n, xs) => xs[xs.length - n - 1];

function addCom(r) {
    const n = 2;
    const result = 2;
    const memo = {};
    while (n < r) {
        const arr = Array(n).fill(1);
        arr[arr.length - 1] = r - n + 1;
        while (head(arr) > last(arr)) {


        }
    }
    return result;
}

console.log(addCom(3));

// 10
// 1 - 10
// 2 - 1 9 . 2 8 . 3 7 . 4 6 . 5 5
// 3 - 1 1 8 . 1 2 7 . 1 3 6 . 1 4 5 . 2 2 6 . 2 3 5 . 2 4 4 . 3 3 4
// 4 - 1 1 1 7 . 1 1 2 6 . 1 1 3 5 . 1 1 4 4 . 1 2 2 5 . 1 2 3 4 . 1 3 3 3 . 2 2 2 4
//
