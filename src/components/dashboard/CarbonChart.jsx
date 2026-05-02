import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export function CarbonChart({ forecast = [], labels = [] }) {
  const chartLabels = labels.length ? labels : forecast.map((_, index) => `${index + 1}`);
  const minValue = forecast.length ? Math.max(0, Math.min(...forecast) - 20) : undefined;
  const maxValue = forecast.length ? Math.max(...forecast) + 20 : undefined;

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Carbon intensity",
        data: forecast,
        borderColor: "#00FF88",
        backgroundColor: "rgba(0, 255, 136, 0.12)",
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.45,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(6, 14, 32, 0.95)",
        borderColor: "rgba(0, 255, 136, 0.35)",
        borderWidth: 1,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 10, weight: 700 } }
      },
      y: {
        display: false,
        suggestedMin: minValue,
        suggestedMax: maxValue
      }
    }
  };

  return <Line data={data} options={options} />;
}
