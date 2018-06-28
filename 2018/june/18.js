// Exam  Problem Random Shuffler

const _ = require('partial-js');
const fs = require('fs');
const promisify = require('util').promisify;
const path = require('path');
const problems = require('../../resources/js/example_marketing_test');

const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);

async function makeTest(fileName) {
    const file = path.resolve(__dirname, `../../resources/results/${fileName}`)

    await writeFile(file, '');

    return _.go(problems,
        _.flatten,
        _.shuffle,
        _.map((prob, idx) => appendFile(file, `${idx + 1}번 :: ${prob} \n`))
    );    
}

makeTest('marketing_shuffle.txt')
    .then(console.log)
    .catch(console.log);


