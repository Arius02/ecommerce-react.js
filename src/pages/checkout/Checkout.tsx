import { Container, Grid, Box } from "@mui/material";
import useQueryHook from "../../hooks/useQueryHook";
import UserInfo from "../../components/user/UserInfo";
import PaymentMethod from "../../components/checkeout/PaymentMethod";
import useMutationHook from "../../hooks/useMutationHook";
import { useState } from "react";
import OrderDetails from "../../components/checkeout/OrderDetails";

const Checkout = () => {
  const { data: cart } = useQueryHook({
    url: "/cart",
    query: "getCart",
    selectedProp: "cart",
  }) as {data:any};
  
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const {data, mutate: placeOrder, isPending } = useMutationHook({
    url: `/order/${paymentMethod == "card" ? "checkoutSession" : ""}/${
      cart?._id
    }`,
    method: "POST",
  });

  return (
    <Container maxWidth="xl">
      <Grid container mt={5}>
        <Grid md={8} xs={12}>
          <Box p={2}>
            <UserInfo />
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              isPending={isPending}
              placeOrder={placeOrder}
              data={data}
            />
          </Box>
        </Grid>
        <Grid md={4} xs={12}>
          <OrderDetails cart={cart} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
