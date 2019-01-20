const random = function (min, max) {
    if (max == null) max = min, min = 0;
    return min + Math.floor(Math.random() * (max - min + 1));
};

const shuffle = function (coll) {
    const length = coll.length;
    const shuffled = Array(length);
    for (let index = 0, rand; index < length; index++) {
        rand = random(0, index);    
        if (rand !== index) shuffled[index] = shuffled[rand];
        shuffled[rand] = coll[index];
    }
    return shuffled;
};

const r = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(r);
