import { Stack, Box } from "@mui/material";
import unauthrized from '../../assets/error_401.jpg'
import { Helmet } from "react-helmet";

const Unauthorized = () => {
  return (
    <>
      <Helmet>
        <title>Unauthorized</title>
      </Helmet>
      <Stack justifyContent="center" alignItems="center" height="100vh">
        <Box p={2} width={{ xs: "100%", md: "60%" }}>
          <img src={unauthrized} alt="unauthrized" style={{ width: "100%" }} />
        </Box>
      </Stack>
    </>
  );
}

export default Unauthorized