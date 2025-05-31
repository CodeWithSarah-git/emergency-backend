import { Routes, Route } from "react-router-dom";
import User from "./features/user/UserList";
import Notification from "./features/notification/NotificationList";
import Emergency from "./features/emergency/EmergencyList";
import CallHistory from "./features/history/CallHistoryList";
import AdminDashboard from "./pages/AdminDashboard";
import DashBoard from "./pages/DashBoard";
import HomePage from "./pages/Home"; 
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/PageNotFound";
import Setting from "./pages/Settings";
import Layout from "./common/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} /> 
        <Route path="users" element={<User />} />
        <Route path="notification" element={<Notification />} />
        <Route path="emergency" element={<Emergency />} />
        <Route path="callHistory" element={<CallHistory />} />
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="DashBoard" element={<DashBoard />} />
        <Route path="login" element={<Login />} />
        <Route path="notfound" element={<NotFound />} />
        <Route path="setting" element={<Setting />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}

export default App;
