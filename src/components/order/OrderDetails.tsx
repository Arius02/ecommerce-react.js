import { Box, Stack, Typography, Button, Tooltip } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Link } from "react-router-dom";

import { formatPrice } from "../../utils/priceFormat";

type Props = {
  products: any;
  admin?: boolean;
};

const OrderDetails = ({ products, admin }: Props) => {
  
  return products.map((product: any) => (
    <Stack
      flexDirection="row"
      alignItems={"center"}
      justifyContent={"space-between"}
      key={product.productId._id}
      px={2}
      py={1}
      flexWrap={"wrap"}
    >
      <Stack flexDirection="row" alignItems={"center"} gap={2}>
        <Box width={"80px"} p={3}>
          <img
            src={product.productId.coverImage.secure_url}
            alt={product.productId.name}
            style={{ width: "100%" }}
          />
        </Box>
        <Box>
          <Tooltip title={product.productId.name}>
            <Typography
              color={blueGrey[900]}
              fontWeight={"bold"}
              variant="body2"
              mb={0.5}
            >
              {product.productId.name.slice(0, 15)}
            </Typography>
          </Tooltip>
          <Typography variant="body2" color={blueGrey[500]}>
            {formatPrice(product.priceAfterDiscount)} x {product.quantity}
          </Typography>
        </Box>
      </Stack>
      {!admin && (
        <>
          {" "}
          <Tooltip title={product.productId.desc}>
            <Typography color={blueGrey[400]} variant="body2">
              {product.productId.desc.slice(0, 30)}...
            </Typography>
          </Tooltip>
          <Button
            component={Link}
            to={`/product/details/${product.productId._id}?slug=${product.productId.slug}`}
            variant="text"
            color="secondary"
            sx={{ fontWeight: "bold" }}
          >
            Write a review
          </Button>
        </>
      )}
    </Stack>
  ));
};

export default OrderDetails;
