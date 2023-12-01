import {
  Typography,
  Tooltip,
  Rating,
  Stack,
  Chip,
  Link,
  Box,
} from "@mui/material";

import { pink } from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { formatPrice } from "../../utils/priceFormat";
import { Link as RouterLink } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
} from "@tanstack/react-query";
import useMutationHook from "../../hooks/useMutationHook";
import { Dispatch, SetStateAction, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { AppContext } from "../../context/AppContext";
import systemRoles from "../../utils/systemRoles";
type Props = {
  product: any;
  AddToCart: UseMutateFunction<any, any, any, unknown>;
  reduceFromCart: UseMutateFunction<any, any, any, unknown>;
  cart: any;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<unknown, Error>>;
  wishlist: any;
  loadingIndecator: string;
  setLoadingIndecator: Dispatch<SetStateAction<string>>;
};

const ProductCard = ({
  product,
  AddToCart,
  cart,
  wishlist,
  refetch,
  loadingIndecator,
  setLoadingIndecator,
  reduceFromCart,
  
}: Props) => {
  const handleClick = (data: any) => {
    AddToCart(data);
  };

  const { mutate: wishlistToggle, isPending } = useMutationHook({
    url: "/wishlist",
    method: "PATCH",
    refetch,
  });
  const { auth } = useContext(AppContext);
  return (
    <>
      <Card
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          transition: ".6",
          "&:hover": {
            boxShadow: "0 0 40px rgba(0,0,0,.1)",
          },
          "&:hover .MuiCardActions-root": {
            opacity: 1,
          },
          position: "relative",
        }}
      >
        <Link
          component={RouterLink}
          to={`/product/details/${product._id}?slug=${product.slug}`}
          underline="none"
        >
          <Stack justifyContent={"center"} alignItems={"center"} height="300px">
            <CardMedia
              component="img"
              sx={{
                width: "180px !important",
                p: 4,
                mb: 5,
              }}
              image={product.coverImage.secure_url}
              alt="mobile"
            />
          </Stack>
        </Link>
        <CardContent>
          {product.appliedDiscount > 0 && (
            <Chip
              label={`${product.appliedDiscount}% OFF`}
              sx={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: pink[500],
                border: "none",
                position: "absolute",
                top: 10,
                left: 10,
              }}
              variant="outlined"
            />
          )}
          <Box>
            <Tooltip title={product.name}>
              <Typography variant="h6" fontWeight={"bold"}>
                {product.name.slice(0, 18)}
              </Typography>
            </Tooltip>
            <Rating readOnly value={product.rating} />

            <Stack flexDirection="row" gap={2}>
              <Typography color="secondary">
                {formatPrice(product.priceAfterDiscount)}
              </Typography>
              {product.appliedDiscount > 0 && (
                <Typography
                  style={{ textDecoration: "line-through" }}
                  color="grey"
                >
                  {formatPrice(product.price)}
                </Typography>
              )}
            </Stack>
          </Box>
          {product.stock > 0 ? (
            auth.role != systemRoles.SuperAdmin &&
            auth.role != systemRoles.Admin && (
              <Stack
                gap={2}
                justifyContent={"center"}
                alignItems="center"
                sx={{ position: "absolute", bottom: 24, right: 10 }}
              >
                {cart &&
                  cart.products
                    .filter((item: any) => item.productId._id === product._id)
                    .map((item: any) => (
                      <>
                        <IconButton
                          aria-label="reduce quantity"
                          color="secondary"
                          sx={{ border: 1, borderRadius: 1, p: 0 }}
                          onClick={() => {
                            setLoadingIndecator(product._id);
                            reduceFromCart({
                              productId: item.productId._id,
                            });
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        {loadingIndecator !== item.productId._id && (
                          <Typography color="secondary" fontWeight="bold">
                            {item.quantity}
                          </Typography>
                        )}
                        {loadingIndecator == item.productId._id && (
                          <CircularProgress
                            color="secondary"
                            sx={{
                              width: "20px !important",
                              height: "20px !important",
                            }}
                          />
                        )}
                      </>
                    ))}

                <IconButton
                  aria-label="icrease quantity"
                  color="secondary"
                  sx={{ border: 1, borderRadius: 1, p: 0 }}
                  onClick={() => {
                    setLoadingIndecator(product._id);
                    handleClick({ productId: product._id, quantity: 1 });
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Stack>
            )
          ) : (
            <Typography
              color="red"
              sx={{ position: "absolute", top: 10, right: 10 }}
            >
              Out of Stock
            </Typography>
          )}
        </CardContent>
        {auth.role != systemRoles.SuperAdmin &&
        auth.role != systemRoles.Admin &&
        wishlist ? (
          <CardActions
            disableSpacing
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              opacity: 0,
              transition: ".6s",
            }}
          >
            <IconButton
              aria-label="wishlist"
              onClick={() => wishlistToggle({ productId: product?._id })}
            >
              {isPending ? (
                <CircularProgress
                  color="secondary"
                  sx={{
                    width: "20px !important",
                    height: "20px !important",
                  }}
                />
              ) : wishlist.includes(product._id) ? (
                <FavoriteOutlinedIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </IconButton>
          </CardActions>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default ProductCard;
