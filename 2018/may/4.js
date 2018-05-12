// map 과 flatMap 가지고 놀기
// arr로 값 박싱하기 -> null 혹은 undefined 없애기

const _ = require('partial-js');

const curryr = f => (...args) => args.length === 2 ? f(...args) : a => f(a, args[0]);
const curry = f => (...args) => args.length === 2 ? f(...args) : b => f(args[0], b);
const map = curryr((xs, f) => xs.map(f));
const flatMap = ((xs, f) => [].concat(...xs.map(f)));

const add = curry((a, b) => a + b);
const mul = curry((a, b) => a * b);
const sub = curryr((a, b) => a - b);
const divide = curryr((a, b) => a / b);

const arr = [1, 2, 3, 4, 5];
const deepArr = [[1, 2], [2, 3], [3, 4], [4, 5]];

// fn(x) = (x + 10 - 4) * 2 / 4
const fn = _.pipe(
    map(add(10)),
    map(sub(4)),
    map(mul(2)),
    map(divide(4)),
    console.log
);

// fn(x) = (x + 10 - 4) * 2 / 4
const fn1 = _.pipe(
    map(add(10)),
    _.hi,
    map(sub(4)),
    _.hi,
    map(mul(2)),
    _.hi,
    // map(a => { console.log(':: a is ::', a); return a; }),
    map(divide(4)),
    console.log
);

// 기본 실행
function basic() {
    fn([4]);
    fn1([5]);
}

// 빈 박스 (함수들 실행 x)
function empty() {
    fn([]);
    fn1([]);    
}

// 에러 인풋 => 당연히 에러, functor 나 모나드 단위로만 다루어져야함
function errorInput() {
    fn(undefined);
    // fn1(undefined);
}

function dirtyBox() {
    fn1([undefined, null, [1], [[2]]]);
}

// dirtyBox();

