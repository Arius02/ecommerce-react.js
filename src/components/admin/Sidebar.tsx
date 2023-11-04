import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { Box, Container,List } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { blueGrey, blue, grey } from "@mui/material/colors";
import logo from "../../assets/logo.svg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { sidebarAccordoin } from "../../constants/sidbarAccordion";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import LogoutIcon from "@mui/icons-material/Logout";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import {Link} from "react-router-dom"
const drawerWidth = 280;

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
    duration: theme.transitions.duration.leavingScreen,
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
}));

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Content: React.ReactNode;
};
const Sidebar = ({ open, setOpen, Content }: Props) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [active, setActive] = useState(window.location.pathname);

  const handleChange =
    (panel: string) =>
    (event: React.SyntheticEvent /*@ts-igonre*/, isExpanded: boolean) => {
      console.log(event) //to be cleared
      setExpanded(isExpanded ? panel : false);
    };
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
            "&::-webkit-scrollbar": {
              width: " 5px",
            },
            "&::-webkit-scrollbar-track": {
              background: blueGrey[900],
            },
            "&::-webkit-scrollbar-thumb": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: grey[500],
            },
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
            onClick={() => setActive("/dashboard")}
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
                  color: active == "/dashboard" && !open ? blue[300] : "white",
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
          {sidebarAccordoin.map((elm) => (
            <Accordion
              expanded={expanded === elm.key}
              onChange={handleChange(elm.key)}
              sx={{ backgroundColor: blueGrey[900], boxShadow: 0 }}
              key={elm.key}
              onClick={() => setOpen(true)}
            >
              <AccordionSummary
                expandIcon={open && <ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel1bh-content"
                id={`panel1bh-header-${elm.name}`}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  display: "flex",
                  backgroundColor:
                    active.startsWith("/dashboard" + elm.link) && open
                      ? "rgba(220,220,220,.1)"
                      : "transparent",
                  borderRadius: "8px",
                }}
              >
                <elm.icon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    color:
                      active.startsWith("/dashboard" + elm.link) && !open
                        ? blue[300]
                        : "white",
                  }}
                />
                <Typography
                  sx={{
                    display: open ? "block" : "none",
                    color: active.startsWith("/dashboard" + elm.link)
                      ? blue[300]
                      : "white",
                  }}
                >
                  {elm.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <List>
                  {elm.children.map((ele) => (
                    <Link to={ele.link} style={{textDecoration:"none"}}>
                      <ListItem
                        key={ele.key}
                        disablePadding
                        sx={{
                          display: "block",
                          color: ele.link == active ? blue[300] : "white",
                        }}
                        onClick={() => {
                          console.log(elm.link, ele.link);
                          setActive(ele.link);
                        }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          &bull;
                          <ListItemText
                            primary={ele.name}
                            sx={{ opacity: open ? 1 : 0, ml: "10px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
        <Divider />
        <List sx={{ px: open ? "15px" : 0 }}>
          {[
            { name: "Customers", key: "iohug", icon: RecentActorsIcon },
            { name: "Settings", key: "uhu", icon: TuneIcon },
            { name: "Log Out", key: "huh", icon: LogoutIcon },
          ].map((elm) => (
            <ListItem key={elm.key} disablePadding sx={{ display: "block" }}>
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
                    color: "white",
                  }}
                >
                  <elm.icon />{" "}
                </ListItemIcon>
                <ListItemText
                  primary={elm.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0, my:8,width:"80%"}}>
        <DrawerHeader />
        <Container maxWidth="xl"   >{Content}</Container>
      </Box>
    </>
  );
};

export default Sidebar;
