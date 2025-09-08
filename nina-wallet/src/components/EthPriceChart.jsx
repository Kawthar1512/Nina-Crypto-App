import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function TinyEthSparkline() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=2"
        );
        const data = await res.json();
        const prices = data.prices.map((p) => p[1]);

        setChartData({
          labels: prices.map(() => ""),
          datasets: [
            {
              data: prices,
              borderColor: "#00ff00",
              borderWidth: 1, // thinner line
              fill: false,
              tension: 0.3,
              pointRadius: 0,
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  return (
    <div style={{ width: "80px", height: "20px" }}> {/* smaller container */}
      <Line data={chartData} options={options} />
    </div>
  );
}
