import { Stack, Box, Button } from "@mui/material";
import notfound from "../assets/404.svg";
import { Link } from "react-router-dom";
import {Helmet}from "react-helmet"
const Notfound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Stack justifyContent={"center"} alignItems="center" height={"100vh"}>
        <Box width={{ md: "500px", sm: "300px", xs: "200px" }}>
          <img src={notfound} alt="not found" style={{ width: "100%" }} />
        </Box>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color={"secondary"}
          sx={{ mt: 3 }}
        >
          Go Home
        </Button>
      </Stack>
    </>
  );
};

export default Notfound;
