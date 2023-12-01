import { Stack, Typography, Box, Tooltip, Divider } from "@mui/material";
import { formatPrice } from "../../utils/priceFormat";
import AddCoupon from "../cart/AddCoupon";
import { Dispatch, SetStateAction } from "react";
type Props = {
  cart?: any;
  product?: any;
  couponCode?: string;
  setCouponCode?: Dispatch<SetStateAction<string>>;
};
const OrderDetails = ({
  cart,
  product,
  couponCode,
  setCouponCode,
}: Props) => {
  return (
    <Box p={2}>
      <Typography fontWeight="bold" mb={3}>
        Your Order
      </Typography>
      {cart &&
        cart.products.map((product: any) => (
          <Stack
            key={product._id}
            flexDirection="row"
            alignItems={"cneter"}
            justifyContent={"space-between"}
            mb={2}
          >
            <Tooltip title={product.name}>
              <Typography fontWeight="light">
                <span style={{ fontWeight: "bold" }}>{product.quantity}</span>x {" "}
                {product?.name?.slice(0, 15)}
              </Typography>
            </Tooltip>
            <Typography>{formatPrice(product.priceAfterDiscount)}</Typography>
          </Stack>
        ))}
      {product &&
          <Stack
            key={product._id}
            flexDirection="row"
            alignItems={"cneter"}
            justifyContent={"space-between"}
            mb={2}
          >
            <Tooltip title={product.name}>
              <Typography fontWeight="light">
                <span style={{ fontWeight: "bold" }}>{product.quantity}</span>x {" "}
                {product?.name?.slice(0, 15)}
              </Typography>
            </Tooltip>
            <Typography>{formatPrice(product.priceAfterDiscount)}</Typography>
          </Stack>
        }
      <Divider variant="fullWidth" />
      <Box mt={3}>
        <Stack
          flexDirection="row"
          alignItems={"cneter"}
          justifyContent={"space-between"}
          mb={2}
        >
          <Typography>Subtotal:</Typography>
          <Typography fontWeight={"bold"}>
            {formatPrice(
              cart
                ? cart.totalPrice
                : product?.priceAfterDiscount * product?.quantity
            )}
          </Typography>
        </Stack>
        {cart && cart.priceAfterDiscount && (
          <Stack
            flexDirection="row"
            alignItems={"cneter"}
            justifyContent={"space-between"}
            mb={2}
          >
            <Typography>Discount:</Typography>
            <Typography fontWeight={"bold"}>
              {formatPrice(cart.priceAfterDiscount)}
            </Typography>
          </Stack>
        )}
      </Box>
      { setCouponCode && (
        <AddCoupon couponCode={couponCode||""} setCouponCode={setCouponCode} />
      )}
    </Box>
  );
};

export default OrderDetails;
