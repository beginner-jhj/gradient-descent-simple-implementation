// Function to calculate the gradient of the cost function
// with respect to 'w' and 'b' given input
// features, target values, weight (w), and bias (b)
export function gradient(x, y, w, b) {
  // 'm' represents the total number of features (area sizes)
  const m = x.length;

  // Initialize the partial derivatives of the cost function
  let dj_dw = 0;
  let dj_db = 0;

  // Calculate the sum of partial derivatives for each feature
  for (let i = 0; i < m; i++) {
    const f_wb = w * x[i] + b;
    const dj_dw_i = (f_wb - y[i]) * x[i];
    const dj_db_i = f_wb - y[i];
    dj_dw += dj_dw_i;
    dj_db += dj_db_i;
  }

  // Calculate the average of the partial derivatives
  dj_dw /= m;
  dj_db /= m;

  return [dj_dw, dj_db];
}
