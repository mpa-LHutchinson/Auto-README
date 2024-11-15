//a simple function to see if jest is working properly

function sum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a + b;
}

test('add 1 and 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
});

test('add 1.5 and 2 to equal 3.5', () => {
    expect(sum(1.5,2)).toBe(3.5);
});


// Test for non-number inputs
test('add "hello" and 2 to throw an error', () => {
    expect(() => sum('hello', 2)).toThrow('Both arguments must be numbers');
});

test('add 1 and null to throw an error', () => {
    expect(() => sum(1, null)).toThrow('Both arguments must be numbers');
});
