export function normalizeFeatures(X) {
  const n = X[0].length;
  const mins = new Array(n).fill(Infinity);
  const maxs = new Array(n).fill(-Infinity);

  for (const row of X) {
    for (let j = 0; j < n; j++) {
      mins[j] = Math.min(mins[j], row[j]);
      maxs[j] = Math.max(maxs[j], row[j]);
    }
  }

  return X.map((row) =>
    row.map((val, j) => (val - mins[j]) / (maxs[j] - mins[j]))
  );
}
