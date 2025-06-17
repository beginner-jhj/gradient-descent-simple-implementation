import { gradient } from "./gradient-descent.js";
import { cost } from "./mse.js";
/**
 * Fit a linear regression model using gradient descent.
 *
 * @param {Array} X_values - Array of feature values (independent variable).
 * @param {Array} y_values - Array of target values (dependent variable).
 * @returns {Array} - Returns an array containing the slope (w) and y-intercept (b).
 */

function fit(X_values, y_values) {
  // Initialize the slope (w) and y-intercept (b) to 0
  let w = 0;
  let b = 0;

  // Set the learning rate (alpha) and the number of iterations
  const alpha = 0.01;
  const iterations = 1000;

  // Perform gradient descent to find the optimal w and b values
  for (let i = 0; i < iterations; i++) {
    console.log(
      `Iteration ${i + 1}: w = ${w}, b = ${b}, cost = ${cost(
        X_values,
        y_values,
        w,
        b
      )}`
    );
    // Calculate the gradients of the cost function with respect to w and b
    const [dj_dw, dj_db] = gradient(X_values, y_values, w, b);

    // Update w and b by taking a step in the opposite direction of the gradients
    w = w - alpha * dj_dw;
    b = b - alpha * dj_db;
  }

  // Return the final values of w and b
  return [w, b];
}

const finalValues = fit(
  [1, 2, 3, 4, 5], // Example feature values (e.g., area sizes)
  [100, 200, 300, 400, 500] // Example target values (e.g., prices)
);

console.log(`Final values: w = ${finalValues[0]}, b = ${finalValues[1]}`);

console.log("\n Model predictions:");

const model = (x) => {
  const [w, b] = finalValues;
  return w * x + b; // Linear regression model
};

for (let i = 0; i < 6; i++) {
  console.log(`Model prediction for x = ${i}: ${model(i)}`);
}
