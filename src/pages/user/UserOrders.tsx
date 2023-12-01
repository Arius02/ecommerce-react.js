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
import { useContext, useState } from "react";
import dayjs from "dayjs";
import { formatPrice } from "../../utils/priceFormat";
import { useNavigate } from "react-router-dom";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import useMultiQueryHook from "../../hooks/useMultiQueryHook";
import UserOrdersSkeleton from "../../components/skeleton/user/UserOrdersSkeleton";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { AppContext } from "../../context/AppContext";
import setColor from "../../utils/orderStatusColor";
import { Helmet } from "react-helmet";

const UserOrders = () => {
  const [page, setPage] = useState(1);
  const { data: orders, isPending } = useMultiQueryHook({
    url: `/order?size=5&page=${page}`,
    queries: ["getOrders", page],
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event); // to be clear
    setPage(value);
  };
  const navigate = useNavigate();
  const { setOpenUserDashboard, show } = useContext(AppContext);
  return (
    <>
      <Helmet>
        <title>My Orders</title>
      </Helmet>
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
        {show && (
          <IconButton>
            <MenuIcon onClick={() => setOpenUserDashboard(true)} />
          </IconButton>
        )}
      </Stack>
      {orders?.orders.length && (
        <Box mt={2}>
          {orders.orders.map((order: any) => (
            <Paper
              key={order._id}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textDecoration: "none",
              }}
              component={Link}
              to={`/user/orders/${order._id}`}
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
      {orders?.orders?.length == 0 && (
        <Typography
          fontWeight={"bold"}
          color={"grey"}
          textAlign={"center"}
          mt={10}
        >
          There are no orders
        </Typography>
      )}
      {isPending && <UserOrdersSkeleton />}
    </>
  );
};

export default UserOrders;
