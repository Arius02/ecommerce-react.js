import { Box, Stack, Typography, Tooltip, Rating, Link } from "@mui/material";
import { grey } from "@mui/material/colors";
import { formatPrice } from "../../utils/priceFormat";
import { Link as RouterLink } from "react-router-dom";
type Props = {
    product:any;
    rating?:boolean
};

const ProductBox = ({product,rating}: Props) => {
  return (
    <Box px={2}>
      <Link
        component={RouterLink}
        to={`/product/details/${product._id}?slug=${product.slug}`}
        underline="none"
        color="black"
      >
        <Stack
          position="relative"
          bgcolor={grey[100]}
          width={"150px"}
          height={"150px"}
          justifyContent={"center"}
          alignItems={"center"}
          mb={2}
          borderRadius={"8px"}
          sx={{
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              zIndex: 99,
              backgroundColor: "black",
              opacity: 0,
              transition: ".5s",
              borderRadius: "8px",
            },
            "&:hover": {
              "&::before": {
                opacity: 0.4,
              },
            },
          }}
        >
          <img
            src={product.coverImage.secure_url}
            alt="product image"
            style={{ width: "100px" }}
          />
        </Stack>
        {rating && (
          <Rating name="rating" value={product.rating} size="small" readOnly />
        )}
        <Stack textAlign={"start"}>
          <Tooltip title={product.name}>
            <Typography fontWeight={"bold"}>
              {product.name.slice(0, 12)}...
            </Typography>
          </Tooltip>
          <Typography fontWeight={"bold"} color={"secondary"}>
            {formatPrice(product.priceAfterDiscount)}
          </Typography>
        </Stack>
      </Link>
    </Box>
  );
};

export default ProductBox;
