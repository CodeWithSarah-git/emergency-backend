import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { Container, Box } from "@mui/material";

const hideHeaderOnPaths = ["/", "/login", "/emergency"];

const Layout = () => {
  const location = useLocation();
  const shouldHideHeader = hideHeaderOnPaths.includes(location.pathname);

  return (
    <Box sx={{ direction: "rtl", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {!shouldHideHeader && <Header />}
      <Container maxWidth="lg" sx={{ pt: 6 }}>
        <Box mt={2}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;