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
    const ctx = document.getElementById("lineChart");

    if (!ctx || !dealers) return;

    const dealerNames = dealers.map((dealer) => dealer.dealername);
    const salesData = dealers.map((dealer) => dealer.noofsales);

    new Chart(ctx, {
      type: "line",
      data: {
        labels: dealerNames,
        datasets: [
          {
            label: "Number of Sales",
            data: salesData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
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
        <div style={{width:"400px",height:"500px"}}>
          <h1>Top Sellers</h1>
          <canvas id="lineChart"></canvas>
        </div>
      )}
    </div>
  );
};

export default TopSellerChart;
