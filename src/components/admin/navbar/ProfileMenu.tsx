import { Typography } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import person from "../../../assets/001-man.svg";
import { useState, MouseEvent, } from "react";
type Props = {
  isMobile:boolean
};
const ProfileMenu = ({ isMobile }:Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
              backgroundColor: isMobile ? "transparent" : grey[200],
            },
          }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <img
            src={person}
            style={{ width: "30px", marginRight: `${isMobile ? "10px" : 0}` }}
            loading="lazy"
          />
          {isMobile && <p style={{ fontSize: "16px" }}>Profile</p>}
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
          <Typography sx={{ paddingRight: 15 }} color={blueGrey[900]}>
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography color={blueGrey[900]}>Settings</Typography>
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClose}>
          <Typography color={blueGrey[900]}>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
