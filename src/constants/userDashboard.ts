import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
const links = {
  dashboard: [
    {
      name: "Orders",
      to: "/user/orders",
      icon: ShoppingBagOutlinedIcon,
    },
    {
      name: "Wishlist",
      to: "/user/wishlist",
      icon: FavoriteBorderIcon,
    },
  ],
  accountSettings: [
    {
      name: "Profile Info",
      to: "/user",
      icon: PersonIcon,
    },
    {
      name: "Addresses",
      to: "/user/address",
      icon: LocationOnIcon,
    },
  ],
};

export default links;
