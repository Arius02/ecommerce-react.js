import {
  Box,
  Container,
  Stack,
  Grid,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useMultiQueryHook from "../hooks/useMultiQueryHook";
import { formatPrice } from "../utils/priceFormat";
import {
  AddReview,
  ProductImagesShow,
  RelatedProducts,
  Reviews,
} from "../components";
import useCartQueryHook from "../hooks/useCartQueryHook";
import useCartMutationHook from "../hooks/useCartMutationHook";
import ProductDetailsSkeleton from "../components/skeleton/product/ProductDetailsSkeleton";
import CircularProgress from "@mui/material/CircularProgress";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isPending } = useMultiQueryHook({
    queries: [`getProductDetails-${id}`],
    url: `/product/${id}`,
    selectedProp: "product",
  });

  const [imgToShow, setImgToshow] = React.useState("");

  useEffect(() => {
    if (data) {
      setImgToshow(data.coverImage.secure_url);
    }
  }, [data]);
  const { data: cart, refetch } = useCartQueryHook({
    query: "getCart",
    selectedProp: "cart",
  });
  const { mutate: AddToCart, isPending: isCartPending } = useCartMutationHook({
    url: "add",
    method: "POST",
    refetch: refetch,
  });
  return (
    <Container maxWidth={"xl"}>
      <Box mt={5}>
        {data && (
          <><Grid container>
            <Grid md={5} xs={12}>
              <ProductImagesShow
                coverImage={data.coverImage}
                images={data.images}
                imgToShow={imgToShow}
                setImgToshow={setImgToshow}
              />
            </Grid>
            <Grid md={1} xs={0} />
            <Grid md={6} xs={12} mt={{ md: 0, xs: 5 }}>
              <Box>
                <Typography
                  fontWeight="bold"
                  fontSize={{ md: "30px", xs: "22px" }}
                  mb={3}
                >
                  {data.name}
                </Typography>
                <Typography>
                  Brand:{" "}
                  <span style={{ fontWeight: "bold" }}>{data.brand.name}</span>
                </Typography>
                <Stack my={1} flexDirection="row" gap={1}>
                  Rate:
                  <Rating value={data.rating} readOnly />
                </Stack>
                <Box>
                  <Typography fontWeight="bold">Description:</Typography>
                  <Typography variant="body2" px={2}>
                    {data.desc}
                  </Typography>
                </Box>
                <Stack flexDirection="row" gap={2} alignItems="center" mt={2}>
                  <Typography
                    fontWeight={"bold"}
                    color="secondary"
                    fontSize={{ md: "25px", xs: "20px" }}
                  >
                    {formatPrice(data.priceAfterDiscount)}
                  </Typography>
                  <Typography
                    fontWeight={"bold"}
                    color="grey"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {formatPrice(data.price)}
                  </Typography>
                </Stack>
                <Typography color={data.stock > 0 ? "grey" : "red"}>
                  {data.stock > 0 ? "Stock Avilable" : "Out Of Stock"}
                </Typography>
                {data.stock > 0 && (
                  <Stack flexDirection={"row"} gap={2} mt={2}>
                    <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={() =>
                        AddToCart({ productId: data._id, quantity: 1 })
                      }
                      disabled={cart&&cart.products.find((product:any)=>product.productId._id===data._id)?.quantity>=3||false}
                    >
                      Add To Cart
                      {cart &&
                        !isCartPending &&
                        cart.products.map((product: any) => {
                          return (
                            product.productId._id == data._id && (
                              <Stack
                                sx={{
                                  borderRadius: "50%",
                                  backgroundColor: product.quantity<=2?"white":"transparent",
                                  padding: 1,
                                  color: "#C51162",
                                  width: "20px",
                                  height: "20px",
                                  ml: 1,
                                }}
                                alignItems={"center"}
                                justifyContent={"center"}
                              >
                                {product.quantity}
                              </Stack>
                            )
                          );
                        })}
                      {isCartPending && (
                        <Box sx={{ color: "white", ml: 1 }}>
                          <CircularProgress
                            color="inherit"
                            sx={{
                              width: "20px !important",
                              height: "20px !important",
                            }}
                          />
                        </Box>
                      )}
                    </Button>
                    <Button
                      component={Link}
                      to={`/directOrder/${data._id}`}
                      type="button"
                      variant="contained"
                      color="primary"
                    >
                      Buy Now
                    </Button>
                  </Stack>
                )}
              </Box>
            </Grid>
          </Grid>
        <Reviews id={id || ""} /></>
        )}
        <AddReview />
        {data && (
          <RelatedProducts
            subCategoryId={data.subCategory.subCategoryId._id}
            AddToCart={AddToCart}
            cart={cart}
          />
        )}
        {isPending && <ProductDetailsSkeleton />}
      </Box>
    </Container>
  );
};

export default ProductDetails;