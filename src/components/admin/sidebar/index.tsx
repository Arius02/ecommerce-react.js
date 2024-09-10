import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { Box, Container, List } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { blueGrey, blue } from "@mui/material/colors";
import logo from "../../../assets/logo.svg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import { Link } from "react-router-dom";
import scrollBarStyles from "../../../style/scrollBar";
import SidebarAccordion from "./SidebarAccordion";
import SidebarLinks from "./SidebarLinks";
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Content: React.ReactNode;
  drawerWidth: string;
  show: boolean;
};
const Sidebar = ({ open, setOpen, Content, drawerWidth, show }: Props) => {
  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: 900,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
    display: !open && show ? "none" : "block",
  }));
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [active, setActive] = useState(window.location.pathname);

  const theme = useTheme();
  const handleDrawerClose = () => {
    setOpen(false);
    setExpanded(false);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: blueGrey[900],
            color: "white",
            display: !open && show ? "none" : "block",
            ...scrollBarStyles,
          },
        }}
      >
        <DrawerHeader sx={{ justifyContent: "space-between" }}>
          <img src={logo} loading="lazy" style={{ width: "90px" }} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ px: open ? "15px" : 0 }}>
          <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
            <ListItem
              key={"Dpkd"}
              disablePadding
              sx={{
                display: "block",
                backgroundColor:
                  active == "/dashboard" && open
                    ? "rgba(220,220,220,.1)"
                    : "transparent",
                borderRadius: "8px",
              }}
              onClick={() => {
                setActive("/dashboard");
                show && setOpen(false);
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color:
                      active == "/dashboard" && !open ? blue[300] : "white",
                  }}
                >
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Dashboard"}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: active == "/dashboard" ? blue[300] : "white",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          <SidebarAccordion
            open={open}
            setOpen={setOpen}
            show={show}
            expanded={expanded}
            setExpanded={setExpanded}
            active={active}
            setActive={setActive}
          />
          <Divider />
          <SidebarLinks
            open={open}
            setOpen={setOpen}
            active={active}
            setActive={setActive}
            show={show}
          />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0, my: 8, width: "80%" }}>
        <DrawerHeader />
        <Container maxWidth="xl">{Content}</Container>
      </Box>
    </>
  );
};

export default Sidebar;
