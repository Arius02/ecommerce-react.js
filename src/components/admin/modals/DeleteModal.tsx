/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useMutationHook from "../../../hooks/useMutationHook";
import { Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SnackbarComponent from "../../common/SnackBar";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import style from "../../../utils/modalStyle";

type Props = {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
  warning?:string;
  name:string;
  url:string
};
const DeleteModal = ({ title, open, setOpen,refetch,warning,name,url }: Props) => {
  const [snack, setSnack] = React.useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const { mutate: deleteCoupon, isPending } = useMutationHook({
 url,
  method:  "DELETE",
   message:   `${name} Deleted Successfully.`,
    setSnack,
                refetch

});
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"

      >
        <Box sx={{...style,width:{md:"450px",sm:"75%",xs:"95%"}}}>
          <Typography id="delete-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          {warning&&<Typography fontWeight={"bold"}>{warning}</Typography>}
          <Stack flexDirection="row" justifyContent="flex-end" mt={2}>
            <Button variant="text" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <LoadingButton
              loading={isPending}
              variant="contained"
              color="error"
              onClick={() => {
                deleteCoupon({});
                setOpen(false);
              }}
              sx={{ ml: 1 }}
            >
              Delete
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
      <SnackbarComponent snack={snack} setSnack={setSnack} />
    </div>
  );
};

export default DeleteModal;
