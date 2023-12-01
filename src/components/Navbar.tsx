import React, { Dispatch, SetStateAction, useContext } from "react";
import {
  Stack,
  Box,
  Drawer,
  Typography,
  Link,
  Container,
  Badge,
} from "@mui/material";
import logo from "../assets/logo2.svg";
import samllLogo from "../assets/bazaar-black-sm.svg";
import SearchInput from "./search/SearchInput";
import IconButton from "@mui/material/IconButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { blueGrey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import useCartQueryHook from "../hooks/useCartQueryHook";
import useAuthMutationHook from "../hooks/useAuthMutationHook";
import LogoutIcon from "@mui/icons-material/Logout";
import systemRoles from "../utils/systemRoles";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
type Props = {
  setCartDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ setCartDrawerOpen }: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const { show, setAuthDialog, auth } = useContext(AppContext);
  const handleUserIconClick = () => {
    const isUser =
      auth.role != systemRoles.SuperAdmin &&
      auth.role != systemRoles.SuperAdmin;
    if (auth._id && isUser) {
      navigate("/user");
    } else if (isUser) {
      setAuthDialog({
        open: true,
        to: "/user",
      });
    }
  };
  const { data: cart } = useCartQueryHook({
    query: "getCart",
    selectedProp: "cart",
  });
  const { mutate: logout } = useAuthMutationHook({
    url: "/auth/logout",
    method: "PATCH",
  });
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
            {auth.role != systemRoles.SuperAdmin &&
              auth.role != systemRoles.Admin && (
                <IconButton
                  onClick={handleUserIconClick}
                  type="button"
                  sx={{ p: "14px" }}
                  aria-label="user"
                >
                  <PersonOutlineIcon />
                </IconButton>
              )}
            {auth._id&&auth.role != systemRoles.User && (
              <IconButton
                component={LinkRouter}
                to="/dashboard"
                onClick={handleUserIconClick}
                type="button"
                sx={{ p: "14px" }}
                aria-label="user"
              >
                <DashboardCustomizeIcon />
              </IconButton>
            )}

            {auth.role != systemRoles.SuperAdmin &&
              auth.role != systemRoles.Admin && (
                <Badge badgeContent={cart?.products.length} color="secondary">
                  <IconButton
                    type="button"
                    sx={{ p: "14px" }}
                    aria-label="cart"
                    onClick={() => setCartDrawerOpen(true)}
                  >
                    <ShoppingBagIcon sx={{ color: blueGrey[400] }} />
                  </IconButton>
                </Badge>
              )}
            {auth._id && (
              <IconButton
                type="button"
                sx={{ p: "14px" }}
                aria-label="cart"
                onClick={() => logout({})}
              >
                <LogoutIcon sx={{ color: blueGrey[400] }} />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
