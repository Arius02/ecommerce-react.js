import { IconButton,  Toolbar, Typography } from "@mui/material";
import { AlertMenu, ProfileMenu } from "..";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled,  } from "@mui/material/styles";
import {useState,useEffect} from "react";
import {grey} from "@mui/material/colors"
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
type Props = {
  open: boolean;
  handleDrawerOpen: () => void;
  drawerWidth:string
};
const Navbar = ({ open, handleDrawerOpen, drawerWidth }: Props) => {
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth})`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
   const [isMobile, setIsMobile] = useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };



  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

 
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <AlertMenu isMobile={isMobile} />
      </MenuItem>
      <MenuItem>
        <ProfileMenu isMobile={isMobile} />
   
      </MenuItem>
    </Menu>
  );

   const handleMobileDisplay = (windowSize: number) => {
     if (windowSize <= 899) {
       setIsMobile(true);
     } else {
       setIsMobile(false);
     }
   };

   useEffect(() => {
     const handleSidebarDisplay = () => handleMobileDisplay(window.innerWidth);
     window.addEventListener("resize", handleSidebarDisplay);
     handleSidebarDisplay();
     return () => window.removeEventListener("resize", handleSidebarDisplay);
   }, []);
  return (
    <>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "white",
          color: grey[500],
        }}
      >
        <Toolbar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
              {" "}
              <Typography
                fontWeight={"semibold"}
                variant="h1"
                fontSize={"35px"}
                color={"grey"}
              >
                Dashboard
              </Typography>
            </Link>
          </Toolbar>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <AlertMenu isMobile={isMobile} />

            <ProfileMenu isMobile={isMobile} />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default Navbar;



  
  
