import { Container, Paper } from "@mui/material";
import LoginComponent from "../../components/Login";
const Login = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ px: { md: 7, xs: 2 }, minHeight: "100vh" }}>
        <LoginComponent />
      </Paper>
    </Container>
  );
};

export default Login;
