import React from "react";
import { Nav } from "react-bootstrap"; // Import Nav component from react-bootstrap
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../images/common/background.avif'; 

const SysManagerDashboard = () => {
  const navigate = useNavigate(); // useNavigate hook from react-router-dom

  return (
    <div >
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <div className="row mt-5" style={{marginLeft:'400px'}} >
          <div className="col">
            <button
              className="btn btn-primary btn-lg"
              style={{ width: "250px", height: "100px", margin: "30px",padding:"10px" }}
              onClick={() => navigate("/addtopfertilizers")}
            >
              Add Top Performing Fertilizer Category
            </button>
            <button
              className="btn btn-primary btn-lg"
              style={{ width: "250px", height: "100px", margin: "30px" ,padding:"10px" }}
              onClick={() => navigate("/addtopsellingfertilizers")}
            >
              Add Top Selling Dealer
            </button>
            <button
              className="btn btn-primary btn-lg"
              style={{ width: "250px", height: "100px", margin: "30px",padding:"10px"  }}
              onClick={() => navigate("/addtopareas")}
            >
              Add Areas With Highest Registrations
            </button>
          </div>
        </div>
     
     <div>
        <section className="col-3" style={{ backgroundColor: "#fff" }}>
          {/* Section for the Nav component */}
          <Nav className="flex-column">
            <Nav.Link
              href="#"
              onClick={() => navigate("/analysis")}
              style={{ fontSize: "2em", marginBottom: "10px" }}
            >
              Analysis
            </Nav.Link>{" "}
            {/* Navigate to '/analysis' on click */}
            <Nav.Link
              href="#"
              onClick={() => navigate("/admin-registration")}
              style={{ fontSize: "2em" }}
            >
              Admin Registration
            </Nav.Link>{" "}
            {/* Navigate to '/admin-registration' on click */}
          </Nav>
        </section>
        <div className="col-9">
          {/* Content area */}
          {/* Add your content here */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SysManagerDashboard;
