import {  Snackbar, Alert } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
type Props = {
  snack: SnackbarType;
  setSnack: Dispatch<SetStateAction<SnackbarType>>;
};

const SnackbarComponent = ({ snack, setSnack }: Props) => {
  return (
    <Snackbar
      open={snack.open}
      autoHideDuration={6000}
      onClose={() => setSnack({ ...snack, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      key={"top" + "center"}
    >
      <Alert
        onClose={() => setSnack({ ...snack, open: false })}
        severity={snack.severity}
        sx={{ width: "100%" }}
      >
        {snack.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
