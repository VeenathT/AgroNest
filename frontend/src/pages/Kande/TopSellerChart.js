import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const TopSellerChart = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/topdealer/");
        setTopSellers(response.data);
        setLoading(false);
        renderChart(response.data);
      } catch (error) {
        console.error("Error fetching top dealers:", error);
      }
    };

    fetchData();
  }, []);

  const renderChart = (dealers) => {
    const ctx = document.getElementById("Sellerlinechart");

    if (!ctx || !dealers) return;

    const dealerNames = dealers.map((dealer) => dealer.dealername);
    const salesData = dealers.map((dealer) => dealer.noofsales);

  
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: dealerNames,
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
          <h1>Top Sellers</h1>
          <canvas id="Sellerlinechart"></canvas>
        </div>
      )}
    </div>
  );
};

export default TopSellerChart;
