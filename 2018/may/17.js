// Coding by composing

// Pointfree
// function definitions do not identify the arguments (or "points") on which they operate

// not pointfree because we mention the data : words
{
    const snakeCase = word => word.toLowerCase().replace(/\s+/ig, '_');
}

// pointfree
{
    const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
}


// Debugging
// if having some trouble on piping, try 'trace' function

{
    const trace = tag => x => {
        console.log((tag, x);
        return x;
    };

    const dasherize = compose(
        join('-'),
        toLower,
        trace('after split'),
        split(' '),
        replace(/\s{2,}/ig, ' ')
    );

    dasherize('The world is a vampire');
    // TypeError: Cannot read property 'apply' of undefined
}


