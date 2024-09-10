import { Dispatch, SetStateAction, useEffect } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { LoadingButton } from "@mui/lab";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import mastercard from "../../assets/mastercard.png";
import visa from "../../assets/visa.png";
import wu from "../../assets/wu.png";

type Props = {
  setPaymentMethod: Dispatch<SetStateAction<string>>;
  paymentMethod: string;
  isPending: boolean;
  placeOrder: UseMutateFunction<AxiosResponse<any, any>, any, any, unknown>;
  isDirect?: any;
  data: AxiosResponse<any, any> | undefined;
};

const PaymentMethod = ({
  setPaymentMethod,
  paymentMethod,
  isPending,
  placeOrder,
  isDirect,
  data,
}: Props) => {
  // Redirect to payment URL if available
  useEffect(() => {
    if (data?.data.url) {
      window.location.href = data.data.url;
    }
  }, [data]);

  const paymentOptions = [
    {
      label: "Card",
      value: "card",
      icon: (
        <Stack flexDirection="row" alignItems="center" gap={2}>
          {[mastercard, visa, wu].map((image, index) => (
            <img
              src={image}
              key={index}
              alt="payment"
              style={{ width: "35px" }}
            />
          ))}
        </Stack>
      ),
    },
    {
      label: "Cash",
      value: "cash",
      icon: <MonetizationOnIcon />,
    },
  ];

  return (
    <Paper sx={{ p: 2, mt: 5 }}>
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            width: { md: "40px", xs: "25px" },
            height: { md: "40px", xs: "25px" },
            borderRadius: "50%",
            color: "white",
            fontWeight: "bold",
            fontSize: { md: "20px", xs: "14px" },
          }}
          bgcolor={pink[600]}
        >
          2
        </Stack>
        <Typography variant="h6">Payment Method</Typography>
      </Stack>

      {paymentOptions.map((option) => (
        <Stack
          key={option.value}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
          px={3}
          py={1}
          borderRadius="5px"
          border={paymentMethod === option.value ? 1 : 0}
          borderColor={pink[500]}
          onClick={() => setPaymentMethod(option.value)}
          sx={{ cursor: "pointer" }}
        >
          <Typography fontWeight="bold">{option.label}</Typography>
          {option.icon}
        </Stack>
      ))}

      <LoadingButton
        variant="contained"
        color="secondary"
        sx={{ width: "100%", mt: 5, py: 1.5 }}
        onClick={() => placeOrder(isDirect || {})}
        loading={isPending}
      >
        Place Order
      </LoadingButton>
    </Paper>
  );
};

export default PaymentMethod;
