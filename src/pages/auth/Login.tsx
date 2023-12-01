import { Container, Paper } from "@mui/material";
import LoginComponent from "../../components/Login";
import { Helmet } from "react-helmet";

const Login = () => {
  return (
    <>
      {" "}
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container maxWidth="sm">
        <Paper sx={{ px: { md: 7, xs: 2 }, minHeight: "100vh" }}>
          <LoginComponent />
        </Paper>
      </Container>
    </>
  );
};

export default Login;
