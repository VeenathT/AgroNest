import React from "react";
import "./Sidebar.css"; // Import your CSS file for styling
import "../../../Component/Kande/FormCntainer/Form"


const Sidebar = () => {
  return (
   <div>
    {/* <!--Main Navigation--> */}
<header>
  {/* <!-- Sidebar --> */}
  <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
    <div class="position-sticky">
      <div class="list-group list-group-flush mx-3 mt-4">
        <a
          href="#"
          class="list-group-item list-group-item-action py-2 ripple"
          aria-current="true"
        >
          <i class="fas fa-tachometer-alt fa-fw me-3"></i><span></span>
        </a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple active">
          <i class="fas fa-chart-area fa-fw me-3"></i><span>Analysis</span>
        </a>
        
        
        <a href="/addadmin" class="list-group-item list-group-item-action py-2 ripple"
          ><i class="fas fa-chart-line fa-fw me-3"></i><span>Admin Registrations</span></a
        >
        <a href="#" class="list-group-item list-group-item-action py-2 ripple">
          <i class="fas fa-chart-pie fa-fw me-3"></i><span></span>
        </a>
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"
          ><i class="fas fa-chart-bar fa-fw me-3"></i><span></span></a
        >
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"
          ><i class="fas fa-globe fa-fw me-3"></i><span></span></a
        >
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"
          ><i class="fas fa-building fa-fw me-3"></i><span></span></a
        >
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"
          ><i class="fas fa-calendar fa-fw me-3"></i><span></span></a
        >
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"
          ><i class="fas fa-users fa-fw me-3"></i><span></span></a
        >
        <a href="#" class="list-group-item list-group-item-action py-2 ripple"
          ><i class="fas fa-money-bill fa-fw me-3"></i><span></span></a
        >
      </div>
    </div>
  </nav>
  {/* <!-- Sidebar --> */}

 
</header>
{/* <!--Main Navigation--> */}

{/* <!--Main layout--> */}
<main style={{marginTop:  " 58px"}}>
  <div class="container pt-4"></div>
</main>
{/* <!--Main layout--> */}
   </div>
  );

};

export default Sidebar;

