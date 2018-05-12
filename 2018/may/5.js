// Professor-frisby's guide to FP

/*
* 1. What ever are we doing? (about OOP)
*/


// traditional way as OOP
{
    class Flock {
        constructor(n) {
            this.seagulls = n;
        }
    
        conjoin(other) {
            this.seagulls += other.seagulls;
            return this;
        }
    
        breed(other) {
            this.seagulls = this.seagulls * other.seagulls;
            return this;
        }
    }
    
    const flockA = new Flock(4);
    const flockB = new Flock(2);
    const flockC = new Flock(0);
    
    const result = flockA
        .conjoin(flockC)
        .breed(flockB)
        .conjoin(flockA.breed(flockB))
        .seagulls;
        // 32
}

// new way as FP

{
    const flockA = 4;
    const flockB = 2;
    const flockC = 0;

    const add = (a, b) => a + b;
    const mul = (a, b) => a * b;
    
    const result = add(mul(add(flockA, flockC), flockB), mul(flockA, flockB));
}

// 1. much less code 2. easy to understand 3. utility
// * additionally, 1. NO SE or controlled SE, reliable, easy to test 2. stateless, easy tracking and debugging 3. easily refactored => reorder fn

/*
* 3. Pure happiness with pure functions
*/

{
    const xs = [1, 2, 3, 4, 5];

    // pure
    xs.slice(0, 3); // [1, 2, 3]
    xs.slice(0, 3); // [1, 2, 3]
    xs.slice(0, 3); // [1, 2, 3]
    
    // impure
    xs.splice(0, 3); // [1, 2, 3]
    xs.splice(0, 3); // [4, 5]
    xs.splice(0, 4); // []
}

{
    // impure
    const minimum = 21;
    const checkAge = age => age > minimum;

    // pure
    const checkAge = (age) => {
        const minimum = 21;
        return age > minimum;
    }
}
    
