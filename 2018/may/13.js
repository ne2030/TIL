/*

Once upon a time, on a way through the old wild west,…
… a man was given directions to go from one point to another. The directions were "NORTH", "SOUTH", "WEST", "EAST". Clearly "NORTH" and "SOUTH" are opposite, "WEST" and "EAST" too. Going to one direction and coming back the opposite direction is a needless effort. Since this is the wild west, with dreadfull weather and not much water, it's important to save yourself some energy, otherwise you might die of thirst!

How I crossed the desert the smart way.
The directions given to the man are, for example, the following:

["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"].
or

{ "NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST" };
or (haskell)

[North, South, South, East, West, North, West]
You can immediatly see that going "NORTH" and then "SOUTH" is not reasonable, better stay to the same place! So the task is to give to the man a simplified version of the plan. A better plan in this case is simply:

["WEST"]
or

{ "WEST" }

*/

const pipe = (...fns) => v => reduce(fns, (memo, fn) => fn(memo), v);
const curry2 = fn => (...args) => (args.length === 2 ? fn(...args) : a => fn(...args, a));
const isEqual = curry2((a, b) => a === b);
const ifElse = (p, fn, elseFn) => v => (p(v) ? fn(v) : elseFn(v));
const omit = curry2((arr, idx) => [...arr.slice(0, idx), ...arr.slice(idx + 1, arr.length)]);
const constant = v => () => v;
const last = acc => acc[acc.length - 1]

function dirReduc(arr){
  const oppositeTable = {
    NORTH: 'SOUTH',
    SOUTH: 'NORTH',
    EAST: 'WEST',
    WEST: 'EAST'
  };

  return arr.reduce((acc, cur) =>
      isEqual(last(acc), oppositeTable[cur]) ? omit(acc, acc.length - 1) : [...acc, cur]
  , [])
}