import { gradient } from "./gradient-descent.js";
import { computeCost } from "./mse.js";
import { getData } from "./get-data.js";
import { normalizeFeatures } from "./normalize.js";

let chart;

async function train() {
  const learningRate = parseFloat(
    document.getElementById("learning-rate").value
  );
  const iterations = parseInt(document.getElementById("iterations").value, 10);
  const datasetKey = document.getElementById("dataset-select").value;

  const dataSet = await getData(datasetKey);

  if (!dataSet || dataSet.length === 0) {
    console.error("Dataset is empty or not loaded properly.");
    alert(
      "Dataset is empty or not loaded properly. Please select a valid dataset."
    );
    return;
  }

  console.log("Training with dataset:", datasetKey);
  console.log("DataSet:", dataSet);

  const X_values = dataSet.map((row) => row.slice(0, -1)); // All columns except the last
  const y_values = dataSet.map((row) => row[row.length - 1]); // Last column as target values

  const n = X_values[0].length; // Number of features

  const filteredX = X_values.filter((x) => x.length === n);
  const normalizedX = normalizeFeatures(filteredX);
  console.log("Normalized X:", normalizedX);

  let w = new Array(n).fill(0); // Initialize weights to zero
  let b = 0;
  const costs = [];

  for (let i = 0; i < iterations; i++) {
    const cost = computeCost(normalizedX, y_values, w, b);
    costs.push(cost);
    const [dj_dw, dj_db] = gradient(normalizedX, y_values, w, b);
    for (let j = 0; j < n; j++) {
      w[j] -= learningRate * dj_dw[j];
    }
    b -= learningRate * dj_db;
  }

  updateChart(costs);
}

function updateChart(costHistory) {
  const ctx = document.getElementById("costChart").getContext("2d");
  const data = {
    labels: costHistory.map((_, i) => i + 1),
    datasets: [
      {
        label: "Cost (MSE)",
        data: costHistory,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  if (chart) {
    chart.destroy();
  }
  chart = new Chart(ctx, { type: "line", data });
}

document.getElementById("runButton").addEventListener("click", train);
