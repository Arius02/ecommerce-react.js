import React, { Dispatch, SetStateAction } from 'react'
import { Stack, Box, Drawer, Typography,Link,Container } from "@mui/material";
import logo from "../assets/logo2.svg"
import samllLogo from "../assets/bazaar-black-sm.svg"
import SearchInput from './search/SearchInput'
import IconButton from "@mui/material/IconButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { blueGrey } from '@mui/material/colors';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import {Link as LinkRouter} from "react-router-dom"
import { useSelector } from 'react-redux';
type Props = {
  setCartDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ setCartDrawerOpen,  }: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
    const show = useSelector((state: any) => state.screenSize.show);
  
  return (
    <Box bgcolor={"white"}>
      <Container maxWidth="xl">
        <Stack
          flexDirection={"row"}
          px={3}
          py={2}
          justifyContent={"space-between"}
        >
          <Link to="/" component={LinkRouter}>
            {!show && <img src={logo} alt="logo" />}
            {show && <img src={samllLogo} alt="logo" />}
          </Link>
          {!show && (
            <Box width={"50%"} display={{ md: "block", xs: "none" }}>
              <SearchInput />
            </Box>
          )}
          {show && (
            <Drawer
              anchor={"top"}
              variant="temporary"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: "100%",
                  height: "40%",
                  p: 2,
                },
              }}
            >
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={2}
              >
                <Typography>Search in Bazar</Typography>
                <IconButton
                  type="button"
                  sx={{ p: "14px" }}
                  aria-label="close"
                  onClick={() => setMobileOpen(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
              <SearchInput />
            </Drawer>
          )}

          <Stack flexDirection={"row"}>
            {show && (
              <IconButton
                type="button"
                sx={{ p: "14px" }}
                aria-label="search"
                onClick={() => setMobileOpen(true)}
              >
                <SearchIcon />
              </IconButton>
            )}
            <IconButton component={LinkRouter} to="/auth/register" type="button" sx={{ p: "14px" }} aria-label="user">
              <PersonOutlineIcon />
            </IconButton>
            <IconButton
              type="button"
              sx={{ p: "14px" }}
              aria-label="cart"
              onClick={() => setCartDrawerOpen(true)}
            >
              <ShoppingBagIcon sx={{ color: blueGrey[400] }} />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar