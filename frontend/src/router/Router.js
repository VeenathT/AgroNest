import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
//common
import LandingPage from '../pages/common/LandingPage';
import Header from '../Component/common/header';
import LoginType from '../pages/common/LoginType';
import SignupType from '../pages/common/SignUpType';
import ProfType from '../pages/common/ProfileType';
//Sudarshan
import DealerProf from '../pages/Sudarshan/DealerProf';
import LoginPage from '../pages/Sudarshan/DealerLogin';
import SignupPage from '../pages/Sudarshan/DealerSignUp';
import EditProfile from '../pages/Sudarshan/editProf';
import ManageShop from '../pages/Sudarshan/ManageShop';
import Orders from '../pages/Sudarshan/Orders';
import ShopAnalysis from '../pages/Sudarshan/Analysis';
//Veenath
import InquiryCategory from '../pages/Veenath/InquiryPages/inquiryCategory';
import FormPage from '../pages/Veenath/InquiryPages/formPage';
import FarmerInquiry from '../pages/Veenath/InquiryPages/farmerInquiry';
import DealerInquiry from '../pages/Veenath/InquiryPages/dealerInquiry';
import FeedbackForm from '../pages/Veenath/FeedbackPages/FeedbackForm';
import PastFeedbackList from '../pages/Veenath/FeedbackPages/PastFeedbackList';
import FeedbackCardView from '../pages/Veenath/FeedbackPages/FeedbackCardView';
import DealerRating from '../pages/Veenath/FeedbackPages/DealerRating';
//Oshini
import LabSignUp from '../pages/Oshini/signup';
import LabLogin from '../pages/Oshini/labLogin'
import LabDash from '../pages/Oshini/labDash';
import LabProfile from '../pages/Oshini/labProfile';
import LabEdit from '../pages/Oshini/labEdit';
import TestAccept from '../pages/Oshini/accepted';
import TestComplete from '../pages/Oshini/completed';
import FileUpload from '../pages/Oshini/uploadFile';
//Lasindu
import ItemView from '../Component/Lasindu/ItemView';
import OrderHistoryPage from '../Component/Lasindu/orderHistory';
import UpdateOrderDialog from '../Component/Lasindu/orderUpdate';
import ItemList from '../Component/Lasindu/Itemlist';
//Thisaravi
import RegisterForm from '../pages/Thisaravi/RegisterForm';
import Profile from '../pages/Thisaravi/Profile';
import FarmerProfile from '../Component/Thisaravi/FarmerProfile';
import Sidebar from '../Component/Thisaravi/Sidebar';
import SoilTestRequest from '../pages/Thisaravi/SoilTest/SoilTestRequest';
import TestServices from '../pages/Thisaravi/SoilTest/TestServices';
import ViewRequests from '../pages/Thisaravi/SoilTest/ViewRequests';
import RequestDetails from '../pages/Thisaravi/SoilTest/RequestDetails';
import UpdateRequest from '../pages/Thisaravi/SoilTest/UpdateRequest';
import Login from '../pages/Thisaravi/Login';
import TestType from '../pages/Thisaravi/SoilTest/TestType';
import ViewResolvedRequests from '../pages/Thisaravi/SoilTest/ViewResolvedRequests';
import UpdateProfile from '../pages/Thisaravi/UpdateProfile';
//Nilupul
import ArticleList from '../pages/Nilupul/ArticleList';
import ArticleForm from '../pages/Nilupul/ArticleForm';
import Form from '../pages/Nilupul/Form';
import DataTable from '../pages/Nilupul/DataTable';
import GmailButton from '../pages/Nilupul/GmailButton';
//Rahul
import DealerList from '../Component/Rahul/DealerList';
import FarmerList from '../Component/Rahul/FarmerList';
import LabCards from '../Component/Rahul/LabCard';
import FullWidthTabs from '../Component/Rahul/FullWidthTabs';
import AdminLogin from '../Component/Rahul/AdminLogin';
import AdminDashboard from '../pages/Rahul/AdminDashboard';
//Kande
import TopFertilizer from  '../pages/Kande/TopfertilizerScreen';
import AddTopAreas from '../pages/Kande/TopAreaScreen';
import SysManagerDashboard from '../pages/Kande/SysManagerDashboard';
import ViewTopFertilizer from '../pages/Kande/ViewTopFertilizer';
import MLogin from '../Component/Kande/login/MLogin';
import TopArea from '../pages/Kande/TopAreaScreen';
import AddTopfertilizer from'../Component/Kande/AddTopSelling'
import ViewTopSellers from '../pages/Kande/ViewTopSelling';
import  ViewTopRegisterdArea from'../pages/Kande/ViewTopAreas'
import AddAdminForm from '../Component/Kande/FormCntainer/Form'
import ViewAdmin from '../Component/Kande/ViewAdmins'

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }else {
      setIsLoggedIn(false); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); 
  };

  return (
    <>
      {isLoggedIn && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      
      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} />} />
        <Route path="/loginDealer" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signupDealer" element={<SignupPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profileDealer" element={<DealerProf isLoggedIn={isLoggedIn} />} />
        <Route path="/editProf" element={<EditProfile />} />
        <Route path="/manageShop" element={<ManageShop />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/logintype" element={<LoginType />} />
        <Route path="/signuptype" element={<SignupType />} />
        <Route path="/profiletype" element={<ProfType />} />
        <Route path="/analysis" element={<ShopAnalysis />} />
        <Route path="/inquiryCategory" element={<InquiryCategory />} />
        <Route path="/farmerInquiry" element={<FarmerInquiry />} />
        <Route path="/dealerInquiry" element={<DealerInquiry />} />
        <Route path="/formPage" element={<FormPage />} />
        <Route path="/FeedbackForm" element={<FeedbackForm />} />
        <Route path="/FeedbackForm/:feedbackId" element={<FeedbackForm />} />
        <Route path="/PastFeedbackList" element={<PastFeedbackList />} />
        <Route path="/FeedbackCardView" element={<FeedbackCardView />} />
        <Route path="/DealerRating" element={<DealerRating />} />
        <Route path="/RegisterForm" element={<RegisterForm />} />
        <Route path="/Profile/:farmerID" element={<FarmerProfile />} />
        <Route path="/farmer/:farmerID" element={<FarmerProfile />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/soil-test-request" element={<SoilTestRequest />} />
        <Route path="/soil-test" element={<TestServices />} />
        <Route path="/pending-requests" element={<ViewRequests />} />
        <Route path="/soil-test/:requestId" element={<RequestDetails />} />
        <Route path="/update-request/:requestId" element={<UpdateRequest />} />
        <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/test-types" element={<TestType />} />
        <Route path="/resolved-requests" element={<ViewResolvedRequests />} />
        <Route path="/edit-profile/:farmerID" element={<UpdateProfile />} />
        <Route path="/labSignup" element={<LabSignUp />} />
        <Route path="/labLogin" element={<LabLogin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/labDash" element={<LabDash />} />
        <Route path="/labProfile" element={<LabProfile />} />
        <Route path="/labEdit" element={<LabEdit />} />
        <Route path="/accepted" element={<TestAccept />} />
        <Route path="/completed" element={<TestComplete />} />
        <Route path="/uploadFile" element={<FileUpload />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/addarticle" element={<ArticleForm />} />
        <Route path="/form" element={<Form />} />
        <Route path="/datatable" element={<DataTable />} />
        <Route path="/gmail" element={<GmailButton />} />
        <Route path="/Itemlist" element={<ItemList />} />
        <Route path="/Item/:id" element={<ItemView />} />
        <Route path="/Order-History" element={<OrderHistoryPage />} />
        <Route path="/update-order/:id" element={<UpdateOrderDialog open={true} />} />
        <Route path="/viewdealers" element={<DealerList />} />
        <Route path="/viewfarmers" element={<FarmerList />} />
        <Route path="/labrotaryview" element={<LabCards />} />
        <Route path="/userreports" element={<FullWidthTabs />} />
        <Route path="/admin/login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin/home" element={<AdminDashboard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/datatable" element={<DataTable />} />
        <Route path="/gmail" element={<GmailButton />} />
        <Route path="/addtopfertilizers" element={<TopFertilizer />} />
        <Route path="/viewtopfertilizers" element={<ViewTopFertilizer />} />
        <Route path="/addtopsellingfertilizers" element={<AddTopfertilizer />} />
        <Route path="/addtopareas" element={<AddTopAreas />} />
        <Route path="/managerdashboard" element={<SysManagerDashboard />} />
        <Route path="/MLogin" element={<MLogin />} />
        <Route path="/TopArea" element={<TopArea />} />
        <Route path="/TopSellers" element={<ViewTopSellers />} />
        <Route path="/ViewTopRegisterdArea" element={<ViewTopRegisterdArea />} />
        <Route path="/addadmin" element={<AddAdminForm />} />
        <Route path="/viewadmin" element={<ViewAdmin />} />
      </Routes>
    </>
  );
};

export default Router;
