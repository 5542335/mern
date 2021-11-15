const memoize = (func) => {};
// add memoization

function factorial(num) {
  return num ? num * factorial(num - 1) : 1;
}

// const memoizedFactorial = memoize(factorial);

function matrixArray(num) {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr[i] = [];
    for (let j = 0; j < num; j++) {
      const number = i ? num * i + j : j;

      arr[i][j] = factorial(number);
    }
  }

  return arr;
}

console.log(matrixArray(2));
