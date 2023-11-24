import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  Tooltip,
} from "@mui/material";
import { pink, blueGrey, grey } from "@mui/material/colors";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";

import CustomizedSteppers from "../../components/user/OrderProgress";
import useQueryHook from "../../hooks/useQueryHook";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { formatPrice } from "../../utils/priceFormat";
import UserOrderDetailsSkeleton from "../../components/skeleton/user/UserOrderDetailsSkeleton";


const UserOrderDetails = () => {
  const { id } = useParams();
  const { data: order, isPending } = useQueryHook({
    query: `getOrder-${id}`,
    url: `/order/${id}`,
    selectedProp: "order",
  });
  const setStep=(status:string)=>{
    switch(status){
      case "delivered":
        return 3;
      case "processing":
        return 1;
      case "waitPayment":
        return 0;
      case "shipped":
        return 2;
      default:
        return 1;
    }
  
  }
  return (
    <>
{    order && (
    <>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <ShoppingBagIcon sx={{ color: pink[500] }} />
            <Typography
              fontWeight={"bold"}
              color={blueGrey[900]}
              fontSize={"24px"}
            >
              Orders Details
            </Typography>
          </Stack>
        </Stack>
        <Paper sx={{ px: 3, py: 5, my: 5 }}>
          <CustomizedSteppers activeStep={setStep(order.status)} />
        </Paper>
        <Paper>
          <Stack
            sx={{
              backgroundColor: grey[200],
              color: blueGrey[500],
              px: 2,
              py: 1,
            }}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexDirection={"row"}
            flexWrap="wrap"
          >
            <Typography variant="body1">
              Order ID:
              <span style={{ color: blueGrey[900] }}> {order._id}</span>
            </Typography>
            <Typography variant="body1">
              Placed on:
              <span style={{ color: blueGrey[900] }}>
                {" "}
                {dayjs(order.createdAt).format("MMM/DD/YY")}{" "}
              </span>
            </Typography>
            <Typography variant="body1">
              Delivered at:
              <span style={{ color: blueGrey[900] }}>
                {" "}
                {order.deliveredAt
                  ? dayjs(order.createdAt).format("MMM/DD/YY")
                  : "none"}{" "}
              </span>
            </Typography>
          </Stack>
          <Box>
            {order.products.map((product: any) => (
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
                      {formatPrice(product.priceAfterDiscount)} x{" "}
                      {product.quantity}
                    </Typography>
                  </Box>
                </Stack>
                <Tooltip title={product.productId.desc}>
                  <Typography color={blueGrey[400]} variant="body2">
                    {product.productId.desc.slice(0, 30)}...
                  </Typography>
                </Tooltip>
                <Button
                  component={Link}
                  to={`/product/details/${product.productId._id}`}
                  variant="text"
                  color="secondary"
                  sx={{ fontWeight: "bold" }}
                >
                  Write a review
                </Button>
              </Stack>
            ))}
          </Box>
        </Paper>
        <Stack
          flexDirection="row"
          justifyContent={"space-between"}
          flexWrap="wrap"
          mt={5}
        >
          <Paper sx={{ p: 2, width: { md: "48%", xs: "100%" }, mb: 2 }}>
            <Typography
              color={blueGrey[900]}
              variant="subtitle1"
              fontWeight="bold"
            >
              Shipping Address
            </Typography>
            <Typography color={blueGrey[700]} variant="body2" mt={2}>
              {order.deliveryDetails.city},{order.deliveryDetails.street}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, width: { md: "48%", xs: "100%" }, mb: 2 }}>
            <Typography
              color={blueGrey[900]}
              variant="subtitle1"
              fontWeight="bold"
              mb={2}
            >
              Total Summary
            </Typography>
            <Stack
              flexDirection="row"
              alignItems={"center"}
              justifyContent={"space-between"}
              mb={2}
            >
              <Typography color={blueGrey[400]} variant="body1">
                Subtotal:
              </Typography>
              <Typography>{formatPrice(order.totalPrice)}</Typography>
            </Stack>
            <Stack
              flexDirection="row"
              alignItems={"center"}
              justifyContent={"space-between"}
              mb={2}
            >
              <Typography color={blueGrey[400]} variant="body1">
                Discount:
              </Typography>
              <Typography>
                {formatPrice(order.priceAfterDiscount || 0)}
              </Typography>
            </Stack>
            <Typography color={blueGrey[800]} variant="body1">
              Paid by {order.PaymentMethod}
            </Typography>
          </Paper>
        </Stack>
      </>
        )}
        {
          isPending&&<UserOrderDetailsSkeleton/>
        }
      </>
      
  );
};

export default UserOrderDetails;
