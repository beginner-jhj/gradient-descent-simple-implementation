import { predict } from "./predict.js";

// Function to calculate the cost (MSE) given x (features), y (values), weight (w), and bias (b)
export function computeCost(X, y, w, b) {
  // 'm' represents the total number of features (area sizes)
  const m = X.length;

  // 'f_wb' is the linear regression prediction value given 'x', 'w', and 'b'
  let f_wb = 0;

  // Initialize cost as 0
  let cost = 0;

  // Calculate the sum of squared differences between predicted and actual values
  for (let i = 0; i < m; i++) {
    f_wb = predict(X[i], w, b); // Predict the output using current weights and bias
    cost += Math.pow(f_wb - y[i], 2);
  }

  // Calculate the mean squared error (cost function value)
  const j_wb = cost / (2 * m);

  return j_wb;
}
