// the case for purity

// 1. cacheable

function memoize(f) {
    const cache = {};
    
    return (...args) => {
        const argStr = JSON.stringify(args);
        cache[argStr] = cache[argStr] || f(...args);
        return cache[argStr];
    }
}

const squareNumber = memoize(x => x * x);

squareNumber(4); // 16

squareNumber(4); // 16, returns cache for input 4

// 2. Portable / Self-documenting

// impure
{
    const signUp = (attrs) => {
        const user = saveUser(attrs);
        welcomeUser(user);
    }
}

// pure
{
    const signUp = (Db, Email, attrs) => {
        const user = saveUser(Db, attrs);
        welcomeUser(Email, user);
    }
}

// if we don't have state, dependencies available effects, then we can run our pure functions in any where.

// 3. Testable
// we don't have to have any state, just put input and expect output.

// 4. Reasonable
// referential transparency - a spot of code is referentially transparent when it can be substituted for its evaluated value without chainging the behavior of the program

// 5. Pararell Code
// can run pararell - because pure function does not access to shared memory
