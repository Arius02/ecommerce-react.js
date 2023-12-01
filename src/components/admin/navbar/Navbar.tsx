import { IconButton,  Toolbar, Typography ,Stack} from "@mui/material";
import { AlertMenu, ProfileMenu } from "..";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled,  } from "@mui/material/styles";
import {grey} from "@mui/material/colors"
import Box from "@mui/material/Box";
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
          <Stack flexDirection="row" >
            <AlertMenu  />
            <ProfileMenu  />
          </Stack>
        
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;



  
  
