import CategoryIcon from '@mui/icons-material/Category';
import ExtensionIcon from '@mui/icons-material/Extension';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
export const sidebarAccordoin = [
  {
    name: "Products",
    key: "sygsb",
    link:"/product",
    children: [
      {
        name: "Products List",
        key: "sdljd",
        link: "/dashboard/product",
      },
      {
        name: "Add Product",
        key: "sdsjdsdljd",
        link: "/dashboard/product/add",
      },
    ],
    icon: ExtensionIcon,
  },
  {
    name: "Categories",
    key: "sdfid",
    link:"/category",icon: CategoryIcon,
    children: [
      {
        name: "Categories List",
        key: "sdlduhjd",
        link: "/dashboard/category",
      },
      {
        name: "Add Product",
        key: "suhw",
        link: "/dashboard/category/add",
      },
    ],
  },
  {
    name: "Sub Categories",
    key: "dsij",
    link:"/subCategory",icon: CollectionsBookmarkIcon,
    children: [
      {
        name: "Sub Categories List",
        key: "d9nw",
        link: "/dashboard/subCategory",
      },
      {
        name: "Add Sub Category",
        key: "dieon",
        link: "/dashboard/subCategory/add",
      },
    ],
  },
  {
    name: "Brands",
    key: "dslk",
    link:"/brand",icon: BrandingWatermarkIcon,
    children: [
      {
        name: "Brands List",
        key: "ojnon",
        link: "/dashboard/brand",
      },
      {
        name: "Add Brand",
        key: "onehsid",
        link: "/dashboard/brand/add",
      },
    ],
  },
  {
    name: "Coupons",
    key: "idnd",
    link:"/coupon",
    icon: CardGiftcardIcon,
    children: [
      {
        name: "Coupons List",
        key: "sihdn",
        link: "/dashboard/coupon",
      },
      {
        name: "Add Coupon",
        key: "ihwni",
        link: "/dashboard/coupon/add",
      },
    ],
  },
  {
    name: "Orders",
    key: "eojn",
    link:"/order",
    icon:CalendarMonthIcon,
    children: [
      {
        name: "Orders List",
        key: "dijd",
        link: "/dashboard/order",
      },
      {
        name: "Order Details",
        key: "ojdsij",
        link: "/dashboard/order/details",
      },
    ],
  },
];