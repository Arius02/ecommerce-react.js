import {  Box, Paper, Typography,  Link } from "@mui/material";
import links from "../../constants/userDashboard";
import { Link as RouterLink } from "react-router-dom";
import { pink, blueGrey } from "@mui/material/colors";
import { useState } from "react";

const UserDashboard = () => {
    const [active, setActive] = useState(window.location.pathname.split("/")[2]);
  return (
    <Box p={2}>
      <Paper sx={{ py: 3 }}>
        <Box mb={5}>
          <Typography variant="subtitle1" color="grey" mb={2} px={3}>
            Dashboard
          </Typography>
          {links.dashboard.map((link: any) => (
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
        <Typography variant="subtitle1" color="grey" mb={2} px={3}>
          Account Settings
        </Typography>
        {links.accountSettings.map((link: any) => (
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
      </Paper>
    </Box>
  );
};

export default UserDashboard;
