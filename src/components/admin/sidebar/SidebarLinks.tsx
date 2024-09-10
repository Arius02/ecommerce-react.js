import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { directLinks } from "../../../constants/sidebarLinks";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  show: boolean;
};
const SidebarLinks = ({ open, setOpen, active, setActive, show }: Props) => {
  return directLinks.map((elm) => (
    <ListItem
      key={elm.key}
      disablePadding
      sx={{
        display: "block",
        backgroundColor:
          active == elm.link && open ? "rgba(220,220,220,.1)" : "transparent",
        borderRadius: "8px",
        color: elm.link == active ? blue[300] : "white",
      }}
      onClick={() => {
        setActive(elm.link);
        show && setOpen(false);
      }}
      component={Link}
      to={elm.link}
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
            color: "white",
          }}
        >
          <elm.icon />{" "}
        </ListItemIcon>
        <ListItemText primary={elm.name} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  ));
};

export default SidebarLinks;
