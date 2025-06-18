import { predict } from "./predict.js";

// Function to calculate the gradient of the cost function
// with respect to 'w' and 'b' given input
// features, target values, weight (w), and bias (b)
export function gradient(x, y, w, b) {
  // 'm' represents the total number of features (area sizes)
  const m = x.length;
  const n = x[0].length; // Number of features
  if (m === 0 || n === 0) {
    throw new Error("Input arrays must not be empty.");
  }

  // Initialize the partial derivatives of the cost function
  let dj_dw = new Array(n).fill(0); // Gradient with respect to weights
  let dj_db = 0;

  // Calculate the sum of partial derivatives for each feature
  for (let i = 0; i < m; i++) {
    const f_wb = predict(x[i], w, b); // Predict the output using current weights and bias
    if (isNaN(f_wb)) {
      throw new Error(
        "Prediction resulted in NaN. Check input data and model parameters."
      );
    }
    const error = f_wb - y[i];

    for (let j = 0; j < n; j++) {
      const dj_dw_j = error * x[i][j]; // Partial derivative with respect to weight j
      dj_dw[j] += dj_dw_j; // Accumulate the gradient for weight j
    }

    dj_db += error; // Accumulate the gradient for bias
  }

  // Calculate the average of the partial derivatives
  for (let j = 0; j < n; j++) {
    dj_dw[j] /= m; // Average gradient for each weight
  }
  dj_db /= m;

  return [dj_dw, dj_db];
}
