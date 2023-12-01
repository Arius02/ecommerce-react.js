import {
  Grid,
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { formatPrice } from "../utils/priceFormat";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconClose from "@mui/icons-material/Close";
import useCartMutationHook from "../hooks/useCartMutationHook";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddCoupon from "../components/cart/AddCoupon";
import CartPageSkeleton from "../components/skeleton/cart/CartPageSkeleton";
import bag from "../assets/shopping-bag.svg";
import useCartQueryHook from "../hooks/useCartQueryHook";
import {Helmet} from "react-helmet"
const CartPage = () => {
  const [couponCode, setCouponCode] = useState("");
  const {
    data: cart,
    isPending,
    refetch
  } = useCartQueryHook({
    query: "getCart",
    selectedProp: "cart",
  });
  const { mutate: addToCart } = useCartMutationHook({
    url: "/cart",
    method: "POST",
    refetch
  });
  const { mutate: removeFromCart } = useCartMutationHook({
    url: "/cart",
    method: "PATCH",
    refetch
  });
  const { mutate: reduceFromCart } = useCartMutationHook({
    url: "/cart",
    method: "PUT",
    refetch
  });

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <Grid container mt={5} height={"100vh"}>
        {isPending && <CartPageSkeleton />}{" "}
        {cart && (
          <>
            <Grid item md={8} xs={12}>
              <Box p={2}>
                {cart.products.map((product: any) => (
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
                    key={product.productId._id}
                  >
                    <Box width={"80px"} p={2}>
                      <img
                        src={product.productId.coverImage.secure_url}
                        alt="product image"
                        style={{ width: "100%" }}
                      />
                    </Box>
                    <Box>
                      {" "}
                      <IconButton
                        aria-label="remove from cart"
                        onClick={() =>
                          removeFromCart({ productId: product.productId._id })
                        }
                        sx={{ position: "absolute", top: 0, right: 0 }}
                      >
                        <IconClose sx={{ fontSize: "20px" }} />
                      </IconButton>
                      <Typography>{product.productId.name}</Typography>
                      <Typography color={"grey"} variant="body2" my={1}>
                        {formatPrice(product.priceAfterDiscount)} x{" "}
                        {product.quantity}
                        <span style={{ color: pink[500], fontWeight: "bold" }}>
                          {" "}
                          {formatPrice(
                            product.priceAfterDiscount * product.quantity
                          )}
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
                            reduceFromCart({
                              productId: product.productId._id,
                            })
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography color="secondary" fontWeight="bold">
                          {product.quantity}
                        </Typography>

                        <IconButton
                          aria-label="icrease quantity"
                          color="secondary"
                          sx={{ border: 1, borderRadius: 1, p: 0 }}
                          onClick={() =>
                            addToCart({
                              productId: product.productId._id,
                              quantity: 1,
                            })
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <Box p={2}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: "8px",
                  }}
                >
                  <Typography fontWeight="bold" mb={3}>
                    Summary
                  </Typography>

                  <Stack
                    flexDirection="row"
                    alignItems={"cneter"}
                    justifyContent={"space-between"}
                    mb={2}
                  >
                    <Typography>Subtotal:</Typography>
                    <Typography fontWeight={"bold"}>
                      {formatPrice(cart.totalPrice)}
                    </Typography>
                  </Stack>

                  {cart.priceAfterDiscount && (
                    <Stack
                      flexDirection="row"
                      alignItems={"cneter"}
                      justifyContent={"space-between"}
                      mb={2}
                    >
                      <Typography>After Discount:</Typography>
                      <Typography fontWeight={"bold"}>
                        {formatPrice(cart.priceAfterDiscount)}
                      </Typography>
                    </Stack>
                  )}

                  {cart.coupon && (
                    <>
                      <Stack
                        flexDirection="row"
                        alignItems={"cneter"}
                        justifyContent={"space-between"}
                        mb={2}
                      >
                        <Typography>Coupon Code:</Typography>
                        <Typography fontWeight={"bold"}>
                          {cart.coupon.couponCode}
                        </Typography>
                      </Stack>
                      <Stack
                        flexDirection="row"
                        alignItems={"cneter"}
                        justifyContent={"space-between"}
                        mb={2}
                      >
                        <Typography>Discount Value: </Typography>
                        <Typography fontWeight={"bold"}>
                          {cart.coupon.discountValue}
                          {cart.coupon.couponType == "percentage"
                            ? "%"
                            : " EGP"}
                        </Typography>
                      </Stack>
                    </>
                  )}
                  {!cart.coupon && (
                    <AddCoupon
                      couponCode={couponCode}
                      setCouponCode={setCouponCode}
                    />
                  )}
                  <Button
                    component={Link}
                    to="/checkout"
                    variant={"contained"}
                    color="secondary"
                    sx={{ fontWeight: "bold", width: "100%", py: 1.5 }}
                  >
                    Checkout Now (
                    {formatPrice(cart.priceAfterDiscount || cart.totalPrice)})
                  </Button>
                </Paper>
              </Box>
            </Grid>{" "}
          </>
        )}
      </Grid>
      {!cart && (
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          height="85vh"
        >
          <img src={bag} alt="bag" style={{ width: "150px" }} />
          <Typography color="grey" fontSize={"16px"} textAlign={"center"}>
            Your shopping bag is empty.{" "}
            <Link
              to="/"
              style={{
                color: "grey",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Start shopping
            </Link>
          </Typography>{" "}
        </Stack>
      )}
    </>
  );
};

export default CartPage;
