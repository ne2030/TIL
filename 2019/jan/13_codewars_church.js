function zero(f, x) {
    return x;
}

function succ(church) {
    return function (f, x) {
        return f(church(f, x));
    };
}

function intToChurch(int) {
    let church = zero;
    for (let i = 1; i <= int; i++) {
        church = succ(church);
    }
    return church;
}

const sum2 = a => b => a + b;

function churchToInt(church) {
    return church(sum2(1), 0);
}

const addInt = int => (church) => {
    for (let i = 1; i <= int; i++) {
        church = succ(church);
    }
    return church;
};

function add(church1, church2) {
    return addInt(churchToInt(church1))(church2);
}

function mul(church1, church2) {
    return church1(church => add(church, church2), zero);
}

function pow(churchBase, churchExp) {
    return churchExp(church => mul(churchBase, church), succ(zero));
}

const nat5 = intToChurch(5);
const nat1 = intToChurch(1);
const nat2 = intToChurch(2);
const nat7 = intToChurch(7);

// console.log(nat5(sum2(1), 0));
// const nnat5 = nat5(addInt(5), zero);
// console.log(nnat5(sum2(1), 0));

// console.log(mul(nat5, nat7)(sum2(1), 0));
// console.log(churchToInt(add(nat5, nat7)));

// (church) => addInt(churchToInt(church1))(church)

// console.log(churchToInt(mul(nat1, nat7)));

// console.log(churchToInt(pow(nat5, nat2)));




/*
* Best Practice
*/

function add(church1, church2) {
    return church1(succ, church2);
}

function mul(church1, church2) {
    return church1(add.bind(null, church2), zero);
}

function pow(churchBase, churchExp) {
    return churchExp(mul.bind(null, churchBase), succ(zero));
}