import useMultiQueryHook from "../../../hooks/useMultiQueryHook";
import { useParams } from "react-router-dom";
import { Box, Stack, Typography, Tooltip, Link } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import { ProductReviews } from "../../../components/admin";
import { Helmet } from "react-helmet";
import { useCallback } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product } = useMultiQueryHook({
    queries: ["getProduct", id || 0],
    url: `/product/${id}`,
    selectedProp: "product",
  });

  const Classifications = useCallback(
    (name: string, url: string, classification: any) => (
      <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
        <Typography>{name}:</Typography>
        <Tooltip title="Visit">
          <Link
            component={RouterLink}
            underline="none"
            color="black"
            to={`/dashboard/${url}/details/${classification._id}`}
            fontWeight={"bold"}
          >
            {classification?.name}
          </Link>
        </Tooltip>
      </Stack>
    ),
    []
  );

  return (
    <>
      <Helmet>
        <title>{product?.name || "Product Details"}</title>
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
                {product?.name}
              </Typography>
              <SectionTitle title="Main Details" />
              <Box pl={2}>
                <DetailRow label="Slug" value={product?.slug} />
                <DetailRow
                  label="Created At"
                  value={dayjs(product?.createdAt).format("DD/MM/YYYY")}
                />
                <DetailRow
                  label="Created By"
                  value={
                    <Tooltip title={product?.createdBy}>
                      <Typography fontWeight={"bold"} fontSize="14px">
                        {product?.createdBy?.slice(0, 9)}...
                      </Typography>
                    </Tooltip>
                  }
                />
                <DetailRow
                  label="Last Updated At"
                  value={dayjs(product?.updatedAt).format("DD/MM/YYYY")}
                />
              </Box>
              <SectionTitle title="Classifications" />
              <Box pl={2}>
                {Classifications(
                  "Category",
                  "category",
                  product?.category?.categoryId
                )}
                {Classifications(
                  "Sub Category",
                  "subCategory",
                  product?.subCategory?.subCategoryId
                )}
                {Classifications("Brand", "brand", product?.brand)}
              </Box>
              <SectionTitle title="Pricing" />
              <Box pl={2}>
                <DetailRow label="Price" value={`${product?.price} EGP`} />
                <DetailRow
                  label="Applied Discount"
                  value={`${product?.appliedDiscount}%`}
                />
                <DetailRow
                  label="Price After Discount"
                  value={`${product?.priceAfterDiscount} EGP`}
                />
              </Box>
              <SectionTitle title="Quantities" />
              <Box pl={2}>
                <DetailRow label="Stock" value={`${product?.stock} Qty`} />
                <DetailRow label="Sold" value={`${product?.sold} Qty`} />
              </Box>
            </Stack>
            <Stack
              alignItems={{ md: "flex-end", xs: "center" }}
              width={{ md: "50%", xs: "100%" }}
            >
              <img
                src={product?.coverImage?.secure_url}
                loading="lazy"
                style={{ width: "300px", height: "300px" }}
                alt="Product Cover"
              />
            </Stack>
          </Stack>
          <Box>
            <SectionTitle title="Product Images" />
            <Stack
              flexDirection="row"
              justifyContent="space-around"
              flexWrap="wrap"
              mt={2}
            >
              {product?.images.map((image: any) => (
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
                    alt="Product"
                  />
                </Stack>
              ))}
            </Stack>
          </Box>

          <Box my={3}>
            <SectionTitle title="Description" />
            <Typography
              p={2}
              borderRadius={"5px"}
              sx={{ backgroundColor: grey[200] }}
            >
              {product?.desc}
            </Typography>
          </Box>
          <SectionTitle title="Product Reviews" />
          <Box pl={2}>
            <ProductReviews id={product?._id} />
          </Box>
        </Box>
      )}
    </>
  );
};

const DetailRow = ({ label, value }: { label: string; value: any }) => (
  <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
    <Typography>{label}:</Typography>
    <Typography fontWeight={"bold"}>{value}</Typography>
  </Stack>
);

const SectionTitle = ({ title }: { title: string }) => (
  <Typography
    fontWeight={"medium"}
    fontSize={{ md: "20px", xs: "18px" }}
    mt={2}
    pl={1}
  >
    {title}:
  </Typography>
);

export default ProductDetails;
