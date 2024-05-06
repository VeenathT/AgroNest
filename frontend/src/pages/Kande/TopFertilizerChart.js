import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const FertilizerAnalysisChart = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/topfertilizercategory/"); // Adjust the URL to match your backend endpoint
        setFertilizers(response.data);
        setLoading(false);
        renderChart(response.data);
      } catch (error) {
        console.error("Error fetching fertilizer analysis:", error);
      }
    };

    fetchData();
  }, []);

  const renderChart = (topfertilizer) => {
    const ctx = document.getElementById("Fertilizerlinechart");

    if (!ctx || !topfertilizer) return;

    const fertilizerNames = topfertilizer.map((item) => item.fertilizername);
    const salesData = topfertilizer.map((item) => item.noofsales);

    new Chart(ctx, {
      type: "line",
      data: {
        labels: fertilizerNames,
        datasets: [
          {
            label: "Number of Sales",
            data: salesData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)", // Red
              "rgba(75, 192, 192, 0.2)", // Green
              "rgba(54, 162, 235, 0.2)", // Blue
              "rgba(255, 206, 86, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)", // Red
              "rgba(75, 192, 192, 1)", // Green
              "rgba(54, 162, 235, 1)", // Blue
              "rgba(255, 206, 86, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
            fill:true
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
        <div style={{ width: "600px", height: "400px" }}>
          <h1>Fertilizer Analysis</h1>
          <canvas style={{height:"100px"}} id="Fertilizerlinechart"></canvas>
        </div>
      )}
    </div>
  );
};

export default FertilizerAnalysisChart;
