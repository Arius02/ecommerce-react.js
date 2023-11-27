import Login from "../Login";
import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import { AppContext } from "../../context/AppContext";
import { Box } from "@mui/material";


const LoginDialog = () => {
  const { authDialog, setAuthDialog } = useContext(AppContext);
  return (
    <React.Fragment>
      <Dialog
        open={authDialog.open}
        onClose={() =>
          setAuthDialog({
            open: false,
            to: "",
          })
        }
        scroll="body"
        fullWidth
        maxWidth="sm"
        
      >
        <Box p={5} >
          <Login to={authDialog.to} />
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default LoginDialog;
