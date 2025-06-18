export function predict(x, w, b) {
  let result = 0;
  for (let i = 0; i < x.length; i++) {
    result += w[i] * x[i];
  }
  return result + b;
}
