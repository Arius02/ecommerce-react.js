import { Typography,Link,Menu,
 MenuItem,
 Divider,
 IconButton,
 Tooltip, } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import person from "../../../assets/001-man.svg";
import { useState, MouseEvent, } from "react";
import useAuthMutationHook from "../../../hooks/useAuthMutationHook";
import {Link as RouterLink} from "react-router-dom"

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const {mutate:logOut}=useAuthMutationHook(
{
  url:"/auth/logout",
  method:"PATCH",

}
)
  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="medium"
          sx={{
            color: blueGrey[900],
            display: "flex",
            "&:hover": {
            },
          }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <img
            src={person}
            loading="lazy"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 0px 10px rgba(0,0,0,0.1))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="body1" fontWeight={"bold"}>
            Mahmoud Walid
          </Typography>
          <Typography variant="subtitle2" color={blueGrey[100]}>
            Admin
          </Typography>
        </MenuItem>

        <Divider />
        <MenuItem onClick={handleClose}>
          <Link
            component={RouterLink}
            to="/"
            sx={{ paddingRight: 15 }}
            color={blueGrey[900]}
            underline="none"
          >
            Store
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Link
            component={RouterLink}
            to="/dashboard"
            sx={{ paddingRight: 15 }}
            color={blueGrey[900]}
            underline="none"
          >
            Profile
          </Link>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
          <Typography sx={{ color: blueGrey[900] }} onClick={()=>logOut({})}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
