import { Outlet } from "react-router-dom"
import { Navbar } from "../components"
import {Box} from "@mui/material"
import {grey} from "@mui/material/colors"
import React from "react"
import CartDrawer from "../components/cart/CartDrawer"
import LoginDialog from "../components/dailogs/LoginDialog"


const Main = () => {

const [cartDrawerOpen, setCartDrawerOpen] = React.useState(false);

  return (
        <Box sx={{ backgroundColor: grey[100] }}>
          <Navbar setCartDrawerOpen={setCartDrawerOpen} />
          <CartDrawer
            cartDrawerOpen={cartDrawerOpen}
            setCartDrawerOpen={setCartDrawerOpen}
          />

          <Outlet />
          {/* <Footer /> */}
     <LoginDialog />
        </Box>
  );
}

export default Main;