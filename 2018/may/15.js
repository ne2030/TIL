// Coding by Composing
// associativity

const compose = (f, g) => x => f(g(x));

const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const shout = compose(exclaim, toUpperCase);

shout('send in the clowns'); // SEND IN THE CLOWNS!

// compse is 'right to left' 

// rules for composition

// 1. associativity (결합법칙)

compose(f, compose(g, h)) === compose(compose(f, g), h);

compose(toUpperCase, compose(head, reverse))
// or
compose(compose(toUpperCase, head), reverse)

// previously we'd have to write two composes, but since it's associative
// we can give compose as many fn's as we like and let it decide how to group them
{
    const arg = ['jumpkic', 'roundhouse', 'uppercut'];
    const lastUpper = compose(toUpperCase, head, reverse);
    const loudLastUpper = compose(exclaim, toUpperCase, head, reverse);
}


// refactoring

{
    const last = compose(head, reverse);
    const loudLastUpper = compose(exclaim, toUpperCase, last);
}
 // or
{
    const last = compose(head, reverse);
    const angry = compose(exclaim, toUpperCase);
    const loudLastUpper = compose(angry, last);
}

