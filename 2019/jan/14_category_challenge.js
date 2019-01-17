// category theory for programmer
// Chapter 2 Challenge

// 1)

// Define a higher-order function (or a function object) memoize in your favorite language.
// This function takes a pure function f as an argument and returns a function that behaves almost exactly like f,
// except that it only calls the original function once for every argument, stores the result internally,
// and subsequently returns this stored result every time it’s called with the same argument.
// You can tell the memoized function from the original by watch- ing its performance.
// For instance, try to memoize a function that takes a long time to evaluate.
// You’ll have to wait for the result the first time you call it, but on subsequent calls,
// with the same argument, you should get the result immediately.

const memoize = (f) => {
    const memo = {};
    return arg => (memo[arg] ? memo[arg] : (memo[arg] = f(arg), memo[arg]));
};

const concatStr = memoize((n) => {
    let str = 'start';
    while (n) {
        str += 'on going\n';
        n -= 1;
    }
    return str;
});

console.time('first');
concatStr(1000000);
console.timeEnd('first');

console.time('second');
concatStr(1000000);
console.timeEnd('second');

// 2)

// Try to memoize a function from your standard library that you normally use to produce random numbers.
// Does it work?

const a = memoize(Math.random);
// ??

// 5)

// How many different functions are there from Bool to Bool? Can
// you implement them all?

const id = bool => bool;
const reverse = bool => !bool;

