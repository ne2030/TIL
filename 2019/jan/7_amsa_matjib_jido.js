const _ = require('partial-js');

const datas = [
    '닭갈비',
    '곰탕',
    '한식당',
    '중국집',
    '삼계탕',
    '베트남',
    '바른맥주',
    '곱창',
    '부대찌개',
    '양식',
    '흑돼지',
    '무한리필삼겹살',
    '꼬치집',
    '스시'
]

console.log(
    _.shuffle(datas)[0]
);