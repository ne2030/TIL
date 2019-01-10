// lazy 와 promise 평가

const {
    filter, map, reduce, L
} = require('fxjs2');

const arr = [1, 2, 3, 4, 5];

const isEven = n => n % 2 === 0;
const promiseMap = L.filter(isEven, L.map(n => Promise.resolve(n), arr));

console.log(promiseMap);
console.log([...promiseMap]);

// lazy 함수들은 꼭 take 로 끝내줘야 하고, take 에서 filter 에서 남기지 않을 요소들을 걸러낸다.
// 방식은 Symbol 과 promise reject 를 통한 분기

// 계속 이어서...
