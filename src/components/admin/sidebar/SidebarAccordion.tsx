import * as React from "react";
import { List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { blueGrey, blue } from "@mui/material/colors";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";import Accordion from "@mui/material/Accordion";
import { sidebarAccordoin } from "../../../constants/sidebarLinks";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  expanded: string| false;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>> 
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>
};
const SidebarAccordion = ({ open, setOpen, show ,expanded, setExpanded,active, setActive }: Props) => {

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      console.log(event); //to be cleared
      setExpanded(isExpanded ? panel : false);
    };

  return sidebarAccordoin.map((elm) => (
    <Accordion
      expanded={expanded === elm.key}
      onChange={handleChange(elm.key)}
      sx={{ backgroundColor: blueGrey[900], boxShadow: 0 }}
      key={elm.key}
      onClick={() => !show && setOpen(true)}
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
            <Link key={ele.key} to={ele.link} style={{ textDecoration: "none" }}>
              <ListItem
                key={ele.key}
                disablePadding
                sx={{
                  display: "block",
                  color: ele.link == active ? blue[300] : "white",
                }}
                onClick={() => {
                  setActive(ele.link);
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
  ));
};

export default SidebarAccordion;
