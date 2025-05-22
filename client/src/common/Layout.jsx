
import { Outlet } from "react-router-dom";
import Header from "./Header"; // ודאי שהנתיב נכון לפי המיקום שלך
import { Container, Box } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Header /> {/* זה הסרגל העליון שלך עם הלינקים */}
      <Container maxWidth="lg">
        <Box mt={4}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;