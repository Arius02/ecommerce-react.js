import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  TextField,
  Modal,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { formatPrice } from "../../utils/priceFormat";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import style from "../../utils/modalStyle";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
type Props = {
  order: any;
  cancelOrder: (
    variables: any,
    options?:
      | MutateOptions<AxiosResponse<any, any>, any, any, unknown>
      | undefined
  ) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  isPendingCancel: boolean;
};

const MoreOrderDetails = ({
  order,
  cancelOrder,
  setOpen,
  open,
  isPendingCancel,
}: Props) => {
  const [reason, setReason] = useState("");
  const handleCancel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reason.length) {
      cancelOrder({ reason });
    }
  };
  return (
    <Stack
      flexDirection="row"
      justifyContent={"space-between"}
      flexWrap="wrap"
      mt={5}
    >
      <Paper sx={{ p: 2, width: { md: "48%", xs: "100%" }, mb: 2 }}>
        <Typography color={blueGrey[900]} variant="subtitle1" fontWeight="bold">
          Shipping Address
        </Typography>
        <Typography color={blueGrey[700]} variant="body2" mt={2}>
          {order.deliveryDetails.city},{order.deliveryDetails.street}
        </Typography>
      </Paper>
      <Paper sx={{ p: 2, width: { md: "48%", xs: "100%" }, mb: 2 }}>
        <Typography
          color={blueGrey[900]}
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
        >
          Total Summary
        </Typography>
        <Stack
          flexDirection="row"
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={2}
        >
          <Typography color={blueGrey[400]} variant="body1">
            Subtotal:
          </Typography>
          <Typography>{formatPrice(order.totalPrice)}</Typography>
        </Stack>
        <Stack
          flexDirection="row"
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={2}
        >
          <Typography color={blueGrey[400]} variant="body1">
            Discount:
          </Typography>
          <Typography>{formatPrice(order.priceAfterDiscount || 0)}</Typography>
        </Stack>
        <Typography color={blueGrey[800]} variant="body1">
          Paid by {order.PaymentMethod}
        </Typography>
        {( order.status == "waitPayment") ||
          (order.status == "processing" && (
            <Button
              variant="text"
              color="error"
              onClick={() =>  setOpen(true)}
              sx={{ display: "block", ml: "auto" }}
            >
              Cancel
            </Button>
          ))}
      </Paper>
      {( order.status == "waitPayment") ||
        (order.status == "processing" && (
          <>
            <React.Fragment>
              <Modal
                open={open}
                onClose={() =>  setOpen(false)}
                aria-labelledby="cancel-modal-title"
                aria-describedby="cancel-modal-description"
              >
                <Box
                  sx={{
                    ...style,
                    width: { md: "450px", sm: "75%", xs: "95%" },
                  }}
                >
                  <form onSubmit={(e) => handleCancel(e)}>
                    <Typography>Reason To Cancel Order</Typography>
                    <TextField
                      autoFocus
                      margin="dense"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setReason(e.target.value)
                      }
                      multiline
                      rows={4}
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <Stack
                      flexDirection="row"
                      gap={2}
                      alignItems="center"
                      width="fit-content"
                      ml="auto"
                    >
                      <Button
                        color="primary"
                        variant="text"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                      <LoadingButton
                        color="error"
                        variant="text"
                        type="submit"
                        loading={isPendingCancel }
                      >
                        Delete
                      </LoadingButton>
                    </Stack>
                  </form>
                </Box>
              </Modal>
            </React.Fragment>
          </>
        ))}
    </Stack>
  );
};

export default MoreOrderDetails;
