import {
  Box,
  Stack,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { pink, blueGrey, grey } from "@mui/material/colors";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CustomizedSteppers from "../../components/order/OrderProgress";
import useQueryHook from "../../hooks/useQueryHook";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import UserOrderDetailsSkeleton from "../../components/skeleton/user/UserOrderDetailsSkeleton";
import MenuIcon from "@mui/icons-material/Menu";
import useMutationHook from "../../hooks/useMutationHook";
import  { useContext, useState } from "react";
import OrderDetails from "../../components/order/OrderDetails";
import MoreOrderDetails from "../../components/order/MoreOrderDetails";
import { AppContext } from "../../context/AppContext";
import SnackbarComponent from "../../components/common/SnackBar";
import { Helmet } from "react-helmet";

const UserOrderDetails = () => {
  const { id } = useParams();
  const {
    data: order,
    isPending,
    refetch,
  } = useQueryHook({
    query: `getOrder-${id}`,
    url: `/order/${id}`,
    selectedProp: "order",
  }) as {
    data: any;
    isPending: boolean;
    refetch: any;
  };
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
  const setStep = (status: string) => {
    switch (status) {
      case "delivered":
        return 3;
      case "processing":
        return 1;
      case "waitPayment":
        return 0;
      case "cancelled":
        return 0;
      case "shipped":
        return 2;
      default:
        return 1;
    }
  };
  const { setOpenUserDashboard, show } = useContext(AppContext);
  return (
    <>
      <Helmet>
        <title>Order Details</title>
      </Helmet>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={1} flexGrow={1}>
          <ShoppingBagIcon sx={{ color: pink[500] }} />
          <Typography
            fontWeight={"bold"}
            color={blueGrey[900]}
            fontSize={"24px"}
          >
            Orders Details
          </Typography>
        </Stack>
        {show && (
          <IconButton
            onClick={() => {
              setOpenUserDashboard(true);
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Stack>
      {order && (
        <>
          <Paper sx={{ px: 3, py: 5, my: 5, position: "relative" }}>
            <CustomizedSteppers activeStep={setStep(order.status)} />
            {order.status == "cancelled" && (
              <Typography
                sx={{
                  position: "absolute",
                  top: "10%",
                  left: "1%",
                  color: "red",
                  fontWeight: "bold",
                  border: {
                    lg: "5px solid red",
                    md: "3px solid red",
                    xs: "2px solid red",
                  },
                  padding: "5px 10px",
                  borderRadius: "50%",
                  opacity: 0.3,
                  transform: "rotate(30deg)",
                  height: { lg: "100px", md: "70px", xs: "50px" },
                  width: { lg: "100px", md: "70px", xs: "50px" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: { lg: "12px", md: "8px", xs: "5px" },
                }}
              >
                CANCELLED
              </Typography>
            )}
          </Paper>
          <Paper>
            <Stack
              sx={{
                backgroundColor: grey[200],
                color: blueGrey[500],
                px: 2,
                py: 1,
              }}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexDirection={"row"}
              flexWrap="wrap"
            >
              <Typography variant="body1">
                Order ID:
                <span style={{ color: blueGrey[900] }}> {order._id}</span>
              </Typography>
              <Typography variant="body1">
                Placed on:
                <span style={{ color: blueGrey[900] }}>
                  {" "}
                  {dayjs(order.createdAt).format("MMM/DD/YY")}{" "}
                </span>
              </Typography>
              <Typography variant="body1">
                Delivered at:
                <span style={{ color: blueGrey[900] }}>
                  {" "}
                  {order.deliveredAt
                    ? dayjs(order.createdAt).format("MMM/DD/YY")
                    : "none"}{" "}
                </span>
              </Typography>
            </Stack>
            <Box>
              <OrderDetails products={order.products} />
            </Box>
          </Paper>
          <MoreOrderDetails
            cancelOrder={cancelOrder}
            order={order}
            setOpen={setOpen}
            isPendingCancel={isPendingCancel}
            open={open}
          />
        </>
      )}
      {isPending && <UserOrderDetailsSkeleton />}
      <SnackbarComponent snack={snack} setSnack={setSnack} />
    </>
  );
};

export default UserOrderDetails;
