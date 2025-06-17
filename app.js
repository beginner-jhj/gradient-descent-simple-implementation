import Chart from './node_modules/chart.js/dist/chart.umd.js';
import { gradient } from './gradient-descent.js';
import { cost } from './mse.js';

// Example datasets for different linear regression scenarios
const datasets = {
  study: {
    x: [1, 2, 3, 4, 5, 6],
    y: [50, 55, 65, 70, 75, 80],
  },
  experience: {
    x: [1, 3, 5, 7, 9],
    y: [35, 50, 65, 80, 95],
  },
  housing: {
    x: [500, 750, 1000, 1250, 1500],
    y: [150000, 200000, 240000, 280000, 330000],
  },
};

let X_values = datasets.study.x;
let y_values = datasets.study.y;

let chart;

function updateDataInfo() {
  const info = X_values.map((x, i) => `${x}\t${y_values[i]}`).join('\n');
  document.getElementById('data-info').textContent = `x\ty\n${info}`;
}

function runGradientDescent() {
  const alpha = parseFloat(document.getElementById('learning-rate').value);
  const iterations = parseInt(document.getElementById('iterations').value, 10);
  const datasetKey = document.getElementById('dataset-select').value;
  ({ x: X_values, y: y_values } = datasets[datasetKey]);
  updateDataInfo();

  let w = 0;
  let b = 0;
  const costs = [];

  for (let i = 0; i < iterations; i++) {
    const j = cost(X_values, y_values, w, b);
    costs.push(j);
    const [dj_dw, dj_db] = gradient(X_values, y_values, w, b);
    w -= alpha * dj_dw;
    b -= alpha * dj_db;
  }

  updateChart(costs);
}

function updateChart(costHistory) {
  const ctx = document.getElementById('costChart').getContext('2d');
  const data = {
    labels: costHistory.map((_, i) => i + 1),
    datasets: [
      {
        label: 'Cost (MSE)',
        data: costHistory,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  if (chart) {
    chart.destroy();
  }
  chart = new Chart(ctx, { type: 'line', data });
}

document.getElementById('runButton').addEventListener('click', runGradientDescent);
document.getElementById('dataset-select').addEventListener('change', () => {
  const key = document.getElementById('dataset-select').value;
  ({ x: X_values, y: y_values } = datasets[key]);
  updateDataInfo();
});

// Initialize display
updateDataInfo();
