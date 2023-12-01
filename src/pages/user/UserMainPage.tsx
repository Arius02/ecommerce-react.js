import { Outlet } from "react-router-dom";
import { Grid, Box, Container } from "@mui/material";

import UserDashboard from "../../components/user/UserDashboard";


const UserMainPage = () => {
  return (
    <Container maxWidth="lg">
      <Grid container mt={5} minHeight={"100vh"}>
        <Grid item md={3} xs={0}>
          <UserDashboard />
        </Grid>
        <Grid item md={9} xs={12}>
          <Box p={2}>{<Outlet />}</Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserMainPage;
