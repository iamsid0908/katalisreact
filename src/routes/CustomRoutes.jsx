import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landingPages/LandingPage";
import Login from "../pages/authPages/Login";
import Register from "../pages/authPages/Register";
import WrongPage from "../pages/landingPages/WrongPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../pages/dashboardPages/Dashboard";
import MagicWand from "../pages/dashboardPages/MagicWand";
import Analytics from "../pages/dashboardPages/Analytics";
import ActiveManage from "../pages/dashboardPages/ActiveManage";
import MayaVA from "../pages/dashboardPages/MayaVA";
import Presets from "../pages/dashboardPages/Presests";
import Help from "../pages/dashboardPages/Help";
import Settings from "../pages/dashboardPages/Settings";
import Accounts from "../pages/dashboardPages/Accounts";
import Sidebar from "../components/dashboard/Sidebar";
import EditImageMagicWand from "../pages/dashboardPages/EditImageMagicWand";
import CheckImageMagicWand from "../pages/dashboardPages/CheckImageMagicWand";
import CheckEnglishMagicWand from "../pages/dashboardPages/CheckEnglishMagicWand";
import CheckBahasaMagicWand from "../pages/dashboardPages/CheckBahasaMagicWand";
import MagicStudio from "../pages/dashboardPages/MagicStudio";

const CustomRoutes = () => {
  return (
    <Routes>
      {/* -----------------------  PUBLIC ROUTES  --------------------- */}
      {/* <Route exact path="/" element={<LandingPage />} /> */}
      <Route exact path="/" element={<Login />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />

      {/* ------------------------  PROTECTED ROUTES  -------------------- */}
      <Route exact path="/main" element={<ProtectedRoutes element={Sidebar} />}>
        <Route exact path="/main/dashboard" element={<ProtectedRoutes element={Dashboard} />} />
        <Route exact path="/main/analytics" element={<ProtectedRoutes element={Analytics} />} />
        <Route exact path="/main/magicstudio" element={<ProtectedRoutes element={MagicStudio}/>}/>
        <Route exact path="/main/magic-wand" element={<ProtectedRoutes element={MagicWand} />} />
        <Route exact path="/main/magic-wand/edit" element={<ProtectedRoutes element={EditImageMagicWand} />} />
        <Route exact path="/main/magic-wand/check-image" element={<ProtectedRoutes element={CheckImageMagicWand} />} />
        <Route exact path="/main/magic-wand/check-english" element={<ProtectedRoutes element={CheckEnglishMagicWand} />} />
        <Route exact path="/main/magic-wand/check-bahasa" element={<ProtectedRoutes element={CheckBahasaMagicWand} />} />
        <Route exact path="/main/active-manage" element={<ProtectedRoutes element={ActiveManage} />} />
        <Route exact path="/main/maya-va" element={<ProtectedRoutes element={MayaVA} />} />
        <Route exact path="/main/presets" element={<ProtectedRoutes element={Presets} />} />
        <Route exact path="/main/help" element={<ProtectedRoutes element={Help} />} />
        <Route exact path="/main/settings" element={<ProtectedRoutes element={Settings} />} />
        <Route exact path="/main/accounts" element={<ProtectedRoutes element={Accounts} />} />
      </Route>
      <Route exact path="*" element={<WrongPage/>} />
    </Routes>
  );
};

export default CustomRoutes;
