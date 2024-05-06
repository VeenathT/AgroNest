import React, { useState, useEffect } from "react";
import { Card, Space, Statistic, Typography } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import dashBackground from "../../images/Rahul/h1.jpeg"

function Dashboard() {
  const [adminName, setAdminName] = useState('');
  const [dealersCount, setDealersCount] = useState(0);
  const [farmersCount, setFarmersCount] = useState(0);
  const [inquiriesCount, setInquiriesCount] = useState(0);

  useEffect(() => {
    fetchAdminName();
    fetchDealersCount();
    fetchFarmersCount();
    fetchInquiriesCount();
  }, []);

  const fetchAdminName = async () => {
    try {
      const response = await axios.get("http://localhost:8070/api/auth/admins", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAdminName(response.data.username);
    } catch (error) {
      console.error("Error fetching admin name:", error);
    }
  };

  const fetchDealersCount = async () => {
    try {
      const response = await axios.get("http://localhost:8070/countDealer");
      setDealersCount(response.data.count);
    } catch (error) {
      console.error("Error fetching dealers count:", error);
    }
  };

  const fetchFarmersCount = async () => {
    try {
      const response = await axios.get("http://localhost:8070/countFarmer");
      setFarmersCount(response.data.count);
    } catch (error) {
      console.error("Error fetching farmers count:", error);
    }
  };

  const fetchInquiriesCount = async () => {
    try {
      const response = await axios.get("http://localhost:8070/countPendingFarmerReports");
      setInquiriesCount(response.data.count);
    } catch (error) {
      console.error("Error fetching inquiries count:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Typography.Title level={2} style={{ marginTop: "120px" }}>Welcome, {adminName}</Typography.Title>
      <Space size={20}>
        <DashboardCard title={"Dealers"} value={dealersCount} link="/viewdelaers" />
        <DashboardCard title={"Farmers"} value={farmersCount} link="/viewfarmers" />
        <DashboardCard title={"Inquiries"} value={inquiriesCount} link="/userreports" />
      </Space>
      <Typography.Title level={3} style={{ marginTop: "50px" }}>Other Links</Typography.Title>
      <Space size={20} style={{ marginTop: "20px" ,fontSize:"2em" }}>
        <LinkCard title={"Farmers"} link="/viewfarmers" />
        <LinkCard title={"Dealers"} link="/viewdealers" />
        <LinkCard title={"Inquiries"} link="/userreports" />
        <LinkCard title={"Laboratory"} link="/labrotaryview" />
        <LinkCard title={"Articles & Promotion"} link="/addarticle" />
        
      </Space>
    </div>
  );
}

function DashboardCard({ title, value, link }) {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <Card
        style={{
          width: "130px",
          height: "95px",
          marginTop: "20px",
          background: "linear-gradient(to top, #ccffcc, #001a00)",
          color: "white",
        }}
      >
        <Space
          direction="vertical"
          align="center"
          style={{ marginTop: "-45px" }}
        >
          <Typography.Text strong style={{ fontSize: "19px",color:"white" }}>{title}</Typography.Text>
          <Statistic value={value} />
        </Space>
      </Card>
    </Link>
  );
}

function LinkCard({ title, link }) {
    return (
      <Link to={link} style={{ textDecoration: "none" }}>
        <Card
          style={{
            width: "200px",
            height: "140px",
            marginTop: "20px",
            backgroundImage: `url(${dashBackground}` , 
            backgroundSize: "cover", // Make sure the image covers the entire card
            backgroundPosition: "center", // Center the image
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Space
            direction="vertical"
            align="center"
          >
            <Typography.Text strong style={{ fontSize: "30px" }}>{title}</Typography.Text>
          </Space>
        </Card>
      </Link>
    );
  }

export default Dashboard;
