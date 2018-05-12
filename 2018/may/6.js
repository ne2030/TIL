// pure functions in FP

// 1. cacheable
// as it guarantee [input, output] set , it can be cacheable for same input.

const memoize = (f) => {
    const cache = {};

    return (...args) => {
        const argStr = JSON.stringify(args);
        cache[argStr] = cache[argStr] || f(...args);
        return cache[argStr];
    };
};

const squareNumber = memoize(x => x * x);

squareNumber(4); // 16

squareNumber(4); // 16, returns cache for input 4

// 2. Portable / Self-documenting
// it shows dependencies explicitly, as such, tell us what it's up to. 

// impure
const signUp = (attrs) => {
    const user = saveUser(attrs);
    welcomeUser(user);
};

// pure / self-documenting
const signUp = (Db, Email, attrs) => {
    const user = saveUser(Db, attrs);
    welcomeUser(Email, user);
}

// 3. Testable 
// We don't have to run all things, but just test each functions with input / output.

// 4. Reasonable
// As it is referential transparency, it can be substituted with its expected value. This makes code refactoring easy.

// 5. Pararell Code
// 상태를 쓰지 않고 공유되는 메모리에 접근할 일이 없기 때문에, 병렬로 실행하기 좋다.