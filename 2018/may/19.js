// category theory

// category - 1) a collection of objects 2) a collection of morphisms 3) a notion of composition on the morphisms 4) a distinguished morphism called identity

/*
* 1) a collection of objects
*/

// Objects === data types

// ex) Boolean => set of [true, false] , Number => set of possible numeric values

// => set theory

/*
* 2) a collection of morphisms
*/

// The morphisms will be our standard every day pure functions

/*
* 3) a notion of composition on the morphisms
*/

// about 'compose'

// replace :: RegExp -> String -> String -> String
// f g :: String -> Int -> Boolean

{
    const g = x => x.lenght;
    const f = x => x === 4;
    const isFourLetterWord = compose(f, g);
}

/*
* 4) a distinguished morphism called identity
*/


{
    const id = x => x;
    
    // identity
    compose(id, f) === compose(f, id) === f; // true
}

/*
*
* Exercises
*
*/

// a
{
    const car = {
        name: 'Aston Martin One-77',
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: true
    };

    // use compose to rewrite the function below
    // inLastInStock :: [Car] -> Boolean
    const isLastInStock = (cars) => {
        const lastCar = last(cars);
        return prop('in_stock', lastCar);
    }

    // answer
    const inLastInStock_answer = compose(prop('in_stock'), last);
}

// b
{
    const average = xs => reduce(add, 0, xs) / xs.length;

    // averageDollerValue :: [Car] -> Int
    const averageDollerValue = (cars) => {
        const dollerValues = map(c => c.doller_value, cars);
        return average(dollerValues);
    };

    const averageDollerValue_answer = compose(average, map(prop('doller_value')))
}

// c
{
    // flip :: (a -> b) -> (b -> a)
    const flip = curry((fn, a, b) => fn(b, a));

    // fastestCar :: [Car] -> String
    const fastestCar = (cars) => {
        const sorted = sortBy(car => car.horsepower, cars);
        const fastest = last(sorted);
        return concat(fastest.name, ' is the fastest');
    };

    const fastestCar_answer = compose(flip(concat)(' is the fastest'), last ,sortBy(prop('horsepower')));

    const append = flip(concat);
    const solution = compose(
        append(' is the fasteset'),
        prop('name'),
        last,
        sortBy(prop('horsepower'))
    );
}