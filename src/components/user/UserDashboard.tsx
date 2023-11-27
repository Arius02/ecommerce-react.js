import {
  Box,
  Paper,
  Typography,
  Link,
  Drawer,
  IconButton,
} from "@mui/material";
import links from "../../constants/userDashboard";
import { Link as RouterLink } from "react-router-dom";
import { pink, blueGrey } from "@mui/material/colors";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import CloseIcon from "@mui/icons-material/Close";
const UserDashboard = () => {
  const [active, setActive] = useState(window.location.pathname.split("/")[2]);
  const { openUserDashboard, setOpenUserDashboard, show } =
    useContext(AppContext);
  type DashboardProps = {
    title: string;
    links: any;
  };
  const DashBoard = ({ links, title }: DashboardProps) => {
    return (
      <>
        <Box mb={5}>
          <Typography variant="subtitle1" color="grey" mb={2} px={3}>
            {title}
          </Typography>
          {links.map((link: any) => (
            <Link
              component={RouterLink}
              to={link.to}
              underline="none"
              key={link.to}
              color="black"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                fontWeight: "light",
                px: 3,
                borderLeft:
                  active === link.to.split("/")[2]
                    ? `3px solid ${pink[500]}`
                    : `3px solid transparent`,
                "&:hover": {
                  color: pink[500],
                  borderLeft: `3px solid ${pink[500]}`,
                },
                color:
                  active === link.to.split("/")[2] ? pink[500] : blueGrey[700],
              }}
              variant="body1"
              onClick={() => setActive(link.to.split("/")[2])}
            >
              {<link.icon sx={{ mr: 1, fontSize: "20px" }} />}
              {link.name}
            </Link>
          ))}
        </Box>
      </>
    );
  };
  return show ? (
    <Drawer
      variant="temporary"
      anchor="left"
      open={openUserDashboard}
      onClose={() => setOpenUserDashboard(false)}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "300px",
        },
      }}
    >
      <IconButton
        onClick={() => setOpenUserDashboard(false)}
        sx={{ ml: "auto", mb: 4 }}
      >
        <CloseIcon />
      </IconButton>
      <DashBoard links={links.dashboard} title="Dashboard" />
      <DashBoard links={links.accountSettings} title="Account Settingd" />
    </Drawer>
  ) : (
    <Paper sx={{ py: 3 }}>
      <DashBoard links={links.dashboard} title="Dashboard" />
      <DashBoard links={links.accountSettings} title="Account Settingd" />
    </Paper>
  );
};

export default UserDashboard;
