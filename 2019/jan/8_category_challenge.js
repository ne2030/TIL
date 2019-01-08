// category theory for programmer
// 1.4 Challenges

// 1. Implement, as best as you can, the identity function in your favorite language
// (or the second favorite, if your favorite language happens to be Haskell).

const id = x => x;

// 2. Implement the composition function in your favorite language.
// It takes two functions as arguments and returns a function that is their composition.

const compose = (f, g) => a => f(g(a))

// 3. Write a program that tries to test that your composition function respects identity.

const f = a => a + 1;
console.log(
    compose(f, id)(1), compose(id, f)(1), f(1)
);

// 4. Is the world-wide web a category in any sense? Are links morphisms?

// yes

// 5. Is Facebook a category, with people as objects and friendships as morphisms?

// no

// 6. When is a directed graph a category?

// has identity arrow and associativity

