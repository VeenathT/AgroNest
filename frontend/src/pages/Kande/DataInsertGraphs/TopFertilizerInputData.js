import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const TopFertilizerInputData = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);
  let chartInstance = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/order/displayAll");
        setFertilizers(response.data);
        setLoading(false);
        renderChart(response.data);
      } catch (error) {
        console.error("Error fetching top areas:", error);
      }
    };

    fetchData();
  }, []);

  const renderChart = (fertilizersData) => {
    const ctxB = document.getElementById('TopFerDataInsertlinechart');

    if (!ctxB || !fertilizersData) return;

    const productMap = new Map();
    // Aggregate quantities by product name
    fertilizersData.forEach(fertilizer => {
      const quantity = parseInt(fertilizer.quantity); // Parse quantity as an integer
      const name = fertilizer.name; // Product name
      if (!isNaN(quantity)) {
        if (productMap.has(name)) {
          productMap.set(name, productMap.get(name) + quantity); // Sum up quantities
        } else {
          productMap.set(name, quantity);
        }
      }
    });

    const labels = Array.from(productMap.keys());
    const data = labels.map(name => productMap.get(name)); // Get quantities for corresponding product names

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctxB, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Quantity',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.4
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Product Name',
              color: "#333",
              font: {
                weight: 1000,
              }
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              color: "#333"
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Quantity',
              color: "#333",
              font: {
                weight: 1000,
              }
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              color: "#333"
            }
          },
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart',
        }
      },
    });
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: "600px", height: "400px" }}>
          <h1 style={{fontWeight:"700",marginLeft:"50px" }}>Fertilizer Categories & Sales</h1>
          <canvas id="TopFerDataInsertlinechart"></canvas>
        </div>
      )}
    </div>
  );
};

export default TopFertilizerInputData;
