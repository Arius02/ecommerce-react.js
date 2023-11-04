import { Outlet } from "react-router-dom"
import { Footer, Navbar } from "../components"
import {Box} from "@mui/material"
import {grey} from "@mui/material/colors"
import React from "react"
import CartDrawer from "../components/cart/CartDrawer"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {pink} from "@mui/material/colors"

const Main = () => {
const theme = createTheme({
  palette: {
    secondary: pink
  },
});
    const [cartDrawerOpen, setCartDrawerOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}> 

    <Box sx={{ backgroundColor: grey[100] }}>
      <Navbar
        setCartDrawerOpen={setCartDrawerOpen}
      />
      <CartDrawer
        cartDrawerOpen={cartDrawerOpen}
        setCartDrawerOpen={setCartDrawerOpen}
      />
       
      <Outlet />
      <Footer />
    </Box>
    </ThemeProvider>

  );
}

export default Main