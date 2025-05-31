import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { Container, Box } from "@mui/material";

const hideHeaderOnPaths = ["/", "/login", "/emergency"];
const noContainerPaths = ["/"];

const Layout = () => {
  const location = useLocation();
  const shouldHideHeader = hideHeaderOnPaths.includes(location.pathname);
  const useFullWidth = noContainerPaths.includes(location.pathname);

  return (
    <Box sx={{ direction: "rtl", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {!shouldHideHeader && <Header />}
      {useFullWidth ? (
        <Outlet />
      ) : (
        <Container maxWidth="lg" sx={{ pt: shouldHideHeader ? 0 : 10 }}>
          <Box
            mt={2}
            sx={{
              minHeight: 'calc(100vh - 100px)', // גובה מינימלי לתוכן
              pb: 4
            }}
          >
            <Outlet />
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default Layout;
