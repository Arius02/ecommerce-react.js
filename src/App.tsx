import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Dashboard,
  Main,
  AddCoupon,
  AddCategory,
  AddSubCategory,
  ProductDetailsAdmin,
  AddBrand,
  AddProduct,
  CouponsList,
  CategoriesList,
  SubCategoriesList,
  BrandsList,
  ProductsList,
  CategoryDetails,
  SubCategoryDetails,
  BrandDetails,
  ProductDetails,
  Home,
  SearchPage,
  CartPage,
  Login,
  Register,
  ForgetPassword,
  ResetPassword,
  Checkout,
  DirectOrder,
  Profile,
  UserOrderDetails,
  Wishlist,
  UserOrders,
  Address,
  UserMainPage,
} from "./pages";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./app.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setShow } from "./reducers/screenSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
const App = () => {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        //search
        {
          path: "/search/:searchTerm",
          element: <SearchPage />,
        },
        //product page
        {
          path: "/product/details/:id",
          element: <ProductDetails />,
        },
        //cart
        {
          path: "/cart",
          element: <CartPage />,
        },
        //order
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/directOrder/:id",
          element: <DirectOrder />,
        },
        //user info
        {
          path: "/user",
          element: <UserMainPage />,
          children: [
            {
              path: "/user/profile",
              element: <Profile />,
            },
            {
              path: "/user/orders",
              element: <UserOrders />,
            },
            {
              path: "/user/orders/:id",
              element: <UserOrderDetails />,
            },
            {
              path: "/user/wishlist",
              element: <Wishlist />,
            },
            {
              path: "/user/address",
              element: <Address />,
            },
          ],
        },
      ],
    },
    //auth
    {
      path: "/auth/register",
      element: <Register />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/forget-passwrod/",
      element: <ForgetPassword />,
    },
    {
      path: "/auth/reset-password",
      element: <ResetPassword />,
    },

    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        //coupon
        {
          path: "/dashboard/coupon",
          element: <CouponsList />,
        },
        {
          path: "/dashboard/coupon/add",
          element: <AddCoupon />,
        },
        // category
        {
          path: "/dashboard/category",
          element: <CategoriesList />,
        },
        {
          path: "/dashboard/category/add",
          element: <AddCategory />,
        },
        {
          path: "/dashboard/category/details/:id",
          element: <CategoryDetails />,
        },
        //subCategory
        {
          path: "/dashboard/subCategory",
          element: <SubCategoriesList />,
        },
        {
          path: "/dashboard/subCategory/add",
          element: <AddSubCategory />,
        },
        {
          path: "/dashboard/subCategory/details/:id",
          element: <SubCategoryDetails />,
        },
        //brand
        {
          path: "/dashboard/brand",
          element: <BrandsList />,
        },
        {
          path: "/dashboard/brand/add",
          element: <AddBrand />,
        },
        {
          path: "/dashboard/brand/dtails/:id",
          element: <BrandDetails />,
        },
        //product
        {
          path: "/dashboard/product",
          element: <ProductsList />,
        },
        {
          path: "/dashboard/product/add",
          element: <AddProduct />,
        },
        {
          path: "/dashboard/product/details/:id",
          element: <ProductDetailsAdmin />,
        },
      ],
    },
  ]);
  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.screenSize.show);

  dispatch(setShow(window.innerWidth <= 900 ? true : false));
  const handleShow = () => {
    if (window.innerWidth <= 900) {
      dispatch(setShow(true));
    } else {
      dispatch(setShow(false));
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleShow);
    return () => window.removeEventListener("resize", handleShow);
  }, [show]);

  const theme = createTheme({
    palette: {
      secondary: {
        main:pink[600]
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
