//a simple function to see if jest is working properly
function sum(a, b) {
    return a + b;
}
  
  
test('add 1 and 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
});
  