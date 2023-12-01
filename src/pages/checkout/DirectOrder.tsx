import React, { useState } from "react";
import {
  Container,
  Paper,
  Stack,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import UserInfo from "../../components/user/UserInfo";
import PaymentMethod from "../../components/checkeout/PaymentMethod";
import OrderDetails from "../../components/checkeout/OrderDetails";
import useMutationHook from "../../hooks/useMutationHook";
import { useParams } from "react-router-dom";
import { formatPrice } from "../../utils/priceFormat";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import { pink } from "@mui/material/colors";
import SnackbarComponent from "../../components/common/SnackBar";
import { Helmet } from "react-helmet";

const DirectOrder = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = React.useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  })
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { data:placeOrderData, mutate: placeOrder, isPending } = useMutationHook({
    url: `/order/create/${
      paymentMethod == "card" ? "directOnlineOrder" : "directCashOrder"
    }`,
    method: "POST",
    message: "Order Placed Successfully.",
    setSnack,
  });
  const { data } = useMultiQueryHook({
    queries: [`getProductDetails-${id}`],
    url: `/product/${id}`,
    selectedProp: "product",
  });
  const orderData = {
    productId: data?._id,
    quantity: quantity,
    couponCode: couponCode.length?couponCode:undefined,
  };
  return (
    <>
      <Helmet>
        <title>Direct Order</title>
      </Helmet>
      <Container maxWidth="xl">
        <Grid container mt={5}>
          <Grid item md={8} xs={12}>
            <Box p={2}>
              <Typography fontWeight={"bold"} mb={2} variant="h5">
                Product:
              </Typography>
              {data && (
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    gap: 2,
                    position: "relative",
                    borderRadius: "8px",
                  }}
                  key={data._id}
                >
                  <Box width={"80px"} p={2}>
                    <img
                      src={data.coverImage.secure_url}
                      alt="product image"
                      style={{ width: "100%" }}
                    />
                  </Box>
                  <Box>
                    {" "}
                    <Typography>{data.name}</Typography>
                    <Typography color={"grey"} variant="body2" my={1}>
                      {formatPrice(data.priceAfterDiscount)} x {quantity}
                      <span style={{ color: pink[500], fontWeight: "bold" }}>
                        {" "}
                        {formatPrice(data.priceAfterDiscount * quantity)}
                      </span>
                    </Typography>
                    <Stack
                      flexDirection={"row"}
                      alignItems={"center"}
                      gap={1}
                      mt={1}
                    >
                      <IconButton
                        aria-label="reduce quantity"
                        color="secondary"
                        sx={{ border: 1, borderRadius: 1, p: 0 }}
                        onClick={() =>
                          setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography color="secondary" fontWeight="bold">
                        {quantity}
                      </Typography>

                      <IconButton
                        aria-label="icrease quantity"
                        color="secondary"
                        sx={{ border: 1, borderRadius: 1, p: 0 }}
                        onClick={() =>
                          setQuantity((prev) => (prev === 3 ? 3 : prev + 1))
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                </Paper>
              )}
              <UserInfo />
              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                isPending={isPending}
                placeOrder={placeOrder}
                isDirect={orderData}
                data={placeOrderData}
              />
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box p={2}>
              <OrderDetails
                product={{ ...data, quantity }}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
              />
            </Box>
          </Grid>
        </Grid>
        <SnackbarComponent snack={snack} setSnack={setSnack} />
      </Container>
    </>
  );
};

export default DirectOrder;
