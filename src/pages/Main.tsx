import { Outlet } from "react-router-dom"
import { Footer, Navbar } from "../components"
import {Box} from "@mui/material"
import {grey} from "@mui/material/colors"
type Props = {}

const Main = (props: Props) => {
  return (
    <Box sx={{backgroundColor:grey[100]}}>
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default Main