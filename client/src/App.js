import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Notification from "./pages/Notification";
import Emergency from "./pages/Emergency";
import CallHistory from "./pages/CallHistory";
import Layout from "./common/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="users" element={<Users />} />
          <Route path="notification" element={<Notification />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="callHistory" element={<CallHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;