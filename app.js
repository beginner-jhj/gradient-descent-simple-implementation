import { gradient } from "./gradient-descent.js";
import { computeCost } from "./mse.js";
import { getData, getColumns } from "./get-data.js";
import { normalizeFeatures } from "./normalize.js";
import { predict } from "./predict.js";

let chart;
let trainedW = [];
let trainedB = 0;
let featureMins = [];
let featureMaxs = [];
let featureNames = [];

async function displayColumns() {
  const datasetKey = document.getElementById("dataset-select").value;
  try {
    const columns = await getColumns(datasetKey);
    featureNames = columns.slice(0, -1);
    document.getElementById("columns-display").textContent =
      "Columns: " + columns.join(", ");
    document.getElementById("feature-list").textContent =
      "Features: " + featureNames.join(", ");
  } catch (err) {
    console.error("Error loading columns", err);
    document.getElementById("columns-display").textContent =
      "Failed to load columns";
  }
}


async function train() {
  const learningRate = parseFloat(
    document.getElementById("learning-rate").value
  );
  const iterations = parseInt(document.getElementById("iterations").value, 10);
  const datasetKey = document.getElementById("dataset-select").value;

  const { data: dataSet, headers } = await getData(datasetKey);

  if (!dataSet || dataSet.length === 0) {
    console.error("Dataset is empty or not loaded properly.");
    alert(
      "Dataset is empty or not loaded properly. Please select a valid dataset."
    );
    return;
  }

  featureNames = headers.slice(0, -1);
  document.getElementById("feature-list").textContent =
    "Features: " + featureNames.join(", ");

  console.log("Training with dataset:", datasetKey);
  console.log("DataSet:", dataSet);

  const X_values = dataSet.map((row) => row.slice(0, -1)); // All columns except the last
  const y_values = dataSet.map((row) => row[row.length - 1]); // Last column as target values

  const n = X_values[0].length; // Number of features

  const filteredX = X_values.filter((x) => x.length === n);
  const { normalized: normalizedX, mins, maxs } = normalizeFeatures(filteredX);
  console.log("Normalized X:", normalizedX);
  featureMins = mins;
  featureMaxs = maxs;

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

  trainedW = w;
  trainedB = b;
  updateChart(costs);
  document.getElementById("test-section").style.display = "block";
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
document.getElementById("dataset-select").addEventListener("change", displayColumns);
displayColumns();

function normalizeInput(values) {
  return values.map((v, i) => (v - featureMins[i]) / (featureMaxs[i] - featureMins[i]));
}

function testModel() {
  const rawInput = document.getElementById("test-input").value;
  const values = rawInput.split(",").map(Number);
  if (values.length !== trainedW.length) {
    alert(`Please enter ${trainedW.length} values.`);
    return;
  }
  const normalized = normalizeInput(values);
  const prediction = predict(normalized, trainedW, trainedB);
  document.getElementById("predictionOutput").textContent = `Prediction: ${prediction.toFixed(2)}`;
}

document.getElementById("testButton").addEventListener("click", testModel);
