import { Typography, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MouseEvent, useState } from "react";

const AlertMenu = () => {
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
      <Tooltip title="Notifications">
        <IconButton
          onClick={handleClick}
          size="medium"
          sx={{
            display: "flex",
            "&:hover": {
            },
          }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <NotificationsIcon
            sx={{ color: grey[500],}}
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
        <MenuItem onClick={handleClose}>
          <Stack alignItems={"center"} gap={2} direction={"row"} py={1}>
            {" "}
            <NotificationsIcon color={"info"} />
            <Stack>
              {" "}
              <Typography variant="body2" fontWeight={"bold"}>
                new order for this site
              </Typography>
              <Typography variant="subtitle2">1 year ago</Typography>
            </Stack>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack alignItems={"center"} gap={2} direction={"row"} py={1}>
            {" "}
            <NotificationsIcon color={"info"} />
            <Stack>
              {" "}
              <Typography variant="body2" fontWeight={"bold"}>
                new order for this site
              </Typography>
              <Typography variant="subtitle2">1 year ago</Typography>
            </Stack>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack alignItems={"center"} gap={2} direction={"row"} py={1} pr={4}>
            {" "}
            <NotificationsIcon color={"info"} />
            <Stack>
              {" "}
              <Typography variant="body2" fontWeight={"bold"}>
                new order for this site
              </Typography>
              <Typography variant="subtitle2">1 year ago</Typography>
            </Stack>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
};
export default AlertMenu;
