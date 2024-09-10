import { Dispatch, SetStateAction, useState, useContext } from "react";
import {
  Drawer,
  Stack,
  IconButton,
  Box,
  Typography,
  Tooltip,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { blueGrey } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import useCartQueryHook from "../../hooks/useCartQueryHook";
import useCartMutationHook from "../../hooks/useCartMutationHook";
import scrollBarStyles from "../../style/scrollBar";
import { formatPrice } from "../../utils/priceFormat";
import { AppContext } from "../../context/AppContext";
import AddressesSkeleton from "../skeleton/user/AddressesSkeleton";
import bag from "../../assets/shopping-bag.svg";

type Props = {
  setCartDrawerOpen: Dispatch<SetStateAction<boolean>>;
  cartDrawerOpen: boolean;
};

const CartDrawer = ({ setCartDrawerOpen, cartDrawerOpen }: Props) => {
  const [loadingIndicator, setLoadingIndicator] = useState("");
  const navigate = useNavigate();
  const { auth, setAuthDialog } = useContext(AppContext);

  const {
    data: cart,
    isPending,
    refetch,
  } = useCartQueryHook({
    query: "getCart",
    selectedProp: "cart",
  });

  const { mutate: addToCart } = useCartMutationHook({
    url: "add",
    method: "POST",
    // @ts-ignore
    setLoadingIndicator,
    refetch,
  });

  const { mutate: removeFromCart } = useCartMutationHook({
    url: `remove`,
    method: "PATCH",
    refetch,
  });

  const { mutate: reduceFromCart } = useCartMutationHook({
    url: "/cart",
    method: "PUT",
    // @ts-ignore
    setLoadingIndicator,
    refetch,
  });

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

  const renderCartItems = () => {
    return cart?.products.map((product: any) => (
      <Stack
        key={product.productId._id}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        mt={2}
      >
        <QuantityControl
          product={product}
          loadingIndicator={loadingIndicator}
          onAdd={() => handleAddToCart(product.productId._id)}
          onReduce={() => handleReduceFromCart(product.productId._id)}
        />
        <ProductImage src={product.productId.coverImage.secure_url} />
        <ProductInfo product={product} />
        <DeleteButton
          onDelete={() => handleDeleteFromCart(product.productId._id, cart._id)}
        />
      </Stack>
    ));
  };

  const handleAddToCart = (productId: string) => {
    setLoadingIndicator(productId);
    addToCart({ productId, quantity: 1 });
  };

  const handleReduceFromCart = (productId: string) => {
    reduceFromCart({ productId });
  };

  const handleDeleteFromCart = (productId: string, cartId: string) => {
    removeFromCart({ productId, cartId });
  };

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      open={cartDrawerOpen}
      onClose={() => setCartDrawerOpen(false)}
      ModalProps={{ keepMounted: true }}
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
      <DrawerHeader
        cartItemsCount={cart?.products.length || 0}
        onClose={() => setCartDrawerOpen(false)}
      />

      {cart ? (
        <>
          <Box height="70%" sx={{ overflowY: "scroll", ...scrollBarStyles }}>
            {renderCartItems()}
          </Box>
          <CheckoutSection cart={cart} onCheckout={handleCheckout} />
        </>
      ) : !isPending ? (
        <EmptyCart />
      ) : (
        <AddressesSkeleton />
      )}
    </Drawer>
  );
};

export default CartDrawer;

const DrawerHeader = ({
  cartItemsCount,
  onClose,
}: {
  cartItemsCount: number;
  onClose: () => void;
}) => (
  <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
    <Stack flexDirection="row" gap={1} fontWeight="bold">
      <LocalMallIcon sx={{ color: blueGrey[700], fontSize: 25 }} />
      {cartItemsCount} Items
    </Stack>
    <IconButton
      type="button"
      sx={{ p: "14px" }}
      aria-label="close-cart"
      onClick={onClose}
    >
      <CloseIcon />
    </IconButton>
  </Stack>
);

const QuantityControl = ({
  product,
  loadingIndicator,
  onAdd,
  onReduce,
}: any) => (
  <Stack alignItems="center" justifyContent="center" gap={1}>
    <IconButton
      aria-label="increase quantity"
      color="secondary"
      sx={{ border: 1, p: 0 }}
      onClick={onAdd}
    >
      <AddIcon />
    </IconButton>
    {loadingIndicator !== product.productId._id ? (
      <Typography color="secondary" fontWeight="bold">
        {product.quantity}
      </Typography>
    ) : (
      <CircularProgress
        color="secondary"
        sx={{ width: "20px !important", height: "20px !important" }}
      />
    )}
    <IconButton
      aria-label="reduce quantity"
      color={product.quantity > 1 ? "secondary" : "info"}
      sx={{ border: 1, p: 0 }}
      disabled={product.quantity <= 1}
      onClick={onReduce}
    >
      <RemoveIcon />
    </IconButton>
  </Stack>
);

const ProductImage = ({ src }: { src: string }) => (
  <Box width="50px">
    <img src={src} style={{ width: "100%" }} loading="lazy" alt="product" />
  </Box>
);

const ProductInfo = ({ product }: any) => (
  <Box px={1}>
    <Tooltip title={product.productId.name}>
      <Typography fontWeight="bold">
        {product.productId.name.slice(0, 20)}
      </Typography>
    </Tooltip>
    <Typography color="grey" fontSize="14px">
      {`${formatPrice(product.priceAfterDiscount)} * ${product.quantity}`}
    </Typography>
    <Typography color="secondary" fontWeight="bold">
      {formatPrice(product.quantity * product.priceAfterDiscount)}
    </Typography>
  </Box>
);

const DeleteButton = ({ onDelete }: { onDelete: () => void }) => (
  <IconButton aria-label="delete product" onClick={onDelete}>
    <CloseIcon />
  </IconButton>
);

const CheckoutSection = ({ cart, onCheckout }: any) => (
  <Box sx={{ position: "absolute", bottom: 0 }}>
    <Button
      variant="contained"
      color="secondary"
      sx={{ fontWeight: "bold", width: "100%", py: 1.5 }}
      onClick={onCheckout}
    >
      Checkout Now ({formatPrice(cart.priceAfterDiscount || cart.totalPrice)})
    </Button>
    <Button
      component={Link}
      to="/cart"
      variant="outlined"
      color="secondary"
      sx={{ mt: 1.5, width: "100%", py: 1.5 }}
    >
      View Cart
    </Button>
  </Box>
);

const EmptyCart = () => (
  <Stack height="100%" gap={4} alignItems="center" justifyContent="center">
    <img src={bag} alt="bag" style={{ width: "90px" }} />
    <Typography color="grey" fontSize="16px" textAlign="center">
      Your shopping bag is empty. Start shopping
    </Typography>
  </Stack>
);
