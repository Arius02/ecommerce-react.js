import {
  Box,
  Paper,
  Typography,
  Stack,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useQueryHook from "../../../hooks/useQueryHook";
import { blueGrey } from "@mui/material/colors";
import dayjs from "dayjs";
import OrderDetailsComp from "../../../components/order/OrderDetails";
import useMutationHook from "../../../hooks/useMutationHook";
import { useState } from "react";
import SnackbarComponent from "../../../components/common/SnackBar";
import MoreOrderDetails from "../../../components/order/MoreOrderDetails";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import UserOrderDetailsSkeleton from "../../../components/skeleton/user/UserOrderDetailsSkeleton";
import { Helmet } from "react-helmet";

const OrderDetails = () => {
  const { id } = useParams();
  const {
    data: order,
    refetch,
    isPending,
  } = useQueryHook({
    url: "/order/" + id,
    query: "getUserOrder" + id,
    selectedProp: "order",
  }) as { data: any; refetch: any; isPending: boolean };
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState<SnackbarType>({
    open: false,
    message: "",
    severity: "success",
  });
  const { mutate: cancelOrder, isPending: isPendingCancel } = useMutationHook({
    url: `/order/cancelOrder/${id}`,
    method: "PATCH",
    refetch,
    setOpen,
    setSnack,
    message: "Order Cancelled Successfully",
  });
  const { mutate: UpdateOrder } = useMutationHook({
    url: `/order/updateOrder/${id}`,
    method: "PATCH",
    refetch,
    setSnack,
    message: "Order Updated Successfully",
  });

  return (
    <>
      <Helmet>
        <title>Order Details</title>
      </Helmet>
      {order && (
        <Box>
          <Typography fontWeight="bold" variant="h5" mb={4}>
            Order Details
          </Typography>
          {order && (
            <>
              {" "}
              <Paper sx={{ p: 2 }}>
                <Stack flexDirection={"row"} gap={3} flexWrap={"wrap"}>
                  <Typography color={blueGrey[800]}>
                    <span style={{ color: blueGrey[300] }}>Order Id: </span>
                    {order._id}
                  </Typography>
                  <Typography color={blueGrey[800]}>
                    <span style={{ color: blueGrey[300] }}>Placed On: </span>
                    {dayjs(order.createdAt).format("MMM DD YYYY")}
                  </Typography>
                </Stack>

                <Stack
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  {order.status != "cancelled" && (
                    <Select
                      value={order.status}
                      sx={{ my: 4 }}
                      onChange={(e) =>
                        UpdateOrder({ orderStatus: e.target.value })
                      }
                    >
                      {["delivered", "processing", "shipped"].map((status) => (
                        <MenuItem value={status}>{status}</MenuItem>
                      ))}
                    </Select>
                  )}
                  {order.status == "processing" && (
                    <Tooltip title="Cancel Order" sx={{ ml: "auto" }}>
                      <CancelScheduleSendIcon onClick={() => setOpen(true)} />
                    </Tooltip>
                  )}
                </Stack>
                {order.status == "cancelled" && (
                  <Typography
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                      border: {
                        lg: "5px solid red",
                        md: "3px solid red",
                        xs: "2px solid red",
                      },
                      padding: "5px 10px",
                      borderRadius: "50%",
                      opacity: 0.5,
                      transform: "rotate(30deg)",
                      height: { lg: "120px", md: "100px", xs: "80px" },
                      width: { lg: "120px", md: "100px", xs: "80px" },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: { lg: "16px", md: "14px", xs: "10px" },
                      ml: "auto",
                    }}
                  >
                    CANCELLED
                  </Typography>
                )}
                <OrderDetailsComp products={order.products} admin={true} />
              </Paper>
              <MoreOrderDetails
                cancelOrder={cancelOrder}
                order={order}
                isPendingCancel={isPendingCancel}
                open={open}
                setOpen={setOpen}
              />
            </>
          )}
          <SnackbarComponent snack={snack} setSnack={setSnack} />
        </Box>
      )}
      {isPending && <UserOrderDetailsSkeleton />}
    </>
  );
};

export default OrderDetails;
