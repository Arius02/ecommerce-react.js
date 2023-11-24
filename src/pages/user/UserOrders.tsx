import {
  Box,
  Stack,
  Typography,
  IconButton,
  Paper,
  Pagination,
  Chip,
} from "@mui/material";
import { pink, blueGrey } from "@mui/material/colors";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useState } from "react";
import dayjs from "dayjs";
import { formatPrice } from "../../utils/priceFormat";
import { useNavigate } from "react-router-dom";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import UserOrdersSkeleton from "../../components/skeleton/user/UserOrdersSkeleton";

const UserOrders = () => {
  const [page, setPage] = useState(1);
  const { data: orders, isPending } = useMultiQueryHook({
    url: `/order?size=5&page=${page}`,
    queries: ["getOrders", page],
  });
  const setColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "success";
      case "processing":
        return "info";
      case "waitPayment":
        return "warning";
      case "shipped":
        return "primary";
      default:
        return "error";
    }
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event); // to be clear
    setPage(value);
  };
  const navigate = useNavigate();
  return (
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
            My Orders
          </Typography>
        </Stack>
      </Stack>
        {orders &&(
      <Box mt={5}>
          {orders.orders.map((order: any) => (
            <Paper
              key={order._id}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                fontWeight={"bold"}
                color={blueGrey[900]}
                variant="body1"
              >
                #{order._id}
              </Typography>
              <Chip
                label={order.status}
                color={setColor(order.status)}
                variant="outlined"
              />
              <Typography color={blueGrey[700]}>
                {dayjs(order.createdAt).format("MMM DD YYYY")}
              </Typography>
              <Typography color={blueGrey[700]}>
                {formatPrice(order.totalPrice)}{" "}
              </Typography>
              <IconButton onClick={() => navigate(`/user/orders/${order._id}`)}>
                <TrendingFlatIcon />
              </IconButton>
            </Paper>
          ))}
          <Pagination
            count={orders.totalPages}
            page={page}
            variant="outlined"
            color="primary"
            onChange={handleChange}
            sx={{ width: "fit-content", m: "auto", mt: 2 }}
          />
      </Box>
        )}
        {
          isPending&& <UserOrdersSkeleton/>
        }
    </>
  );
};

export default UserOrders;
