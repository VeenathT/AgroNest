import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const FertilizerAnalysisChart = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/fertilizerAnalysis"); // Adjust the URL to match your backend endpoint
        setFertilizers(response.data);
        setLoading(false);
        renderChart(response.data);
      } catch (error) {
        console.error("Error fetching fertilizer analysis:", error);
      }
    };

    fetchData();
  }, []);

  const renderChart = (data) => {
    const ctx = document.getElementById("barChart");

    if (!ctx || !data) return;

    const fertilizerNames = data.map((item) => item.fertilizername);
    const salesData = data.map((item) => item.noofsales);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: fertilizerNames,
        datasets: [
          {
            label: "Number of Sales",
            data: salesData,
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Green
            borderColor: "rgba(75, 192, 192, 1)", // Green
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: "600px", height: "400px", backgroundColor: "#f7f7f7", padding: "20px", marginTop: "20px" }}>
          <h1>Fertilizer Analysis</h1>
          <canvas id="barChart"></canvas>
        </div>
      )}
    </div>
  );
};

export default FertilizerAnalysisChart;
