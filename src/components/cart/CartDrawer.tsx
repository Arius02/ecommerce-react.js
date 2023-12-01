import React, { Dispatch, SetStateAction, useState, useContext } from "react";
import {
  Drawer,
  Stack,
  IconButton,
  Box,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { blueGrey } from "@mui/material/colors";
import useCartQueryHook from "../../hooks/useCartQueryHook";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useCartMutationHook from "../../hooks/useCartMutationHook";
import scrollBarStyles from "../../style/scrollBar";
import { formatPrice } from "../../utils/priceFormat";
import { Link, useNavigate } from "react-router-dom";
import bag from "../../assets/shopping-bag.svg";
import CircularProgress from "@mui/material/CircularProgress";
type Props = {
  setCartDrawerOpen: Dispatch<SetStateAction<boolean>>;
  cartDrawerOpen: boolean;
};
import { AppContext } from "../../context/AppContext";
import AddressesSkeleton from "../skeleton/user/AddressesSkeleton";
const CartDrawer = ({ setCartDrawerOpen, cartDrawerOpen }: Props) => {
  const [loadingIndecator, setLoadingIndecator] = useState("");

  const {
    data: cart,
    isPending,
    refetch,
  } = useCartQueryHook({
    query: "getCart",
    selectedProp: "cart",
  });
  const { mutate: AddToCart } = useCartMutationHook({
    url: "add",
    method: "POST",
    setLoadingIndecator,
    refetch,
  });
  const { mutate: RemovFromCart } = useCartMutationHook({
    url: `remove`,
    method: "PATCH",
    refetch,
  });
  const handleAddToCart = (data: any) => {
    AddToCart(data);
  };
  const { mutate: reduceFromCart } = useCartMutationHook({
    url: "/cart",
    method: "PUT",
    setLoadingIndecator,
    refetch,
  });
  const handleDeleteFromCart = (data: any) => {
    RemovFromCart(data);
  };
  const navigate = useNavigate();
  const { auth, setAuthDialog } = useContext(AppContext);

  const handleCheckout = () => {
    if (auth._id) {
      setCartDrawerOpen(false);
      navigate("/checkout");
    } else {
      setAuthDialog({
        open: true,
        to: "/checkout",
      });
    }
  };
  return (
    <React.Fragment key={"right"}>
      <Drawer
        anchor={"right"}
        variant="temporary"
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { md: "30%", sm: "50%", xs: "100%" },
            bgcolor: "white",
            height: "100%",
            p: 2,
          },
        }}
      >
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack flexDirection={"row"} gap={1} fontWeight={"bold"}>
            <LocalMallIcon sx={{ color: blueGrey[700], fontSize: 25 }} />
            {cart ? cart.products.length : 0} Items
          </Stack>
          <IconButton
            type="button"
            sx={{ p: "14px" }}
            aria-label="close-cart"
            onClick={() => setCartDrawerOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        {cart && (
          <>
            <Box
              height={"70%"}
              sx={{ overflowY: "scroll", ...scrollBarStyles }}
            >
              {cart.products.map((product: any) => (
                <Stack
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems="center"
                  mt={2}
                >
                  <Stack
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={1}
                  >
                    {" "}
                    <IconButton
                      aria-label="icrease quantity"
                      color="secondary"
                      sx={{ border: 1, p: 0 }}
                      onClick={() => {
                        setLoadingIndecator(product.productId._id);
                        handleAddToCart({
                          productId: product.productId._id,
                          quantity: 1,
                        });
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                    {loadingIndecator !== product.productId._id && (
                      <Typography color="secondary" fontWeight="bold">
                        {product.quantity}
                      </Typography>
                    )}
                    {loadingIndecator == product.productId._id && (
                      <CircularProgress
                        color="secondary"
                        sx={{
                          width: "20px !important",
                          height: "20px !important",
                        }}
                      />
                    )}
                    <IconButton
                      aria-label="reduce quantity"
                      color={product.quantity > 1 ? "secondary" : "info"}
                      sx={{ border: 1, p: 0 }}
                      disabled={product.quantity > 1 ? false : true}
                      onClick={() => {
                        reduceFromCart({
                          productId: product.productId._id,
                        });
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Stack>
                  <Box width={"50px"}>
                    <img
                      src={product.productId.coverImage.secure_url}
                      style={{ width: "100%" }}
                      loading="lazy"
                    />
                  </Box>

                  <Box px={1}>
                    <Tooltip title={product.productId.name}>
                      <Typography fontWeight={"bold"}>
                        {product.productId.name.slice(0, 20)}
                      </Typography>
                    </Tooltip>
                    <Typography color="grey" fontSize={"14px"}>
                      {formatPrice(product.priceAfterDiscount) +
                        " * " +
                        product.quantity}
                    </Typography>
                    <Typography color="secondary" fontWeight={"bold"}>
                      {formatPrice(
                        product.quantity * product.priceAfterDiscount
                      )}
                    </Typography>
                  </Box>
                  <IconButton
                    aria-label="delete product"
                    onClick={() =>
                      handleDeleteFromCart({
                        productId: product.productId._id,
                        cartId: cart._id,
                      })
                    }
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
              ))}
            </Box>
            <Box sx={{ position: "absolute", bottom: 0 }}>
              <Button
                variant={"contained"}
                color="secondary"
                sx={{ fontWeight: "bold", width: "100%", py: 1.5 }}
                onClick={handleCheckout}
              >
                Checkout Now (
                {formatPrice(cart.priceAfterDiscount || cart.totalPrice)})
              </Button>
              <Button
                component={Link}
                to="/cart"
                variant={"outlined"}
                color="secondary"
                sx={{ mt: 1.5, width: "100%", py: 1.5 }}
              >
                View Cart
              </Button>
            </Box>
          </>
        )}
        {!cart && !isPending && (
          <Stack
            height={"100%"}
            gap={4}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <img src={bag} alt="bag" style={{ width: "90px" }} />
            <Typography color="grey" fontSize={"16px"} textAlign={"center"}>
              Your shopping bag is empty. Start shopping{" "}
            </Typography>
          </Stack>
        )}
        {isPending && <AddressesSkeleton />}
      </Drawer>
    </React.Fragment>
  );
};

export default CartDrawer;
