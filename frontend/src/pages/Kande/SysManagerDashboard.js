import React from "react";
import { useNavigate } from "react-router-dom";
import TopSellerChart from "../../pages/Kande/TopSellerChart";
import FertilizerAnalysisChart from "../../pages/Kande/TopFertilizerChart.js";
import TopAreasChart from "../../pages/Kande/TopAreaChart.js";

const SysManagerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#f7f7f7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mt-5" style={{ marginLeft: "400px" }}>
        <div className="col">
          <button
            className="btn btn-primary btn-lg"
            style={{ width: "250px", height: "100px", margin: "30px", padding: "10px" }}
            onClick={() => navigate("/addtopfertilizers")}
          >
            Add Top Performing Fertilizer Category
          </button>
          <button
            className="btn btn-primary btn-lg"
            style={{ width: "250px", height: "100px", margin: "30px", padding: "10px" }}
            onClick={() => navigate("/addtopsellingfertilizers")}
          >
            Add Top Selling Dealer
          </button>
          <button
            className="btn btn-primary btn-lg"
            style={{ width: "250px", height: "100px", margin: "30px", padding: "10px" }}
            onClick={() => navigate("/addtopareas")}
          >
            Add Areas With Highest Registrations
          </button>
        </div>
      </div>

      <div>
        <section className="col-3" style={{ backgroundColor: "#e0e0e0", padding: "20px" }}>
          <div style={{ backgroundColor: "#f0f0f0", padding: "10px", marginBottom: "20px" }}>
            <button
              className="btn btn-lg btn-block"
              style={{ backgroundColor: "red", color: "white", fontSize: "1.5em", marginBottom: "10px" }}
              onClick={() => navigate("/analysis")}
            >
              Analysis
            </button>
            <button
              className="btn btn-lg btn-block"
              style={{ backgroundColor: "red", color: "white", fontSize: "1.5em" }}
              onClick={() => navigate("/admin-registration")}
            >
              Admin Registration
            </button>
          </div>
        </section>
        <div className="col-9">
          <div style={{ backgroundColor: "#e0e0e0", padding: "20px", marginTop: "20px", marginLeft: "400px" }}>
            <TopSellerChart />
          </div>
          <div style={{ backgroundColor: "#e0e0e0", padding: "20px", marginTop: "20px", marginLeft: "400px" }}>
            <FertilizerAnalysisChart />
          </div>
          <div style={{ backgroundColor: "#e0e0e0", padding: "20px", marginTop: "20px", marginLeft: "400px" }}>
            <TopAreasChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SysManagerDashboard;
