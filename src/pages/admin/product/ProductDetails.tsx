import useMultiQueryHook from "../../../hooks/useMultiQueryHook";
import { useParams } from "react-router-dom";
import { Box, Stack, Typography, Tooltip, Link } from "@mui/material";
import { grey} from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import { ProductReviews } from "../../../components/admin";
import {Helmet} from "react-helmet"

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product } = useMultiQueryHook({
    queries: ["getProduct"],
    url: `/product/${id}`,
    selectedProp: "product",
  });

  const Calssifications = (name:string,url:string,calssification: any) => (
    <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
      <Typography>{name}:</Typography>{" "}
      <Tooltip title="Visit">
        <Link
          component={RouterLink}
          underline="none"
          color="black"
          to={`/dashboard/${url}/details/${calssification._id}`}
          fontWeight={"bold"}
        >
          {calssification.name}
        </Link>
      </Tooltip>{" "}
    </Stack>
  );
  return (
    <>
      <Helmet>
        <title>{product?.neme || "Product Details"}</title>
      </Helmet>
      {product && (
        <Box>
          <Stack
            flexDirection={{ md: "row", xs: "column-reverse" }}
            justifyContent={"space-between"}
            alignItems={{ md: "center", xs: "flex-start" }}
          >
            <Stack mt={2}>
              <Typography
                fontSize={{ md: "25px", xs: "20px" }}
                p={0}
                component="h1"
                fontWeight="bold"
                textTransform={"capitalize"}
              >
                {product.name}
              </Typography>
              <Typography
                fontWeight={"medium"}
                fontSize={{ md: "20px", xs: "18px" }}
                mt={2}
                pl={1}
              >
                Main Details:
              </Typography>
              <Box pl={2}>
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <Typography>Slug:</Typography>
                  <Typography fontWeight={"bold"}>{product.slug}</Typography>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <Typography>Created At:</Typography>
                  <Typography fontWeight={"bold"}>
                    {dayjs(product.createdAt).format("DD/MM/YYYY")}
                  </Typography>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <Typography>Created By:</Typography>
                  <Tooltip title={product.createdBy}>
                    <Typography fontWeight={"bold"} fontSize="14px">
                      {product.createdBy.slice(0, 9)}...
                    </Typography>
                  </Tooltip>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <Typography>Last Updated At:</Typography>
                  <Typography fontWeight={"bold"}>
                    {dayjs(product.updatedAt).format("DD/MM/YYYY")}
                  </Typography>
                </Stack>
              </Box>
              <Typography
                fontWeight={"medium"}
                fontSize={{ md: "20px", xs: "18px" }}
                mt={2}
                pl={1}
              >
                Calssifications:
              </Typography>
              <Box pl={2}>
                {Calssifications(
                  "Category",
                  "category",
                  product.category.categoryId
                )}
                {Calssifications(
                  "Sub Category",
                  "subCategory",
                  product.subCategory.subCategoryId
                )}
                {Calssifications("Brand", "brand", product.brand)}
              </Box>
              <Typography
                fontWeight={"medium"}
                fontSize={{ md: "20px", xs: "18px" }}
                mt={2}
                pl={1}
              >
                Pricing:
              </Typography>
              <Box pl={2}>
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <Typography>Price:</Typography>
                  <Typography fontWeight={"bold"}>
                    {product.price} EGP
                  </Typography>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <Typography>Ppplied Discount:</Typography>
                  <Typography fontWeight={"bold"}>
                    {product.appliedDiscount}%
                  </Typography>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <Typography>Price After Discount:</Typography>
                  <Typography fontWeight={"bold"}>
                    {product.priceAfterDiscount} EGP
                  </Typography>
                </Stack>
              </Box>
              <Typography
                fontWeight={"medium"}
                fontSize={{ md: "20px", xs: "18px" }}
                mt={2}
                pl={1}
              >
                Quantities:
              </Typography>
              <Box pl={2}>
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <Typography>Stock:</Typography>
                  <Typography fontWeight={"bold"}>
                    {product.stock} Qty
                  </Typography>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <Typography>Sold:</Typography>
                  <Typography fontWeight={"bold"}>
                    {product.sold} Qty
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack
              alignItems={{ md: "flex-end", xs: "center" }}
              width={{ md: "50%", xs: "100%" }}
            >
              <img
                src={product.coverImage.secure_url}
                loading="lazy"
                style={{ width: "300px", height: "300px" }}
              />
            </Stack>
          </Stack>
          <Box>
            <Typography
              fontWeight={"medium"}
              fontSize={{ md: "20px", xs: "18px" }}
              mt={2}
              pl={1}
            >
              Product Images:
            </Typography>
            <Stack
              flexDirection="row"
              justifyContent="space-around"
              flexWrap="wrap"
              mt={2}
            >
              {product.images.map((image: any) => (
                <Stack
                  key={image.secure_url}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <img
                    src={image.secure_url}
                    loading="lazy"
                    style={{
                      width: "150px",
                      height: "150px",
                      marginTop: "10px",
                    }}
                  />
                </Stack>
              ))}
            </Stack>
          </Box>

          <Box my={3}>
            <Typography
              fontWeight={"medium"}
              fontSize={{ md: "20px", xs: "18px" }}
              mb={2}
            >
              Description:
            </Typography>
            <Typography
              p={2}
              borderRadius={"5px"}
              sx={{ backgroundColor: grey[200] }}
            >
              {product.desc}
            </Typography>
          </Box>
          <Typography
            fontWeight={"medium"}
            fontSize={{ md: "20px", xs: "18px" }}
            mb={2}
          >
            Product Reviews:
          </Typography>
          <Box pl={2}>
            <ProductReviews id={product._id} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductDetails;
