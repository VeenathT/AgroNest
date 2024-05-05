import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const TopAreasInputData = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);
  let chartInstance = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/dealer/alldealers");
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

    const storePersonCountMap = new Map();
    // Aggregate persons count by store location
    fertilizersData.forEach(fertilizer => {
        const location = fertilizer.storeLocation;
        if (location) {
            if (!storePersonCountMap.has(location)) {
                storePersonCountMap.set(location, 0);
            }
            storePersonCountMap.set(location, storePersonCountMap.get(location) + 1);
        }
    });

    const labels = Array.from(storePersonCountMap.keys());
    const data = labels.map(location => storePersonCountMap.get(location));

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctxB, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Number of Persons',
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
              text: 'Store Location',
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
              text: 'Number of Persons',
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
          <h1 style={{fontWeight:"700",marginLeft:"50px" }}>Dealer Registrations top Areas</h1>
          <canvas id="TopFerDataInsertlinechart"></canvas>
        </div>
      )}
    </div>
  );
};

export default TopAreasInputData;
