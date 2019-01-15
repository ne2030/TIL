const _ = require('partial-js');

const menus = require('./8_amasa_matjib_menus');

const hasProp = key => menu => menu[key];
const delay = t => new Promise((res) => {
    setTimeout(res, t);
});

_.go(
    menus,
    _.filter(hasProp('lunch')),
    // _.filter(hasProp('drink')),
    // _.reject(hasProp('lunch'))),
    _.reject(hasProp('seafood')),
    _.shuffle,
    _.each(async (m) => {
        console.log(m.name);
        await delay(7000);
    })
    // _.first,
);
